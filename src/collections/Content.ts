import type { CollectionConfig } from "payload";
import { anyone, editors } from "@/payload/access";
import { revalidateCollection } from "@/payload/revalidate";
import { slugField } from "@/payload/fields";

/** Client quotes for the homepage testimonials. */
export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "name", defaultColumns: ["name", "company", "order"], group: "Portfolio" },
  defaultSort: "order",
  access: { read: anyone, create: editors, update: editors, delete: editors },
  hooks: revalidateCollection("home"),
  fields: [
    { name: "quote", type: "textarea", required: true },
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "role", type: "text" },
        { name: "company", type: "text", required: true },
      ],
    },
    { name: "order", type: "number", defaultValue: 100, admin: { position: "sidebar" } },
  ],
};

/** Insights articles. Drafts are allowed; only published ones appear. */
export const Articles: CollectionConfig = {
  slug: "articles",
  admin: { useAsTitle: "title", defaultColumns: ["title", "category", "publishedAt", "_status"], group: "Insights" },
  defaultSort: "-publishedAt",
  versions: { drafts: true },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
    create: editors,
    update: editors,
    delete: editors,
  },
  hooks: revalidateCollection("home", "articles"),
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    {
      type: "row",
      fields: [
        {
          name: "category",
          type: "select",
          required: true,
          options: ["Advertising", "Playbook", "Creative", "Research", "Consulting"].map((v) => ({ label: v, value: v })),
        },
        { name: "readingTime", type: "text", admin: { description: "e.g. 6 min read" } },
      ],
    },
    { name: "excerpt", type: "textarea", required: true },
    { name: "cover", type: "upload", relationTo: "media", required: true },
    { name: "content", type: "richText" },
    { name: "publishedAt", type: "date", admin: { position: "sidebar" } },
  ],
};

/** MIL Research industry reports. */
export const Reports: CollectionConfig = {
  slug: "reports",
  admin: { useAsTitle: "title", defaultColumns: ["title", "gated", "publishedAt"], group: "Insights" },
  defaultSort: "-publishedAt",
  access: { read: anyone, create: editors, update: editors, delete: editors },
  hooks: revalidateCollection("home", "reports"),
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    { name: "summary", type: "textarea", required: true },
    { name: "cover", type: "upload", relationTo: "media", required: true },
    {
      name: "findings",
      type: "array",
      maxRows: 5,
      admin: { description: "Key numbers shown on the teaser, e.g. 63% / of orders start on social." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "stat", type: "text", required: true },
            { name: "label", type: "text", required: true },
          ],
        },
      ],
    },
    { name: "file", type: "upload", relationTo: "media", admin: { description: "The full report (PDF)." } },
    {
      name: "gated",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar", description: "Ask for name and email before download." },
    },
    { name: "publishedAt", type: "date", admin: { position: "sidebar" } },
  ],
};
