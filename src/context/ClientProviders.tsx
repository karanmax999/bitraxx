"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Web3ModalProvider = dynamic(
  () => import("@/context/Web3ModalProvider"),
  { ssr: false }
);

export default function ClientProviders({ children }: { children: ReactNode }) {
  return <Web3ModalProvider>{children}</Web3ModalProvider>;
}
