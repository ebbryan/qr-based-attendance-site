"use server";

import { CookieUtil } from "@/helpers/cookie-util";
import directus from "@/lib/directus";
import { TQRProfile } from "@/schemas/students.schema";
import { createItem, withToken } from "@directus/sdk";

export async function createNew(payload: TQRProfile) {
  try {
    const token = await CookieUtil("access_token");
    const response = await directus.request(
      withToken(token, createItem("qr_attendance_profile", payload))
    );

    return { data: response, success: true };
  } catch (error) {
    return { message: "Something went wrong!", success: false };
  }
}
