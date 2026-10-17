import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Clients } from "./collections/Clients";
import { CaseStudies } from "./collections/CaseStudies";
import { Articles, Reports, Testimonials } from "./collections/Content";
import { Leads } from "./collections/Leads";
import { Home } from "./globals/Home";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** Payload CMS, served at /admin (PROJECT_SPEC §8). */
export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " · MIL Digital CMS" },
  },
  collections: [CaseStudies, Clients, Testimonials, Articles, Reports, Leads, Media, Users],
  globals: [Home],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
  }),
  sharp,
});
