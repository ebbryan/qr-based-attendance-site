"use server";

import { cookies } from "next/headers";

import { createItem, readItems, uploadFiles, withToken } from "@directus/sdk";

import { AUTH } from "@/constants/auth.enum";
import { COLLECTIONS } from "@/constants/collections.enum";
import { ERROR } from "@/constants/error-success-messages.enum";
import directus from "@/lib/directus";
import { TDefaultFieldFilter } from "@/schemas";
import { TStudents } from "@/schemas/students.schema";

export async function GetStudents(query?: TDefaultFieldFilter) {
  const cookie = await cookies();
  const token = cookie.get(AUTH.ACCESS_TOKEN)?.value as string;
  try {
    const response = await directus.request(
      withToken(token, readItems(COLLECTIONS.STUDENTS, query))
    );

    return { data: response, success: true };
  } catch (error) {
    return { message: ERROR.SOMETHING_WENT_WRONG, success: false };
  }
}

export async function UploadStudentImage(formData: FormData) {
  const cookie = await cookies();
  const token = cookie.get(AUTH.ACCESS_TOKEN)?.value as string;
  const response = await directus.request(
    withToken(token, uploadFiles(formData))
  );
  return response;
}

export async function registerStudent(payload: TStudents) {
  const cookie = await cookies();
  const token = cookie.get(AUTH.ACCESS_TOKEN)?.value as string;
  try {
    const response = await directus.request(
      withToken(token, createItem(COLLECTIONS.STUDENTS, payload))
    );

    return { data: response, success: true };
  } catch (error) {
    return { message: ERROR.SOMETHING_WENT_WRONG, success: false };
  }
}
