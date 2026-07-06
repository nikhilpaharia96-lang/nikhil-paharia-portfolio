import { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import {
  RiArrowRightLine,
  RiGridFill,
  RiCodeSSlashLine,
  RiMovieLine,
  RiStarLine,
  RiArrowRightUpLine,
  RiCalendarLine,
} from "react-icons/ri";
import {
  ExternalLink,
  PlayCircle,
  FileText,
  Rocket,
  Smartphone,
  Server,
  Database,
  Plug,
  Code2,
  Briefcase,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiTypescript,
  SiJavascript,
  SiChartdotjs,
  SiFramer,
} from "react-icons/si";

import img1 from "../assets/images/project-1.png";
import img2 from "../assets/images/project-2.png";
import img3 from "../assets/images/project-3.png";
import img4 from "../assets/images/project-4.png";
import img5 from "../assets/images/project-5.png";
import img6 from "../assets/images/project-6.png";

const FILTER_TABS = [
  { label: "All Projects",    key: "All",        icon: RiGridFill },
  { label: "Web Development", key: "Web",         icon: RiCodeSSlashLine },
  { label: "Video Editing",   key: "Video",       icon: RiMovieLine },
  { label: "Featured",        key: "Featured",    icon: RiStarLine },
];

type Status = "Live" | "Case Study" | "Coming Soon";

const STATUS_STYLES: Record<Status, { dot: string; bg: string; text: string }> = {
  Live:          { dot: "bg-emerald-500", bg: "bg-emerald-50 border-emerald-200/70", text: "text-emerald-700" },
  "Case Study":  { dot: "bg-blue-500",    bg: "bg-blue-50 border-blue-200/70",       text: "text-blue-700" },
  "Coming Soon": { dot: "bg-amber-500",   bg: "bg-amber-50 border-amber-200/70",     text: "text-amber-700" },
};

const PROJECTS = [
  {
    id: 1,
    title: "ApunBazar",
    category: "E-Commerce",
    filter: ["All", "Web", "Featured"],
    featured: true,
    status: "Live" as Status,
    year: 2025,
    desc: "A modern e-commerce platform for authentic Assamese products with seamless checkout, real-time inventory and an intuitive admin panel.",
    tags: ["React", "Node.js", "MongoDB"],
    metrics: { screens: "10+", components: "45+", apis: "12+", performance: "98%" },
    image: img1,
    live: "#",
    github: "#",
    caseStudy: "#",
    liveLabel: "Live Project",
    codeLabel: "View Code",
    accentColor: "#1d6feb",
  },
  {
    id: 2,
    title: "Campus Unity",
    category: "Web Application",
    filter: ["All", "Web"],
    featured: false,
    status: "Case Study" as Status,
    year: 2024,
    desc: "A college community platform for notes, papers, chat and updates — one app, one campus, unlimited connections.",
    tags: ["React", "Firebase", "Tailwind"],
    metrics: { screens: "08+", components: "30+", apis: "06+", performance: "95%" },
    image: img2,
    live: "#",
    github: "#",
    caseStudy: "#",
    liveLabel: "Live Project",
    codeLabel: "View Code",
    accentColor: "#7c3aed",
  },
  {
    id: 3,
    title: "FitBite",
    category: "Food Delivery",
    filter: ["All", "Web", "Featured"],
    featured: true,
    status: "Live" as Status,
    year: 2025,
    desc: "A food delivery app for fitness lovers and college students — healthy food delivered fast with smart nutrition tracking.",
    tags: ["React Native", "Node.js", "MongoDB"],
    metrics: { screens: "12+", components: "25+", apis: "10+", performance: "97%" },
    image: img3,
    live: "#",
    github: "#",
    caseStudy: "#",
    liveLabel: "Live Project",
    codeLabel: "View Code",
    accentColor: "#059669",
  },
  {
    id: 4,
    title: "Travel Assam",
    category: "Video Editing",
    filter: ["All", "Video", "Featured"],
    featured: true,
    status: "Live" as Status,
    year: 2024,
    desc: "A cinematic travel video showcasing the breathtaking beauty of Assam — misty hills, tea gardens and golden sunsets.",
    tags: ["Adobe Premiere Pro", "After Effects"],
    metrics: { screens: "03+", components: "08+", apis: "4K", performance: "96%" },
    image: img4,
    live: "#",
    github: null,
    caseStudy: "#",
    liveLabel: "Watch Video",
    codeLabel: "View More",
    accentColor: "#d97706",
  },
  {
    id: 5,
    title: "Admin Dashboard",
    category: "Dashboard",
    filter: ["All", "Web"],
    featured: false,
    status: "Case Study" as Status,
    year: 2023,
    desc: "A clean and responsive admin dashboard with real-time analytics, data visualizations and a polished UI/UX.",
    tags: ["React", "Tailwind", "Chart.js"],
    metrics: { screens: "09+", components: "20+", apis: "08+", performance: "96%" },
    image: img5,
    live: "#",
    github: "#",
    caseStudy: "#",
    liveLabel: "Live Preview",
    codeLabel: "View Code",
    accentColor: "#1d6feb",
  },
  {
    id: 6,
    title: "Portfolio Website",
    category: "Personal Site",
    filter: ["All", "Web", "Featured"],
    featured: true,
    status: "Live" as Status,
    year: 2026,
    desc: "My personal portfolio website showcasing my skills, work and experience — built with love, precision and purpose.",
    tags: ["React", "Tailwind", "Framer Motion"],
    metrics: { screens: "05+", components: "15+", apis: "03+", performance: "99%" },
    image: img6,
    live: "#",
    github: "#",
    caseStudy: "#",
    liveLabel: "Live Site",
    codeLabel: "View Code",
    accentColor: "#1d6feb",
  },
];

/* ── tiny easing helpers ───────────────────────────────── */
const ease = [0.25, 0.1, 0.25, 1] as const;
const spring = { type: "spring", stiffness: 260, damping: 24 } as const;

/* Simple Icons has no Adobe app icons (trademark restrictions), so these two
   use the authentic official marks from Devicon instead — inlined as
   components since Devicon ships raw .svg files, not React components. */
type TechIconProps = { size?: number; className?: string; style?: React.CSSProperties };

function DiPremiereProIcon({ size = 14, className, style }: TechIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size} height={size} className={className} style={style} aria-hidden="true">
      <path fill="#2A0634" d="M50.3 38.5h-7.4v20.7h7.4c5 0 9.1-4.1 9.1-9.1v-2.4c0-5.1-4.1-9.2-9.1-9.2z" />
      <path fill="#2A0634" d="M0 0v128h128V0H0zm51.2 67.5h-8.3v21.3h-9.6V30.3h18.5c9.4-.1 17.1 7.4 17.2 16.8v2.3c0 9.9-8 18-17.8 18.1zm46.1-14.2s-7 0-10.1 1.3v34.2H77.1V48.9s10.2-5.1 20.2-3.8v8.2z" />
    </svg>
  );
}

