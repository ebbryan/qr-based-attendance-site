"use client";

import { ReactNode } from "react";

interface IBackgroundProvider {
  children: ReactNode;
}

const BackgroundProvider = (props: IBackgroundProvider) => {
  return <main className="px-12">{props.children}</main>;
};

export default BackgroundProvider;
