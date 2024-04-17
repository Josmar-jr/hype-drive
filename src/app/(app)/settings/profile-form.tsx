"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";

interface ProfileFormProps {
  user: {
    firstName: string | null;
    lastName: string | null;
    imageUrl: string;
  };
}

const profileFormSchema = z.object({
  avatar: z.any(),
  firstName: z.string(),
  lastName: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({ user }: ProfileFormProps) {
  const { toast } = useToast();
  const { user: userHook } = useUser();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),

    defaultValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      const bodyParams = JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
      });

      await fetch("http://localhost:3001/api/update-user", {
        method: "POST",
        body: bodyParams,
      });

      toast({
        variant: "success",
        title: "User updated",
        description: "User updated with success",
      });

      userHook?.reload();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Wasn`t possible change the profile info",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <div className="flex items-center gap-6">
                  <input
                    type="file"
                    className="sr-only"
                    onChange={field.onChange}
                    ref={field.ref}
                    name={field.name}
                    id={field.name}
                  />

                  <label
                    htmlFor={field.name}
                    className="cursor-pointer hover:opacity-70"
                  >
                    <Image
                      src={user.imageUrl}
                      alt=""
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full bg-primary/10"
                    />
                  </label>
                  <div>
                    <span className="text-lg font-medium">Your avatar</span>
                    <p className="text-sm text-muted-foreground">
                      Click on the avatar to upload a custom one from your
                      files.
                    </p>
                  </div>
                </div>
              )}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          size="sm"
          type="submit"
          disabled={form.formState.isSubmitting}
          className="flex gap-1"
        >
          {form.formState.isLoading && (
            <Loader className="h-4 w-4 animate-spin" />
          )}
          Update
        </Button>
      </form>
    </Form>
  );
}
