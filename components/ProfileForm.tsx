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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut } from "next-auth/react";

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
      description: (
        <>
          You updated your username to <b>{data.username}</b>
        </>
      ),
    });
  }

  return (
    <div className="mt-12 space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src={session?.user?.image as string} alt="Avatar" />
          <AvatarFallback>
            {session?.user?.username?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            @{session?.user?.username}
          </p>
          <p className="text-sm text-muted-foreground">
            {session?.user?.email}
          </p>
        </div>
      </div>
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
                  This is your public display name. It can be your real name or
                  a pseudonym. You can only change this once every 30 days.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update profile</Button>
        </form>
      </Form>
      <Button variant={"outline"} onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
  );
};

export default ProfileForm;
