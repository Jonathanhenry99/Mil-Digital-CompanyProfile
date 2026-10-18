import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
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
import { JobApplications, Jobs } from "./collections/Careers";
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
  collections: [CaseStudies, Clients, Testimonials, Articles, Reports, Jobs, Leads, JobApplications, Media, Users],
  globals: [Home],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    // pg already treats sslmode=require as verify-full; say so explicitly to
    // keep its deprecation warning out of the logs.
    pool: { connectionString: (process.env.DATABASE_URL || "").replace("sslmode=require", "sslmode=verify-full") },
  }),
  plugins: [
    // Vercel's disk is ephemeral, so uploads go to Vercel Blob once its token
    // is set (Vercel → Storage → Blob). Without it, files stay in ./media.
    // clientUploads sends files straight from the browser, past Vercel's
    // 4.5 MB request limit, so the journey film can be uploaded too.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
  sharp,
});
