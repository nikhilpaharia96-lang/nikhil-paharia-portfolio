import * as React from "react";
import { useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Pointer-driven parallax for the Hero artwork.
 *
 * Returns spring-smoothed motion values in the range [-0.5, 0.5] (cursor offset
 * from the Hero's centre). Layers multiply these by their own depth in px.
 * It only listens on devices with a real hovering mouse and when the visitor
 * has not asked for reduced motion, so phones/tablets (touch) and
 * reduced-motion users get a perfectly still portrait with zero listeners.
 */
export function useMouseParallax(target: React.RefObject<HTMLElement>) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 70, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 70, damping: 18, mass: 0.6 });

  React.useEffect(() => {
    const el = target.current;
    if (!el || reduce) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        rawX.set((e.clientX - r.left) / r.width - 0.5);
        rawY.set((e.clientY - r.top) / r.height - 0.5);
      });
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [target, reduce, rawX, rawY]);

  return { x, y };
}
