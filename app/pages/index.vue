<script setup lang="ts">
  const route = useRoute().fullPath
  const { data: content } = useAsyncData(`content-${route}`, async () => {
    return queryCollection("content").path(route).first()
  })
</script>

<template>
  <main v-if="content">
    <article>
      <h1>{{ content?.title }}</h1>

      <div class="meta">
        <p class="peoples">
          <People
            :role="$t('author')"
            :name="content?.author?.name"
            :link="content?.author?.link"
          />
        </p>

        <p v-if="content?.translator">
          <span> | </span>
          <People
            :role="$t('translator')"
            :name="content?.translator?.name"
            :link="content?.translator?.link"
          />
        </p>

        <p class="date">{{ $t("createTime") }}: {{ content?.createTime }}</p>
      </div>

      <p class="abstract">{{ content?.abstract }}</p>
      <ContentRenderer :value="content" />

      <footer>
        <p class="cite-title">{{ $t("cites") }}:</p>
        <li class="cite" v-for="cite in content?.cites">{{ cite }}</li>
      </footer>
    </article>
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

    display: flex;
    justify-content: center;
  }

  article {
    --padding-side: 5rem;
    padding-left: var(--padding-side);
    padding-right: var(--padding-side);
    padding-top: 2rem;
    padding-bottom: 4rem;

    max-width: 40rem;
    min-width: 200px;
    text-align: justify;
  }

  footer {
    text-align: start;
  }

  h1 {
    text-align: center;
    font-size: 2rem;
  }

  div.meta {
    text-align: center;
  }
</style>
