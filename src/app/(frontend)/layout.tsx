import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { site } from "@/content/site";
import { getHomeData } from "@/lib/cms";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { GroundDrift } from "@/components/motion/ground-drift";
import { BriefProvider } from "@/components/brief/brief-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display role: every headline. Variable width lets headlines run slightly condensed.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MIL Digital — Digital marketing consultant & agency, Bandung",
    template: "%s — MIL Digital",
  },
  description:
    "Certified digital marketing experts helping 150+ brands across Indonesia grow with consultation, advertising strategy and creative solutions, all backed by data.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_ID",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Featured work for the mega menu, from the CMS (cached).
  const { caseStudies } = await getHomeData();
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}>
      <body className="min-h-svh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-signal focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <GroundDrift />
        <BriefProvider>
          <Header features={caseStudies} />
          <main id="main">{children}</main>
          <Footer />
        </BriefProvider>
      </body>
    </html>
  );
}
