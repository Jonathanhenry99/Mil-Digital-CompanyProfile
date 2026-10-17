import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/cms";
import { PageHero } from "@/components/page/page-hero";
import { WorksGrid } from "@/components/page/works-grid";

export const metadata: Metadata = {
  title: "Our Works",
  description: "Case studies from MIL Digital, filterable by industry, scale and service.",
};

/** Inventory: case study categories, filter by industry and scale (CMS). */
export default async function WorksPage() {
  const cases = await getCaseStudies();
  return (
    <>
      <PageHero
        label="Our Works"
        title={"Results, not\njust reports."}
        intro="A selection of brands we've grown. Filter by industry, scale or service to find work close to yours."
      />
      <WorksGrid cases={cases} />
    </>
  );
}
