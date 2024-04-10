"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { UserProfile, useAuth, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const profileFormSchema = z.object({
  avatar: z.any().optional(),
  firstName: z.string(),
  // lastName: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function Profile() {
  const { user } = useUser();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <Card>
          <CardContent className="p-6">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <div className="flex gap-6 items-center justify-between">
                  <div>
                    <span className="text-xl font-medium">Your avatar</span>
                    <p className="text-muted-foreground text-sm mt-3">
                      This is your Avatar.
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Click on the avatar to upload a custom one from your
                      files.
                    </p>
                  </div>

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
                    className="cursor-pointer hover:opacity-80"
                  >
                    <img
                      src={user?.imageUrl}
                      alt=""
                      className="w-16 h-16 rounded-full"
                    />
                  </label>
                </div>
              )}
            />
          </CardContent>
          <CardFooter className="border-t border-zinc-800 pt-5">
            <p className="text-zinc-600 text-sm">
              Click on the avatar to upload a custom one from your files.
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardContent className="p-6">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <div className="flex gap-6 items-center justify-between">
                  <div>
                    <span className="text-xl font-medium">Your Name</span>
                    <p className="text-muted-foreground text-sm mt-3">
                      Please enter your full name, or a display name you are
                      comfortable with.
                    </p>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="w-[300px] mt-4" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            />
          </CardContent>
          <CardFooter className="border-t border-zinc-800 pt-5">
            <p className="text-zinc-600 text-sm">
              Please use 32 characters at maximum.
            </p>
          </CardFooter>
        </Card>

        <div className="w-full flex justify-end">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </Form>
  );
}
