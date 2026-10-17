/**
 * Fills an empty CMS with the current homepage content (src/content/home.ts)
 * and uploads the images it uses. Safe to re-run: it stops if client logos
 * already exist.
 *
 *   npm run seed
 */
import path from "path";
import { getPayload } from "payload";
import config from "../payload.config";
import { caseStudies, clients, gallery, hero, insights, milestones, showreel, stats, testimonials } from "../content/home";

const payload = await getPayload({ config });

const { totalDocs } = await payload.count({ collection: "clients" });
if (totalDocs > 0) {
  payload.logger.info("CMS already has content, nothing to seed.");
  process.exit(0);
}

const uploaded = new Map<string, number>();
async function media(publicPath: string, alt: string) {
  const hit = uploaded.get(publicPath);
  if (hit) return hit;
  const doc = await payload.create({
    collection: "media",
    data: { alt },
    filePath: path.join(process.cwd(), "public", publicPath),
  });
  uploaded.set(publicPath, doc.id);
  return doc.id;
}

payload.logger.info("Uploading client logos…");
for (const [i, c] of clients.entries()) {
  await payload.create({
    collection: "clients",
    data: { name: c.name, logo: await media(c.logo, `${c.name} logo`), order: i, showInMarquee: true },
  });
}

payload.logger.info("Case studies…");
const caseStudyIds: number[] = [];
for (const cs of caseStudies) {
  const doc = await payload.create({
    collection: "case-studies",
    data: {
      client: cs.client,
      title: cs.title,
      slug: cs.slug,
      industry: cs.industry,
      services: cs.services as ("Consulting" | "Advertising" | "Creative")[],
      metric: cs.metric,
      cover: await media(cs.image, `${cs.client} case study`),
      featured: true,
      publishedAt: new Date().toISOString(),
    },
  });
  caseStudyIds.push(doc.id);
}

payload.logger.info("Testimonials…");
for (const [i, t] of testimonials.entries()) {
  await payload.create({ collection: "testimonials", data: { ...t, order: i } });
}

payload.logger.info("Articles and report…");
for (const [i, a] of insights.articles.entries()) {
  await payload.create({
    collection: "articles",
    data: {
      title: a.title,
      slug: a.slug,
      category: a.category as "Advertising",
      readingTime: a.readingTime,
      excerpt: a.excerpt,
      cover: await media(a.image, a.title),
      // Newest first, in the order they are listed.
      publishedAt: new Date(Date.now() - i * 86_400_000).toISOString(),
      _status: "published",
    },
  });
}
const r = insights.report;
const report = await payload.create({
  collection: "reports",
  data: {
    title: r.title,
    slug: r.slug,
    summary: r.summary,
    cover: await media(r.image, r.title),
    findings: r.findings,
    gated: true,
    publishedAt: new Date().toISOString(),
  },
});

payload.logger.info("Homepage settings…");
await payload.updateGlobal({
  slug: "home",
  data: {
    hero: {
      eyebrow: hero.eyebrow,
      title: hero.title,
      body: hero.body,
      backgroundImage: await media(hero.background.image, "MIL Digital team at work"),
    },
    showreel: {
      title: showreel.title,
      caption: showreel.caption,
      poster: await media(showreel.poster, "MIL Digital team"),
      milestones,
    },
    stats: stats.map((s) => ({ ...s, decimals: s.decimals ?? 0 })),
    featuredCaseStudies: caseStudyIds,
    gallery: await Promise.all(gallery.map((g) => media(g.src, g.alt))),
    featuredReport: report.id,
  },
});

payload.logger.info(`Done: ${uploaded.size} files uploaded.`);
process.exit(0);
