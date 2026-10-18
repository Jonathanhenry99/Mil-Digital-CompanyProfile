import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { BriefPaper } from "@/components/brief/brief-paper";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";

const channels = [
  { label: "WhatsApp", value: site.whatsappDisplay, href: whatsappHref() },
  { label: "Instagram", value: "@mildigital.id", href: "https://instagram.com/mildigital.id" },
  { label: "Studio", value: site.address, href: site.mapsUrl },
];

/**
 * Chapter 11 (inventory: contact-us form). The Brief MIL paper sits on the
 * page; the same paper slides up from every "Book a consultation" button.
 */
export function Contact() {
  return (
    <section id="contact" data-ground="#0e1f45" className="sec" aria-label="Contact">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="t-label">Contact us</p>
          <SplitText as="h2" text={"Tell us about\nyour brand."} className="t-h2 mt-4" />
          <Reveal>
            <p className="t-body mt-6 text-fg-2">
              Fill in this short brief for a free 1x consultation with our certified experts. We continue the conversation on
              WhatsApp or email.
            </p>
            <ul className="mt-10 border-t border-line">
              {channels.map((c) => (
                <li key={c.label}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border-b border-line py-4">
                    <span>
                      <span className="block text-[13px] text-fg-3">{c.label}</span>
                      <span className="block text-[15px] transition-colors group-hover:text-signal-soft">{c.value}</span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-fg-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal variant="up" duration={1.2} amount={0.15} className="lg:col-span-8 lg:col-start-5 lg:pt-8">
          <BriefPaper />
        </Reveal>
      </div>
    </section>
  );
}
