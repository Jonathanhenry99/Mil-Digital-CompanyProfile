"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { whatsappHref } from "@/lib/whatsapp";
import { CtaLink } from "@/components/ui/cta-link";

const noSubscribe = () => () => {};

function useWibTime() {
  const [t, setT] = React.useState<{ h: number; m: number } | null>(null);
  React.useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false });
    const tick = () => {
      const [h, m] = fmt.format(new Date()).split(":").map(Number);
      setT({ h, m });
    };
    const id = window.setInterval(tick, 15000);
    const first = window.setTimeout(tick, 0);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(first);
    };
  }, []);
  return t;
}

/**
 * Studio clock: "Bandung 22.44" with a tiny analog face whose hands follow
 * the real time (WIB). Empty until mounted so prerendered HTML has no clock.
 */
export function StudioClock({ city, className }: { city: string; className?: string }) {
  const t = useWibTime();
  const mDeg = (t?.m ?? 0) * 6;
  const hDeg = ((t?.h ?? 0) % 12) * 30 + (t?.m ?? 0) * 0.5;
  return (
    <span className={className}>
      <svg viewBox="0 0 14 14" className="size-3.5" aria-hidden>
        <circle cx="7" cy="7" r="6.25" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="7" y1="7" x2="7" y2="3.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" style={{ transformOrigin: "7px 7px", transform: `rotate(${hDeg}deg)` }} />
        <line x1="7" y1="7" x2="7" y2="2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" style={{ transformOrigin: "7px 7px", transform: `rotate(${mDeg}deg)` }} />
      </svg>
      <span className="tabular-nums">
        {city} {t ? `${String(t.h).padStart(2, "0")}.${String(t.m).padStart(2, "0")}` : "--.--"}
      </span>
    </span>
  );
}

/** Empty in the prerendered HTML, filled in on the client. */
export function CurrentYear() {
  const year = React.useSyncExternalStore(
    noSubscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <>{year ?? ""}</>;
}

/** WhatsApp CTA whose message names the current page. */
export function WhatsAppCta({ variant = "ghost" }: { variant?: "ghost" | "primary" }) {
  const pathname = usePathname();
  return (
    <CtaLink href={whatsappHref(pathname)} variant={variant}>
      Chat on WhatsApp
    </CtaLink>
  );
}
