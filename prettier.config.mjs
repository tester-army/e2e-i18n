/** @type {import("prettier").Config & import("prettier-plugin-tailwindcss").PluginOptions} */
const config = {
  printWidth: 120,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./app/assets/css/e2e.css",
};

export default config;
