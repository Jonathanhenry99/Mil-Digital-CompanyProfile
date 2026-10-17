import { getHomeData } from "@/lib/cms";
import { Hero } from "@/components/sections/hero";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { Showreel } from "@/components/sections/showreel";
import { Stats } from "@/components/sections/stats";
import { WorkWheel } from "@/components/sections/work-wheel";
import { Services } from "@/components/sections/services";
import { CurvedGallery } from "@/components/sections/curved-gallery";
import { Values } from "@/components/sections/values";
import { Testimonials } from "@/components/sections/testimonials";
import { Insights } from "@/components/sections/insights";

/**
 * Homepage (PROJECT_SPEC §6.1). Content comes from the CMS (Homepage
 * global + collections); services and values are still defined in code.
 * Each section arrives with its own welcoming entrance.
 */
export default async function HomePage() {
  const data = await getHomeData();
  return (
    <>
      <Hero hero={data.hero} />
      <ClientMarquee clients={data.clients} />
      <Showreel showreel={data.showreel} />
      <Stats stats={data.stats} />
      <WorkWheel caseStudies={data.caseStudies} />
      <Services />
      <CurvedGallery gallery={data.gallery} />
      <Values />
      <Testimonials testimonials={data.testimonials} />
      <Insights insights={data.insights} />
    </>
  );
}
