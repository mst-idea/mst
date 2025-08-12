<script lang="ts" setup>
  const themeAnimationMs = ref(235)
  const themeAnimationDuration = ref(`${themeAnimationMs}ms`)
</script>

<template>
  <AdaptiveTheme :animation-ms="themeAnimationMs">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </AdaptiveTheme>
</template>

<style>
  div#__nuxt {
    background-color: var(--background-color);
    color: var(--foreground-color);
    transition:
      background-color ease-in-out v-bind(themeAnimationDuration),
      color ease-in-out v-bind(themeAnimationDuration);
  }
</style>
