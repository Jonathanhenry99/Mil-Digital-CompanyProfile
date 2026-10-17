import { CtaLink } from "@/components/ui/cta-link";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { Reveal } from "@/components/motion/reveal";
import { SectionEntrance } from "@/components/motion/section-entrance";
import { SplitText } from "@/components/motion/split-text";

/**
 * Portfolio reel on a curved band (components/ui/tilted-grid-hero).
 * Welcoming: the curtain opens and the band comes into focus out of a blur.
 */
export function CurvedGallery({ gallery }: { gallery: { src: string; alt: string }[] }) {
  return (
    <SectionEntrance variant="curtain" sheetClassName="bg-background">
      <Reveal variant="blur" duration={1.6} amount={0.25}>
        <TiltedGridHero images={gallery} speed={3.5} tileHeight={30} curve={72} fade={10} className="h-[620px] w-full md:h-[760px]">
          <div className="relative z-10 flex h-full flex-col items-center justify-between py-16 text-center md:py-20">
            <div className="px-6">
              <p className="eyebrow mb-5">03 — Creative in motion</p>
              <SplitText
                as="h2"
                text={"Every campaign,\nbrought into focus."}
                className="text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.04em]"
              />
            </div>
            <div className="flex flex-col items-center gap-5 px-6">
              <p className="max-w-md text-balance text-sm text-muted-foreground">
                Shoots, ads, content systems and dashboards from brands we work with.
              </p>
              <CtaLink href="/our-works-case-study" variant="ghost">
                Explore our works
              </CtaLink>
            </div>
          </div>
        </TiltedGridHero>
      </Reveal>
    </SectionEntrance>
  );
}
