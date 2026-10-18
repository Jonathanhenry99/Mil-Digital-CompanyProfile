import type { CollectionConfig } from "payload";
import { anyone, editors } from "@/payload/access";
import { revalidateCollection } from "@/payload/revalidate";

/**
 * Every uploaded file: photos, logos, the journey film, report PDFs.
 * Images carry a focal point (click the spot that must stay in frame),
 * which the site uses when it crops, e.g. the hero background.
 *
 * Files go to Vercel Blob when BLOB_READ_WRITE_TOKEN is set (see
 * payload.config.ts), otherwise to local disk (./media) in development.
 */
export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Library" },
  access: { read: anyone, create: editors, update: editors, delete: editors },
  hooks: revalidateCollection("home", "case-studies", "articles", "reports"),
  upload: {
    focalPoint: true,
    mimeTypes: ["image/*", "video/*", "application/pdf"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: { description: "Describe the image for screen readers and search engines." },
    },
  ],
};
