import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Logo } from "@/components/ui/logo";
import NotFound from "./(frontend)/not-found";
import "./(frontend)/globals.css";

// Unmatched URLs skip every layout (the app has two root layouts: site and
// CMS admin), so this page brings its own fonts, styles and a minimal header.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Page not found — MIL Digital",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-svh">
        <header className="container-x absolute inset-x-0 top-0 z-10 flex h-16 items-center md:h-[72px]">
          <Link href="/" aria-label="MIL Digital home">
            <Logo />
          </Link>
        </header>
        <NotFound />
      </body>
    </html>
  );
}
