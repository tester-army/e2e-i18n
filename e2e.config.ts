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

const PAGE = "The page is a contact form for the e2e team: name, email, topic, message, and a send button.";

export default {
  // The Vercel AI Gateway serves the model id and reads AI_GATEWAY_API_KEY, or the OIDC token of a linked Vercel project.
  agents: {
    // The agent fixture needs a default with a model, but every step in tests/languages.e2e.ts names a persona.
    default: {
      model: gateway("openai/gpt-6-luna-fast"),
      system: "You are a thorough QA agent. Verify every outcome.",
      context: PAGE,
    },
    // One persona per language. Each agent step names the one that reads its target's language.
    ...Object.fromEntries(
      LANGUAGES.map(({ code, name }) => [
        code,
        {
          model: gateway("openai/gpt-6-luna-fast"),
          system: `You are a native ${name} speaker using this page. Find your way by its ${name} labels.`,
          context: [
            PAGE,
            `The browser is set to ${name}, so every text the page shows should be in ${name}.`,
            "These stay as they are in every language: the brand name e2e, the language codes EN, DE, and ES,",
            "the names Nuxt and @nuxtjs/i18n, email addresses, the example names in placeholders, and what the visitor typed.",
          ].join(" "),
        },
      ]),
    ),
  },
  // Every test runs once per target, each with the browser in one language.
  targets: LANGUAGES.map(({ code, locale }) => ({ name: code, engine: web({ locale }), app })),
} satisfies E2EConfig;
