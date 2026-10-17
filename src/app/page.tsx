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
 * Homepage (PROJECT_SPEC §6.1). Each section arrives with its own
 * welcoming entrance, so no two consecutive scrolls feel the same.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <Showreel />
      <Stats />
      <WorkWheel />
      <Services />
      <CurvedGallery />
      <Values />
      <Testimonials />
      <Insights />
    </>
  );
}
