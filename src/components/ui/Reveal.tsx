import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

/**
 * Scroll-reveal wrapper for whole page sections. Fades + lifts the section in
 * the first time it enters the viewport, and flags it with `data-revealed` so
 * the stylesheet can stagger the shared heading pieces (.section-label →
 * .section-title → .section-divider) without editing each section.
 *
 * The wrapper is a plain block (no positioning), and motion resets to
 * `transform: none` once settled, so fixed-position modals/lightboxes inside
 * a section are unaffected after the reveal.
 */
export default function Reveal({ children, y = 36 }: { children: React.ReactNode; y?: number }) {
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = React.useState(false);

  if (reduce) return <div>{children}</div>;

  return (
    <motion.div
      data-revealed={revealed ? "true" : "false"}
      data-reveal-y={y}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -6% 0px" }}
      onViewportEnter={() => setRevealed(true)}
      transition={{ duration: 0.9, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
