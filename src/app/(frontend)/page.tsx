import { getHomeData } from "@/lib/cms";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { CurvedGallery } from "@/components/sections/curved-gallery";
import { WorkWheel } from "@/components/sections/work-wheel";
import { Values } from "@/components/sections/values";
import { Showreel } from "@/components/sections/showreel";
import { Team } from "@/components/sections/team";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Insights } from "@/components/sections/insights";
import { ContactForm } from "@/components/sections/contact-form";

/**
 * Homepage, in the order of the page inventory: hero, stats, portfolio,
 * case study, why MIL & values, team, our services, testimonials, articles
 * & reports, contact-us form. The journey film (requested separately)
 * leads into the team. Logos, case studies and teasers come from the CMS.
 */
export default async function HomePage() {
  const data = await getHomeData();
  return (
    <>
      <Hero hero={data.hero} />
      <Stats stats={data.stats} />
      {/* Portfolio */}
      <ClientMarquee clients={data.clients} />
      <CurvedGallery gallery={data.gallery} />
      {/* Case study */}
      <WorkWheel caseStudies={data.caseStudies} />
      <Values />
      <Showreel showreel={data.showreel} />
      <Team />
      <Services />
      <Testimonials testimonials={data.testimonials} />
      <Insights insights={data.insights} />
      <ContactForm />
    </>
  );
}
