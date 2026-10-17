"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { whatsappHref } from "@/lib/whatsapp";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Small client-only details for the footer. Time-dependent values are set
 * after mount so the prerendered HTML never bakes in a stale clock.
 */
export function JakartaClock() {
  const [time, setTime] = React.useState<string | null>(null);
  React.useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--:--"} WIB</span>;
}

const noSubscribe = () => () => {};

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
export function WhatsAppCta({ variant = "ghost", size = "lg" }: { variant?: "ghost" | "light"; size?: "md" | "lg" }) {
  const pathname = usePathname();
  return (
    <CtaLink href={whatsappHref(pathname)} variant={variant} size={size}>
      Chat on WhatsApp
    </CtaLink>
  );
}
