<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  :root {
    --foreground-color: #232323;
    --background-color: #fefdfa;
    --title-bar-color: #fefdfa;
    --border-color: #e1e1e1;
  }

  body {
    margin: 0;
    height: 100vh;
    overflow: hidden;
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
