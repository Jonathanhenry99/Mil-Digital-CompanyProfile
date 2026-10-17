import { site } from "@/content/site";

/**
 * Click-to-chat link with a pre-filled message naming the page the visitor
 * came from, so the team knows the context before replying.
 */
export function whatsappHref(page?: string, message?: string) {
  const from = page && page !== "/" ? ` (dari halaman ${page})` : " (dari homepage)";
  const text = message ?? `Halo MIL Digital, saya ingin konsultasi mengenai brand saya${from}.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
