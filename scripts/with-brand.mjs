/**
 * Runs a Next.js command with a brand's environment overlaid.
 *
 *   node scripts/with-brand.mjs .env.cachet dev
 *   node scripts/with-brand.mjs .env.cachet build
 *
 * Only brand configuration lives in the given file. Secrets stay in
 * .env.local, which Next loads itself — and because @next/env never
 * overwrites variables already present in process.env, the values injected
 * here win over anything .env.local happens to set.
 */
import { spawn } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const [envFile, ...command] = process.argv.slice(2);

if (!envFile || command.length === 0) {
  console.error("usage: node scripts/with-brand.mjs <env-file> <next-command...>");
  process.exit(1);
}

if (!existsSync(envFile)) {
  console.error(`Brand env file not found: ${envFile}`);
  console.error("Copy .env.cachet.example to .env.cachet to get started.");
  process.exit(1);
}

const env = { ...process.env };

for (const rawLine of readFileSync(envFile, "utf8").split("\n")) {
  const line = rawLine.trim();
  if (!line || line.startsWith("#")) continue;
  const eq = line.indexOf("=");
  if (eq === -1) continue;
  const key = line.slice(0, eq).trim();
  // Strip surrounding quotes; an empty value is meaningful (it disables a feature)
  const value = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
  env[key] = value;
}

console.log(
  `\n  ${env.NEXT_PUBLIC_BRAND_NAME ?? "(default brand)"}` +
    `  ·  logo: ${env.NEXT_PUBLIC_BRAND_LOGO ? "yes" : "text wordmark"}` +
    `  ·  IP claims: ${env.NEXT_PUBLIC_BRAND_HAS_IP === "false" ? "hidden" : "shown"}\n`
);

const child = spawn("npx", ["next", ...command], {
  env,
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => process.exit(code ?? 0));
