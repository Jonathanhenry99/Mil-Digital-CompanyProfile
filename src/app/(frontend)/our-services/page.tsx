import type { Metadata } from "next";
import { extraServices } from "@/content/service-pages";
import { site } from "@/content/site";
import { CtaLink } from "@/components/ui/cta-link";
import { BriefTrigger } from "@/components/brief/brief-provider";
import { PageHero } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/blocks";
import { Services } from "@/components/sections/services";
import { Hairline } from "@/components/motion/hairline";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";

export const metadata: Metadata = {
  title: "Our Service",
  description: "Digital marketing consultation, advertising strategy & optimization and creative solutions, plus Web SEO, web development and user research.",
};

/** Inventory: headline, highlight services (CTA to each), additional services, personalized service, contact (WA). */
export default function OurServicesPage() {
  return (
    <>
      <PageHero
        label="Our Service"
        title={"Strategy, ads and creative.\nOne growth team."}
        intro="Start with a consultation, an ad account that needs to perform, or content that needs to stand out. The same certified team carries it from first plan to the numbers."
        image="/photos/mil-team-working.jpg"
        focal="55% 40%"
        actions={<BriefTrigger>Book a free consultation</BriefTrigger>}
      />

      <Services />

      <section data-ground="#0c0d0f" className="sec" aria-label="Additional services">
        <div className="container-x">
          <SectionHead label="Also from MIL" title={"Beyond the\nthree pillars."} intro="Supporting services that make the main work land better." />
          <div className="grid gap-px bg-line md:grid-cols-3">
            {extraServices.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="flex flex-col justify-between gap-10 bg-background p-8">
                <div>
                  <p className="text-[13px] tabular-nums text-signal">0{i + 4}</p>
                  <h3 className="t-display mt-4 text-[2rem]">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{s.body}</p>
                </div>
                <BriefTrigger variant="ghost" size="md" className="self-start">
                  Ask about {s.title}
                </BriefTrigger>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-light sec" aria-label="Personalized service">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="t-label">Personalized service</p>
            <SplitText as="h2" text={"Not sure which fits?\nAsk the quiz first."} className="t-h2 mt-4" />
          </div>
          <Reveal className="grid justify-items-start gap-6 lg:col-span-4 lg:col-start-9">
            <p className="t-body text-fg-2">
              Six quick questions about your business, channels and goals. You get a recommended service and engagement model in
              about a minute.
            </p>
            <CtaLink href={site.quizHref}>Take the brand quiz</CtaLink>
          </Reveal>
        </div>
        <Hairline className="mt-16" />
      </section>
    </>
  );
}
