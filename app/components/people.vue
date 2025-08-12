<script lang="ts" setup>
  withDefaults(defineProps<{ role?: string; name?: string; link?: string }>(), {
    name: "Unnamed",
  })
</script>

<template>
  <span v-if="role">
    <span>{{ role }}</span>
    <span>: </span>
  </span>

  <span v-if="link">
    <a :href="link" target="_blank" rel="noopener noreferrer">{{ name }}</a>
  </span>
  <span v-else>{{ name }}</span>
</template>

<style scoped></style>
