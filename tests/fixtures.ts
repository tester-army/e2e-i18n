import type { Browser } from "@e2e-dev/web";

import { LANGUAGES } from "./languages";

export type Language = (typeof LANGUAGES)[number];

// The language this target's browser is set to. Read from the browser, not the page, or a page in the wrong
// language would test itself against itself. browser.evaluate needs an open page, so call it after app.open.
export async function readLanguage(browser: Browser): Promise<Language> {
  const locale = await browser.evaluate(() => navigator.language);
  const language = LANGUAGES.find((candidate) => candidate.locale === locale);
  if (!language) throw new Error(`No language in tests/languages.ts for the browser locale ${locale}`);
  return language;
}
