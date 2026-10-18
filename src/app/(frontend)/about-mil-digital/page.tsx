import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Lightbulb, Users } from "lucide-react";
import { getHomeData } from "@/lib/cms";
import { brand, services } from "@/content/home";
import { ceo } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { CtaLink, TextLink } from "@/components/ui/cta-link";
import { LogoPart } from "@/components/ui/brand-graphics";
import { PageHero } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/blocks";
import { CaseCarousel } from "@/components/page/case-carousel";
import { ScrollFill } from "@/components/page/scroll-fill";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { Values } from "@/components/sections/values";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About Us",
  description: "MIL Digital, founded in 2021 by Indra Pratama, helps brands grow and reach their milestones with a holistic & caring approach.",
};

const POSITIONING_ICONS = [Users, Lightbulb, HeartHandshake];

/**
 * Inventory: headline, what we believe, values, services (CTA), CEO notes,
 * portfolio clients, case study highlights (CTA), ATLAS, contact (WA).
 * Story, mission, vision, logo meaning, frameworks and positioning come
 * from the MIL Digital Brand Book 2025.
 */
export default async function AboutPage() {
  const home = await getHomeData();
  return (
    <>
      <PageHero
        label="About MIL Digital"
        title={"Helping brands reach\ntheir next milestone."}
        intro={`Founded in ${brand.founded}, when local businesses were looking for ways to survive and grow in the digital era. ${ceo.story}`}
        image="/photos/mil-team-group.jpg"
        focal="50% 40%"
        actions={<CtaLink href={whatsappHref("/about-mil-digital")}>Talk to us on WhatsApp</CtaLink>}
      />

      {/* What we believe: mission and vision */}
      <section className="theme-light sec" aria-label="What we believe">
        <div className="container-x">
          <p className="t-label">What we believe · Our mission</p>
          <ScrollFill className="t-statement mt-8 max-w-[22ch] text-[clamp(2.2rem,5vw,4.8rem)]" text={brand.mission} />
          <div className="mt-16 grid gap-px bg-line md:grid-cols-3">
            <Reveal className="bg-background p-7 md:col-span-1">
              <p className="t-label">Vision</p>
              <p className="mt-4 text-[17px] leading-relaxed text-fg-body">{brand.vision}</p>
            </Reveal>
            {brand.approach.map((a, i) => (
              <Reveal key={a.title} delay={0.08 * (i + 1)} className="bg-background p-7">
                <p className="t-label">Our approach</p>
                <h3 className="t-display mt-4 text-[1.7rem]">{a.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{a.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The meaning behind MIL and its logo */}
      <section data-ground="#0e1f45" className="sec" aria-label="The meaning behind MIL">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="t-label">The meaning behind MIL</p>
            <h2 className="t-h2 mt-4">
              MIL comes from <span className="text-signal">MIL</span>estone.
            </h2>
            <p className="t-body mt-6 text-fg-2">
              A symbol of progress, achievement and growth. We&apos;re not just a digital marketing agency: we&apos;re partners
              in your journey, helping brands reach their next milestone with strategies that are tailored, data-driven and
              impactful.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:col-span-6 lg:col-start-7">
            {brand.logoMeaning.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.1} className="flex flex-col items-center gap-5 border border-line bg-surface px-4 pb-6 pt-10 text-center">
                <LogoPart shape={m.shape as "graph" | "people" | "scaling"} className="h-24 w-auto" />
                <div>
                  <p className="font-display text-xl font-semibold">{m.title}</p>
                  <p className="mt-1 text-[13px] text-fg-2">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks: the Trinity */}
      <section className="theme-light sec" aria-label="Our frameworks">
        <div className="container-x">
          <SectionHead label="Our frameworks" title={"The Trinity, to build\na sustainable brand."} />
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal className="border border-line bg-surface p-8">
              <h3 className="t-display text-[1.8rem]">The Trinity Principles</h3>
              <p className="mt-2 text-[15px] text-fg-2">Three essentials every brand needs right.</p>
              <div className="relative mx-auto mt-10 aspect-square w-[min(320px,100%)]">
                {brand.trinityPrinciples.map((p, i) => {
                  const pos = ["left-[20%] top-0", "left-0 bottom-[6%]", "right-0 bottom-[6%]"][i];
                  return (
                    <span key={p} className={`absolute ${pos} grid size-[60%] place-items-center rounded-full bg-[linear-gradient(160deg,rgb(27_60_127/0.9),rgb(0_173_238/0.35))] text-[15px] font-medium text-white mix-blend-multiply`}>
                      <span className={["-translate-y-6", "-translate-x-4 translate-y-4", "translate-x-4 translate-y-4"][i]}>{p}</span>
                    </span>
                  );
                })}
                <span className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 text-center text-[12px] font-bold uppercase tracking-wider text-white">
                  Sustainable
                  <br />
                  brand
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="border border-line bg-surface p-8">
              <h3 className="t-display text-[1.8rem]">The Trinity Pillars</h3>
              <p className="mt-2 text-[15px] text-fg-2">The three essential components of digital marketing.</p>
              <div className="mx-auto mt-10 w-[min(340px,100%)]">
                <div className="bg-mil-blue py-3 text-center text-[13px] font-medium text-white [clip-path:polygon(50%_0,100%_38%,100%_100%,0_100%,0_38%)] pt-6">
                  Digital marketing
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {brand.trinityPillars.map((p) => (
                    <div key={p} className="grid h-48 place-items-center bg-[linear-gradient(0deg,#1b3c7f,#00adee)] px-1 text-center text-[14px] font-medium text-white">
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Values />

      {/* Positioning + services */}
      <section className="theme-light sec" aria-label="What we do">
        <div className="container-x">
          <div className="mb-16 grid gap-3 md:grid-cols-3">
            {brand.positioning.map((p, i) => {
              const Icon = POSITIONING_ICONS[i];
              return (
                <Reveal key={p.title} delay={i * 0.08} className="bg-surface p-7">
                  <Icon className="size-9 text-signal" strokeWidth={1.5} />
                  <h3 className="t-display mt-6 text-[1.7rem]">{p.title}</h3>
                  <p className="mt-2 text-[15px] text-fg-2">{p.body}</p>
                </Reveal>
              );
            })}
          </div>
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

      <section data-ground="#0e1f45" className="sec" aria-label="A note from our founder">
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
              “Many brands have great potential but don&apos;t know how to navigate the digital world. We started MIL to walk that
              road with them, one milestone at a time.”
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
              <span className="size-1.5 animate-pulse bg-warm" /> ATLAS by MIL Digital · Coming soon
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
      </section>
    </>
  );
}
