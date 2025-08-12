import type { LocaleObject } from "@nuxtjs/i18n"
import { compile } from "json-schema-to-typescript"
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  watch,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { createResolver, defineNuxtModule } from "nuxt/kit"

async function generate(
  from: string,
  to: string,
  encoding: BufferEncoding = "utf-8",
) {
  if (!existsSync(from) || !statSync(from).isFile()) return
  const schema = JSON.parse(readFileSync(from, encoding))
  schema.$schema = undefined // Avoid schema in generated code.

  const result = await compile(schema, "LocaleData")
  mkdirSync(dirname(to), { recursive: true })
  writeFileSync(to, result)
}

export interface LocaleDeclareOptions {
  schema: string
  declareOutput: string
}

export default defineNuxtModule<LocaleDeclareOptions>({
  meta: { name: "locale-declare", configKey: "localeDeclare" },
  defaults: {
    schema: "locales/.schema.json",
    declareOutput: "utils/locale.d.ts",
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.dirname)
    const rootDir = resolver.resolve(nuxt.options.rootDir)
    const appDir = resolver.resolve(rootDir, nuxt.options.dir.app)
    const from = resolver.resolve(rootDir, options.schema)
    const to = resolver.resolve(appDir, options.declareOutput)

    const langDir: string | undefined = ((raw: string | null | undefined) => {
      if (!raw) return undefined
      return resolver.resolve(rootDir, raw)
    })(nuxt.options.i18n.langDir)

    const existsDir = (p: string) => existsSync(p) && statSync(p).isDirectory()
    const update = () => {
      if (!langDir || !existsDir(langDir)) return
      const allLocales: LocaleObject[] = readdirSync(langDir)
        .filter((name) => name.endsWith(".locale.json"))
        .map((name) => {
          const path = join(langDir, name)
          const code = name.slice(0, -".locale.json".length)
          const data = JSON.parse(readFileSync(path, "utf-8"))
          const localeName = data["#name"]
          return { code, name: localeName, file: path }
        })
      nuxt.options.i18n.locales = allLocales
    }

    generate(from, to)
    update()
    if (nuxt.options.dev) {
      watch(from, () => generate(from, to))
      if (langDir && existsDir(langDir)) watch(langDir, update)
    }
  },
})
