<script lang="ts" setup>
  const darkMediaQuery = "(prefers-color-scheme: dark)"
  type ThemeMode = "system" | "light" | "dark"

  const props = withDefaults(
    defineProps<{
      themeMode?: ThemeMode
      elementQuery?: string
      classLight?: string
      classDark?: string
      animationMs?: number
    }>(),
    {
      themeMode: "system",
      elementQuery: "body",
      classLight: "light",
      classDark: "dark",
      animationMs: 245,
    },
  )

  const animationValue = ref(0)
  const animationDuration = ref(`${props.animationMs}ms`)

  function toggle(dark: boolean) {
    const element = document.querySelector(props.elementQuery)
    if (!element) throw new Error("element for theme mode not found")
    element?.classList.toggle(props.classDark, dark)
    element?.classList.toggle(props.classLight, !dark)
  }

  function update(mode: ThemeMode) {
    return mode === "system"
      ? toggle(window.matchMedia(darkMediaQuery).matches)
      : toggle(mode === "dark")
  }

  onMounted(() => {
    update(props.themeMode)
    animationValue.value = 1
    window
      .matchMedia(darkMediaQuery)
      .addEventListener("change", (_e) => update(props.themeMode))
  })
</script>

<template>
  <main><slot /></main>
</template>

<style scoped>
  main {
    position: relative;
    width: 100%;
    height: 100%;

    opacity: v-bind(animationValue);
    transition: opacity ease-in-out v-bind(animationDuration);
  }
</style>

<!-- Global foreground and background applied on nuxt root -->
<style>
  div#__nuxt {
    background-color: var(--background-color);
    color: var(--foreground-color);

    transition:
      background-color ease-in-out v-bind(animationDuration),
      color ease-in-out v-bind(animationDuration);
  }
</style>
