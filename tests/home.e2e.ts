import { test } from "@e2e-dev/web";
import { expect } from "e2e";

import { readLanguage } from "./fixtures";

// Test ids and attributes, never text, so these run unchanged in every language, with no keys.

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
