import type { Metadata } from "next";
import Link from "next/link";
import { Google_Sans, Inter } from "next/font/google";
import { Logo } from "@/components/ui/logo";
import NotFound from "./(frontend)/not-found";
import "./(frontend)/globals.css";

// Unmatched URLs skip every layout (the app has two root layouts: site and
// CMS admin), so this page brings its own fonts, styles and a minimal header.
const googleSans = Google_Sans({ variable: "--font-google-sans", subsets: ["latin"], weight: ["400", "500", "700"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = {
  title: "Page not found — MIL Digital",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${googleSans.variable} ${inter.variable} antialiased`}>
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
