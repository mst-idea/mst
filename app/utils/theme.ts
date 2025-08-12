export const darkThemeClass = "dark"
const platformDarkMedia = "(prefers-color-scheme: dark)"

export function listenTheme() {
  const dark = window.matchMedia(platformDarkMedia).matches
  document.body.classList.toggle(darkThemeClass, dark)
  window.matchMedia(platformDarkMedia).addEventListener("change", (e) => {
    document.body.classList.toggle(darkThemeClass, e.matches)
  })
}
