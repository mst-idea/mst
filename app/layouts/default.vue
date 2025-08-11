<script lang="ts" setup>
  const headerHeight = ref("3.2rem")
</script>

<template>
  <main>
    <header></header>
    <article>
      <div class="placeholder" />
      <div class="content"><slot /></div>
    </article>
  </main>
</template>

<style scoped>
  main {
    width: 100%;
    height: 100%;
    position: relative;
  }

  header {
    position: absolute;
    width: 100%;
    height: v-bind(headerHeight);

    border-bottom: solid 1px var(--border-color);
    background-color: rgba(var(--title-bar-color), 32%);
    backdrop-filter: blur(16px);
  }

  article {
    width: 100%;
  }

  article > div.placeholder {
    height: v-bind(headerHeight);
  }

  article > div.content {
    width: 100%;
    min-height: 150vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
