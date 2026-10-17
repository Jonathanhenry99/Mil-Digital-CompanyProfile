import { revalidateTag } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";

/**
 * Expire the cached pages that read this content, so an edit in the CMS
 * shows on the next page load. `expire: 0` rather than "max": editors
 * expect to see their change straight away, not after one stale visit.
 */
export function revalidate(...tags: string[]) {
  for (const tag of tags) {
    try {
      revalidateTag(tag, { expire: 0 });
    } catch {
      // Outside a Next.js request (e.g. the seed script): nothing cached.
    }
  }
}

export const revalidateCollection = (...tags: string[]) => ({
  afterChange: [(({ doc }) => (revalidate(...tags), doc)) as CollectionAfterChangeHook],
  afterDelete: [(({ doc }) => (revalidate(...tags), doc)) as CollectionAfterDeleteHook],
});

export const revalidateGlobal = (...tags: string[]) => ({
  afterChange: [(({ doc }) => (revalidate(...tags), doc)) as GlobalAfterChangeHook],
});
