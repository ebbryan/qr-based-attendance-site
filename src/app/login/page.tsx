"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginHandler } from "@/requests/auth";
import { loginCredentials } from "@/schemas/auth.schema";
import { LocalLoginPayload } from "@directus/sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LocalLoginPayload>({
    resolver: zodResolver(loginCredentials),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LocalLoginPayload> = async (data) => {
    const response = await loginHandler(data);
    console.log("🚀 ~ onSubmit ~ response:", response);
    if (!response?.success) {
      form.setError("root", { message: response?.message });
      return;
    }
    router.push("/registration");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Spinner />
                  <span className="sr-only">Loading...</span>
                  Loading
                </>
              ) : (
                "Login"
              )}
            </Button>
            {form.formState.errors.root && (
              <p className="mt-2 text-center text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
