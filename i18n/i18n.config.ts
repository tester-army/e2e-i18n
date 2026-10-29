export default defineI18nConfig(() => ({
  // A string missing from de.json or es.json shows in English, as in most real apps.
  fallbackLocale: "en",
}));
