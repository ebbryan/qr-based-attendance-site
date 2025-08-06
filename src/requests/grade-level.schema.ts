"use server";

import directus from "@/lib/directus";
import { TGradeLevels } from "@/schemas/students.schema";
import { readItem, withToken } from "@directus/sdk";
import { cookies } from "next/headers";

export async function getGradeLevelById(id: string) {
  try {
    const cookie = await cookies();
    const token = cookie.get("access_token")?.value as string;
    const response = (await directus.request(
      withToken(token, readItem("grade_levels", id))
    )) as TGradeLevels;
    console.log("🚀 ~ getGradeLeveById ~ response:", response);

    return { data: response, success: true };
  } catch (error) {
    return { message: "Something Went Wrong!", success: false };
  }
}
