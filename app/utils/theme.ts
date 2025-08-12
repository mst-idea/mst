export function listenTheme(element: HTMLElement, className: string) {
  const platformDarkMedia = "(prefers-color-scheme: dark)"
  element.classList.toggle(className, matchMedia(platformDarkMedia).matches)
  matchMedia(platformDarkMedia).addEventListener("change", (e) => {
    element.classList.toggle(className, e.matches)
  })
}
