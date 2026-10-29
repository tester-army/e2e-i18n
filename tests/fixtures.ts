import type { Browser } from "@e2e-dev/web";

import { LANGUAGES } from "./languages";

type Language = (typeof LANGUAGES)[number];

export const skip =
  process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN
    ? false
    : "set AI_GATEWAY_API_KEY to run the agent tests";

export const ADA = { name: "Ada Lovelace", email: "ada@example.com", message: "Hello from the e2e tests." };

// From the browser, not the page, or a page in the wrong language would pass. Call it after app.open.
export async function readLanguage(browser: Browser): Promise<Language> {
  const locale = await browser.evaluate(() => navigator.language);
  const language = LANGUAGES.find((candidate) => candidate.locale === locale);
  if (!language) throw new Error(`No language in tests/languages.ts for the browser locale ${locale}`);
  return language;
}

// Every text wider than its box. Placeholders and the chosen option are measured, since a field doesn't grow.
export async function findOverflowingText(browser: Browser): Promise<string[]> {
  return browser.evaluate(() => {
    const canvas = document.createElement("canvas").getContext("2d")!;
    const describe = (element: Element, text: string) => `${element.tagName.toLowerCase()}: ${text.trim()}`;
    const overflowing: string[] = [];

    for (const element of document.querySelectorAll("body *")) {
      const ownText = [...element.childNodes].some(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
      );
      if (!(element instanceof HTMLElement) || !ownText || getComputedStyle(element).display === "inline") continue;
      // Clipped on purpose for screen readers, like Nuxt's route announcer.
      if (element.clientWidth <= 1) continue;
      if (element.scrollWidth > element.clientWidth + 1) overflowing.push(describe(element, element.textContent ?? ""));
    }

    for (const field of document.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select")) {
      const text = field instanceof HTMLSelectElement ? (field.selectedOptions[0]?.text ?? "") : field.placeholder;
      const style = getComputedStyle(field);
      canvas.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const room = field.clientWidth - parseFloat(style.paddingInlineStart) - parseFloat(style.paddingInlineEnd);
      if (canvas.measureText(text).width > room + 1) overflowing.push(describe(field, text));
    }

    return overflowing;
  });
}
