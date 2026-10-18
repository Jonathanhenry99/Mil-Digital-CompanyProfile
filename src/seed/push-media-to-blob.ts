/**
 * One-off: copies every file in ./media to Vercel Blob, so uploads made
 * locally (client logos, photos) also show on the deployed site. Needs
 * BLOB_READ_WRITE_TOKEN in .env.local (Vercel → Storage → your Blob store →
 * .env.local tab). Safe to run again; existing files are overwritten.
 *
 *   npm run media:push
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import { getPayload } from "payload";
import config from "../payload.config";

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error("BLOB_READ_WRITE_TOKEN is missing. Add it to .env.local first (Vercel → Storage → Blob → .env.local).");
  process.exit(1);
}

const payload = await getPayload({ config });
const { docs } = await payload.find({ collection: "media", pagination: false, depth: 0 });

let copied = 0;
const missing: string[] = [];
for (const doc of docs) {
  if (!doc.filename) continue;
  try {
    const file = await readFile(path.resolve("media", doc.filename));
    await put(doc.filename, file, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: doc.mimeType ?? undefined,
      token,
    });
    copied++;
    console.log(`✓ ${doc.filename}`);
  } catch (error) {
    missing.push(`${doc.filename} (${(error as Error).message})`);
  }
}

console.log(`\nCopied ${copied} of ${docs.length} files to Vercel Blob.`);
if (missing.length) console.log(`Skipped:\n  ${missing.join("\n  ")}`);
process.exit(0);