function DiAfterEffectsIcon({ size = 14, className, style }: TechIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size} height={size} className={className} style={style} aria-hidden="true">
      <path fill="#1F0740" d="M87 52.4c-7.5.9-7.5 9.2-7.5 9.2h14.9c.1 0 .8-9.2-7.4-9.2zM38.2 63.1H51l-6.4-24.4z" />
      <path fill="#1F0740" d="M0 0v128h128V0H0zm57.5 88.6L53 72.5H36.2l-4.4 16.1h-9.4l16-54.9v-3.8h12.2l17.3 58.7H57.5zm46-19.6h-24c1.9 19.2 21.2 10 21.2 10v8s-1.3 2.6-14.8 2.6-16.3-18.3-16.3-18.3v-4.7s1.3-22 17.3-22 16.5 14.6 16.5 14.6V69z" />
    </svg>
  );
}

/* ── official tech logos: Simple Icons (via react-icons/si) for most,
   Devicon marks (inlined above) for the two Adobe apps ──
   Keyed by lowercase tag text so PROJECTS.tags can stay plain strings. */
const TECH_ICONS: Record<string, { Icon: React.ComponentType<TechIconProps>; color: string }> = {
  react:                 { Icon: SiReact,             color: "#61DAFB" },
  "react native":        { Icon: SiReact,             color: "#61DAFB" },
  "next.js":             { Icon: SiNextdotjs,         color: "#000000" },
  nextjs:                { Icon: SiNextdotjs,         color: "#000000" },
  "node.js":             { Icon: SiNodedotjs,         color: "#339933" },
  nodejs:                { Icon: SiNodedotjs,         color: "#339933" },
  "express.js":          { Icon: SiExpress,           color: "#000000" },
  express:               { Icon: SiExpress,           color: "#000000" },
  mongodb:               { Icon: SiMongodb,           color: "#47A248" },
  firebase:              { Icon: SiFirebase,          color: "#FFCA28" },
  "tailwind css":        { Icon: SiTailwindcss,       color: "#06B6D4" },
  tailwind:              { Icon: SiTailwindcss,       color: "#06B6D4" },
  git:                   { Icon: SiGit,               color: "#F05032" },
  github:                { Icon: SiGithub,            color: "#181717" },
  typescript:            { Icon: SiTypescript,        color: "#3178C6" },
  javascript:            { Icon: SiJavascript,        color: "#F7DF1E" },
  "chart.js":            { Icon: SiChartdotjs,        color: "#FF6384" },
  "framer motion":       { Icon: SiFramer,            color: "#0055FF" },
  framer:                { Icon: SiFramer,            color: "#0055FF" },
  "adobe premiere pro":  { Icon: DiPremiereProIcon,   color: "#2A0634" },
  "premiere pro":        { Icon: DiPremiereProIcon,   color: "#2A0634" },
  "after effects":       { Icon: DiAfterEffectsIcon,  color: "#1F0740" },
};

