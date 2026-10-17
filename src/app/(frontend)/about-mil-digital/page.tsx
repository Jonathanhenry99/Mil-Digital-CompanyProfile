import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getHomeData } from "@/lib/cms";
import { services } from "@/content/home";
import { ceo, tagline } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { CtaLink, TextLink } from "@/components/ui/cta-link";
import { PageHero } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/blocks";
import { CaseCarousel } from "@/components/page/case-carousel";
import { ScrollFill } from "@/components/page/scroll-fill";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { Values } from "@/components/sections/values";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About Us",
  description: "MIL Digital is a team of certified digital marketing experts in Bandung, helping brands across Indonesia grow online.",
};

/**
 * Inventory: headline, what we believe, values, services (CTA), CEO notes,
 * portfolio clients, case study highlights (CTA), ATLAS, contact (WA).
 */
export default async function AboutPage() {
  const home = await getHomeData();
  return (
    <>
      <PageHero
        label="About MIL Digital"
        title={"We help brands grow\ntheir presence online."}
        intro="MIL Digital is for brands looking to build and grow digitally. With a holistic approach and 7 years of combined experience, our team knows how hard it is to handle an online brand alone."
        image="/photos/mil-team-group.jpg"
        focal="50% 40%"
        actions={<CtaLink href={whatsappHref("/about-mil-digital")}>Talk to us on WhatsApp</CtaLink>}
      />

      <section className="theme-light sec" aria-label="What we believe">
        <div className="container-x">
          <p className="t-label">What we believe</p>
          <ScrollFill
            className="t-statement mt-8 max-w-[28ch] text-[clamp(2rem,4.6vw,4.4rem)]"
            text="Digital marketing can be measured accurately. So we choose the numbers that fit your business, build the strategy around them, and keep improving until they move. Let's grow miles away together."
          />
        </div>
      </section>

      <Values />

      <section className="theme-light sec" aria-label="What we do">
        <div className="container-x">
          <SectionHead label="What we do" title={"Three ways\nwe help."} action={<TextLink href="/our-services">All services</TextLink>} />
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.href} delay={i * 0.08}>
                <Link href={s.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    <Image src={s.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]" />
                  </div>
                  <div className="flex items-start justify-between gap-4 pt-5">
                    <div>
                      <p className="text-[13px] tabular-nums text-signal">{s.index}</p>
                      <h3 className="t-display mt-2 text-[1.8rem]">{s.title}</h3>
                      <p className="mt-2 text-[15px] text-fg-2">{s.summary}</p>
                    </div>
                    <ArrowUpRight className="mt-1 size-5 shrink-0 text-fg-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-ground="#0c0d0f" className="sec" aria-label="A note from our founder">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal variant="unfold" className="lg:col-span-4">
            <div className="ticks relative aspect-[4/5] overflow-hidden bg-surface">
              <Image src={ceo.photo} alt={ceo.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover object-top" />
            </div>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="t-label">CEO notes</p>
            {/* TBC: a short note in the founder's own words, to be approved by Indra Pratama. */}
            <blockquote className="t-statement mt-6">
              “Brands don&apos;t need more noise. They need a team that measures what matters, tells them the truth about it, and
              keeps going until the numbers move. That&apos;s the team we&apos;re building.”
            </blockquote>
            <div className="mt-8 border-t border-line pt-6">
              <p className="text-lg font-semibold">{ceo.name}</p>
              <p className="text-fg-2">{ceo.role}</p>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-2">{ceo.bio}</p>
            </div>
          </div>
        </div>
      </section>

      <CaseCarousel cases={home.caseStudies} label="Case study highlights" title={"Brands we've\nhelped grow."} filters={false} theme="light" />

      <ClientMarquee clients={home.clients} />

      <section className="theme-light sec" aria-label="ATLAS">
        <div className="container-x grid gap-10 border border-line bg-surface p-8 md:p-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="t-label flex items-center gap-2">
              <span className="size-1.5 animate-pulse bg-signal" /> ATLAS by MIL Digital · Coming soon
            </p>
            <h2 className="t-h2 mt-4">Your brand&apos;s numbers, in one place.</h2>
            <p className="t-body mt-4 text-fg-2">
              We&apos;re building ATLAS, a brand analytics dashboard that brings your channels, campaigns and results together, the
              way our strategists see them.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <CtaLink href="/atlas">Discover ATLAS</CtaLink>
          </div>
        </div>
        <p className="container-x t-label mt-10">{tagline}.</p>
      </section>
    </>
  );
}
