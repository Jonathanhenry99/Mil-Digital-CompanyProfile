import { cn } from "@/lib/utils";

/** Mono section label: `01 — Selected works`. */
export function Eyebrow({ index, children, className }: { index?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("t-label flex items-center gap-3", className)}>
      {index ? <span className="tabular-nums text-signal">{index}</span> : null}
      {index ? <span className="h-px w-8 bg-line-strong" aria-hidden /> : null}
      <span>{children}</span>
    </p>
  );
}

/** Crosshair marks at the corners of a section, blueprint style. */
export function Crosshairs({ className }: { className?: string }) {
  const mark = "absolute size-3 before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:bg-line-strong after:absolute after:top-1/2 after:left-0 after:h-px after:w-full after:bg-line-strong";
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn(mark, "left-4 top-4 md:left-10 md:top-10")} />
      <span className={cn(mark, "right-4 top-4 md:right-10 md:top-10")} />
      <span className={cn(mark, "bottom-4 left-4 md:bottom-10 md:left-10")} />
      <span className={cn(mark, "bottom-4 right-4 md:bottom-10 md:right-10")} />
    </div>
  );
}
