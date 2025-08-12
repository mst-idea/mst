import type { LocaleObject } from "@nuxtjs/i18n"
import { readdirSync, statSync } from "node:fs"
import { join } from "node:path"

function allFiles(root: string, filter: (name: string) => boolean): string[] {
  // Generator to array may not be compatible in certain environment.
  const handler: string[] = []
  for (const name of readdirSync(root)) {
    const path = join(root, name)
    if (statSync(path).isDirectory()) {
      handler.push(...allFiles(path, filter))
    } else if (filter(name)) {
      handler.push(path)
    }
  }
  return handler
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
  css: allFiles(join(appDir, "styles"), (name) => name.endsWith(".css")),
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
