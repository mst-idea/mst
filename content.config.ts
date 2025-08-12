import { defineCollection, defineContentConfig, z } from "@nuxt/content"

const person = z.object({
  name: z.string(),
  link: z.string(),
})

const frontmatter = z.object({
  title: z.string(),
  abstract: z.string(),
  author: person,
  translator: person,
  createTime: z.string(),
  lastUpdate: z.string(),
  cites: z.array(z.string()),
})

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: frontmatter,
    }),
  },
})
