// The languages the tests run in: one e2e target each, named by its code, with the browser set to its locale.
// The tests' own list, so a mistake in the app's locales can't hide by being in both.
export const LANGUAGES = [
  { code: "en", locale: "en-US", name: "English" },
  { code: "de", locale: "de-DE", name: "German" },
  { code: "es", locale: "es-ES", name: "Spanish" },
] as const;
