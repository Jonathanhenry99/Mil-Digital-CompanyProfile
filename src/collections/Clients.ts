import type { CollectionConfig } from "payload";
import { anyone, editors } from "@/payload/access";
import { revalidateCollection } from "@/payload/revalidate";

/** Brands MIL has worked with: the logo marquee on the homepage. */
export const Clients: CollectionConfig = {
  slug: "clients",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "logo", "showInMarquee", "order"],
    group: "Portfolio",
    description: "Logos should be white on a transparent background (PNG or SVG); the marquee sits on brand blue.",
  },
  defaultSort: "order",
  access: { read: anyone, create: editors, update: editors, delete: editors },
  hooks: revalidateCollection("home"),
  fields: [
    { name: "name", type: "text", required: true },
    { name: "logo", type: "upload", relationTo: "media", required: true },
    {
      type: "row",
      fields: [
        { name: "showInMarquee", type: "checkbox", defaultValue: true },
        { name: "order", type: "number", defaultValue: 100, admin: { description: "Lower comes first." } },
      ],
    },
  ],
};
