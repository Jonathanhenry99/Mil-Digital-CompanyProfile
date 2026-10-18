import type { Metadata } from "next";
import { Google_Sans, Inter } from "next/font/google";
import { site } from "@/content/site";
import { getHomeData } from "@/lib/cms";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { GroundDrift } from "@/components/motion/ground-drift";
import { MotionPrefs } from "@/components/motion/motion-prefs";
import { BriefProvider } from "@/components/brief/brief-provider";
import "./globals.css";

// Brand book typography: Product Sans for text (Google Sans is its open
// successor) and SF Pro Display Semibold for headlines. SF Pro can't be
// self-hosted, so headlines use the system font on Apple devices and Inter
// Semibold, its closest match, everywhere else (see --font-display).
const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["500", "600"],
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
    <html lang="en" className={`${googleSans.variable} ${inter.variable} antialiased`}>
      <body className="min-h-svh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-signal focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <GroundDrift />
        <MotionPrefs>
          <BriefProvider>
            <Header features={caseStudies} />
            <main id="main">{children}</main>
            <Footer />
          </BriefProvider>
        </MotionPrefs>
      </body>
    </html>
  );
}
