import type { CollectionConfig } from "payload";
import { anyone, editors } from "@/payload/access";
import { revalidateCollection } from "@/payload/revalidate";
import { slugField } from "@/payload/fields";

/** Case studies: Our Works and the homepage work wheel (PROJECT_SPEC §8). */
export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  labels: { singular: "Case study", plural: "Case studies" },
  admin: {
    useAsTitle: "client",
    defaultColumns: ["client", "title", "industry", "services", "featured"],
    group: "Portfolio",
  },
  access: { read: anyone, create: editors, update: editors, delete: editors },
  hooks: revalidateCollection("home", "case-studies"),
  fields: [
    { name: "client", type: "text", required: true },
    { name: "title", type: "text", required: true, admin: { description: "One line on what MIL did." } },
    slugField("client"),
    {
      type: "row",
      fields: [
        { name: "industry", type: "text", required: true },
        {
          name: "scale",
          type: "select",
          options: ["SME", "Mid-market", "Enterprise"].map((v) => ({ label: v, value: v.toLowerCase() })),
        },
      ],
    },
    {
      name: "services",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        { label: "Consulting", value: "Consulting" },
        { label: "Advertising", value: "Advertising" },
        { label: "Creative", value: "Creative" },
      ],
    },
    {
      name: "metric",
      type: "group",
      admin: { description: "The headline result, e.g. 4.8x / ROAS in 90 days." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "value", type: "text", required: true },
            { name: "label", type: "text", required: true },
          ],
        },
      ],
    },
    { name: "cover", type: "upload", relationTo: "media", required: true },
    { name: "summary", type: "textarea" },
    { name: "body", type: "richText", admin: { description: "Challenge, approach, results." } },
    { name: "featured", type: "checkbox", admin: { position: "sidebar" } },
    { name: "publishedAt", type: "date", admin: { position: "sidebar" } },
  ],
};
