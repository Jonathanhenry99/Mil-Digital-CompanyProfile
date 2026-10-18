import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Square call-to-action: 52px, label left, arrow right. On hover the arrow
 * slides out and a fresh one slides in; pressing shrinks it a touch.
 * `primary` is solid MIL blue with a white label and arrow.
 */
const variants = {
  primary: "[background:var(--cta-bg)] text-[var(--cta-fg)] hover:[background:var(--cta-bg-hover)]",
  blue: "bg-signal text-white hover:bg-[#5a9eff]",
  ghost: "border border-line-strong text-foreground hover:border-foreground/70 hover:bg-foreground/[0.06]",
  ink: "bg-paper-ink text-paper hover:bg-[#2b2e33]",
} as const;

export type CtaVariant = keyof typeof variants;

export function ctaClass(variant: CtaVariant = "primary", size: "md" | "lg" = "lg", className?: string) {
  return cn(
    "group/cta inline-flex shrink-0 items-center justify-between font-semibold tracking-tight whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98]",
    size === "lg" ? "h-[52px] gap-6 pl-6 text-sm" : "h-11 gap-4 pl-4 text-[13px]",
    size === "lg" ? "pr-[18px]" : "pr-3",
    variants[variant],
    className,
  );
}

/** The sliding arrow; `tile` puts it on a blue square (primary buttons). */
export function CtaArrow({ tile }: { tile?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn("relative grid shrink-0 place-items-center overflow-hidden", tile ? "size-10 bg-signal text-white" : "size-5")}
    >
      <ArrowRight className="size-[18px] transition-transform duration-500 ease-out-expo group-hover/cta:translate-x-[180%]" />
      <ArrowRight className="absolute size-[18px] -translate-x-[180%] transition-transform duration-500 ease-out-expo group-hover/cta:translate-x-0" />
    </span>
  );
}

type CtaLinkProps = Omit<React.ComponentProps<typeof Link>, "className"> & {
  variant?: CtaVariant;
  size?: "md" | "lg";
  className?: string;
};

export function CtaLink({ variant = "primary", size = "lg", className, children, href, ...props }: CtaLinkProps) {
  const external = typeof href === "string" && href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={ctaClass(variant, size, className)}
      {...props}
    >
      {children}
      <CtaArrow />
    </Link>
  );
}

/** Text link with an underline that draws in, for low-emphasis actions. */
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group/tl inline-flex items-center gap-2 text-sm font-medium", className)}>
      <span className="relative">
        {children}
        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover/tl:scale-x-100" />
      </span>
      <ArrowRight className="size-4 transition-transform duration-300 group-hover/tl:translate-x-0.5" />
    </Link>
  );
}
