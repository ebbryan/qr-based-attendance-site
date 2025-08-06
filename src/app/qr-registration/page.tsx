import React from "react";
import TableComponent from "./components/Table";
import { cookies } from "next/headers";
import directus from "@/lib/directus";
import { readItems, withToken } from "@directus/sdk";
import {
  TExtendedQRProfile,
  TExtendedStudents,
} from "@/schemas/students.schema";

export default async function QRRegistrationPage() {
  const cookie = await cookies();
  const token = cookie.get("access_token")?.value as string;
  const students = (await directus.request(
    withToken(
      token,
      readItems("students", {
        fields: ["*", "grade_level_id.*", "strand_id.*"],
      })
    )
  )) as TExtendedStudents[];

  const qrStudentsData = (await directus.request(
    withToken(
      token,
      readItems("qr_attendance_profile", {
        fields: ["*", "student_id.*.*"],
      })
    )
  )) as TExtendedQRProfile[];

  return <TableComponent data={qrStudentsData} />;
}
