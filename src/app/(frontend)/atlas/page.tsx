import type { Metadata } from "next";
import { SectionHead } from "@/components/page/blocks";
import { WaitlistForm } from "@/components/page/small-forms";
import { AtlasPreview } from "@/components/page/atlas-preview";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";

export const metadata: Metadata = {
  title: "ATLAS by MIL Digital",
  description: "ATLAS is a brand analytics dashboard from MIL Digital. Coming soon: join the waitlist for early access.",
};

// Product copy is a first draft; confirm features with the ATLAS team.
const FEATURES = [
  { title: "Every channel, one view", body: "Ads, marketplaces, social and website in a single dashboard, with the numbers that matter on top." },
  { title: "Read like a strategist", body: "Signals and trends explained in plain language, the way MIL's team reads your data." },
  { title: "Spot changes early", body: "Get told when spend, ROAS or reach moves unusually, before the monthly report." },
  { title: "Reports in a click", body: "Share a clean summary with your team or boss without building slides." },
];

const FAQ = [
  { q: "When does ATLAS launch?", a: "We're opening early access in stages. Join the waitlist and we'll invite you as soon as there's a seat." },
  { q: "Who is it for?", a: "Brand owners and marketing teams who want a clear picture of their digital performance, with or without an agency." },
  { q: "Do I need to be a MIL client?", a: "No. MIL clients get it first, but the waitlist is open to every brand." },
];

/**
 * Inventory: coming soon, about ATLAS, why it's exciting, subscribe to be
 * first (atlas.mildigital.id TBC: this route can be served on the
 * subdomain with a rewrite). Built from blocks so it can grow into the
 * full product page.
 */
export default function AtlasPage() {
  return (
    <>
      <section data-ground="#0b1b3d" className="grain relative overflow-hidden pt-40 md:pt-44" aria-label="ATLAS">
        <div className="container-x relative">
          <p className="fade-in-load t-label flex items-center gap-2.5">
            <span className="size-1.5 animate-pulse bg-aqua" /> ATLAS by MIL Digital · Coming soon
          </p>
          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <SplitText as="h1" mode="load" text={"Your brand's numbers,\nin one place."} className="t-display text-[clamp(3rem,7vw,7rem)] lg:col-span-8" />
            <p className="fade-in-load text-lg text-fg-body lg:col-span-4" style={{ "--d": "500ms" } as React.CSSProperties}>
              A brand analytics dashboard built by the strategists at MIL Digital. Be among the first to try it.
            </p>
          </div>
          <div className="mt-10 max-w-3xl">
            <WaitlistForm />
          </div>
          <Reveal variant="up" duration={1.3} className="mt-16">
            <AtlasPreview />
          </Reveal>
        </div>
      </section>

      <section className="theme-light sec" aria-label="Why ATLAS">
        <div className="container-x">
          <SectionHead label="Why it's exciting" title={"Built from how\nwe read data."} intro="Years of managing campaigns for 150+ brands, turned into a tool you can use yourself." />
          <div className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08} className="bg-background p-7">
                <p className="text-[13px] tabular-nums text-signal">0{i + 1}</p>
                <h3 className="t-display mt-8 text-[1.6rem]">{f.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-ground="#0e1f45" className="sec" aria-label="Questions">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-label">Questions</p>
            <h2 className="t-h2 mt-4">Good to know.</h2>
          </div>
          <div className="border-t border-line lg:col-span-7 lg:col-start-6">
            {FAQ.map((f) => (
              <details key={f.q} className="group border-b border-line py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-2xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-xl text-fg-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
