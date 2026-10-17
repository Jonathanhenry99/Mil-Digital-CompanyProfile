import Image from "next/image";
import { cn } from "@/lib/utils";
import { SplitText } from "@/components/motion/split-text";

/**
 * Opening of every inner page. With a photo: full-bleed under scrims, copy
 * at the bottom (like the homepage hero). Without: a tall type-only header.
 */
export function PageHero({
  label,
  title,
  intro,
  image,
  focal = "50% 50%",
  actions,
  children,
  className,
}: {
  label: string;
  title: string;
  intro?: string;
  image?: string;
  focal?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      data-ground="#0c0d0f"
      className={cn("grain relative overflow-hidden", image ? "flex min-h-[86svh] items-end" : "pt-40 md:pt-48", className)}
      aria-label={label}
    >
      {image ? (
        <>
          <div className="hero-photo-in absolute inset-0">
            <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: focal }} />
          </div>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgb(8 9 11 / .65) 0%, rgb(8 9 11 / 0) 25%), linear-gradient(0deg, #0c0d0f 0%, rgb(12 13 15 / .8) 22%, rgb(12 13 15 / .2) 60%), linear-gradient(90deg, rgb(12 13 15 / .6) 0%, rgb(12 13 15 / 0) 60%)",
            }}
          />
        </>
      ) : null}
      <div className="container-x relative w-full pb-[clamp(40px,6vw,88px)]">
        <p className="fade-in-load t-label mb-6 flex items-center gap-2.5 text-foreground/80" style={{ "--d": "100ms" } as React.CSSProperties}>
          <span className="size-1.5 bg-signal" />
          {label}
        </p>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <SplitText as="h1" mode="load" delay={180} text={title} className="t-display text-[clamp(2.8rem,6.6vw,6.6rem)] lg:col-span-8" />
          {intro || actions ? (
            <div className="fade-in-load grid justify-items-start gap-6 lg:col-span-4" style={{ "--d": "550ms" } as React.CSSProperties}>
              {intro ? <p className="text-[clamp(1rem,1.2vw,1.125rem)] leading-relaxed text-fg-body">{intro}</p> : null}
              {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
            </div>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
