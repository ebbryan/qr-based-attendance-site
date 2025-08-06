import directus from "@/lib/directus";
import { TGradeLevels, TStrands } from "@/schemas/students.schema";
import { readItems, withToken } from "@directus/sdk";
import { cookies } from "next/headers";
import React from "react";
import RegistrationForm from "./components/RegistrationForm";

export default async function RegistrationPage() {
  const cookie = await cookies();
  const token = cookie.get("access_token")?.value as string;
  const students = await directus.request(
    withToken(token, readItems("students"))
  );
  console.log("🚀 ~ RegistrationPage ~ students:", students);

  const gradeLevels = (await directus.request(
    withToken(
      token,
      readItems("grade_levels", { sort: ["grade_level_number"] })
    )
  )) as TGradeLevels[];

  const strands = (await directus.request(
    withToken(token, readItems("strands"))
  )) as TStrands[];

  return (
    <RegistrationForm gradeLevelsData={gradeLevels} strandsData={strands} />
  );
}
