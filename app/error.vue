<script setup lang="ts">
  import type { NuxtError } from "#app"

  listenTheme(document.body, "dark")
  defineProps({
    error: Object as () => NuxtError,
  })
</script>

<template>
  <h1>{{ error?.statusCode }}</h1>
  <NuxtLink to="/">Go back home</NuxtLink>
</template>
