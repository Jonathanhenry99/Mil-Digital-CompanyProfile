import type { Field } from "payload";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** URL slug, filled from `from` when left empty. */
export const slugField = (from: string): Field => ({
  name: "slug",
  type: "text",
  unique: true,
  index: true,
  admin: { position: "sidebar", description: `Part of the URL. Leave empty to generate from ${from}.` },
  hooks: {
    beforeValidate: [
      ({ value, data }) => (typeof value === "string" && value ? slugify(value) : slugify(String(data?.[from] ?? ""))),
    ],
  },
});
