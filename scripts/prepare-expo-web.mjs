import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = resolve(__dirname, "..");
const targetDir = join(webRoot, "public", "app");
const localExpoDist = resolve(webRoot, "..", "expo", "dist");
const cacheDir = join(webRoot, ".cache", "expo-src");

function syncDist(sourceDist) {
  if (!existsSync(join(sourceDist, "index.html"))) {
    console.error(`Invalid Expo export at ${sourceDist} (missing index.html).`);
    process.exit(1);
  }

  if (existsSync(targetDir)) {
    rmSync(targetDir, { recursive: true, force: true });
  }

  mkdirSync(targetDir, { recursive: true });
  cpSync(sourceDist, targetDir, { recursive: true });
  console.log(`Synced Expo web build to ${targetDir}`);
}

function writeExpoEnv(expoRoot) {
  const supabaseUrl =
    process.env.EXPO_PUBLIC_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY on Vercel.",
    );
    process.exit(1);
  }

  const lines = [
    `EXPO_PUBLIC_SUPABASE_URL=${supabaseUrl}`,
    `EXPO_PUBLIC_SUPABASE_ANON_KEY=${supabaseKey}`,
    `EXPO_PUBLIC_BACKEND_MODE=${process.env.EXPO_PUBLIC_BACKEND_MODE ?? "cloud"}`,
    `EXPO_PUBLIC_DEBUG_SYNC=${process.env.EXPO_PUBLIC_DEBUG_SYNC ?? "false"}`,
    `EXPO_PUBLIC_GAME_ENABLED=${process.env.EXPO_PUBLIC_GAME_ENABLED ?? "true"}`,
    `EXPO_PUBLIC_GAME_MAX_PLAYERS=${process.env.EXPO_PUBLIC_GAME_MAX_PLAYERS ?? "8"}`,
    `EXPO_PUBLIC_GAME_TIMEOUT=${process.env.EXPO_PUBLIC_GAME_TIMEOUT ?? "30000"}`,
  ];

  const gameServer = process.env.EXPO_PUBLIC_GAME_SERVER;
  if (gameServer) {
    lines.push(`EXPO_PUBLIC_GAME_SERVER=${gameServer}`);
  }

  writeFileSync(join(expoRoot, ".env"), `${lines.join("\n")}\n`);
}

function buildExpoFromGit() {
  const repo =
    process.env.EXPO_REPO_URL ?? "https://github.com/someonesjourney/expo.git";
  const branch = process.env.EXPO_REPO_BRANCH ?? "master";
  const token =
    process.env.GITHUB_TOKEN ?? process.env.VERCEL_GIT_CREDENTIALS ?? "";

  if (existsSync(cacheDir)) {
    rmSync(cacheDir, { recursive: true, force: true });
  }

  mkdirSync(dirname(cacheDir), { recursive: true });

  let cloneUrl = repo;
  if (token && cloneUrl.startsWith("https://github.com/")) {
    cloneUrl = cloneUrl.replace(
      "https://github.com/",
      `https://${token}@github.com/`,
    );
  }

  console.log(`Cloning Expo repo (${branch})...`);
  execSync(
    `git clone --depth 1 --branch ${branch} "${cloneUrl}" "${cacheDir}"`,
    { stdio: "inherit" },
  );

  writeExpoEnv(cacheDir);

  console.log("Installing Expo dependencies...");
  execSync("npm ci", { cwd: cacheDir, stdio: "inherit" });

  console.log("Exporting Expo web bundle...");
  execSync("npx expo export --platform web", {
    cwd: cacheDir,
    stdio: "inherit",
    env: process.env,
  });

  return join(cacheDir, "dist");
}

function resolveExpoDist() {
  if (existsSync(localExpoDist)) {
    console.log("Using sibling Expo export:", localExpoDist);
    return localExpoDist;
  }

  console.log("Sibling Expo export not found; building from GitHub...");
  return buildExpoFromGit();
}

syncDist(resolveExpoDist());
