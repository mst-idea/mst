<script lang="ts" setup>
  const headerHeight = ref("3.2rem")
</script>

<template>
  <ScrollableTitlebar :titlebarHeight="headerHeight">
    <template #titlebar></template>
    <template #content><slot /> </template>
  </ScrollableTitlebar>
</template>
