// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2025-07-15",
  modules: ["@nuxt/content", "@nuxtjs/i18n"],
  i18n: {
    locales: [{ code: "en" }, { code: "zh" }],
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "nuxt_locale",
    },
  },
})
