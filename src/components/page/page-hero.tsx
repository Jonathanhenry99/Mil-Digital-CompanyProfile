import Image from "next/image";
import { cn } from "@/lib/utils";
import { BrandShapes } from "@/components/ui/brand-graphics";
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
      data-ground="#0e1f45"
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
                "linear-gradient(180deg, rgb(10 23 51 / .65) 0%, rgb(10 23 51 / 0) 25%), linear-gradient(0deg, #0e1f45 0%, rgb(14 31 69 / .8) 22%, rgb(14 31 69 / .2) 60%), linear-gradient(90deg, rgb(14 31 69 / .6) 0%, rgb(14 31 69 / 0) 60%)",
            }}
          />
        </>
      ) : (
        <BrandShapes className="absolute -right-[4%] bottom-0 h-[92%] w-auto opacity-40" />
      )}
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
