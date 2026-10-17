import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const styles = {
  primary:
    "bg-brand-gradient text-white shadow-[0_0_0_1px_rgb(255_255_255/0.12)_inset,0_12px_32px_-12px_rgb(11_107_203/0.65)] hover:brightness-110",
  ghost: "border border-line-strong bg-surface/40 text-foreground backdrop-blur hover:border-foreground/40 hover:bg-foreground/[0.04]",
  light: "bg-white text-[#0a1f3f] hover:bg-white/90",
} as const;

type CtaLinkProps = Omit<React.ComponentProps<typeof Link>, "className"> & {
  variant?: keyof typeof styles;
  size?: "md" | "lg";
  className?: string;
  /** Hide the arrow, e.g. in dense UI. */
  plain?: boolean;
};

/**
 * Primary call-to-action. The arrow slides out and a fresh one slides in on
 * hover. External links (wa.me) open in a new tab.
 */
export function CtaLink({ variant = "primary", size = "md", plain, className, children, href, ...props }: CtaLinkProps) {
  const external = typeof href === "string" && href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group/cta inline-flex items-center gap-2 rounded-full font-medium tracking-tight whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
        size === "md" ? "h-10 px-4 text-sm" : "h-12 pl-6 pr-5 text-[15px]",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
      {plain ? null : (
        <span className="relative size-4 overflow-hidden" aria-hidden>
          <ArrowUpRight className="absolute inset-0 size-4 transition-transform duration-500 ease-out-expo group-hover/cta:translate-x-full group-hover/cta:-translate-y-full" />
          <ArrowUpRight className="absolute inset-0 size-4 -translate-x-full translate-y-full transition-transform duration-500 ease-out-expo group-hover/cta:translate-x-0 group-hover/cta:translate-y-0" />
        </span>
      )}
    </Link>
  );
}
