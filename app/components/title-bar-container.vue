<script lang="ts" setup>
  defineProps<{ titlebarHeight: string }>()
</script>

<template>
  <main>
    <header><slot name="title-bar" /></header>
    <article>
      <div class="placeholder"></div>
      <div class="content-area"><slot name="content" /></div>
    </article>
  </main>
</template>

<style scoped>
  main {
    position: relative;
    width: 100%;
    height: 100%;
  }

  header {
    position: absolute;
    height: v-bind(titlebarHeight);
    width: 100%;

    border: solid 1px var(--border-color);
    background-color: rgba(var(--title-bar-color), 32%);
    backdrop-filter: blur(16px);
  }

  article {
    width: 100%;
    display: block;
  }

  article > div.placeholder {
    height: v-bind(titlebarHeight);
    width: 100%;
  }

  article > div.content-area {
    width: 100%;
  }
</style>
