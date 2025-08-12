// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/i18n"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  nitro: { preset: "static" },
  allCss: { cssDir: "styles" },
  i18n: {
    defaultLocale: Intl.DateTimeFormat().resolvedOptions().locale,
    // locales: allLocales(join(appDir, "locales")).toArray(),
    strategy: "prefix",
    compilation: { strictMessage: true },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "nuxt_locale",
    },
  },
})
