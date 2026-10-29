import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  modules: ["@nuxt/eslint", "@nuxtjs/i18n"],
  i18n: {
    // One URL; the language comes from the browser on every request: Accept-Language on the server, then the browser's own.
    strategy: "no_prefix",
    defaultLocale: "en",
    locales: [
      { code: "en", language: "en", name: "English", file: "en.json" },
      { code: "de", language: "de", name: "Deutsch", file: "de.json" },
      { code: "es", language: "es", name: "Español", file: "es.json" },
    ],
    // Without this, a cookie from the first visit would win over a later change of browser language.
    detectBrowserLanguage: { useCookie: false },
  },
  // The DevTools button floats over the page, so it would show in screenshots and in the agent's view.
  devtools: { enabled: false },
  css: ["~/assets/css/fonts.css", "~/assets/css/e2e.css"],
  app: {
    head: {
      // The title and description are translated in app.vue.
      meta: [{ name: "theme-color", content: "#111111" }],
      link: [
        { rel: "icon", href: "/e2e/favicon-black.png", media: "(prefers-color-scheme: light)" },
        { rel: "icon", href: "/e2e/favicon-white.png", media: "(prefers-color-scheme: dark)" },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: {
    // The e2e config and tests run in Node, next to nuxt.config.ts.
    nodeTsConfig: {
      include: ["../e2e.config.ts", "../tests/**/*"],
      compilerOptions: { types: ["node"] },
    },
  },
});
