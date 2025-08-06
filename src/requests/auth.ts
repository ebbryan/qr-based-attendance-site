"use server";

import { cookies } from "next/headers";
import {
  AuthenticationData,
  DirectusUser,
  LocalLoginPayload,
  readMe,
  withToken,
} from "@directus/sdk";

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

export async function GetMe() {
  try {
    const cookie = await cookies();
    const token = cookie.get(AUTH.ACCESS_TOKEN)?.value as string;
    const response = (await directus.request(
      withToken(token, readMe())
    )) as DirectusUser;
    return { data: response, success: true };
  } catch (error) {
    return {
      message: ERROR.SOMETHING_WENT_WRONG,
      success: false,
    };
  }
}
