"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { DirectusUser } from "@directus/sdk";

import Navbar from "@/components/Navbar";
import { ROUTES } from "@/constants/routes.enum";

const LayoutContent = ({
  children,
  userData,
}: {
  children: ReactNode;
  userData: DirectusUser;
}) => {
  const pathname = usePathname();

  return pathname === ROUTES.LOGIN || pathname === ROUTES.HOME ? (
    <>{children}</>
  ) : (
    <Navbar user={userData}>{children}</Navbar>
  );
};

export default LayoutContent;
