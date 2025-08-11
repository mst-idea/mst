<script lang="ts" setup>
  const headerHeight = ref("3.2rem")
</script>

<template>
  <TitleBarContainer :titlebarHeight="headerHeight">
    <template #header> </template>
    <template #content><slot /> </template>
  </TitleBarContainer>
</template>
