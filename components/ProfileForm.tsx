"use client";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import axios from "axios";
import { useToast } from "./ui/use-toast";

const updateUser = async (data: ProfileFormValues, session: Session) => {
  const res = await axios.post(
    `/api/updateUser`,
    {
      id: session?.user?.id,
      username: data.username,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(res);
};

const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Your username must be at least 3 characters long",
    })
    .max(30, {
      message: "It's a username, not a novel (max 30 characters)",
    })
    .toLowerCase(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileForm = ({ session }: { session: Session }) => {
  const { toast } = useToast();

  const defaultValues: Partial<ProfileFormValues> = {
    username: session.user?.username!,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    console.log("data");

    console.log(data.username);

    await updateUser(data, session);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          Hello
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            description: "Your message has been sent.",
          });
        }}
      >
        Show Toast
      </Button>
    </Form>
  );
};

export default ProfileForm;
