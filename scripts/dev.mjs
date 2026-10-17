/**
 * `npm run dev`: next dev that restarts itself when the Payload schema changes.
 *
 * Hot-reloading payload.config.ts (or the collections/globals it imports)
 * leaves Turbopack's module graph pointing at a stale client reference for
 * Payload's Lexical editor, and every page then fails with "module factory
 * is not available" until the server restarts. Restarting is quick, so this
 * wrapper does it for you. Every other file keeps normal fast refresh.
 *
 * Use `npm run dev:raw` for plain next dev.
 */
import { spawn } from "node:child_process";
import { watch } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WATCH = ["src/payload.config.ts", "src/collections", "src/globals", "src/payload"];
const args = process.argv.slice(2);

let child = null;
let restarting = false;
let timer = null;

function start() {
  child = spawn("npx", ["next", "dev", ...args], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, NODE_OPTIONS: [process.env.NODE_OPTIONS, "--no-deprecation"].filter(Boolean).join(" ") },
  });
  child.on("exit", (code, signal) => {
    if (restarting) return;
    process.exit(code ?? (signal ? 1 : 0));
  });
}

function restart(file) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    if (!child || restarting) return;
    restarting = true;
    console.log(`\n↻ Payload schema changed (${file}), restarting next dev…\n`);
    child.once("exit", () => {
      restarting = false;
      start();
    });
    child.kill("SIGTERM");
  }, 400);
}

for (const rel of WATCH) {
  try {
    watch(path.join(root, rel), { recursive: true }, (_event, name) => restart(name ? path.join(rel, String(name)) : rel));
  } catch {
    // Path missing (e.g. a folder not created yet): nothing to watch.
  }
}

for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => {
    restarting = true;
    child?.kill(sig);
    process.exit(0);
  });
}

start();
