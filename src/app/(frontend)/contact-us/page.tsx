import type { Metadata } from "next";
import { ArrowUpRight, CalendarDays, MapPin, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { CtaLink } from "@/components/ui/cta-link";
import { BriefPaper } from "@/components/brief/brief-paper";
import { PageHero } from "@/components/page/page-hero";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Book a free consultation with MIL Digital, chat on WhatsApp, or visit our studio in Bandung.",
};

// Set NEXT_PUBLIC_CAL_LINK (e.g. "mildigital/consultation") to embed Cal.com booking.
const CAL = process.env.NEXT_PUBLIC_CAL_LINK;

/** Inventory: submit inquiries, booking session to consult, WA button, address with maps. */
export default function ContactPage() {
  const bookingMsg = "Halo MIL Digital, saya ingin booking sesi konsultasi gratis. Kapan jadwal yang tersedia?";
  return (
    <>
      <PageHero
        label="Contact Us"
        title={"Tell us about\nyour brand."}
        intro="Send a brief, book a session, or just say hello on WhatsApp. Your first consultation is free."
      />

      <section data-ground="#0c0d0f" className="pb-[var(--sec)]" aria-label="Brief and booking">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="grid content-start gap-4 lg:col-span-4">
            <Reveal className="border border-line bg-surface p-6">
              <CalendarDays className="size-6 text-signal" />
              <p className="t-display mt-5 text-2xl">Book a session</p>
              <p className="mt-2 text-[15px] text-fg-2">A free 30-minute consultation with one of our certified experts.</p>
              {CAL ? null : (
                <CtaLink href={whatsappHref("/contact-us", bookingMsg)} size="md" className="mt-6">
                  Pick a time
                </CtaLink>
              )}
            </Reveal>
            <Reveal delay={0.08}>
              <a href={whatsappHref("/contact-us")} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 border border-line bg-surface p-6">
                <MessageCircle className="size-6 text-signal" />
                <span className="flex-1">
                  <span className="block text-[13px] text-fg-3">WhatsApp</span>
                  <span className="block text-lg font-medium">{site.whatsappDisplay}</span>
                </span>
                <ArrowUpRight className="size-5 text-fg-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
            <Reveal delay={0.16}>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 border border-line bg-surface p-6">
                <MapPin className="size-6 text-signal" />
                <span className="flex-1">
                  <span className="block text-[13px] text-fg-3">Studio</span>
                  <span className="block font-medium">{site.address}</span>
                </span>
                <ArrowUpRight className="size-5 text-fg-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
          <Reveal variant="up" duration={1.2} amount={0.1} className="lg:col-span-8">
            <BriefPaper />
          </Reveal>
        </div>

        {CAL ? (
          <div className="container-x mt-16">
            <p className="t-label mb-4">Book a session</p>
            <iframe title="Book a consultation" src={`https://cal.com/${CAL}?embed=true&theme=dark`} className="h-[720px] w-full border border-line" loading="lazy" />
          </div>
        ) : null}
      </section>

      <section className="theme-light" aria-label="Find us">
        <div className="grid lg:grid-cols-2">
          <div className="container-x py-[var(--sec)] lg:max-w-none lg:pr-16">
            <p className="t-label">Find us</p>
            <h2 className="t-h2 mt-4">Our studio in Bandung.</h2>
            <p className="t-body mt-6 text-lg">{site.address}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href={site.mapsUrl}>Open in Google Maps</CtaLink>
              <CtaLink href={whatsappHref("/contact-us")} variant="ghost">
                WhatsApp us
              </CtaLink>
            </div>
          </div>
          <iframe
            title="MIL Digital on Google Maps"
            src={`https://www.google.com/maps?q=${encodeURIComponent("Paskal Hyper Square, Bandung")}&output=embed`}
            className="h-[420px] w-full border-0 grayscale-[0.4] lg:h-full lg:min-h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
