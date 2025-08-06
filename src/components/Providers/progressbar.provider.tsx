"use client";

import { ProgressProvider } from "@bprogress/next/app";

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="3px"
      color="#26282a"
      options={{ showSpinner: false }}
      shallowRouting
      disableSameURL
    >
      {children}
    </ProgressProvider>
  );
};

export default ProgressBarProvider;
