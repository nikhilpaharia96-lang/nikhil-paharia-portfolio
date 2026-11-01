import { useEffect, useMemo, useRef } from "react";
import "./floating-particles.css";

/**
 * FloatingParticles — small blue dots that drift slowly through the hero background.
 *
 * Drop it inside any `position: relative` container; it fills the container, sits at z-index 0
 * (behind content) and never captures pointer events.
 *
 * Pure CSS motion (transform + opacity only, no per-frame JS): each particle follows its own slow,
 * looping drift path and twinkles on a separate timer, so the pattern never visibly repeats.
 * Animation pauses while the hero is off-screen and stops for `prefers-reduced-motion`.
 */

interface Particle {
  id: number;
  x: number; // % from left
  y: number; // % from top
  size: number; // px
  opacity: number;
  dx: number; // px drift range
  dy: number;
  dur: number; // s – drift loop
  delay: number; // s (negative → already mid-motion on load)
  twinkle: number; // s
  glow: boolean;
  desktopOnly: boolean;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildParticles(count: number): Particle[] {
  const rand = mulberry32(20261101);
  const range = (min: number, max: number) => min + rand() * (max - min);
  return Array.from({ length: count }, (_, i) => {
    const big = rand() > 0.78;
    return {
      id: i,
      x: range(2, 98),
      y: range(4, 96),
      size: big ? range(5, 7) : range(2, 4.5),
      opacity: big ? range(0.3, 0.5) : range(0.35, 0.7),
      dx: range(24, 70) * (rand() > 0.5 ? 1 : -1),
      dy: range(30, 80) * (rand() > 0.5 ? 1 : -1),
      dur: range(22, 44),
      delay: -range(0, 40),
      twinkle: range(4, 9),
      glow: big || rand() > 0.6,
      desktopOnly: i >= 16,
    };
  });
}

export default function FloatingParticles({ count = 30, className = "" }: { count?: number; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const particles = useMemo(() => buildParticles(count), [count]);

  // Pause the animations while the hero is off-screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        root.dataset.paused = entry.isIntersecting ? "false" : "true";
      },
      { threshold: 0 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={`floating-particles ${className}`} aria-hidden="true" data-paused="false">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`fp${p.desktopOnly ? " fp--desktop" : ""}`}
          style={
            {
              left: `${p.x.toFixed(2)}%`,
              top: `${p.y.toFixed(2)}%`,
              "--dx": `${p.dx.toFixed(0)}px`,
              "--dy": `${p.dy.toFixed(0)}px`,
              "--dur": `${p.dur.toFixed(1)}s`,
              "--delay": `${p.delay.toFixed(1)}s`,
            } as React.CSSProperties
          }
        >
          <i
            className={`fp__dot${p.glow ? " fp__dot--glow" : ""}`}
            style={
              {
                width: p.size,
                height: p.size,
                "--o": p.opacity.toFixed(2),
                "--tw": `${p.twinkle.toFixed(1)}s`,
              } as React.CSSProperties
            }
          />
        </span>
      ))}
    </div>
  );
}
