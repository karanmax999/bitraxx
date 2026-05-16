import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BitraXx — Join the Presale",
  description: "Participate in the BitraXx BRX token presale. Early investors get the best price.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${orbitron.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
