import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Play, Pause, Volume2, Settings, Maximize } from "lucide-react";
import bgVideo from "@/assets/videos/loading-bg-desktop.mp4";
import { featuredVideo } from "@/constants/videoShowcase";
import { ease, tiltSpring } from "@/animations/videoShowcase.motion";

type FeaturedVideoCardProps = {
  onPlay?: (url: string) => void;
};

export default function FeaturedVideoCard({ onPlay }: FeaturedVideoCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const active = hovered || playing;

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [4, -4]), tiltSpring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-4, 4]), tiltSpring);
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(480px circle at ${x} ${y}, rgba(29,111,235,0.25), transparent 70%)`,
  );

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (active) {
      if (!playing) vid.currentTime = 0;
      vid.play().catch(() => {});
    } else {
      vid.pause();
      vid.currentTime = 0;
    }
  }, [active, playing]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    setHovered(false);
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease }}
    >
      <motion.div
        animate={prefersReducedMotion || active ? { y: 0 } : { y: [0, -10, 0] }}
        transition={active ? { duration: 0.4 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          ref={ref}
          onMouseEnter={() => setHovered(true)}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{
            rotateX: prefersReducedMotion ? 0 : rotateX,
            rotateY: prefersReducedMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="group relative rounded-[32px] p-[3px] sm:p-[4px]"
        >
          <div className="absolute -inset-[1.5px] rounded-[32px] bg-gradient-to-br from-white/90 via-white/50 to-white/80 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -inset-6 rounded-[40px] bg-primary/20 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 -z-10" />

          <div className="relative rounded-[31px] overflow-hidden bg-[#0a1220] aspect-[4/3] sm:aspect-[16/10] w-full shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_50px_100px_-28px_rgba(8,20,45,0.6)]">
            <motion.img
              src={featuredVideo.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              animate={{
                scale: active ? 1.08 : 1,
                filter: active ? "blur(1px) brightness(0.6)" : "brightness(0.85)",
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <video
              ref={videoRef}
              src={bgVideo}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none ${
                active ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40 pointer-events-none" />

            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: glowBg }}
            />

            <div className="absolute top-5 left-5 right-5 sm:top-7 sm:left-7 sm:right-7 flex items-center justify-between z-20">
              <span className="px-4 py-2 rounded-full bg-white/95 border border-white text-slate-800 text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] shadow-sm">
                {featuredVideo.category}
              </span>
              <span className="px-4 py-2 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white/95 text-xs sm:text-sm font-mono font-semibold">
                {featuredVideo.duration}
              </span>
            </div>

            {/* Center play/pause control — a real button now: keyboard-focusable,
                operable by Enter/Space, and works for touch users who have no hover state. */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <motion.button
                type="button"
                onClick={() => {
                  if (featuredVideo.videoUrl) {
                    onPlay?.(featuredVideo.videoUrl);
                    return;
                  }
                  setPlaying((p) => !p);
                }}
                aria-label={
                  featuredVideo.videoUrl
                    ? `Play ${featuredVideo.title}`
                    : playing
                      ? `Pause preview of ${featuredVideo.title}`
                      : `Play preview of ${featuredVideo.title}`
                }
                aria-pressed={playing}
                className="interactive relative focus-visible:outline-none"
                animate={{ scale: active ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {!prefersReducedMotion && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-white/40"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-[0_20px_45px_-10px_rgba(0,0,0,0.5)] group-focus-visible:ring-4 group-focus-visible:ring-primary/40 focus-visible:ring-4 focus-visible:ring-primary/50">
                  {playing && !featuredVideo.videoUrl ? (
                    <Pause className="w-8 h-8 sm:w-11 sm:h-11 text-primary" fill="currentColor" aria-hidden="true" />
                  ) : (
                    <Play className="w-8 h-8 sm:w-11 sm:h-11 text-primary ml-1" fill="currentColor" aria-hidden="true" />
                  )}
                </div>
              </motion.button>
            </div>

            <div className="absolute inset-x-0 bottom-16 sm:bottom-20 px-6 sm:px-10 z-20 pointer-events-none">
              <h3 className="font-sans font-extrabold uppercase text-4xl sm:text-6xl lg:text-[4.25rem] tracking-tight text-white leading-none drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]">
                {featuredVideo.title}
              </h3>
              <div className="mt-2 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-10 sm:w-16 bg-white/70" />
                <span className="font-script font-medium italic text-3xl sm:text-5xl leading-none text-white/95">
                  {featuredVideo.subtitle}
                </span>
              </div>
            </div>

            {/* Player bar — play/fullscreen open the video, the rest is visual only */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 sm:gap-5 px-5 sm:px-8 pb-5 sm:pb-6 pt-10 text-white bg-gradient-to-t from-black/60 to-transparent">
              <button
                type="button"
                aria-label={`Play ${featuredVideo.title}`}
                onClick={() => (featuredVideo.videoUrl ? onPlay?.(featuredVideo.videoUrl) : setPlaying((p) => !p))}
                className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
              >
                <Play className="w-5 h-5" fill="currentColor" aria-hidden="true" />
              </button>
              <span aria-hidden="true" className="shrink-0 text-xs sm:text-sm font-mono tabular-nums text-white/90">0:00 / {featuredVideo.duration}</span>
              <div aria-hidden="true" className="relative h-1.5 flex-1 rounded-full bg-white/30">
                <div className="absolute inset-y-0 left-0 w-[12%] rounded-full bg-primary" />
                <div className="absolute left-[12%] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-2 border-white shadow" />
              </div>
              <Volume2 className="hidden xs:block w-5 h-5 shrink-0 text-white/90" aria-hidden="true" />
              <Settings className="hidden xs:block w-5 h-5 shrink-0 text-white/90" aria-hidden="true" />
              <button
                type="button"
                aria-label={`Open ${featuredVideo.title} player`}
                onClick={() => featuredVideo.videoUrl && onPlay?.(featuredVideo.videoUrl)}
                className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
              >
                <Maximize className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
