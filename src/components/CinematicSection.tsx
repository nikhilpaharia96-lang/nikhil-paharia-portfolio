/**
 * CinematicSection — wraps any section with cinematic scroll-triggered effects:
 *   • Blur → sharp on enter  (like a film racking focus)
 *   • Scale 0.96 → 1         (subtle zoom-in, like a dolly shot)
 *   • Y 60px → 0             (upward drift like a crane shot)
 *   • Soft opacity fade in   (scene transition)
 *   • Smooth spring easing   (Apple / cinema feel)
 *   All effects reverse when scrolling back up (once: false).
 */
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const CINEMA_EASE = [0.16, 1, 0.3, 1] as const; // expo-out

interface CinematicSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Extra Y offset for parallax feel (default 30) */
  parallax?: number;
  /** Animation entrance delay in seconds */
  delay?: number;
}

export default function CinematicSection({
  children,
  className = "",
  parallax = 30,
  delay = 0,
}: CinematicSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll progress for this section (0 = section top enters bottom of viewport,
  // 1 = section bottom exits top of viewport)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax: content drifts up slowly — gives depth like a camera move
  const rawY = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const smoothY = useSpring(rawY, { stiffness: 50, damping: 22 });

  // Opacity: full fade while section is in mid-view, barely visible at extremes
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    [0.0, 1, 1, 0.05]
  );
  const smoothOpacity = useSpring(rawOpacity, { stiffness: 70, damping: 28 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Cinematic reveal layer */}
      <motion.div
        style={{ y: smoothY, opacity: smoothOpacity }}
        initial={{ filter: "blur(10px)", scale: 0.97, y: 60 }}
        whileInView={{ filter: "blur(0px)", scale: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{
          duration: 0.95,
          delay,
          ease: CINEMA_EASE,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Reusable stagger container ─────────────────────────── */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/* ── Cinematic child variants ───────────────────────────── */
export const cinChild = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)", scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const cinChildLeft = {
  hidden: { opacity: 0, x: -60, filter: "blur(8px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const cinChildRight = {
  hidden: { opacity: 0, x: 60, filter: "blur(8px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};
