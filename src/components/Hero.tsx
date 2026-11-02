import { motion, useReducedMotion } from "framer-motion";
import { RiArrowRightUpLine, RiFolderChartLine, RiGroupLine, RiTimeLine, RiStarLine, RiMapPinLine } from "react-icons/ri";
import type { IconType } from "react-icons";
import { StatCounter } from "@/components/HeroStats";
import {
  FONT_TITLE, FONT_NOTE, FONT_CONDENSED, FONT_BODY, INK, HARD_SHADOW,
} from "@/components/ui/SectionHeader";
import portrait from "../assets/images/Desktop Nikhil Paharia profile photo.png";

const ease = [0.16, 1, 0.3, 1] as const;

// Keep these truthful — the counters animate to whatever is listed here.
const STATS: { value: string; label: string; Icon: IconType }[] = [
  { value: "96+",   label: "Projects Completed",    Icon: RiFolderChartLine },
  { value: "30+",   label: "Happy Clients",         Icon: RiGroupLine       },
  { value: "1096+", label: "Days of Experience",    Icon: RiTimeLine        },
  { value: "100%",  label: "Commitment to Quality", Icon: RiStarLine        },
];

const btnBase =
  "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold border-2 " +
  "transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60";

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 36 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  });

  return (
    <section
      id="home"
      className="relative w-full max-w-full overflow-hidden section-wrap pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20"
    >
      {/* technical-drawing corner brackets, same as the Projects section */}
      {[
        "top-24 left-5", "top-24 right-5 -scale-x-100",
        "bottom-6 left-5 rotate-180 -scale-x-100", "bottom-6 right-5 rotate-180",
      ].map((pos) => (
        <svg
          key={pos}
          viewBox="0 0 28 28" width="22" height="22" aria-hidden="true"
          className={`pointer-events-none absolute text-[#C9DCFF] ${pos}`}
        >
          <path d="M2 14V2h12" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      ))}

      <div className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-8 items-center">
          {/* ── Text ── */}
          <div>
            <motion.div {...rise(0)}>
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-black uppercase tracking-widest border-2 bg-white"
                style={{ borderColor: INK, color: "#0b35e8", fontFamily: FONT_BODY }}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Available for Hire
              </span>
            </motion.div>

            <motion.p
              {...rise(0.08)}
              className="mt-7 text-4xl sm:text-5xl text-white font-bold"
              style={{ fontFamily: FONT_TITLE }}
            >
              Hi, I'm
            </motion.p>

            <motion.h1
              {...rise(0.14)}
              className="uppercase text-white leading-[0.88] text-[clamp(3.6rem,15vw,9.5rem)]"
              style={{ fontFamily: FONT_CONDENSED, textShadow: `6px 6px 0 ${INK}` }}
            >
              Nikhil
              <br />
              Paharia
            </motion.h1>

            <motion.div {...rise(0.22)} className="mt-9">
              <span className="relative inline-block">
                <span
                  className="absolute inset-0 -m-3 sm:-m-4 rounded-xl"
                  style={{ background: INK, transform: "rotate(-1.5deg)", boxShadow: "0 16px 32px -12px rgba(5,13,43,0.55)" }}
                />
                <span
                  className="relative inline-block text-3xl sm:text-4xl md:text-5xl font-bold text-white px-2"
                  style={{ fontFamily: FONT_TITLE, transform: "rotate(-1deg)" }}
                >
                  Full-Stack Developer <span className="text-[#7fb2ff]">&amp;</span> Video Editor
                </span>
              </span>
            </motion.div>

            <motion.p
              {...rise(0.3)}
              className="mt-10 max-w-md text-lg sm:text-xl leading-relaxed text-white/90"
              style={{ fontFamily: FONT_NOTE }}
            >
              I build fast, modern and scalable web experiences that help businesses grow and stand out.
            </motion.p>

            <motion.div {...rise(0.38)} className="mt-9 flex flex-wrap gap-4">
              <a
                href="#contact"
                className={`${btnBase} bg-white`}
                style={{ borderColor: INK, color: "#0b35e8", boxShadow: `6px 6px 0 ${INK}`, fontFamily: FONT_BODY }}
              >
                Hire Me <RiArrowRightUpLine aria-hidden="true" />
              </a>
              <a
                href="#projects"
                className={`${btnBase} text-white hover:bg-white/10`}
                style={{ borderColor: "#fff", fontFamily: FONT_BODY }}
              >
                View My Work
              </a>
            </motion.div>
          </div>

          {/* ── Portrait card ── */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 48, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px] lg:justify-self-end"
          >
            <span
              className="absolute -top-3 left-10 z-20 h-6 w-24 -rotate-6"
              style={{ background: "rgba(255,255,255,0.78)", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
              aria-hidden="true"
            />
            <div
              className="relative overflow-hidden border-2"
              style={{ background: "#F0ECE3", borderColor: INK, boxShadow: HARD_SHADOW }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(11,53,232,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(11,53,232,0.12) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
                aria-hidden="true"
              />
              <img
                src={portrait}
                alt="Nikhil Paharia"
                className="relative block w-full aspect-[4/5] object-cover object-top"
                draggable={false}
              />
              <div
                className="relative flex items-center justify-between gap-3 border-t-2 px-4 py-3"
                style={{ borderColor: INK, background: "#0b35e8", color: "#fff", fontFamily: FONT_BODY }}
              >
                <span className="text-[11px] font-bold uppercase tracking-widest">Web · Video · Stories</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest">
                  <RiMapPinLine aria-hidden="true" /> Assam, India
                </span>
              </div>
            </div>

            {/* sticky note */}
            <div
              className="absolute -bottom-8 -left-4 sm:-left-10 z-20 w-40 p-3 rounded-sm"
              style={{ background: "#FFF6D6", transform: "rotate(-5deg)", boxShadow: "0 14px 28px -10px rgba(5,13,43,0.5)" }}
            >
              <p className="text-xl leading-tight text-slate-800" style={{ fontFamily: FONT_TITLE }}>
                Let's build something bold.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Stats ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="mt-20 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {STATS.map(({ value, label, Icon }, i) => (
            <div
              key={label}
              className="bp-light border-2 p-4 sm:p-5 bg-white"
              style={{
                borderColor: INK,
                boxShadow: `6px 6px 0 ${INK}`,
                transform: `rotate(${[-1, 0.8, -0.6, 1][i]}deg)`,
                fontFamily: FONT_BODY,
              }}
            >
              <Icon className="text-xl text-[#0b35e8]" aria-hidden="true" />
              <p className="mt-2 text-4xl sm:text-5xl text-slate-900 leading-none" style={{ fontFamily: FONT_CONDENSED }}>
                <StatCounter value={value} />
              </p>
              <p className="mt-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide text-slate-600">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
