"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { ACTIVITIES } from "@/collections/Leads";

export type LeadState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | { status: "error"; message: string; fields?: Record<string, string> };

const REQUIRED = { name: "Name", email: "Email", phone: "Phone / WhatsApp", brandName: "Brand name", message: "Message" };

/**
 * Free consultation request from the contact form → `leads` in the CMS.
 * Bots are filtered by a hidden honeypot field and a minimum time on the
 * form; the public API cannot create leads, so this is the only way in.
 */
export async function submitLead(_prev: LeadState, form: FormData): Promise<LeadState> {
  const get = (k: string) => String(form.get(k) ?? "").trim();

  // Honeypot filled, or submitted faster than a person could: pretend it worked.
  const startedAt = Number(get("startedAt"));
  if (get("website") || !startedAt || Date.now() - startedAt < 1500) {
    return { status: "success", name: "" };
  }

  const fields: Record<string, string> = {};
  for (const [key, label] of Object.entries(REQUIRED)) {
    if (!get(key)) fields[key] = `${label} is required.`;
  }
  if (get("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) fields.email = "Enter a valid email.";
  if (get("phone") && get("phone").replace(/\D/g, "").length < 8) fields.phone = "Enter a valid phone number.";
  if (Object.keys(fields).length) return { status: "error", message: "Please check the highlighted fields.", fields };

  const activities = form
    .getAll("activities")
    .map(String)
    .filter((a): a is (typeof ACTIVITIES)[number] => (ACTIVITIES as readonly string[]).includes(a));

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "leads",
      overrideAccess: true,
      data: {
        source: "contact-form",
        name: get("name").slice(0, 120),
        email: get("email").slice(0, 200),
        phone: get("phone").slice(0, 40),
        brandName: get("brandName").slice(0, 120),
        industry: get("industry").slice(0, 120) || undefined,
        location: get("location").slice(0, 120) || undefined,
        budget: get("budget").slice(0, 60) || undefined,
        activities,
        message: get("message").slice(0, 4000),
        pageOrigin: get("pageOrigin").slice(0, 200) || undefined,
      },
    });
  } catch (err) {
    console.error("submitLead failed", err);
    return { status: "error", message: "Something went wrong on our side. Please try again or chat with us on WhatsApp." };
  }

  return { status: "success", name: get("name").split(" ")[0] };
}
