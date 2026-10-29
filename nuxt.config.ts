import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  // The DevTools button floats over the page, so it would show in screenshots and in the agent's view.
  devtools: { enabled: false },
  css: ["~/assets/css/fonts.css", "~/assets/css/e2e.css"],
  app: {
    head: {
      title: "e2e i18n",
      meta: [
        { name: "description", content: "A contact form in several languages, tested end to end with e2e." },
        { name: "theme-color", content: "#111111" },
      ],
      link: [
        { rel: "icon", href: "/e2e/favicon-black.png", media: "(prefers-color-scheme: light)" },
        { rel: "icon", href: "/e2e/favicon-white.png", media: "(prefers-color-scheme: dark)" },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
