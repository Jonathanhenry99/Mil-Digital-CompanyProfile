import type { Access, CollectionConfig } from "payload";
import { admins } from "@/payload/access";

const salesTeam: Access = ({ req }) =>
  Boolean((req.user as { roles?: string[] } | null)?.roles?.some((r) => r === "admin" || r === "sales"));

export const ACTIVITIES = ["Advertising", "Social Media", "Branding", "Influencer", "Others"] as const;
export const SERVICES = ["Consultation", "Advertising", "Creative", "Not sure yet"] as const;

/**
 * Enquiries from the site's forms. The contact form writes here through a
 * server action (src/app/(frontend)/actions.ts); nobody can create leads
 * through the public API. Fields follow MIL's free consultation form.
 */
export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "brandName",
    defaultColumns: ["brandName", "name", "phone", "status", "createdAt"],
    group: "Leads",
    description: "Free consultation requests. Update the status as you follow up.",
  },
  defaultSort: "-createdAt",
  access: { create: () => false, read: salesTeam, update: salesTeam, delete: admins },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "status",
          type: "select",
          defaultValue: "new",
          options: ["new", "contacted", "qualified", "won", "lost"].map((v) => ({
            label: v[0].toUpperCase() + v.slice(1),
            value: v,
          })),
        },
        {
          name: "source",
          type: "select",
          defaultValue: "contact-form",
          options: [
            { label: "Contact form", value: "contact-form" },
            { label: "Brand quiz", value: "quiz" },
            { label: "Booking", value: "booking" },
            { label: "Report download", value: "report" },
            { label: "ATLAS waitlist", value: "atlas-waitlist" },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "email", type: "email", required: true },
        { name: "phone", type: "text", required: true, label: "Phone / WhatsApp" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "brandName", type: "text", required: true },
        { name: "industry", type: "text" },
        { name: "location", type: "text" },
      ],
    },
    {
      name: "services",
      type: "select",
      hasMany: true,
      label: "Services needed",
      options: SERVICES.map((s) => ({ label: s, value: s })),
    },
    { name: "budget", type: "text", label: "Advertising budget" },
    {
      name: "activities",
      type: "select",
      hasMany: true,
      label: "Digital marketing tried",
      options: ACTIVITIES.map((a) => ({ label: a, value: a })),
    },
    { name: "message", type: "textarea", required: true, label: "What they want to discuss" },
    { name: "pageOrigin", type: "text", admin: { readOnly: true, position: "sidebar" } },
    { name: "notes", type: "textarea", admin: { position: "sidebar", description: "Internal follow-up notes." } },
  ],
};
