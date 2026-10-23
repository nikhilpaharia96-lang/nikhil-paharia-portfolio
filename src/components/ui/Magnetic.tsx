import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Pointer-following "magnetic" wrapper. The child is gently pulled toward the
 * cursor while it is within `range` px, and scales slightly on hover/tap.
 * Inert on touch devices and for reduced-motion users (renders the same
 * inline-block box either way, so layout never changes).
 */
export default function Magnetic({
  children,
  range = 60,
  strength = 0.3,
  scaleHover = 1.03,
  scaleTap = 0.97,
}: {
  children: React.ReactElement;
  range?: number;
  strength?: number;
  scaleHover?: number;
  scaleTap?: number;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const finePointer = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !finePointer() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    if (Math.hypot(dx, dy) > range + Math.max(r.width, r.height) / 2) return reset();
    x.set(dx * strength);
    y.set(dy * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileHover={reduce ? undefined : { scale: scaleHover }}
      whileTap={reduce ? undefined : { scale: scaleTap }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
