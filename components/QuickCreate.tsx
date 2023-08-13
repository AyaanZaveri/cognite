"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { TbBolt } from "react-icons/tb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { scrapeSite } from "@/utils/scrapeSite";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "langchain/dist/document";
import axios from "axios";
import { getAuthSession } from "@/lib/auth";
import { Session } from "next-auth";
import slugify from "slugify";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

const quickCreateFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Your name must be at least 3 characters long" })
    .max(30, { message: "It's a name, not a poem (max 30 characters)" }),
  websites: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
  file: z.string().optional(),
});

interface ButtonState {
  text: string;
  disabled: boolean;
  pulse: boolean;
}

interface Sources {
  sites?: string[] | undefined;
  files?: string | undefined;
}

type QuickCreateFormValues = z.infer<typeof quickCreateFormSchema>;

const QuickCreate = ({ session }: { session: Session | null }) => {
  const form = useForm<QuickCreateFormValues>({
    resolver: zodResolver(quickCreateFormSchema),
    mode: "onChange",
  });

  const { fields: websiteFields, append: appendWebsite } = useFieldArray({
    name: "websites",
    control: form.control,
  });

  const [buttonStatus, setButtonStatus] = useState<ButtonState>({
    text: "Create",
    disabled: false,
    pulse: false,
  });

  const [file, setFile] = useState<Blob | null>(null);

  async function getSources(sources: Sources) {
    try {
      if (sources?.sites!.length > 0 || file) {
        setButtonStatus({
          text: "Getting sources 🌎",
          disabled: true,
          pulse: true,
        });

        // console.log(sources);

        const docs: Document[] = [];

        if (sources?.sites && sources?.sites.length > 0) {
          const siteText = await scrapeSite(sources?.sites);

          // console.log(siteText);

          const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
          });

          const siteDocs = await splitter.createDocuments([siteText]);

          docs.push(...siteDocs);
        }

        if (file) {
          const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
          });

          const loader = new PDFLoader(file as Blob);
          const pdfDocs = await loader.loadAndSplit(splitter);

          docs.push(...pdfDocs);
        }

        // console.log(docs);

        setButtonStatus({
          text: "Creating cog 🧠",
          disabled: true,
          pulse: true,
        });

        return docs;
      } else {
        setButtonStatus({
          text: "No sources provided 😢",
          disabled: false,
          pulse: false,
        });
      }
    } catch (error) {
      console.log("error", error);

      setButtonStatus({
        text: "Error getting sources 😢",
        disabled: false,
        pulse: false,
      });
    }
  }

  async function onSubmit(data: QuickCreateFormValues) {
    const sources: Sources = {
      sites: data.websites?.map((website) => website.value),
      files: data.file,
    };

    const theDocs = await getSources(sources);

    const updatedData = {
      name: data.name,
      docs: theDocs,
      slug: slugify(data.name, { lower: true }),
      userId: session?.user?.id,
      tags: [],
      isPrivate: true,
      description: "",
      imgUrl: "",
    };

    // console.log(updatedData);

    const response = await axios
      .post(`/api/cog/create`, {
        data: updatedData,
      })
      .then((res) => {
        // console.log(res);
        setButtonStatus({
          text: "Cog created! 🎉",
          disabled: true,
          pulse: false,
        });

        console.log(res);

        redirect(`/cog/${session?.user.username}/${res.data.cog.slug}`);
      })
      .catch((err) => {
        setButtonStatus({
          text: "Error creating cog 😢",
          disabled: false,
          pulse: false,
        });
        console.log(err);
      });
  }

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      try {
        const file = event.target.files?.[0];
        if (file) {
          const arrayBuffer = await file.arrayBuffer();
          const blob = new Blob([new Uint8Array(arrayBuffer)], {
            type: file.type,
          });
          setFile(blob);
        }
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="space-x-2">
          <span>Quick Create</span>
          <TbBolt className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Quick Create</DialogTitle>
          <DialogDescription>
            Quickly create a private cog ⚡️
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Give it a quick name so you can find it later
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                {websiteFields.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`websites.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          Websites
                        </FormLabel>
                        <FormDescription
                          className={cn(index !== 0 && "sr-only")}
                        >
                          Websites you want to train the cog on.
                        </FormDescription>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => appendWebsite({ value: "" })}
                >
                  Add Website
                </Button>
              </div>
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Files</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="File"
                        {...field}
                        onChange={handleFile}
                      />
                    </FormControl>
                    <FormDescription>You can also upload a PDF</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                {session?.user?.id ? (
                  <Button
                    type="submit"
                    className={cn(
                      buttonStatus.disabled && "cursor-not-allowed"
                    )}
                  >
                    <span className={cn(buttonStatus.pulse && "animate-pulse")}>
                      {buttonStatus.text}
                    </span>
                  </Button>
                ) : (
                  <div>
                    <Link href="/api/auth/signin">
                      <Button type="button">Sign in to create a cog</Button>
                    </Link>
                  </div>
                )}
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickCreate;
