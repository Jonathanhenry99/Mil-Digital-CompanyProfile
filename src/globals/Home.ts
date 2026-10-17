import type { GlobalConfig } from "payload";
import { anyone, editors } from "@/payload/access";
import { revalidateGlobal } from "@/payload/revalidate";

/**
 * Homepage settings, one tab per section. Lists that live in their own
 * collections (client logos, testimonials, articles) are edited there.
 */
export const Home: GlobalConfig = {
  slug: "home",
  label: "Homepage",
  admin: { group: "Pages" },
  access: { read: anyone, update: editors },
  hooks: revalidateGlobal("home"),
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          name: "hero",
          fields: [
            { name: "eyebrow", type: "text", required: true },
            {
              name: "title",
              type: "textarea",
              required: true,
              admin: { description: "Press Enter for a line break. The last line is shown in blue." },
            },
            { name: "body", type: "textarea", required: true },
            {
              name: "backgroundImage",
              type: "upload",
              relationTo: "media",
              filterOptions: { mimeType: { contains: "image" } },
              admin: {
                description:
                  "Photo behind the headline. It is faded and tinted blue automatically. Set its focal point in the Media library to choose what stays in frame.",
              },
            },
          ],
        },
        {
          label: "Journey film",
          name: "showreel",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "caption", type: "text" },
            {
              name: "video",
              type: "upload",
              relationTo: "media",
              filterOptions: { mimeType: { contains: "video" } },
              admin: { description: "MP4, muted loop. Leave empty to show the poster with a 'coming soon' badge." },
            },
            {
              name: "poster",
              type: "upload",
              relationTo: "media",
              required: true,
              filterOptions: { mimeType: { contains: "image" } },
            },
            {
              name: "milestones",
              type: "array",
              minRows: 2,
              maxRows: 8,
              admin: { description: "Shown one by one as visitors scroll through the film." },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "year", type: "text", required: true, admin: { width: "25%" } },
                    { name: "label", type: "text", required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Stats",
          fields: [
            {
              name: "stats",
              type: "array",
              maxRows: 4,
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "prefix", type: "text", admin: { width: "15%", description: "e.g. Rp" } },
                    { name: "value", type: "number", required: true, admin: { width: "20%" } },
                    { name: "decimals", type: "number", defaultValue: 0, min: 0, max: 2, admin: { width: "15%" } },
                    { name: "suffix", type: "text", admin: { width: "15%", description: "e.g. +, x, %" } },
                  ],
                },
                { name: "label", type: "text", required: true },
                { name: "note", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Featured",
          fields: [
            {
              name: "featuredCaseStudies",
              type: "relationship",
              relationTo: "case-studies",
              hasMany: true,
              maxRows: 8,
              admin: { description: "The work wheel, in this order." },
            },
            {
              name: "gallery",
              type: "upload",
              relationTo: "media",
              hasMany: true,
              filterOptions: { mimeType: { contains: "image" } },
              admin: { description: "The curved 'Creative in motion' reel." },
            },
            {
              name: "featuredReport",
              type: "relationship",
              relationTo: "reports",
              admin: { description: "Shown first in Insights & reports. Latest articles are added automatically." },
            },
          ],
        },
      ],
    },
  ],
};
