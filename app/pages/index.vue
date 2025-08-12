<script setup lang="ts">
  const route = useRoute().fullPath
  const { data: content } = useAsyncData(`content-${route}`, () => {
    return queryCollection("content").path(route).first()
  })
</script>

<template>
  <main>
    <ContentRenderer v-if="content" :value="content" />
    <div v-else>no content</div>
  </main>
</template>

<style scoped>
  main {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
