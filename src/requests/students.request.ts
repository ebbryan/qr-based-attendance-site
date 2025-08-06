"use server";

import directus from "@/lib/directus";
import { TStudents } from "@/schemas/students.schema";
import { createItem, readItem, uploadFiles, withToken } from "@directus/sdk";
import { cookies } from "next/headers";

export async function UploadStudentImage(formData: FormData) {
  const cookie = await cookies();
  const token = cookie.get("access_token")?.value as string;
  const response = await directus.request(
    withToken(token, uploadFiles(formData))
  );
  return response;
}

export async function registerStudent(payload: TStudents) {
  try {
    const cookie = await cookies();
    const token = cookie.get("access_token")?.value as string;
    const response = await directus.request(
      withToken(token, createItem("students", payload))
    );

    return { data: response, success: true };
  } catch (error) {
    return { message: "Something went wrong!", success: false };
  }
}
