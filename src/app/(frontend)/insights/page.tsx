import type { Metadata } from "next";
import { getArticles } from "@/lib/cms";
import { TextLink } from "@/components/ui/cta-link";
import { PageHero } from "@/components/page/page-hero";
import { InsightsList } from "@/components/page/insights-list";

export const metadata: Metadata = {
  title: "Insights",
  description: "Playbooks, points of view and research on digital marketing from the MIL Digital team.",
};

/** Inventory: article list with categories (CMS). */
export default async function InsightsPage() {
  const articles = await getArticles();
  return (
    <>
      <PageHero
        label="Insights"
        title={"Thinking out loud,\nwith receipts."}
        intro="Playbooks, points of view and lessons from the brands we work with."
        actions={<TextLink href="/reports">Industry reports</TextLink>}
      />
      <InsightsList articles={articles} />
    </>
  );
}
