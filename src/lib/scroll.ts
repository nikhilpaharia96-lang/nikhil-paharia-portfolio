/** True when the visitor has asked the OS for reduced motion. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Scroll to an element by id. Smooth unless the visitor prefers reduced
 * motion. `offset` mirrors the navbar's existing 24px breathing room.
 */
export function scrollToId(id: string, offset = 24, behavior?: ScrollBehavior) {
  const el = document.getElementById(id.replace(/^#/, ""));
  if (!el) return false;
  // A not-yet-revealed section sits `data-reveal-y` px lower than where it will
  // finish; aim for its settled position so we never land short.
  const pending = el.closest<HTMLElement>('[data-revealed="false"]');
  const pendingShift = pending ? Number(pending.dataset.revealY) || 0 : 0;
  const top = el.getBoundingClientRect().top + window.scrollY - pendingShift - offset;
  window.scrollTo({ top, behavior: behavior ?? (prefersReducedMotion() ? "auto" : "smooth") });
  return true;
}
