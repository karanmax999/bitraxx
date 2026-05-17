import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/context/ClientProviders";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitraxx V1 - Celestial Sovereign Trading Platform",
  description:
    "Experience precision spot trading, multi-chain unified wallet, and professional-grade trade protection with Bitraxx Shield™.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} dark h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full bg-[#05070A] text-[#e1e2e7] font-body flex flex-col selection:bg-[#00D9FF]/30 selection:text-[#00D9FF]">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
