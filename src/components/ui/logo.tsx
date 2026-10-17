import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * MIL Digital logo: the "mil" mark (from Assets/, extracted to
 * public/brand) plus the "Digital" wordmark. `tone="white"` for deep-blue
 * bands. Replace with the official SVG when it is available.
 */
export function Logo({ className, tone = "brand" }: { className?: string; tone?: "brand" | "white" }) {
  return (
    <span className={cn("inline-flex items-end gap-2", className)}>
      <Image
        src={tone === "white" ? "/brand/mil-mark-white.png" : "/brand/mil-mark.png"}
        alt="MIL"
        width={253}
        height={154}
        priority
        className="h-6 w-auto"
      />
      <span className="pb-px text-[15px] font-medium leading-none tracking-tight text-muted-foreground">Digital</span>
    </span>
  );
}
