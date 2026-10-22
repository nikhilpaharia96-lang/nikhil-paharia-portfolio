import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "@/lib/static-motion";
import { Eye, Play } from "lucide-react";
import type { CardVariant, Project } from "@/types/video";

type ProjectCardProps = {
  project: Project;
  variant: CardVariant;
  distance: number;
  index: number;
  onSelect: () => void;
  onPlay?: (project: Project) => void;
};

export default function ProjectCard({ project, variant, distance, index, onSelect, onPlay }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isActive = variant === "active";
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), undefined);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), undefined);
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(240px circle at ${x} ${y}, rgba(29,111,235,0.3), transparent 70%)`,
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const weight = 1 - Math.min(Math.abs(distance), 2) / 2;
  const scale = isActive ? 1.05 : 0.92 + weight * 0.05;
  const opacity = isActive ? 1 : 0.55 + weight * 0.25;

  return (
    <motion.div

      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}


      className="shrink-0 w-[78vw] xs:w-[300px] sm:w-[320px] snap-start"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        animate={{ scale, opacity }}


        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-[26px] p-[1px]  "
      >
        <div
          className="absolute inset-0 rounded-[26px] opacity-50 group-hover:opacity-100  "
          style={{
            background: "linear-gradient(140deg, rgba(29,111,235,0.55), rgba(255,255,255,0.15) 45%, rgba(29,111,235,0.35))",
          }}
        />

        <div
          className={`relative rounded-[25px] overflow-hidden bg-[#0a1220]
                     shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_24px_50px_-18px_rgba(8,20,45,0.5)]
                     group-hover:shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_30px_60px_-16px_rgba(8,20,45,0.6)]
                       ${isActive ? "ring-1 ring-primary/40" : ""}`}
        >
          <div className="aspect-[4/5] relative w-full overflow-hidden">
            <motion.img
              src={project.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"


            />

            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] backdrop-blur-0 group-hover:backdrop-blur-[1px]  " />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/10" />

            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100  "
              style={{ background: glowBg }}
            />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-white/85 text-[11px] font-mono font-semibold">{project.duration}</span>
            </div>

            {/* Preview control — a real button now, focusable and clickable
                (centers this card in the carousel), not just a decorative div. */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button
                type="button"
                onClick={() => {
                  onSelect();
                  if (project.videoUrl) onPlay?.(project);
                }}
                aria-label={project.videoUrl ? `Play "${project.title}"` : `Bring "${project.title}" to focus`}
                className="interactive w-14 h-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg opacity-90 scale-100 md:opacity-0 md:group-hover:opacity-100 md:scale-90    focus-visible:opacity-100  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
              >
                {project.videoUrl ? (
                  <Play className="w-5 h-5 text-primary ml-0.5" fill="currentColor" aria-hidden="true" />
                ) : (
                  <Eye className="w-5 h-5 text-primary" aria-hidden="true" />
                )}
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
              <h4 className="font-serif font-bold text-lg text-white leading-snug">{project.title}</h4>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
