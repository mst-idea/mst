<script lang="ts" setup>
  withDefaults(defineProps<{ titlebarHeight: string }>(), {
    titlebarHeight: "3.2rem",
  })
</script>

<template>
  <header><slot name="titlebar" /></header>
  <article>
    <div class="placeholder"></div>
    <slot name="content" />
  </article>
</template>

<style scoped>
  header {
    position: fixed;
    width: 100%;
    height: v-bind(titlebarHeight);

    border: solid 1px var(--border-color);
    background-color: rgba(var(--title-bar-color), 32%);
    backdrop-filter: blur(16px);

    z-index: 1;
  }

  article {
    width: 100%;
    display: block;
    overflow-y: scroll;
  }

  article > div.placeholder {
    width: 100%;
    height: v-bind(titlebarHeight);
  }
</style>
