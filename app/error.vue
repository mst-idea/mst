<script setup lang="ts">
  import type { NuxtError } from "#app"

  defineProps({
    error: Object as () => NuxtError,
  })

  const themeAnimationMs = ref(235)
  const themeAnimationDuration = ref(`${themeAnimationMs}ms`)
</script>

<template>
  <AdaptiveTheme :animation-ms="themeAnimationMs">
    <h1>{{ error?.statusCode }}</h1>
    <NuxtLink to="/">Go back home</NuxtLink>
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
