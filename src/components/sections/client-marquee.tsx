import Image from "next/image";
import { clients, type Client } from "@/content/home";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { SectionEntrance } from "@/components/motion/section-entrance";
import { SplitText } from "@/components/motion/split-text";

function LogoCell({ client }: { client: Client }) {
  return (
    <div className="group flex h-24 w-[180px] shrink-0 items-center justify-center border-r border-line px-8 md:h-28 md:w-[240px]">
      <Image
        src={client.logo}
        alt={client.name}
        width={480}
        height={160}
        sizes="200px"
        className="max-h-10 w-auto max-w-full object-contain opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-100 md:max-h-12"
      />
    </div>
  );
}

function Row({ items, reverse, duration }: { items: Client[]; reverse?: boolean; duration: string }) {
  return (
    <div
      className="marquee overflow-hidden border-y border-line"
      data-reverse={reverse}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      <div className="marquee-track">
        {[...items, ...items].map((client, i) => (
          <LogoCell key={`${client.logo}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}

/**
 * Brands MIL has worked with, on a deep brand-blue band (the supplied
 * logos are white). Welcoming: the sheet rises, the heading lifts in and
 * the two rows slide in from opposite sides, then drift opposite ways.
 */
export function ClientMarquee() {
  const half = Math.ceil(clients.length / 2);
  return (
    <SectionEntrance variant="rise" sheetClassName="theme-deep bg-brand-gradient">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative py-24 md:py-32">
        <div className="container-x mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow index="01" className="text-foreground/70">
              Brands we&apos;ve grown with
            </Eyebrow>
            <SplitText
              as="h2"
              text={"Trusted by 150+ brands\nacross Indonesia."}
              className="mt-6 text-[clamp(2.25rem,4.6vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.04em]"
            />
          </div>
          <Reveal className="md:col-span-5">
            <p className="max-w-md text-lg leading-snug text-muted-foreground md:ml-auto md:text-right">
              From neighbourhood F&amp;B to national retail, B2B and lifestyle brands, and many more.
            </p>
          </Reveal>
        </div>
        <Reveal variant="left" duration={1.4} amount={0.2}>
          <Row items={clients.slice(0, half)} duration="90s" />
        </Reveal>
        <Reveal variant="right" duration={1.4} amount={0.2} delay={0.1} className="-mt-px">
          <Row items={clients.slice(half)} duration="100s" reverse />
        </Reveal>
      </div>
    </SectionEntrance>
  );
}
