"use server";

import { cookies } from "next/headers";
import { AuthenticationData, LocalLoginPayload } from "@directus/sdk";

import { AUTH } from "@/constants/auth.enum";
import { ERROR, SUCCESS } from "@/constants/error-success-messages.enum";
import directus from "@/lib/directus";

export const loginHandler = async (payload: LocalLoginPayload) => {
  const cookie = await cookies();
  return await directus
    .login(payload)
    .then((value: AuthenticationData) => {
      if (!value?.access_token) {
        return { message: ERROR.INVALID_CREDENTIALS, success: false };
      }
      cookie.set(AUTH.ACCESS_TOKEN, value.access_token);
      return { message: SUCCESS.LOGIN_SUCCESSFUL, success: true };
    })
    .catch(() => {
      return {
        message: ERROR.INVALID_CREDENTIALS,
        success: false,
      };
    });
};
