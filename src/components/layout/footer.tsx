import Link from "next/link";
import { footerLinks, site, tagline } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/logo";
import { BriefTrigger } from "@/components/brief/brief-provider";
import { ArrowBadge, BrandShapes, Spark } from "@/components/ui/brand-graphics";
import { Reveal } from "@/components/motion/reveal";
import { CurrentYear, StudioClock, WhatsAppCta } from "./live-details";

/** Brand-gradient closing band with the tagline, the brief CTA, and an index of the site. */
export function Footer() {
  return (
    <footer data-ground="#0a1733" className="relative overflow-hidden">
      {/* Brand book: gradient background with the enlarged logomark as a background element */}
      <div className="relative overflow-hidden [background:var(--brand-gradient)]">
        <BrandShapes className="absolute -bottom-[12%] -right-[6%] h-[115%] w-auto opacity-60 mix-blend-screen" />
        <div className="container-x relative py-[var(--sec)]">
          <p className="t-label text-white/80">Free consultation</p>
          <Reveal>
            <p aria-label={`${tagline}!`} className="mt-6 font-display text-[clamp(3rem,8.4vw,8.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-white">
              <span className="flex items-center gap-[0.15em]">
                <ArrowBadge className="size-[0.7em] shrink-0" />
                Let&apos;s grow
              </span>
              <span className="flex items-center gap-[0.12em] text-[#7fe0ff]">
                MILes
                <Spark className="size-[0.62em] shrink-0" />
              </span>
              <span className="block">away together!</span>
            </p>
          </Reveal>
          <div className="mt-12 flex flex-wrap gap-3">
            <BriefTrigger variant="ink" className="!bg-white !text-mil-blue hover:!bg-white/90">
              Book a free consultation
            </BriefTrigger>
            <WhatsAppCta />
          </div>
        </div>
      </div>

      <div className="container-x relative pb-10">
        <div className="pt-4" />
        <div className="grid gap-10 py-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm text-fg-2">Helping brands grow with a holistic &amp; caring approach, from Bandung for brands across Indonesia.</p>
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
