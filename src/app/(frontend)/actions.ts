"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { ACTIVITIES, SERVICES } from "@/collections/Leads";

export type LeadState =
  | { status: "idle" }
  | { status: "success"; name: string; whatsapp: string }
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
    return { status: "success", name: "", whatsapp: "" };
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

  const services = form
    .getAll("services")
    .map(String)
    .filter((s): s is (typeof SERVICES)[number] => (SERVICES as readonly string[]).includes(s));

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
        services,
        message: get("message").slice(0, 4000),
        quizAnswers: get("quiz").slice(0, 2000) || undefined,
        pageOrigin: get("pageOrigin").slice(0, 200) || undefined,
      },
    });
  } catch (err) {
    console.error("submitLead failed", err);
    return { status: "error", message: "Something went wrong on our side. Please try again or chat with us on WhatsApp." };
  }

  // A ready-made WhatsApp message, so the visitor can continue the chat.
  const whatsapp = [
    `Halo MIL Digital, saya ${get("name")} dari ${get("brandName")}.`,
    services.length ? `Butuh: ${services.join(", ")}` : "",
    get("budget") ? `Budget iklan: ${get("budget")}` : "",
    "",
    get("message"),
  ]
    .filter((l, i) => l || i === 3)
    .join("\n");

  return { status: "success", name: get("name").split(" ")[0], whatsapp };
}

/* ── Smaller forms ───────────────────────────────────────────── */

export type SimpleState =
  | { status: "idle" }
  | { status: "success"; fileUrl?: string | null }
  | { status: "error"; message: string };

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isBot = (form: FormData) => {
  const startedAt = Number(form.get("startedAt") ?? 0);
  return Boolean(form.get("website")) || !startedAt || Date.now() - startedAt < 1500;
};

/** Gated report download: records a lead, then releases the PDF link. */
export async function requestReport(_prev: SimpleState, form: FormData): Promise<SimpleState> {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  if (isBot(form)) return { status: "success", fileUrl: null };
  if (!get("name") || !isEmail(get("email"))) return { status: "error", message: "Add your name and a valid email." };
  const slug = get("report");
  try {
    const payload = await getPayload({ config });
    const found = await payload.find({ collection: "reports", where: { slug: { equals: slug } }, limit: 1, depth: 1 });
    const report = found.docs[0];
    if (!report) return { status: "error", message: "We couldn't find that report." };
    await payload.create({
      collection: "leads",
      overrideAccess: true,
      data: {
        source: "report",
        name: get("name").slice(0, 120),
        email: get("email").slice(0, 200),
        brandName: get("company").slice(0, 120) || undefined,
        reference: report.title,
        pageOrigin: `/reports/${slug}`,
      },
    });
    const f = report.file && typeof report.file === "object" ? report.file : null;
    const fileUrl = f?.url ? (/^https?:/.test(f.url) ? new URL(f.url).pathname : f.url) : null;
    return { status: "success", fileUrl };
  } catch (err) {
    console.error("requestReport failed", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}

/** ATLAS waitlist. */
export async function joinWaitlist(_prev: SimpleState, form: FormData): Promise<SimpleState> {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  if (isBot(form)) return { status: "success" };
  if (!get("name") || !isEmail(get("email"))) return { status: "error", message: "Add your name and a valid email." };
  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "leads",
      overrideAccess: true,
      data: {
        source: "atlas-waitlist",
        name: get("name").slice(0, 120),
        email: get("email").slice(0, 200),
        brandName: get("brand").slice(0, 120) || undefined,
        pageOrigin: "/atlas",
      },
    });
    return { status: "success" };
  } catch (err) {
    console.error("joinWaitlist failed", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}

/** Job application from /career. */
export async function applyForJob(_prev: SimpleState, form: FormData): Promise<SimpleState> {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  if (isBot(form)) return { status: "success" };
  if (!get("name") || !isEmail(get("email")) || !get("portfolio")) {
    return { status: "error", message: "Name, a valid email and a CV or portfolio link are required." };
  }
  try {
    const payload = await getPayload({ config });
    const jobId = Number(get("job")) || undefined;
    await payload.create({
      collection: "job-applications",
      overrideAccess: true,
      data: {
        job: jobId,
        name: get("name").slice(0, 120),
        email: get("email").slice(0, 200),
        phone: get("phone").slice(0, 40) || undefined,
        portfolio: get("portfolio").slice(0, 500),
        message: get("message").slice(0, 3000) || undefined,
      },
    });
    return { status: "success" };
  } catch (err) {
    console.error("applyForJob failed", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}
