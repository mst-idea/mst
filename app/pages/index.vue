<script setup lang="ts">
  const route = useRoute().fullPath
  const { data: content } = useAsyncData(`content-${route}`, async () => {
    return queryCollection("content").path(route).first()
  })
</script>

<template>
  <main v-if="content">
    <h1>{{ content?.title }}</h1>
    <p class="abstract">{{ content?.abstract }}</p>

    <p class="author">author: {{ content?.author?.name }}</p>
    <p v-if="content?.translator" class="translator">
      translator: {{ content?.translator }}
    </p>

    <ContentRenderer :value="content" />

    <footer>
      <p class="cite-title">cite title</p>
      <p class="cite" v-for="cite in content?.cites">{{ cite }}</p>
    </footer>
  </main>

  <main v-else>loading content or no content</main>
</template>

<style scoped>
  main {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
