import type { LocaleObject } from "@nuxtjs/i18n"
import { readdirSync, statSync } from "node:fs"
import { join } from "node:path"

function* allCssAssets(root: string): Generator<string> {
  for (const name of readdirSync(root)) {
    const path = join(root, name)
    if (statSync(path).isDirectory()) {
      yield* allCssAssets(path)
    } else if (path.endsWith(".css")) {
      yield path
    }
  }
}

function* allLocales(root: string): Generator<LocaleObject<string>> {
  for (const name of readdirSync(root)) {
    const path = join(root, name)
    if (statSync(path).isDirectory()) {
      yield* allLocales(path)
    } else if (path.endsWith(".locale.ts")) {
      yield { code: name.split(".")[0]!, file: path }
    }
  }
}

const root = import.meta.dirname
const appDir = join(root, "app")

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/i18n"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  nitro: { preset: "static" },
  css: allCssAssets(join(appDir, "styles")).toArray(),
  i18n: {
    defaultLocale: Intl.DateTimeFormat().resolvedOptions().locale,
    locales: allLocales(join(appDir, "locales")).toArray(),
    strategy: "prefix",
    compilation: { strictMessage: true },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "nuxt_locale",
    },
  },
})
