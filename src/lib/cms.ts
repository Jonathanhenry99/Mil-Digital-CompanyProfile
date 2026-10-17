import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media } from "@/payload-types";
import * as fallback from "@/content/home";
import type { CaseStudy, Client, Stat } from "@/content/home";

/* ── CMS data layer ──────────────────────────────────────────────
 * Reads Payload through its Local API (no HTTP hop) and shapes the result
 * for the section components. Cached with `use cache` and tagged "home";
 * the CMS expires the tag on every save (src/payload/revalidate.ts), so
 * edits show on the next page load. Anything missing in the CMS falls
 * back to src/content/home.ts.
 * ─────────────────────────────────────────────────────────────── */

export type HomeData = {
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    background: { image: string; focal: string } | null;
  };
  showreel: { title: string; caption: string; video: string | null; poster: string; milestones: { year: string; label: string }[] };
  stats: Stat[];
  clients: Client[];
  caseStudies: CaseStudy[];
  gallery: { src: string; alt: string }[];
  testimonials: { quote: string; name: string; role: string; company: string }[];
  insights: {
    articles: { slug: string; category: string; title: string; excerpt: string; readingTime: string; image: string }[];
    report: {
      slug: string;
      title: string;
      summary: string;
      image: string;
      findings: { stat: string; label: string }[];
    } | null;
  };
};

/**
 * Payload prefixes upload URLs with `serverURL`. Keep only the path so the
 * same content works on any host (localhost, preview, mildigital.id) and
 * next/image treats it as a local image.
 */
const relative = (u: string) => (/^https?:\/\//.test(u) ? new URL(u).pathname : u);

/** A populated upload field (URL made relative), or null when unset. */
function file(value: unknown): Media | null {
  if (!value || typeof value !== "object" || !("url" in value)) return null;
  const m = value as Media;
  return m.url ? { ...m, url: relative(m.url) } : m;
}
const url = (value: unknown, fallbackUrl = "") => file(value)?.url ?? fallbackUrl;
const focal = (m: Media | null) => `${m?.focalX ?? 50}% ${m?.focalY ?? 50}%`;

export async function getHomeData(): Promise<HomeData> {
  "use cache";
  cacheTag("home");
  cacheLife("max");

  const payload = await getPayload({ config });
  const [home, clients, testimonials, articles] = await Promise.all([
    payload.findGlobal({ slug: "home", depth: 2 }),
    payload.find({ collection: "clients", where: { showInMarquee: { equals: true } }, sort: "order", limit: 200, depth: 1 }),
    payload.find({ collection: "testimonials", sort: "order", limit: 12 }),
    payload.find({
      collection: "articles",
      where: { _status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 5,
      depth: 1,
    }),
  ]);

  const bg = file(home.hero?.backgroundImage);
  const report = home.featuredReport && typeof home.featuredReport === "object" ? home.featuredReport : null;
  const caseStudies = (home.featuredCaseStudies ?? []).filter((c) => typeof c === "object");

  return {
    hero: {
      eyebrow: home.hero?.eyebrow || fallback.hero.eyebrow,
      title: home.hero?.title || fallback.hero.title,
      body: home.hero?.body || fallback.hero.body,
      background: bg?.url ? { image: bg.url, focal: focal(bg) } : null,
    },
    showreel: {
      title: home.showreel?.title || fallback.showreel.title,
      caption: home.showreel?.caption || fallback.showreel.caption,
      video: file(home.showreel?.video)?.url ?? null,
      poster: url(home.showreel?.poster, fallback.showreel.poster),
      milestones: home.showreel?.milestones?.length
        ? home.showreel.milestones.map(({ year, label }) => ({ year, label }))
        : fallback.milestones,
    },
    stats: home.stats?.length
      ? home.stats.map((s) => ({
          value: s.value,
          decimals: s.decimals ?? 0,
          prefix: s.prefix ?? undefined,
          suffix: s.suffix ?? undefined,
          label: s.label,
          note: s.note ?? "",
        }))
      : fallback.stats,
    clients: clients.docs.length
      ? clients.docs.map((c) => ({ name: c.name, logo: url(c.logo) })).filter((c) => c.logo)
      : fallback.clients,
    caseStudies: caseStudies.length
      ? caseStudies.map((c) => ({
          slug: c.slug ?? String(c.id),
          client: c.client,
          title: c.title,
          industry: c.industry,
          services: c.services,
          metric: { value: c.metric.value, label: c.metric.label },
          image: url(c.cover),
        }))
      : fallback.caseStudies,
    gallery: home.gallery?.length
      ? home.gallery.map(file).filter((m): m is Media => Boolean(m?.url)).map((m) => ({ src: m.url!, alt: m.alt }))
      : fallback.gallery,
    testimonials: testimonials.docs.length
      ? testimonials.docs.map((t) => ({ quote: t.quote, name: t.name, role: t.role ?? "", company: t.company }))
      : fallback.testimonials,
    insights: {
      articles: articles.docs.length
        ? articles.docs.map((a) => ({
            slug: a.slug ?? String(a.id),
            category: a.category,
            title: a.title,
            excerpt: a.excerpt,
            readingTime: a.readingTime ?? "",
            image: url(a.cover),
          }))
        : fallback.insights.articles,
      report: report
        ? {
            slug: report.slug ?? String(report.id),
            title: report.title,
            summary: report.summary,
            image: url(report.cover),
            findings: (report.findings ?? []).map(({ stat, label }) => ({ stat, label })),
          }
        : null,
    },
  };
}
