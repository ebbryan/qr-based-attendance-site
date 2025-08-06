"use server";

import { cookies } from "next/headers";

import { readItem, readItems, withToken } from "@directus/sdk";

import { AUTH } from "@/constants/auth.enum";
import { COLLECTIONS } from "@/constants/collections.enum";
import { ERROR } from "@/constants/error-success-messages.enum";
import directus from "@/lib/directus";
import { TGradeLevels } from "@/schemas/students.schema";

export async function GetGradeLevels() {
  const cookie = await cookies();
  const token = cookie.get(AUTH.ACCESS_TOKEN)?.value as string;
  try {
    const response = (await directus.request(
      withToken(
        token,
        readItems(COLLECTIONS.GRADE_LEVELS, { sort: ["grade_level_number"] })
      )
    )) as TGradeLevels[];
    return { data: response, success: true };
  } catch (error) {
    return { message: ERROR.SOMETHING_WENT_WRONG, success: false };
  }
}

export async function getGradeLevelById(id: string) {
  const cookie = await cookies();
  const token = cookie.get(AUTH.ACCESS_TOKEN)?.value as string;
  try {
    const response = (await directus.request(
      withToken(token, readItem(COLLECTIONS.GRADE_LEVELS, id))
    )) as TGradeLevels;

    return { data: response, success: true };
  } catch (error) {
    return { message: ERROR.SOMETHING_WENT_WRONG, success: false };
  }
}
