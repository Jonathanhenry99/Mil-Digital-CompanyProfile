import { getHomeData } from "@/lib/cms";
import { Hero } from "@/components/sections/hero";
import { Studio } from "@/components/sections/studio";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { WorkWheel } from "@/components/sections/work-wheel";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Values } from "@/components/sections/values";
import { Team } from "@/components/sections/team";
import { Testimonials } from "@/components/sections/testimonials";
import { Insights } from "@/components/sections/insights";
import { Contact } from "@/components/sections/contact";

const TEAM_PHOTOS = ["/photos/mil-team-working.jpg", "/photos/mil-team-group.jpg", "/photos/indra-pratama-ceo.jpg"];

/**
 * Homepage v2 (docs/DESIGN_REFERENCES.md §5). Chapters cover every item of
 * the page inventory: hero, stats, portfolio, case study, our services,
 * why MIL & values, team, testimonials, articles & reports, contact form.
 * Each chapter does one job and changes as you scroll through it.
 */
export default async function HomePage() {
  const data = await getHomeData();
  // The studio photo wheel: real team photos first, then work.
  const wheel = [...new Set([...TEAM_PHOTOS, ...data.caseStudies.map((c) => c.image), ...data.gallery.map((g) => g.src)])];

  return (
    <>
      <Hero hero={data.hero} video={data.hero.video} />
      <Studio stats={data.stats} wheel={wheel} photo="/photos/mil-team-working.jpg" />
      <ClientMarquee clients={data.clients} />
      <WorkWheel caseStudies={data.caseStudies} />
      <Services />
      <Process />
      <Values />
      <Team />
      <Testimonials testimonials={data.testimonials} />
      <Insights insights={data.insights} />
      <Contact />
    </>
  );
}
