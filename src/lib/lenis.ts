import type Lenis from "lenis";

// The one Lenis instance, set by <SmoothScroll />. Components that need to
// lock or drive the scroll (mobile menu, wheel list) read it from here.
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}

/** Scroll to a page offset, smoothly when Lenis is running. */
export function scrollToY(y: number) {
  if (instance) instance.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}
