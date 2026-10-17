import type { Metadata } from "next";
import Image from "next/image";
import { ceo } from "@/content/site";
import { values } from "@/content/home";
import { CtaLink } from "@/components/ui/cta-link";
import { PageHero } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/blocks";
import { Team } from "@/components/sections/team";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the certified digital marketing experts behind MIL Digital in Bandung.",
};

const ACTIVITIES = [
  { src: "/photos/mil-team-working.jpg", focal: "40% 40%", caption: "Weekly strategy sessions" },
  { src: "/photos/mil-team-group.jpg", focal: "50% 45%", caption: "The whole team, Bandung" },
  { src: "/photos/mil-team-working.jpg", focal: "80% 35%", caption: "Campaign reviews" },
];

/** Inventory: leadership, team by function, culture, internal activities, CTA to Career. */
export default function OurTeamPage() {
  return (
    <>
      <PageHero
        label="Our Team"
        title={"The people behind\nthe numbers."}
        intro="15 certified digital marketing experts with 7 years of combined experience, working from one studio in Bandung."
        image="/photos/mil-team-group.jpg"
        focal="50% 40%"
        actions={<CtaLink href="/career">See open roles</CtaLink>}
      />

      <section className="theme-light sec" aria-label="Leadership">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-end">
          <Reveal variant="unfold" className="lg:col-span-4">
            <div className="ticks relative aspect-[4/5] overflow-hidden bg-surface">
              <Image src={ceo.photo} alt={ceo.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover object-top" />
            </div>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="t-label">Leadership</p>
            <h2 className="t-display mt-4 text-[clamp(3rem,6vw,5.5rem)]">{ceo.name}</h2>
            <p className="mt-2 text-xl text-fg-2">{ceo.role}</p>
            <p className="t-body mt-8 text-lg">{ceo.bio}</p>
          </div>
        </div>
      </section>

      <Team variant="page" />

      <section className="theme-light sec" aria-label="Culture">
        <div className="container-x">
          <SectionHead label="Culture" title={"How we work\ntogether."} intro="The same values we promise clients, practised inside the team first." />
          <div className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06} className="bg-background p-6">
                <p className="text-[13px] tabular-nums text-signal">0{i + 1}</p>
                <h3 className="t-display mt-6 text-[1.5rem]">{v.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-fg-2">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-ground="#0c0d0f" className="sec" aria-label="Internal activities">
        <div className="container-x">
          <SectionHead label="Inside MIL" title={"A few moments\nfrom the studio."} />
          <div className="grid gap-4 md:grid-cols-3">
            {ACTIVITIES.map((a, i) => (
              <Reveal key={i} delay={i * 0.1} variant="up">
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                    <Image src={a.src} alt={a.caption} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" style={{ objectPosition: a.focal }} />
                  </div>
                  <figcaption className="t-label mt-3">{a.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 md:flex-row md:items-center">
            <p className="t-display text-[clamp(2rem,4vw,3.4rem)]">Want to sit at this table?</p>
            <CtaLink href="/career">Join MIL Digital</CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
