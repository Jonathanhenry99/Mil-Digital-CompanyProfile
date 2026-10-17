import { getHomeData } from "@/lib/cms";
import { Hero } from "@/components/sections/hero";
import { Studio } from "@/components/sections/studio";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { Services } from "@/components/sections/services";
import { Values } from "@/components/sections/values";
import { Team } from "@/components/sections/team";
import { Testimonials } from "@/components/sections/testimonials";
import { Insights } from "@/components/sections/insights";
import { Contact } from "@/components/sections/contact";
import { TextBand } from "@/components/page/text-band";
import { CaseCarousel } from "@/components/page/case-carousel";

const TEAM_PHOTOS = ["/photos/mil-team-working.jpg", "/photos/mil-team-group.jpg", "/photos/indra-pratama-ceo.jpg"];

/**
 * Homepage: exactly the inventory items (hero, stats, portfolio, case
 * study, our services, why MIL & values, team, testimonials, articles &
 * reports, contact form). Dark and light chapters alternate. Deeper
 * content lives on its own page (e.g. the approach on Consultation).
 */
export default async function HomePage() {
  const data = await getHomeData();
  const wheel = [...new Set([...TEAM_PHOTOS, ...data.caseStudies.map((c) => c.image), ...data.gallery.map((g) => g.src)])];

  return (
    <>
      <Hero hero={data.hero} video={data.hero.video} />
      <Studio stats={data.stats} wheel={wheel} photo="/photos/mil-team-working.jpg" />
      <ClientMarquee clients={data.clients} />
      <TextBand />
      <CaseCarousel cases={data.caseStudies} />
      <Services />
      <Values />
      <Team />
      <Testimonials testimonials={data.testimonials} />
      <Insights insights={data.insights} />
      <Contact />
    </>
  );
}
