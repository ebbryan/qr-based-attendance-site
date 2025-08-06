"use server";

import directus from "@/lib/directus";
import { AuthenticationData, LocalLoginPayload } from "@directus/sdk";
import { cookies } from "next/headers";

export const loginHandler = async (payload: LocalLoginPayload) => {
  const cookie = await cookies();
  return await directus
    .login(payload)
    .then((value: AuthenticationData) => {
      console.log("🚀 ~ loginHandler ~ value:", value);
      if (!value?.access_token) {
        return { message: "Invalid credentials", success: false };
      }
      cookie.set("access_token", value.access_token);
      return { message: "Login successful", success: true };
    })
    .catch(() => {
      return {
        message: "Invalid credentials",
        success: false,
      };
    });
};
