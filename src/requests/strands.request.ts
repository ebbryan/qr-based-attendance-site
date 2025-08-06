"use server";

import { cookies } from "next/headers";

import { readItems, withToken } from "@directus/sdk";

import { AUTH } from "@/constants/auth.enum";
import { COLLECTIONS } from "@/constants/collections.enum";
import { ERROR } from "@/constants/error-success-messages.enum";
import directus from "@/lib/directus";
import { TDefaultFieldFilter } from "@/schemas";
import { TStrands } from "@/schemas/students.schema";

export async function GetStrands(query?: TDefaultFieldFilter) {
  const cookie = await cookies();
  const token = cookie.get(AUTH.ACCESS_TOKEN)?.value as string;
  try {
    const response = (await directus.request(
      withToken(token, readItems(COLLECTIONS.STRANDS, query))
    )) as TStrands[];
    return { data: response, success: true };
  } catch (error) {
    return { message: ERROR.SOMETHING_WENT_WRONG, success: false };
  }
}
