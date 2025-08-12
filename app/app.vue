<script lang="ts" setup>
  import "@/theme.css"

  onMounted(() => {
    listenTheme(document.body)
  })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  body {
    margin: 0;
    height: 100vh;
    user-select: none;

    background-color: var(--background-color);
    color: var(--foreground-color);
    font-size: 16;
    font-family: sans-serif;
  }

  div#__nuxt {
    height: 100%;
    width: 100%;
  }
</style>
