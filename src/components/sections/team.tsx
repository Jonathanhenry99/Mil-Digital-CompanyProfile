import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ceo } from "@/content/site";
import { CtaLink } from "@/components/ui/cta-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { SectionEntrance } from "@/components/motion/section-entrance";
import { SplitText } from "@/components/motion/split-text";

/**
 * Team teaser (page inventory: Home → team). The real team photo, the
 * founder, and links to Our Team and Career.
 * Welcoming: the sheet rises, the photo is wiped open from the bottom and
 * the founder card slides in from the right.
 */
export function Team() {
  return (
    <SectionEntrance variant="rise" sheetClassName="bg-background">
      <div className="container-x grid gap-12 py-24 md:py-36 lg:grid-cols-12 lg:items-end">
        <Reveal variant="unfold" duration={1.3} className="lg:col-span-7">
          <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl">
            <Image
              src="/photos/mil-team-group.jpg"
              alt="The MIL Digital team"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.03]"
            />
            <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a1f3f]/60 to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#0a1f3f] backdrop-blur">
              The MIL team · Bandung
            </span>
          </div>
        </Reveal>

        <div className="lg:col-span-5">
          <Eyebrow index="07">The team</Eyebrow>
          <SplitText
            as="h2"
            text={"The people behind\nthe numbers."}
            className="mt-6 text-[clamp(2.25rem,4.4vw,4rem)] font-medium leading-[0.95] tracking-[-0.04em]"
          />
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            15 certified digital marketing experts with 7 years of combined experience, growing brands across Indonesia
            from our studio in Bandung.
          </p>

          <Reveal variant="right" delay={0.15}>
            <Link
              href="/our-team"
              className="group mt-10 flex items-center gap-4 rounded-2xl border border-line bg-surface p-3 pr-5 transition-colors hover:border-signal"
            >
              <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                <Image src={ceo.photo} alt={ceo.name} fill sizes="64px" className="object-cover object-top" />
              </span>
              <span className="flex-1">
                <span className="block text-xs text-muted-foreground">Led by</span>
                <span className="block font-medium">{ceo.name}</span>
                <span className="block text-sm text-muted-foreground">{ceo.role}</span>
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <div className="mt-6 flex flex-wrap gap-3">
            <CtaLink href="/our-team" variant="ghost">
              Meet the team
            </CtaLink>
            <CtaLink href="/career" variant="ghost">
              Join us
            </CtaLink>
          </div>
        </div>
      </div>
    </SectionEntrance>
  );
}
