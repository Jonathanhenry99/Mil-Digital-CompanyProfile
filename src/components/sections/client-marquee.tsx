import Image from "next/image";
import type { Client } from "@/content/home";
import { Hairline } from "@/components/motion/hairline";
import { Reveal } from "@/components/motion/reveal";

function Row({ items, reverse, duration }: { items: Client[]; reverse?: boolean; duration: string }) {
  return (
    <div className="marquee overflow-hidden" data-reverse={reverse} style={{ "--marquee-duration": duration } as React.CSSProperties}>
      <div className="marquee-track">
        {[...items, ...items].map((client, i) => (
          <div key={`${client.logo}-${i}`} className="group grid h-24 w-[180px] shrink-0 place-items-center px-7 md:h-28 md:w-[230px]">
            <Image
              src={client.logo}
              alt={client.name}
              width={480}
              height={160}
              sizes="200px"
              className="max-h-10 w-auto max-w-full object-contain opacity-50 transition duration-500 group-hover:opacity-100 md:max-h-11"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Chapter 3 (inventory: portfolio). 150+ brands as two rows drifting in
 * opposite directions; they slide in from opposite sides on arrival.
 */
export function ClientMarquee({ clients }: { clients: Client[] }) {
  const half = Math.ceil(clients.length / 2);
  return (
    <section data-ground="#0c0d0f" className="py-[clamp(64px,8vw,120px)]" aria-label="Clients">
      <div className="container-x mb-10 grid gap-6 md:grid-cols-12 md:items-end">
        <h2 className="t-h2 md:col-span-6">Trusted by 150+ brands</h2>
        <Reveal className="md:col-span-5 md:col-start-8">
          <p className="t-body text-fg-2">
            From neighbourhood F&amp;B to national retail, beauty, property and B2B. A few of the brands that trusted MIL with
            their growth.
          </p>
        </Reveal>
      </div>
      <Hairline />
      <Reveal variant="left" duration={1.4} amount={0.2}>
        <Row items={clients.slice(0, half)} duration="110s" />
      </Reveal>
      <Hairline delay={120} />
      <Reveal variant="right" duration={1.4} amount={0.2} delay={0.1}>
        <Row items={clients.slice(half)} duration="125s" reverse />
      </Reveal>
      <Hairline delay={240} />
    </section>
  );
}
