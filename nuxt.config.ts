import { readdirSync, statSync } from "node:fs"
import { join } from "node:path"

/**
 * Read all CSS files recursively inside the specified root folder.
 *
 * Attention that this function will not detect such folder's change,
 * that you need to restart the server manually once there's new css files.
 *
 * @param root The root folder to start reading from.
 */
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

const root = import.meta.dirname

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/i18n"],
  css: allCssAssets(join(root, "app", "assets", "css")).toArray(),
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  nitro: { preset: "static" },
  i18n: {
    locales: [{ code: "en" }, { code: "zh" }],
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "nuxt_locale",
    },
  },
})
