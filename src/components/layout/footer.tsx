import Link from "next/link";
import { footerLinks, site, tagline } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/logo";
import { BriefTrigger } from "@/components/brief/brief-provider";
import { Hairline } from "@/components/motion/hairline";
import { SplitText } from "@/components/motion/split-text";
import { CurrentYear, StudioClock, WhatsAppCta } from "./live-details";

/** Closing statement, the brief CTA, and an index of the site. */
export function Footer() {
  return (
    <footer data-ground="#07080a" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-48 left-1/2 h-[420px] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(59_140_255/0.22),transparent)]" />
      <div className="container-x relative pb-10 pt-[var(--sec)]">
        <SplitText as="p" text={tagline.replace("grow ", "grow\n") + "."} className="t-display text-[clamp(3rem,9vw,9rem)]" />
        <div className="mt-12 flex flex-wrap gap-3">
          <BriefTrigger>Book a free consultation</BriefTrigger>
          <WhatsAppCta />
        </div>

        <Hairline className="mt-20" />
        <div className="grid gap-10 py-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm text-fg-2">Digital marketing consultant &amp; agency, helping brands across Indonesia grow online.</p>
          </div>
          {footerLinks.map((group, i) => (
            <div key={group.title} className={i === 1 ? "md:col-span-3" : "md:col-span-2"}>
              <h3 className="t-label mb-4">{group.title}</h3>
              <ul className="space-y-2.5 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-foreground/80 transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-1">
            <h3 className="t-label mb-4">Follow</h3>
            <ul className="space-y-2.5 text-sm">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground">
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-fg-3 md:flex-row md:items-center md:justify-between">
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            {site.address}
          </a>
          <span className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping bg-[#2bd47d] opacity-60" />
              <span className="relative inline-flex size-2 bg-[#2bd47d]" />
            </span>
            Accepting new projects ·
            <StudioClock city={site.city} className="inline-flex items-center gap-1.5" />
          </span>
          <span className="flex gap-5">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <span>
              © <CurrentYear /> MIL Digital
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
