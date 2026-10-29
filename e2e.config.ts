import { existsSync } from "node:fs";
import type { E2EConfig } from "e2e";
import { web } from "@e2e-dev/web";
import { gateway } from "ai";

import { LANGUAGES } from "./tests/languages";

// e2e loads no .env file itself.
const envFile = new URL(".env.local", import.meta.url);
if (existsSync(envFile)) process.loadEnvFile(envFile);

const app = {
  url: process.env.APP_URL ?? "http://localhost:3000",
  // Or let the runner start the dev server (and reuse one already running on that URL):
  // command: { executable: "npm", args: ["run", "dev"], reuseExisting: true, log: ".e2e/logs/app.log" },
};

export default {
  // The Vercel AI Gateway serves the model id and reads AI_GATEWAY_API_KEY, or the OIDC token of a linked Vercel project.
  agents: {
    default: {
      model: gateway("openai/gpt-6-luna-fast"),
      system: "You are a thorough QA agent. Verify every outcome.",
    },
  },
  // Every test runs once per target, each with the browser in one language.
  targets: LANGUAGES.map(({ code, locale }) => ({ name: code, engine: web({ locale }), app })),
} satisfies E2EConfig;
