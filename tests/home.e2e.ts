import { test } from "@e2e-dev/web";
import { expect } from "e2e";

import { findOverflowingText, readLanguage } from "./fixtures";

// Test ids, attributes, and pixels, never text, so these run unchanged in every language.

test("the page is in the browser's language", async ({ app, screen, browser }) => {
  await app.open("/");
  const { code } = await readLanguage(browser);

  await expect(browser.locator("html")).toHaveAttribute("lang", code);
  await expect(screen.getByTestId(`language-${code}`)).toHaveAttribute("aria-current", "true");
});

test("sending an empty form marks every required field", async ({ app, screen, browser }) => {
  await app.open("/");
  await screen.getByTestId("send").click();

  await expect(browser.locator('[aria-invalid="true"]')).toHaveCount(3);
  await expect(screen.getByTestId("contact-form")).toBeVisible();
});

test("looks right in every language", async ({ app, screen, browser }) => {
  await app.open("/");
  // Send turns on once the page hydrates; the fonts swap in after the first paint.
  await expect(screen.getByTestId("send")).toBeEnabled();
  await browser.evaluate(() => document.fonts.ready.then(() => true));
  await expect(screen).toHaveScreenshot("home.png");

  await screen.getByTestId("send").click();
  await expect(browser.locator('[aria-invalid="true"]')).toHaveCount(3);
  await expect(screen).toHaveScreenshot("errors.png");
});

// German and Spanish run longer than English.
test("no text is wider than its box", async ({ app, screen, browser }) => {
  await app.open("/");
  await screen.getByTestId("send").click();
  await expect(browser.locator('[aria-invalid="true"]')).toHaveCount(3);
  await browser.evaluate(() => document.fonts.ready.then(() => true));

  expect(await findOverflowingText(browser)).toEqual([]);
});
