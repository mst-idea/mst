<script setup lang="ts">
  const route = useRoute().fullPath
  const { data: content } = useAsyncData(`content-${route}`, async () => {
    return queryCollection("content").path(route).first()
  })
</script>

<template>
  <main v-if="content">
    <h1>{{ content?.title }}</h1>

    <div class="meta">
      <People
        :role="$t('author')"
        :name="content?.author?.name"
        :link="content?.author?.link"
      />

      <People
        v-if="content?.translator"
        :role="$t('translator')"
        :name="content?.translator?.name"
        :link="content?.translator?.link"
      />

      <p class="date">date: {{ content?.date }}</p>
    </div>

    <p class="abstract">{{ content?.abstract }}</p>
    <ContentRenderer :value="content" />

    <footer>
      <p class="cite-title">cite title</p>
      <p class="cite" v-for="cite in content?.cites">{{ cite }}</p>
    </footer>
  </main>

  <main v-else>loading content or no content</main>
</template>

<style scoped>
  main {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  h1 {
    text-align: center;
  }
</style>
