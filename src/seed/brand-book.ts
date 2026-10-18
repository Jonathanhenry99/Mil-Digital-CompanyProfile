/**
 * Applies copy from the MIL Digital Brand Book 2025 to the CMS: the hero
 * eyebrow and body (brand voice, positioning) and the founding year in the
 * journey milestones. Safe to re-run.
 *
 *   npm run payload run src/seed/brand-book.ts
 */
import { getPayload } from "payload";
import config from "../payload.config";
import { hero, milestones } from "../content/home";

const payload = await getPayload({ config });
const home = await payload.findGlobal({ slug: "home", depth: 0 });

await payload.updateGlobal({
  slug: "home",
  data: {
    hero: { ...home.hero, eyebrow: hero.eyebrow, body: hero.body },
    showreel: { ...home.showreel, milestones },
  },
});

payload.logger.info("Brand book copy applied.");
process.exit(0);
