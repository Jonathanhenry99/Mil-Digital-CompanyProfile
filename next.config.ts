import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Two root layouts (site + Payload admin), so unmatched URLs need a
    // global 404: src/app/global-not-found.tsx.
    globalNotFound: true,
  },
  images: {
    localPatterns: [
      { pathname: "/api/media/file/**" }, // CMS uploads
      { pathname: "/placeholders/**" },
      { pathname: "/clients/**" },
      { pathname: "/brand/**" },
      { pathname: "/photos/**" },
    ],
  },
  turbopack: {
    root: path.resolve(dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
