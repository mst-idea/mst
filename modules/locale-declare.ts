import { compile } from "json-schema-to-typescript"
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  watch,
  writeFileSync,
} from "node:fs"
import { dirname } from "node:path"
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
    const appDir = resolver.resolve(nuxt.options.srcDir, nuxt.options.dir.app)
    const from = resolver.resolve(appDir, options.schema)
    const to = resolver.resolve(appDir, options.declareOutput)

    generate(from, to)
    if (nuxt.options.dev) watch(from, () => generate(from, to))
  },
})
