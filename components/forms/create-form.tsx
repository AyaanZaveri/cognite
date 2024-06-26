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
import {
  RecursiveCharacterTextSplitter,
  TokenTextSplitter,
} from "langchain/text_splitter";
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
import { toast } from "../ui/use-toast";

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
    .max(500, { message: "Your image URL is too long (max 500 characters)" })
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

  const [additionalContext, setAdditionalContext] = useState<string>("");

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
            chunkSize: 8000,
            chunkOverlap: 250,
            // separators: ["\n", "\n\n", "\t"],
          });

          const siteDocs = await splitter.createDocuments([siteText]);

          docs.push(...siteDocs);
        }

        if (file) {
          const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 8000,
            chunkOverlap: 250,
            // separators: ["\n", "\n\n", "\t"],
          });

          const loader = new PDFLoader(file as Blob);
          let pdfDocs = await loader.loadAndSplit(splitter);

          // Remove null characters from each document in pdfDocs
          pdfDocs = pdfDocs.map((doc) => {
            doc.pageContent = doc.pageContent.replace(/\0/g, "");
            return doc;
          });

          console.log(pdfDocs);

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

  // console.log({additionalContext})

  const pickRandomImageURL = () => {
    const imgUrls = [
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png",
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png",
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Comet.png",
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Ferris%20Wheel.png",
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Compass.png",
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Airplane.png",
    ];

    return imgUrls[Math.floor(Math.random() * imgUrls.length)];
  };

  async function onSubmit(data: CreateFormValues) {
    const sources: Sources = {
      sites: data.websites?.map((website) => website.value),
      files: data.file,
    };

    const theDocs = await getSources(sources);

    console.log({ additionalContext });

    const imageUrl = data.imgUrl ? data.imgUrl : pickRandomImageURL();

    const updatedData = {
      name: data.name,
      description: data.description,
      imgUrl: imageUrl,
      tags: data.tags?.map((tag) => tag.value),
      docs: theDocs,
      slug: slugify(data.name, { lower: true }),
      userId: session?.user?.id,
      isPrivate: data.private,
      additionalContext: additionalContext,
    };

    await axios
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

        if (sources?.sites!.length < 0 || !file) {
          toast({
            title: "Add a source",
            description:
              "You gotta add a source to your cog. This can be a website or a PDF file. You can also add both. 🌎",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error creating cog",
            description: err.error ? err.error : "Something went wrong 🫠",
            variant: "destructive",
          });
        }
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
          console.log("File type:", file.type);
          console.log("File name:", file.name);

          // setAdditionalContext(`This is the "${file.name}" document.`);

          if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
            alert("File type not supported. Please upload a PDF");
            return;
          }
          // if the subscription plan is basic, only allow file size of 5 mb, if it's standard allow 50 mb, if it's pro allow 100 mb
          if (
            subscriptionPlan?.id === "basic" &&
            fileSize > MAX_FILE_SIZE &&
            file.type !== "application/pdf"
          ) {
            alert("File size is too large. Max file size is 5MB");
            return;
          } else if (
            subscriptionPlan?.id === "standard" &&
            fileSize > MAX_FILE_SIZE * 10 &&
            file.type !== "application/pdf"
          ) {
            alert("File size is too large. Max file size is 50MB");
            return;
          } else if (
            subscriptionPlan?.id === "pro" &&
            fileSize > MAX_FILE_SIZE * 20 &&
            file.type !== "application/pdf"
          ) {
            alert("File size is too large. Max file size is 100MB");
            return;
          }

          setFile(blob);
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
                <FormDescription>
                  This can be anything you want.
                </FormDescription>
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
                      List of websites you desire to provide the chatbot with
                      knowledge about.
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
                subscriptionPlan?.id === "basic" && websiteFields.length >= 2
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
                      <div className="flex flex-row gap-x-2">
                        <Input {...field} />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-10"
                          onClick={() => removeTag(index)}
                        >
                          <XIcon className="h-5 w-5 text-accent-foreground" />
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
            <Button type="submit">
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
                <Button type="button">Sign in to create a cog</Button>
              </Link>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default Create;
