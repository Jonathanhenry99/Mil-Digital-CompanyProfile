import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * MIL Digital logo: the "mil" mark (high-res PNGs from the old site, in
 * public/brand) plus the "Digital" wordmark. White on dark grounds by
 * default; `tone="brand"` for paper/light. Swap for the official SVG when
 * it is available.
 */
export function Logo({ className, tone = "white" }: { className?: string; tone?: "brand" | "white" }) {
  return (
    <span className={cn("inline-flex items-end gap-2", className)}>
      <Image
        src={tone === "white" ? "/brand/mil-mark-white.png" : "/brand/mil-mark.png"}
        alt="MIL"
        width={1200}
        height={733}
        priority
        className="h-6 w-auto"
      />
      <span className={cn("pb-px text-[15px] font-medium leading-none tracking-tight", tone === "white" ? "text-fg-2" : "text-paper-muted")}>
        Digital
      </span>
    </span>
  );
}
