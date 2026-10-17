import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/home";
import { site } from "@/content/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { SectionEntrance } from "@/components/motion/section-entrance";
import { SplitText } from "@/components/motion/split-text";

/**
 * Three services as panels. On desktop the hovered (or focused) panel
 * widens and reveals its detail; the first is open by default. Pure CSS,
 * see `.svc-*` in globals.css.
 * Welcoming: the curtain opens, then each panel is wiped up in turn.
 */
export function Services() {
  return (
    <SectionEntrance variant="curtain" sheetClassName="bg-surface">
      <div className="container-x py-24 md:py-36">
        <div className="mb-14 grid gap-8 md:grid-cols-12">
          <Eyebrow index="05" className="md:col-span-4">
            What we do
          </Eyebrow>
          <div className="md:col-span-8">
            <SplitText
              as="h2"
              text={"Three disciplines,\none growth team."}
              className="text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.04em]"
            />
          </div>
        </div>

        <div className="svc-row flex flex-col gap-3 md:h-[600px] md:flex-row">
          {services.map((s, i) => (
            <Reveal key={s.href} variant="unfold" delay={0.15 * i} duration={1.2} className="svc relative h-[440px] md:h-auto">
              <Link
                href={s.href}
                className="theme-deep group absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-background p-6 md:p-8"
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="svc-image object-cover opacity-45 mix-blend-luminosity transition duration-1000 ease-out-expo"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />

                <span className="relative flex items-start justify-between">
                  <span className="font-mono text-sm text-signal">{s.index}</span>
                  <span className="flex size-10 items-center justify-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-signal group-hover:bg-signal">
                    <ArrowUpRight className="size-4" />
                  </span>
                </span>

                <span className="relative block md:w-[min(440px,100%)]">
                  <span className="block text-2xl font-medium leading-tight tracking-tight md:text-[2rem]">{s.title}</span>
                  <span className="svc-detail mt-4 block">
                    <span className="block text-muted-foreground">{s.summary}</span>
                    <span className="mt-6 flex flex-wrap gap-2">
                      {s.points.map((point) => (
                        <span key={point} className="rounded-full border border-line-strong px-3 py-1 text-xs text-foreground/80">
                          {point}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <Link
            href={site.quizHref}
            className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-line-strong p-6 transition-colors hover:border-signal md:flex-row md:items-center"
          >
            <span>
              <span className="eyebrow block text-signal">Not sure which one fits?</span>
              <span className="mt-2 block text-xl font-medium tracking-tight">
                Answer six questions, get a recommendation in 60 seconds.
              </span>
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
              Take the brand quiz <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </Reveal>
      </div>
    </SectionEntrance>
  );
}
