import { useReducedMotion } from "motion/react";
/**
 * Shared motion presets for the premium Hero / Navbar / scroll-reveal layer.
 *
 * Everything here animates only `transform` and `opacity` (plus `clip-path`
 * for the hand-drawn strokes), so it stays on the compositor. Reduced-motion is
 * handled globally by <MotionConfig reducedMotion="user"> in App.tsx, which
 * drops transform animations (keeping gentle opacity fades) for users who ask
 * the OS for less motion.
 */

/** Smooth "expo-out" curve used for almost every entrance. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Fade up into place. */
export function rise(delay = 0, y = 24, duration = 0.9) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: EASE_OUT },
  };
}

/** Slide in horizontally (positive x = from the right). */
export function slide(delay = 0, x = 40, duration = 0.9) {
  return {
    initial: { opacity: 0, x },
    animate: { opacity: 1, x: 0 },
    transition: { duration, delay, ease: EASE_OUT },
  };
}

/** Soft pop-in (badges, social icons). */
export function pop(delay = 0, from = 0.6) {
  return {
    initial: { opacity: 0, scale: from },
    animate: { opacity: 1, scale: 1 },
    transition: { type: "spring" as const, stiffness: 220, damping: 18, delay },
  };
}

/** Plain fade. */
export function fade(delay = 0, duration = 1) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration, delay, ease: "easeOut" as const },
  };
}

/** Hand-drawn wipe for the brush-stroke SVG underlines. */
export function draw(delay = 0, duration = 0.9) {
  return {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
    transition: { duration, delay, ease: [0.65, 0, 0.35, 1] as const },
  };
}

/** Cinematic wipe + rise for the name (clip-path has negative insets so
 *  tall glyphs / descenders are never cut off). */
export function wipe(delay = 0, duration = 1.1) {
  return {
    initial: { opacity: 0, y: 22, clipPath: "inset(-25% 100% -25% -5%)" },
    animate: { opacity: 1, y: 0, clipPath: "inset(-25% -10% -25% -5%)" },
    transition: { duration, delay, ease: EASE_OUT },
  };
}

/** Portrait entrance: rise + slight zoom-settle. */
export function enter(delay = 0) {
  return {
    initial: { opacity: 0, y: 40, scale: 1.06 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 1.4, delay, ease: EASE_OUT },
  };
}

/** Paint-stroke reveal behind the portrait. */
export function brush(opacity = 0.85, delay = 0) {
  return {
    initial: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    animate: { opacity, clipPath: "inset(0 0% 0 0)" },
    transition: { duration: 1.4, delay, ease: [0.65, 0, 0.35, 1] as const },
  };
}

/** Paper plane glides in from the lower-left. */
export function plane(delay = 0) {
  return {
    initial: { opacity: 0, x: -36, y: 24, rotate: -12 },
    animate: { opacity: 1, x: 0, y: 0, rotate: 0 },
    transition: { duration: 1.3, delay, ease: EASE_OUT },
  };
}

/**
 * Presets that collapse to a plain fade for reduced-motion visitors, so call
 * sites never need their own branching.
 */
export function useMotionPresets() {
  const rm = useReducedMotion();
  const soft = (delay = 0, duration = 0.6) => fade(delay, duration);
  // Reduced-motion stand-in that tolerates (and ignores) the extra args of the full presets.
  const calm = (d = 0, ..._rest: number[]) => soft(d);
  return {
    rm: !!rm,
    fade,
    rise: rm ? calm : rise,
    slide: rm ? calm : slide,
    pop: rm ? calm : pop,
    draw: rm ? calm : draw,
    wipe: rm ? calm : wipe,
    enter: rm ? calm : enter,
    brush: rm ? (o = 0.85, d = 0) => ({ ...soft(d), animate: { opacity: o } }) : brush,
    plane: rm ? calm : plane,
  };
}
