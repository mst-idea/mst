<script setup lang="ts">
  import type { NuxtError } from "#app"

  onMounted(() => {
    listenTheme(document.body)
  })

  defineProps({
    error: Object as () => NuxtError,
  })
</script>

<template>
  <h1>{{ error?.statusCode }}</h1>
  <NuxtLink to="/">Go back home</NuxtLink>
</template>
