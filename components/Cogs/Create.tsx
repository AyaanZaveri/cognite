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
import { useState } from "react";
import { cn } from "@/lib/utils";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface ButtonState {
  text: string;
  loading: boolean;
}

const tagsSchema = z
  .array(
    z.object({
      value: z
        .string()
        .min(2, { message: "Tag must be at least 2 characters long" })
        .max(20, { message: "Tag must be at most 20 characters long" }),
    })
  )
  .max(5, { message: "You can only have up to 5 tags" })
  .superRefine((tags, ctx) => {
    const tagValues = tags.map((tag) => tag.value);
    if (tagValues.length !== new Set(tagValues).size) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Tags should not be duplicated`,
      });
    }
  });

const createFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Your name must be at least 3 characters long" })
    .max(30, { message: "It's a name, not a poem (max 30 characters)" }),
  description: z.string().max(80, {
    message: "It's a description, not an essay (max 80 characters)",
  }),
  imgUrl: z
    .string()
    .max(200, { message: "Your image URL is too long (max 200 characters)" }),
  tags: tagsSchema,
  // .max(5, { message: "You can only have a maximum of 5 tags" })
  // .optional(),
  websites: z
    .array(z.string().url({ message: "Not a valid URL" }))
    .max(5, { message: "You can only have a maximum of 5 websites" }),
  files: z
    .array(z.any())
    .max(5, { message: "You can only have a maximum of 5 files" }),
});

type CreateFormValues = z.infer<typeof createFormSchema>;

const Create = (session: { session: Session | null }) => {
  const form = useForm<CreateFormValues>({
    resolver: zodResolver(createFormSchema),
    mode: "onChange",
  });

  console.log(form.formState.errors);

  const { fields, append } = useFieldArray({
    name: "tags",
    control: form.control,
  });

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form className="space-y-4">
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
                  This is the name of the cog. It can be anything you want.
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
                  A short description of the cog. It can be anything you want.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {fields.map((field, index) => (
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
                      <Input {...field} />
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
              onClick={() => append({ value: "" })}
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
                <FormDescription>
                  A URL to an image of the cog. It can be anything you want.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </div>
  );
};

export default Create;
