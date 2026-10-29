import { describe, test } from "@e2e-dev/web";
import { expect } from "e2e";

import { ADA, readLanguage, skip } from "./fixtures";

// Each test is written once, in English, and runs once per target. Every agent step goes to the persona who reads
// the target's language (`agent: language.code`), so no step names a translated string.
describe("in the browser's language", { skip }, () => {
  test("sends the contact form", async ({ app, agent, screen, browser }) => {
    await app.open("/");
    const language = await readLanguage(browser);
    // What's typed before Vue hydrates the page is lost. Send turns on once it has.
    await expect(screen.getByTestId("send")).toBeEnabled();

    await agent.act(
      "fill in the contact form as {name} ({email}) with a bug report that says {message}, without sending it",
      { agent: language.code, params: ADA },
    );
    await expect(browser.locator("#name")).toHaveValue(ADA.name);
    await expect(browser.locator("#email")).toHaveValue(ADA.email);
    await expect(browser.locator("#topic")).toHaveValue("bug");
    await expect(browser.locator("#message")).toHaveValue(ADA.message);

    await agent.act("send the message", { agent: language.code });
    await expect(screen.getByTestId("sent")).toContainText(ADA.name);
    await expect(screen.getByTestId("sent")).toContainText(ADA.email);
    await agent.assert(
      `The page says in ${language.name} that the message was sent, thanks ${ADA.name}, and replies to ${ADA.email}`,
      { agent: language.code },
    );
  });

  test("leaves no text untranslated", async ({ app, agent, screen, browser }) => {
    await app.open("/");
    const language = await readLanguage(browser);
    // Send on the empty form, so the error messages are on screen too.
    await screen.getByTestId("send").click();
    await expect(browser.locator('[aria-invalid="true"]')).toHaveCount(3);

    await agent.assert(
      `Every text on the page is in ${language.name}: the header link, the heading, the labels, the placeholders, the topics, the button, the notes, and the error messages`,
      { agent: language.code, vision: true },
    );
  });

  test("cuts no text off", async ({ app, agent, screen, browser }) => {
    await app.open("/");
    const language = await readLanguage(browser);
    await screen.getByTestId("send").click();
    await expect(browser.locator('[aria-invalid="true"]')).toHaveCount(3);

    // The pixels, not the tree: the tree holds the whole text even when the screen cuts it off.
    await agent.assert(
      "Every label, placeholder, button, note, and error message is shown in full: no text is cut off, hidden behind something, or overlapping other text",
      { agent: language.code, vision: "only" },
    );
  });
});
