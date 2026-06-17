import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = resolve(__dirname, "..");
const expoDist = resolve(webRoot, "..", "expo", "dist");
const targetDir = join(webRoot, "public", "app");

if (!existsSync(expoDist)) {
  console.error(
    "Expo web export not found. Run `npm run export:web` in the expo project first.",
  );
  process.exit(1);
}

if (existsSync(targetDir)) {
  rmSync(targetDir, { recursive: true, force: true });
}

mkdirSync(targetDir, { recursive: true });
cpSync(expoDist, targetDir, { recursive: true });

console.log(`Synced Expo web build to ${targetDir}`);
