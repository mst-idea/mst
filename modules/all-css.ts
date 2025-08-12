import { existsSync, readdirSync, statSync, watch } from "node:fs"
import { createResolver, defineNuxtModule } from "nuxt/kit"

export interface AllCssOptions {
  cssDir: string
}

export default defineNuxtModule<AllCssOptions>({
  meta: { name: "all-css", configKey: "allCss" },
  defaults: { cssDir: "assets/css" },

  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.dirname)
    const appDir = resolver.resolve(nuxt.options.srcDir, nuxt.options.dir.app)
    const cssDir = resolver.resolve(appDir, options.cssDir)

    const existsDir = (p: string) => existsSync(p) && statSync(p).isDirectory()
    const update = () => {
      if (!existsDir(cssDir)) return
      const allCss = readdirSync(cssDir)
        .filter((name) => name.endsWith(".css"))
        .map((name) => resolver.resolve(cssDir, name))
      nuxt.options.css.push(...allCss)
    }

    const raw = nuxt.options.css
    update()
    if (!nuxt.options.dev || !existsDir(cssDir)) return
    watch(cssDir, (event, name) => {
      if (event === "rename" && name?.endsWith(".css")) {
        nuxt.options.css = raw
        update()
      }
    })
  },
})
