"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { Space_Grotesk } from "next/font/google";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { scrapeSite } from "@/utils/scrapeSite";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import slugify from "slugify";
import { InputFile } from "../InputFile";
import axios, { AxiosResponse } from "axios";
import { Document } from "langchain/dist/document";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { XIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { SubscriptionPlan } from "@/types";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface Sources {
  sites?: string[] | undefined;
  files?: string | undefined;
}

interface ButtonState {
  text: string;
  disabled: boolean;
  pulse: boolean;
}

const MAX_FILE_SIZE = 500000000; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

const tagsSchema = z
  .array(
    z.object({
      value: z
        .string()
        .min(2, { message: "Tag must be at least 2 characters long" })
        .max(20, { message: "Tag must be at most 20 characters long" }),
    })
  )
  .optional();

const createFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Your name must be at least 3 characters long" })
    .max(30, { message: "It's a name, not a poem (max 30 characters)" }),
  description: z
    .string()
    .max(300, {
      message: "It's a description, not an essay (max 300 characters)",
    })
    .optional(),
  imgUrl: z
    .string()
    .max(200, { message: "Your image URL is too long (max 200 characters)" })
    .optional(),
  tags: tagsSchema,
  websites: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
  file: z
    .string()
    .refine((file) => {
      const fileType = file.split(".").pop();
      return ACCEPTED_FILE_TYPES.includes(fileType!);
    })
    .optional(),
  private: z.boolean().optional(),
});

type CreateFormValues = z.infer<typeof createFormSchema>;

const Create = ({
  session,
  subscriptionPlan,
}: {
  session: Session | null;
  subscriptionPlan: SubscriptionPlan | null;
}) => {
  const form = useForm<CreateFormValues>({
    resolver: zodResolver(createFormSchema),
    mode: "onChange",
  });

  // console.log(form.control._fields)

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    name: "tags",
    control: form.control,
  });

  const {
    fields: websiteFields,
    append: appendWebsite,
    remove: removeWebsite,
  } = useFieldArray({
    name: "websites",
    control: form.control,
  });

  const [buttonStatus, setButtonStatus] = useState<ButtonState>({
    text: "Create",
    disabled: false,
    pulse: false,
  });

  const router = useRouter();

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

  async function onSubmit(data: CreateFormValues) {
    const sources: Sources = {
      sites: data.websites?.map((website) => website.value),
      files: data.file,
    };

    const theDocs = await getSources(sources);

    const updatedData = {
      name: data.name,
      description: data.description,
      imgUrl: data.imgUrl,
      tags: data.tags?.map((tag) => tag.value),
      docs: theDocs,
      slug: slugify(data.name, { lower: true }),
      userId: session?.user?.id,
      isPrivate: data.private,
    };

    // console.log(session?.session?.user?.id);

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

        router.push(`/cog/${session?.user.username}/${res.data.cog.slug}`);
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
          const fileSize = file.size;
          console.log("File size:", fileSize);

          if (fileSize > MAX_FILE_SIZE) {
            alert(
              "File size is too big. Please upload a file smaller than 5MB."
            );
          } else {
            setFile(blob);
          }
        }
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  async function convertSitemapUrlToArrayOfUrls(
    sitemapUrl: string
  ): Promise<string[]> {
    try {
      const response = await axios.get(sitemapUrl);
      const sitemapXml = response.data;

      // Extract URLs from the sitemap XML
      const urlRegex = /<loc>(.*?)<\/loc>/g;
      let match;
      const urls: string[] = [];

      while ((match = urlRegex.exec(sitemapXml)) !== null) {
        urls.push(match[1]);
      }

      console.log(urls);

      form.setValue(
        "websites",
        urls.map((url) => ({ value: url }))
      );

      return urls;
    } catch (error) {
      console.error("Error retrieving sitemap:", error);
      throw error;
    }
  }

  // useEffect(() => {
  //   convertSitemapUrlToArrayOfUrls(
  //     "https://cors-anywhere.herokuapp.com/https://www.xml-sitemaps.com/download/ui.shadcn.com-a2e382593/sitemap.xml?view=1"
  //   );
  // }, []);

  return (
    <div className="space-y-8">
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
                <FormDescription>This is the name of the cog.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full">
            {websiteFields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`websites.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Websites
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Websites you want to train the cog on.
                    </FormDescription>
                    <FormControl>
                      <div className="flex flex-row gap-x-2">
                        <Input {...field} />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-10"
                          onClick={() => removeWebsite(index)}
                        >
                          <XIcon className="h-5 w-5 text-accent-foreground" />
                        </Button>
                      </div>
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
              disabled={
                subscriptionPlan?.id === "basic" && websiteFields.length >= 1
                  ? true
                  : subscriptionPlan?.id === "standard" &&
                    websiteFields.length >= 5
                  ? true
                  : subscriptionPlan?.id === "pro" && websiteFields.length >= 50
                  ? true
                  : false
              }
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
          <FormField
            control={form.control}
            name="private"
            render={({ field }) => (
              <FormItem>
                <div className="inline-flex items-center gap-2">
                  <FormLabel>Private</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormDescription>
                  {field.value
                    ? "Your cog is private ~ Only you can see it 👀"
                    : "Your cog is public ~ It can be discovered 🌎"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>
                  A short description of the cog.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {tagFields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`tags.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Tags
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Tags are used to help people find your cog.
                    </FormDescription>
                    <FormControl>
                      <div className="flex flex-row gap-x-4">
                        <Input {...field} />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeTag(index)}
                        >
                          <XIcon />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.tags?.[index]?.value?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => appendTag({ value: "" })}
            >
              Add Tag
            </Button>
          </div>
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Image URL" {...field} />
                </FormControl>
                <FormDescription>A URL to an image of the cog.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {session?.user?.id ? (
            <Button type="submit" className={`${space_grotesk.className}`}>
              <span
                className={cn(
                  buttonStatus.pulse && "animate-pulse",
                  buttonStatus.disabled && "cursor-not-allowed"
                )}
              >
                {buttonStatus.text}
              </span>
            </Button>
          ) : (
            <div>
              <Link href="/api/auth/signin">
                <Button type="button" className={`${space_grotesk.className}`}>
                  Sign in to create a cog
                </Button>
              </Link>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default Create;
