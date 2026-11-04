import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  modules: ["@nuxt/eslint", "@nuxtjs/i18n"],
  i18n: {
    // One URL; the language comes from the browser on every request.
    strategy: "no_prefix",
    defaultLocale: "en",
    locales: [
      { code: "en", language: "en", name: "English", file: "en.json" },
      { code: "de", language: "de", name: "Deutsch", file: "de.json" },
      { code: "es", language: "es", name: "Español", file: "es.json" },
    ],
    // Otherwise a cookie from the first visit beats a later change of browser language.
    detectBrowserLanguage: { useCookie: false },
  },
  // The page differs by Accept-Language, so a cache must not serve one language to everyone.
  routeRules: { "/**": { headers: { vary: "Accept-Language" } } },
  // Its floating button would show in screenshots and in the agent's view.
  devtools: { enabled: false },
  css: ["~/assets/css/e2e.css"],
  app: {
    head: {
      meta: [{ name: "theme-color", content: "#000000" }],
      link: [
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: {
    // Typecheck the e2e config and tests too.
    nodeTsConfig: {
      include: ["../e2e.config.ts", "../tests/**/*"],
      compilerOptions: { types: ["node"] },
    },
  },
});
