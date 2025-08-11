<script setup lang="ts">
  const route = useRoute().fullPath
  const { data: content } = useAsyncData("", () => {
    return queryCollection("content").path(route).first()
  })
</script>

<template>
  <ContentRenderer v-if="content" :value="content" />
  <div v-else>no content</div>
</template>
