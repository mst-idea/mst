export function listenTheme(
  element: HTMLElement,
  classNames?: { light?: string; dark?: string },
) {
  const platformDarkMedia = "(prefers-color-scheme: dark)"
  const lightName = classNames?.light ?? "light"
  const darkName = classNames?.dark ?? "dark"
  const toggle = (dark: boolean) => {
    element.classList.toggle(lightName, !dark)
    element.classList.toggle(darkName, dark)
  }
  toggle(matchMedia(platformDarkMedia).matches)
  matchMedia(platformDarkMedia).addEventListener("change", (e) => {
    toggle(e.matches)
  })
}