function getTechIcon(tag: string) {
  return TECH_ICONS[tag.trim().toLowerCase()] ?? null;
}

/* ── ripple-on-click wrapper for links ─────────────────── */
function RippleLink({
  href,
  onClick,
  className,
  children,
}: {
  href: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const fire = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
    onClick?.();
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={fire}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      {children}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ width: 0, height: 0, opacity: 0.35, x: r.x, y: r.y }}
          animate={{ width: 140, height: 140, opacity: 0, x: r.x - 70, y: r.y - 70 }}
          transition={{ duration: 0.6, ease }}
          className="absolute rounded-full bg-current pointer-events-none"
          style={{ willChange: "transform, opacity" }}
        />
      ))}
    </a>
  );
}

/* ── animated count-up ──────────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

const STATS = [
  { icon: Briefcase,    value: 6,   pad: 2, suffix: "+", label: "Projects Completed" },
  { icon: CalendarDays, value: 2,   pad: 2, suffix: "+", label: "Years of Learning" },
  { icon: Code2,        value: 15,  pad: 2, suffix: "+", label: "Technologies Used" },
  { icon: Smartphone,   value: 100, pad: 0, suffix: "%", label: "Responsive Design" },
];

function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3, ease }}
      className="mx-auto mb-12 md:mb-16 max-w-3xl rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl
                 shadow-[0_8px_32px_rgba(15,23,42,0.06)] grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-100"
    >
      {STATS.map((stat, i) => {
        const count = useCountUp(stat.value, inView, 1400 + i * 150);
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="flex items-center gap-3 px-5 py-4 sm:px-6">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary">
              <Icon size={17} strokeWidth={2.25} />
            </span>
            <div className="text-left leading-tight">
              <p className="text-xl md:text-2xl font-black text-slate-900 tabular-nums">
                {String(count).padStart(stat.pad, "0")}{stat.suffix}
              </p>
              <p className="text-[11px] font-semibold text-slate-500">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

/* ── individual card ────────────────────────────────────── */
function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  /* magnetic 3D tilt + cursor-follow glow, normalized 0..1 across card */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), spring);
  const liftX = useSpring(useTransform(mx, [0, 1], [-6, 6]), spring);
  const liftY = useSpring(useTransform(my, [0, 1], [-6, 6]), spring);
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glowBg = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, ${project.accentColor}22, transparent 65%)`;

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width);
      my.set((e.clientY - rect.top) / rect.height);
    },
    [mx, my]
  );

  const resetTilt = () => {
    mx.set(0.5);
    my.set(0.5);
    setHovered(false);
  };

  const statusStyle = STATUS_STYLES[project.status];
  const metricEntries = [
    { label: "Screens", value: project.metrics.screens },
    { label: "Components", value: project.metrics.components },
    { label: "APIs", value: project.metrics.apis },
    { label: "Score", value: project.metrics.performance },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: [0, -6, 0], scale: 1 } : {}}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.09, ease },
        scale: { duration: 0.6, delay: index * 0.09, ease },
        y: { duration: 4.5 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: 0.6 + index * 0.09 },
      }}
      className="relative min-w-[86%] snap-center sm:min-w-0"
      style={{ perspective: 1200 }}
    >
      {/* ambient rotating glow halo — reads as an animated gradient border */}
      <div
        className="pointer-events-none absolute -inset-3 rounded-[34px] blur-xl transition-opacity duration-500"
        style={{
          opacity: hovered ? 0.55 : 0,
          background: `conic-gradient(from 0deg, ${project.accentColor}, transparent 25%, transparent 75%, ${project.accentColor})`,
        }}
      />
      {project.featured && (
        <div
          className="pointer-events-none absolute -inset-2 rounded-[32px] opacity-40 blur-2xl"
          style={{ background: `radial-gradient(circle, ${project.accentColor}30, transparent 70%)` }}
        />
      )}

      <motion.article
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={resetTilt}
        style={{ rotateX, rotateY, x: liftX, y: liftY, transformStyle: "preserve-3d" }}
        className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer
                   bg-white/85 backdrop-blur-xl border border-white/60
                   shadow-[0_2px_10px_rgba(15,23,42,0.05)]
                   transition-shadow duration-500"
      >
        {/* cursor-follow glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{ background: glowBg, opacity: hovered ? 1 : 0 }}
        />

        {/* subtle inner ring */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl z-20 transition-all duration-500"
          style={{
            boxShadow: hovered
              ? `inset 0 0 0 1.5px ${project.accentColor}55, 0 20px 60px -12px ${project.accentColor}35`
              : `inset 0 0 0 1px rgba(15,23,42,0.06)`,
          }}
        />

        {/* ── Thumbnail (real project screenshot) ── */}
        <div className="relative overflow-hidden aspect-[16/10] shrink-0" style={{ transform: "translateZ(30px)" }}>
          <motion.img
            src={project.image}
            alt={`${project.title} — screenshot`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease }}
            style={{ willChange: "transform" }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold
                               bg-white/90 backdrop-blur text-amber-600 border border-amber-200/60 shadow-sm">
                <RiStarLine size={10} className="fill-amber-500 text-amber-500" />
                Featured
              </span>
            </div>
          )}

          {/* Status / Live badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur
                          ${statusStyle.bg} ${statusStyle.text}`}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className={`absolute inline-flex h-full w-full rounded-full ${statusStyle.dot} opacity-60 animate-ping`} />
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${statusStyle.dot}`} />
              </span>
              {project.status}
            </span>
          </div>

          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white/85 bg-black/35 backdrop-blur-sm rounded-full px-2.5 py-1">
              <RiCalendarLine size={10} />
              {project.year}
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="relative flex flex-col flex-1 p-6 gap-4" style={{ transform: "translateZ(20px)" }}>

          {/* Category pill */}
          <div>
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border"
              style={{
                background: `${project.accentColor}12`,
                borderColor: `${project.accentColor}30`,
                color: project.accentColor,
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-[1.2rem] font-black text-slate-900 tracking-tight leading-tight transition-colors duration-300"
            style={{ color: hovered ? project.accentColor : undefined }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-slate-500 text-sm leading-relaxed">
            {project.desc}
          </p>

          {/* Tech stack — official logos, gentle float on hover */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, i) => {
              const tech = getTechIcon(tag);
              return (
                <motion.span
                  key={tag}
                  animate={{ y: hovered ? [0, -3, 0] : 0 }}
                  transition={{ duration: 2.2, repeat: hovered ? Infinity : 0, ease: "easeInOut", delay: i * 0.15 }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-full
                             bg-slate-50 border border-slate-100 text-slate-500
                             group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-primary
                             transition-colors duration-300"
                >
                  {tech && <tech.Icon size={14} style={{ color: tech.color }} className="shrink-0" />}
                  <span className="leading-none">{tag}</span>
                </motion.span>
              );
            })}
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-4 gap-2 rounded-xl bg-slate-50/70 border border-slate-100 py-3">
            {metricEntries.map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-sm font-black text-slate-900 tabular-nums">{m.value}</p>
                <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 group-hover:bg-blue-100 transition-colors duration-300" />

          {/* Three action buttons */}
          <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
            <RippleLink
              href={project.live}
              className="inline-flex items-center justify-center gap-1 py-2 rounded-lg text-primary
                         bg-blue-50/70 hover:bg-blue-50 border border-blue-100 transition-colors"
            >
              {project.category === "Video Editing"
                ? <PlayCircle size={13} strokeWidth={2.25} />
                : <ExternalLink size={13} strokeWidth={2.25} />
              }
              <span className="truncate">{project.liveLabel.split(" ")[0]}</span>
            </RippleLink>

            <RippleLink
              href={project.github ?? project.live}
              className="inline-flex items-center justify-center gap-1 py-2 rounded-lg text-slate-600
                         bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors"
            >
              {project.github
                ? <SiGithub size={13} className="shrink-0" />
                : <ExternalLink size={13} strokeWidth={2.25} />
              }
              <span className="truncate">Code</span>
            </RippleLink>

            <RippleLink
              href={project.caseStudy}
              className="inline-flex items-center justify-center gap-1 py-2 rounded-lg text-slate-600
                         bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors"
            >
              <FileText size={13} strokeWidth={2.25} />
              <span className="truncate">Case Study</span>
            </RippleLink>
          </div>

          <div className="flex justify-end">
            <motion.span
              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-primary transition-colors"
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ duration: 0.3 }}
            >
              Explore <RiArrowRightUpLine size={12} />
            </motion.span>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

/* ── sticky sidebar ─────────────────────────────────────── */
const BUILD_ITEMS = [
  { icon: Smartphone, title: "Responsive Design",  desc: "Pixel-perfect, responsive and beautiful interfaces." },
  { icon: Server,     title: "Scalable Backend",   desc: "Secure, fast and scalable server-side applications." },
  { icon: Database,   title: "Database Design",    desc: "Efficient database modeling and optimization." },
  { icon: Plug,       title: "API Integration",    desc: "RESTful APIs, third-party integrations & more." },
  { icon: Code2,      title: "Clean Code",         desc: "Writing clean, reusable and well-documented code." },
];

const SIDEBAR_TECH = ["React", "Next.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS", "Git", "GitHub"];

function ProjectsSidebar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.aside
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease }}
      className="order-last lg:order-none lg:sticky lg:top-28 flex flex-col gap-6 h-fit"
    >
      {/* What I Build */}
      <div className="relative rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl
                      shadow-[0_8px_32px_rgba(15,23,42,0.06)] p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-primary">
            <Code2 size={16} strokeWidth={2.25} />
          </span>
          <h4 className="text-base font-black text-slate-900">What I Build</h4>
        </div>
        <ul className="flex flex-col gap-4">
          {BUILD_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.title}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-3 group/item"
              >
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
                                 bg-slate-50 border border-slate-100 text-slate-500
                                 group-hover/item:bg-blue-50 group-hover/item:text-primary group-hover/item:border-blue-100
                                 transition-colors duration-300">
                  <Icon size={14} strokeWidth={2.25} />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800 leading-tight mb-0.5">{item.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="relative rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl
                      shadow-[0_8px_32px_rgba(15,23,42,0.06)] p-6">
        <h4 className="text-base font-black text-slate-900 mb-5">Tech Stack</h4>
        <div className="grid grid-cols-4 gap-2.5">
          {SIDEBAR_TECH.map((name) => {
            const tech = getTechIcon(name);
            return (
              <motion.div
                key={name}
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50/70
                           py-3 hover:bg-white hover:border-blue-100 hover:shadow-sm transition-colors duration-300"
              >
                {tech && <tech.Icon size={18} style={{ color: tech.color }} />}
                <span className="text-[9px] font-bold text-slate-500 text-center leading-tight px-1">{name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mini CTA */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6
                      shadow-[0_12px_40px_rgba(29,111,235,0.35)]">
        <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        <motion.div
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 mb-4"
        >
          <Rocket size={20} className="text-white" strokeWidth={2.25} />
        </motion.div>
        <p className="relative z-10 text-white font-black text-lg leading-tight mb-1.5">Have an Idea?</p>
        <p className="relative z-10 text-blue-100 text-sm leading-relaxed mb-5">
          Let's build something amazing together!
        </p>
        <RippleLink
          href="#contact"
          className="relative z-10 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl
                     bg-white text-primary text-sm font-black hover:bg-blue-50 transition-colors"
        >
          Hire Me <RiArrowRightLine size={14} />
        </RippleLink>
      </div>
    </motion.aside>
  );
}

/* ── main section ──────────────────────────────────────── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const filtered = PROJECTS.filter((p) =>
    activeFilter === "Featured"
      ? p.featured
      : p.filter.includes(activeFilter)
  );

  return (
    <section id="projects" className="relative py-28 md:py-36 overflow-hidden">

      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, #1d6feb 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <motion.div
          className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(29,111,235,0.08) 0%, transparent 70%)", filter: "blur(60px)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-[420px] h-[420px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(5,150,105,0.05) 0%, transparent 70%)", filter: "blur(50px)" }}
          animate={{ x: [0, 24, 0], y: [0, 24, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        />
        {[
          { cx: "8%",  cy: "15%", d: 5,  del: 0 },
          { cx: "92%", cy: "20%", d: 4,  del: 1.5 },
          { cx: "5%",  cy: "70%", d: 6,  del: 3 },
          { cx: "95%", cy: "75%", d: 3.5,del: 0.8 },
          { cx: "50%", cy: "5%",  d: 4,  del: 2 },
          { cx: "48%", cy: "95%", d: 5,  del: 4 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{ left: dot.cx, top: dot.cy, width: dot.d, height: dot.d }}
            animate={{ y: [0, -12, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: dot.del }}
          />
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Section header ── */}
        <div ref={headerRef} className="text-center mb-8">

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest
                             bg-white/80 backdrop-blur border border-blue-100 text-primary shadow-[0_2px_12px_rgba(29,111,235,0.08)]">
              <Sparkles size={12} />
              Featured Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.05]"
          >
            Projects That{" "}
            <span className="relative inline-block">
              <span
                className="relative z-10"
                style={{
                  background: "linear-gradient(135deg, #1d6feb 0%, #2563eb 45%, #60a5fa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Make Impact
              </span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="text-slate-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-4"
          >
            A collection of things I've built with passion, precision and purpose.
          </motion.p>
        </div>

        {/* ── Animated stats bar ── */}
        <StatsBar />

        {/* ── Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.45, ease }}
          className="sticky top-2 z-30 -mx-6 px-6 sm:mx-0 sm:px-0 sm:static mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 py-2 sm:py-0
                          bg-white/70 backdrop-blur-xl rounded-full sm:bg-transparent sm:backdrop-blur-none">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.key;
              const Icon = tab.icon;
              const count =
                tab.key === "All"
                  ? PROJECTS.length
                  : tab.key === "Featured"
                  ? PROJECTS.filter((p) => p.featured).length
                  : PROJECTS.filter((p) => p.filter.includes(tab.key)).length;

              return (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold
                               border overflow-hidden transition-colors duration-300
                               ${isActive
                                 ? "border-primary text-white shadow-[0_4px_20px_rgba(29,111,235,0.4)]"
                                 : "bg-white/80 backdrop-blur border-slate-200 text-slate-500 hover:border-primary/40 hover:text-primary hover:shadow-md"
                               }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-0 bg-primary rounded-full"
                    />
                  )}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  <Icon size={14} className="relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center transition-colors
                      ${isActive ? "bg-white/25 text-white" : "bg-slate-100 text-slate-400"}`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Content grid: projects + sticky sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_336px] gap-8 xl:gap-12 items-start">

          <div>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeFilter}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6
                           sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:snap-none
                           sm:grid sm:grid-cols-2 xl:grid-cols-3 sm:gap-6"
              >
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <ProjectsSidebar />
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="mt-20 md:mt-24"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700
                          p-10 md:p-14 text-center">

            {/* glass shimmer layer */}
            <div className="pointer-events-none absolute inset-0 bg-white/[0.04] backdrop-blur-xl" />

            {/* animated glow */}
            <motion.div
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl"
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute -bottom-24 right-1/4 w-[320px] h-[320px] rounded-full bg-indigo-300/20 blur-3xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 4px 24px rgba(255,255,255,0.15)",
                    "0 4px 40px rgba(255,255,255,0.3)",
                    "0 4px 24px rgba(255,255,255,0.15)",
                  ],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 mb-6"
              >
                <Rocket size={26} className="text-white" strokeWidth={2.25} />
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3 leading-tight">
                Have an Amazing Idea?
              </h3>
              <p className="text-blue-100 text-base md:text-lg max-w-md mb-8 leading-relaxed">
                Let's build something incredible together.
              </p>

              <RippleLink
                href="#contact"
                className="inline-flex items-center gap-2.5 px-8 py-4
                           bg-white text-blue-700 text-sm font-black rounded-2xl
                           shadow-[0_8px_32px_rgba(0,0,0,0.2)]
                           hover:shadow-[0_12px_44px_rgba(0,0,0,0.28)]
                           transition-shadow duration-300 group"
              >
                <span className="relative z-10">Let's Work Together</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <RiArrowRightLine size={16} />
                </motion.span>
              </RippleLink>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}