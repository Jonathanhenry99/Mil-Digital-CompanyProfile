import Link from "next/link";
import { footerLinks, site, tagline } from "@/content/site";
import { CtaLink } from "@/components/ui/cta-link";
import { Logo } from "@/components/ui/logo";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { SectionEntrance } from "@/components/motion/section-entrance";
import { CurrentYear, JakartaClock, WhatsAppCta } from "./live-details";

/** Footer CTA band + site links. Every page ends here (brief: footer CTA). */
export function Footer() {
  return (
    <footer>
      <SectionEntrance variant="curtain" sheetClassName="theme-deep bg-background">
        {/* Glow that swells as the band opens */}
        <div aria-hidden className="bg-brand-gradient pointer-events-none absolute inset-x-0 top-0 h-[720px] opacity-90 [mask-image:linear-gradient(to_bottom,#000_40%,transparent)]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[520px] max-w-4xl rounded-full bg-[#7cc8ff]/40 blur-[140px]"
        />
        <div className="blueprint pointer-events-none absolute inset-0 opacity-60" aria-hidden />

        <div className="container-x relative py-28 md:py-40">
          <p className="eyebrow mb-8 text-center">Free 30-minute consultation</p>
          <SplitText
            as="h2"
            text={tagline.replace("grow ", "grow\n") + "."}
            className="text-center text-[clamp(2.75rem,8vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.04em]"
          />
          <Reveal delay={0.3} className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <CtaLink href={site.bookingHref} size="lg" variant="light">
              Book a Consultation
            </CtaLink>
            <WhatsAppCta />
          </Reveal>
        </div>

        <div className="container-x relative border-t border-line py-14">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Logo tone="white" />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Data-driven digital marketing partner for brands across Indonesia.
              </p>
              <div className="mt-6 space-y-1 text-sm">
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="block max-w-xs hover:underline">
                  {site.address}
                </a>
                {site.email ? (
                  <a href={`mailto:${site.email}`} className="block text-muted-foreground hover:text-foreground">
                    {site.email}
                  </a>
                ) : null}
                <p className="text-muted-foreground">WhatsApp {site.whatsappDisplay}</p>
              </div>
            </div>
            {footerLinks.map((group, i) => (
              <div key={group.title} className={i === 1 ? "md:col-span-4" : "md:col-span-2"}>
                <p className="eyebrow mb-4">{group.title}</p>
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
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#2bd47d] opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-[#2bd47d]" />
              </span>
              Accepting new projects · {site.city} <JakartaClock />
            </p>
            <div className="flex flex-wrap gap-5">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  {s.label}
                </a>
              ))}
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms
              </Link>
            </div>
            <p>
              © <CurrentYear /> MIL Digital
            </p>
          </div>
        </div>
      </SectionEntrance>
    </footer>
  );
}
