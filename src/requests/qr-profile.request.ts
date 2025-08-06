"use server";

import { cookies } from "next/headers";

import { createItem, withToken } from "@directus/sdk";

import { AUTH } from "@/constants/auth.enum";
import { COLLECTIONS } from "@/constants/collections.enum";
import { ERROR } from "@/constants/error-success-messages.enum";
import directus from "@/lib/directus";
import { TQRProfile } from "@/schemas/students.schema";

export async function createNew(payload: TQRProfile) {
  try {
    const cookie = await cookies();
    const token = cookie.get(AUTH.ACCESS_TOKEN)?.value as string;
    const response = await directus.request(
      withToken(token, createItem(COLLECTIONS.QR_ATTENDANCE_PROFILE, payload))
    );

    return { data: response, success: true };
  } catch (error) {
    return { message: ERROR.SOMETHING_WENT_WRONG, success: false };
  }
}
