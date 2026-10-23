import * as React from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Counts up to the number inside `value` ("96+", "1096+", "100%") the first
 * time it is visible. The real, final text is always what screen readers get,
 * and reduced-motion users see it immediately. Tabular figures keep the width
 * stable so nothing shifts while digits change.
 */
export default function CountUp({ value, delay = 0, duration = 1.6 }: { value: string; delay?: number; duration?: number }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : NaN;
  const suffix = match ? match[2] : "";
  const [shown, setShown] = React.useState(reduce || Number.isNaN(target) ? target : 0);

  React.useEffect(() => {
    if (reduce || Number.isNaN(target) || !inView) return;
    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, target, duration, delay]);

  if (Number.isNaN(target)) return <span>{value}</span>;

  return (
    <span ref={ref} aria-label={value} style={{ fontVariantNumeric: "tabular-nums" }}>
      <span aria-hidden="true">
        {shown}
        {suffix}
      </span>
    </span>
  );
}
