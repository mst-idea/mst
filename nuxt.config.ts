import { join } from "node:path"
import { detectAllLocales } from "./modules/all-locales"

const langDir = "locales"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/i18n"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  nitro: { preset: "static" },
  allCss: { cssDir: "styles" },
  allLocales: { langDir },
  i18n: {
    defaultLocale: Intl.DateTimeFormat().resolvedOptions().locale,
    langDir,
    locales: detectAllLocales(join(import.meta.dirname, langDir)),
    strategy: "prefix",
    compilation: { strictMessage: true },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "nuxt_locale",
    },
  },
})
