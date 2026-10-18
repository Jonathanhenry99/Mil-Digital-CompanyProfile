import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * MIL Digital primary logo (Brand Book 2025): the "mil" logomark with
 * "Digital Marketing Consultant" beside it. Brand book colour rules:
 * on dark blue grounds the mark is the light-blue version with white text;
 * on light grounds the gradient mark with MIL dark blue text.
 * `mark` renders the logomark alone, for tight spaces.
 */
export function Logo({ className, tone = "dark", mark = false }: { className?: string; tone?: "dark" | "light"; mark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={tone === "dark" ? "/brand/mil-mark-light.png" : "/brand/mil-mark.png"}
        alt="MIL Digital"
        width={1200}
        height={733}
        priority
        className="h-7 w-auto"
      />
      {mark ? null : (
        <span
          aria-hidden
          className={cn("text-[12.5px] font-bold leading-[1.1] tracking-[-0.005em]", tone === "dark" ? "text-white" : "text-mil-blue")}
        >
          Digital Marketing
          <br />
          Consultant
        </span>
      )}
    </span>
  );
}
