/**
 * Data the inner pages need on top of the homepage seed: example job
 * openings (placeholders), the real article's author, report industry and
 * case study scale for the Our Works filter. Safe to re-run.
 *
 *   npm run payload run src/seed/pages-data.ts
 */
import { getPayload } from "payload";
import config from "../payload.config";

const payload = await getPayload({ config });

// Case study scale, so the Our Works filter has something to filter by.
const scales: Record<string, "sme" | "mid-market" | "enterprise"> = {
  "kopi-senja": "sme",
  "nusa-retail": "enterprise",
  "halcyon-audio": "mid-market",
  "batavia-kitchen": "sme",
  "sagara-living": "mid-market",
  "teduh-watch": "sme",
};
for (const [slug, scale] of Object.entries(scales)) {
  await payload.update({ collection: "case-studies", where: { slug: { equals: slug } }, data: { scale } });
}

await payload.update({
  collection: "articles",
  where: { slug: { equals: "7-cara-untuk-menentukan-harga-produk" } },
  data: { author: { name: "Derian Indra Bramantio", role: "MIL Digital" } },
});
await payload.update({ collection: "articles", where: { author__name: { exists: false } }, data: { author: { name: "MIL Digital Team", role: "Editorial" } } }).catch(() => {});

await payload.update({ collection: "reports", where: { slug: { equals: "indonesia-fnb-digital-report-2026" } }, data: { industry: "F&B" } });

// Example roles (placeholders until HR adds the real ones).
const { totalDocs } = await payload.count({ collection: "jobs" });
if (totalDocs === 0) {
  const jobs = [
    {
      title: "Performance Marketing Specialist",
      department: "Performance & media",
      summary: "Plan, run and optimise paid campaigns across Meta, Google, TikTok and marketplaces.",
      responsibilities: ["Build and manage full-funnel ad accounts", "Run creative and audience tests", "Report results and next steps weekly"],
      requirements: ["2+ years running paid social or search", "Comfortable with numbers and spreadsheets", "Meta certification is a plus"],
    },
    {
      title: "Content Creator",
      department: "Creative & content",
      summary: "Turn brand strategy into content people stop for, from idea to final cut.",
      responsibilities: ["Concept and produce short-form video", "Shoot and edit for social", "Work with strategists on monthly content plans"],
      requirements: ["A portfolio of social content", "Editing skills (CapCut, Premiere or similar)", "Curious about what makes content perform"],
    },
    {
      title: "Digital Marketing Consultant",
      department: "Strategy & consulting",
      summary: "Audit brands, build growth roadmaps and guide clients month by month.",
      responsibilities: ["Lead brand and channel assessments", "Set KPIs and growth plans with clients", "Run monthly performance reviews"],
      requirements: ["3+ years in digital marketing or consulting", "Clear communicator with clients", "Experience across several industries"],
    },
  ];
  for (const [i, j] of jobs.entries()) {
    await payload.create({
      collection: "jobs",
      data: {
        ...j,
        responsibilities: j.responsibilities.map((item) => ({ item })),
        requirements: j.requirements.map((item) => ({ item })),
        location: "Bandung",
        employmentType: "full-time",
        workMode: "onsite",
        status: "open",
        order: i,
      },
    });
  }
}

payload.logger.info("Pages data applied.");
process.exit(0);
