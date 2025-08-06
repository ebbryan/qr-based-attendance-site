import React from "react";

import { GetGradeLevels } from "@/requests/grade-level.request";
import { GetStrands } from "@/requests/strands.request";

import RegistrationForm from "./components/RegistrationForm";

export default async function RegistrationPage() {
  const gradeLevels = (await GetGradeLevels()).data;
  const strands = (await GetStrands()).data;

  if (!gradeLevels || !strands) return <div>no data</div>;

  return (
    <RegistrationForm gradeLevelsData={gradeLevels} strandsData={strands} />
  );
}
