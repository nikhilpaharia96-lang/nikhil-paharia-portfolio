import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

interface SplitTextProps {
  children: string;
  className?: string;
  /** Class applied to each animated word/char element (e.g. a gradient class). */
  charClassName?: string;
  type?: "words" | "chars";
  /** Seconds before the first piece animates. */
  delay?: number;
  duration?: number;
  /** Animate only the first time it scrolls into view (default true). */
  once?: boolean;
}

/**
 * Staggered text reveal.
 *  - "words": each word rises out of a clipping mask (editorial look).
 *  - "chars": each character fades up with a tiny stagger.
 * Triggers when scrolled into view, so it works for the Hero (visible on load)
 * and for section headings further down. Falls back to static text for
 * reduced-motion users. The real text stays available to screen readers.
 */
export default function SplitText({
  children,
  className = "",
  charClassName = "",
  type = "chars",
  delay = 0,
  duration = 0.8,
  once = true,
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const words = children.split(" ");
  const step = type === "words" ? 0.08 : 0.035;

  const motionProps = (order: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: type === "words" ? "105%" : 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once, amount: 0.6 },
          transition: { duration, delay: delay + order * step, ease: EASE_OUT },
        };

  let charCounter = 0;

  return (
    <span className={`inline-flex flex-wrap ${className}`} aria-label={children}>
      <span className="sr-only">{children}</span>
      {words.map((word, wIdx) =>
        type === "words" ? (
          <span
            key={wIdx}
            className="relative inline-block overflow-hidden mr-[0.24em] py-[0.1em] -my-[0.1em]"
            aria-hidden="true"
          >
            <motion.span className={`inline-block ${charClassName}`} {...motionProps(wIdx)}>
              {word}
            </motion.span>
          </span>
        ) : (
          <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.24em]" aria-hidden="true">
            {word.split("").map((ch, cIdx) => (
              <motion.span
                key={cIdx}
                className={`inline-block ${charClassName}`}
                {...motionProps(charCounter++)}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        ),
      )}
    </span>
  );
}
