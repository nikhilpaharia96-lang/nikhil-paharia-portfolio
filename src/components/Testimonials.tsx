import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { RiStarFill } from "react-icons/ri";
import {
  SiReact, SiFirebase, SiMongodb, SiNodedotjs,
} from "react-icons/si";
import {
  RiShoppingBag3Fill, RiGroupFill, RiHeartPulseFill,
  RiMapPin2Fill, RiUserStarFill,
} from "react-icons/ri";

/* ── Testimonials data ─────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    name: "Rohan Sharma",
    role: "Founder",
    company: "ApunBazar",
    companyColor: "#1d6feb",
    initials: "RS",
    avatarFrom: "#1d6feb",
    avatarTo: "#3b82f6",
    content:
      "Nikhil is a highly skilled developer who delivers clean, modern and scalable solutions. He's professional, dedicated and great to work with.",
    rating: 5,
  },
  {
    id: 2,
    name: "Anjan Kalita",
    role: "Student Leader",
    company: "Jagiroad College",
    companyColor: "#7c3aed",
    initials: "AK",
    avatarFrom: "#7c3aed",
    avatarTo: "#a78bfa",
    content:
      "Working with Nikhil was a smooth experience. He understood the requirements perfectly and built a fantastic platform for our college community.",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Deka",
    role: "Co-Founder",
    company: "FitBite",
    companyColor: "#059669",
    initials: "PD",
    avatarFrom: "#059669",
    avatarTo: "#34d399",
    content:
      "Nikhil is not just a developer but a problem solver. He has a great eye for detail and delivers results before deadlines.",
    rating: 5,
  },
];

/* ── Brands / trusted-by bar ───────────────────────────── */
const BRANDS = [
  { label: "ApunBazar",      Icon: RiShoppingBag3Fill, color: "#1d6feb" },
  { label: "Campus Unity",   Icon: RiGroupFill,         color: "#7c3aed" },
  { label: "FitBite",        Icon: RiHeartPulseFill,    color: "#f59e0b" },
  { label: "Travel Assam",   Icon: RiMapPin2Fill,        color: "#10b981" },
  { label: "Various Clients",Icon: RiUserStarFill,       color: "#1d6feb" },
];

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Individual testimonial card ──────────────────────── */
function TestimonialCard({ t, index, active }: {
  t: typeof TESTIMONIALS[0];
  index: number;
  active: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(29,111,235,0.14)" }}
      className={`group relative flex flex-col bg-white rounded-2xl p-7
                  border transition-all duration-300
                  ${active
                    ? "border-blue-200 shadow-[0_8px_32px_rgba(29,111,235,0.12)]"
                    : "border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                  }`}
    >
      {/* Top row: quote + stars */}
      <div className="flex items-start justify-between mb-5">
        {/* Blue quote mark */}
        <div
          className="text-5xl leading-none font-serif select-none"
          style={{ color: "#1d6feb", fontFamily: "Georgia, serif", lineHeight: 1 }}
        >
          &#8220;
        </div>

        {/* Stars */}
        <div className="flex gap-0.5 mt-1">
          {Array.from({ length: t.rating }).map((_, i) => (
            <RiStarFill key={i} className="text-amber-400 text-base" />
          ))}
        </div>
      </div>

      {/* Content */}
      <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
        {t.content}
      </p>

      {/* Divider */}
      <div className="h-px bg-slate-100 mb-5" />

      {/* Author */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0 shadow-sm"
          style={{ background: `linear-gradient(135deg, ${t.avatarFrom}, ${t.avatarTo})` }}
        >
          {t.initials}
        </div>

        <div>
          <p className="font-bold text-slate-900 text-sm leading-tight">{t.name}</p>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.role},{" "}
            <span className="font-semibold" style={{ color: t.companyColor }}>
              {t.company}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main section ─────────────────────────────────────── */
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const brandsRef = useRef(null);
  const brandsInView = useInView(brandsRef, { once: true, margin: "-40px" });

  /* Auto-advance for mobile dot navigation */
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Subtle light blue gradient bg */}
      <div className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, #f0f7ff 0%, #ffffff 60%, #f8fbff 100%)" }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #1d6feb 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3"
          >
            Client{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #1d6feb 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Stories
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={headerInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="mx-auto flex items-center justify-center gap-2 mb-4"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40 rounded-full" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40 rounded-full" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease }}
            className="text-slate-500 text-base max-w-md mx-auto"
          >
            What my clients say about working with me.
          </motion.p>
        </div>

        {/* ── 3-column cards (desktop) / stacked (mobile) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} active={active === i} />
          ))}
        </div>

        {/* ── Pagination dots ── */}
        <div className="flex justify-center gap-2 mb-16">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "bg-primary w-6 h-2.5"
                  : "bg-slate-300 hover:bg-slate-400 w-2.5 h-2.5"
              }`}
            />
          ))}
        </div>

        {/* ── Trusted by brands ── */}
        <motion.div
          ref={brandsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={brandsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="bg-white rounded-2xl border border-slate-100
                     shadow-[0_4px_24px_rgba(0,0,0,0.05)]
                     px-6 py-6"
        >
          <p className="text-center text-slate-800 font-black text-base mb-5 tracking-tight">
            Trusted by People & Brands
          </p>

          {/* Thin divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-5" />

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-0 md:divide-x md:divide-slate-100">
            {BRANDS.map((b, i) => {
              const Icon = b.Icon;
              return (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={brandsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease }}
                  whileHover={{ scale: 1.07 }}
                  className="flex items-center gap-2 px-6 py-1 cursor-default"
                >
                  <Icon
                    size={20}
                    style={{ color: b.color }}
                    className="shrink-0"
                  />
                  <span className="text-sm font-semibold text-slate-600 whitespace-nowrap">
                    {b.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
