/**
 * Development only: starting Payload pushes the current schema (new
 * collections and fields) to the database. Run after changing
 * src/collections or src/globals if you are not running `npm run dev`.
 *
 *   npm run db:push
 */
import { getPayload } from "payload";
import config from "../payload.config";

await getPayload({ config });
console.log("Schema is in sync.");
process.exit(0);
