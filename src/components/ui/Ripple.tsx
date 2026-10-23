import * as React from "react";

/**
 * Material-style click ripple. Drop it inside any `relative overflow-hidden`
 * button/link; it listens on its parent so the parent's props stay untouched.
 * Pure CSS animation (transform + opacity), removed when finished, and hidden
 * for reduced-motion users via the stylesheet.
 */
export default function Ripple({ color = "rgba(255,255,255,0.45)" }: { color?: string }) {
  const host = React.useRef<HTMLSpanElement>(null);
  const [ripples, setRipples] = React.useState<{ id: number; x: number; y: number; size: number }[]>([]);

  React.useEffect(() => {
    const parent = host.current?.parentElement;
    if (!parent) return;
    let id = 0;
    const onDown = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2;
      setRipples((rs) => [...rs, { id: id++, x: e.clientX - r.left - size / 2, y: e.clientY - r.top - size / 2, size }]);
    };
    parent.addEventListener("pointerdown", onDown);
    return () => parent.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <span ref={host} aria-hidden="true" className="np-ripple-host">
      {ripples.map((r) => (
        <span
          key={r.id}
          className="np-ripple"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size, background: color }}
          onAnimationEnd={() => setRipples((rs) => rs.filter((x) => x.id !== r.id))}
        />
      ))}
    </span>
  );
}
