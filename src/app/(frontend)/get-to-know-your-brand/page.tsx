import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/cms";
import { Quiz } from "@/components/page/quiz";

export const metadata: Metadata = {
  title: "Get to know your brand",
  description: "Six quick questions to find the MIL Digital service that fits your brand: consulting, advertising or creative.",
};

/** Inventory: quiz that recommends a service from the visitor's answers (pre-defined). */
export default async function QuizPage() {
  const cases = await getCaseStudies();
  return <Quiz cases={cases} />;
}
