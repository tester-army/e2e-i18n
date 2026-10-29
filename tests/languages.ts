// One e2e target each. Kept apart from the app's locales, so a mistake can't hide in both.
export const LANGUAGES = [
  { code: "en", locale: "en-US", name: "English" },
  { code: "de", locale: "de-DE", name: "German" },
  { code: "es", locale: "es-ES", name: "Spanish" },
] as const;
