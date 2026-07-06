import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { SiHtml5, SiCss, SiJavascript, SiReact, SiNodedotjs, SiMongodb, SiFirebase, SiTailwindcss, SiYoutube, SiInstagram, SiBlender, SiFigma } from "react-icons/si";
import teaBg from "../assets/images/tea-sunset-landscape.png";

const webSkills = [
  { name: "React / Next.js", icon: SiReact, level: 95, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, level: 85, color: "#339933" },
  { name: "JavaScript / TS", icon: SiJavascript, level: 90, color: "#F7DF1E" },
  { name: "Tailwind CSS", icon: SiTailwindcss, level: 95, color: "#06B6D4" },
  { name: "MongoDB", icon: SiMongodb, level: 80, color: "#47A248" },
  { name: "Firebase", icon: SiFirebase, level: 75, color: "#FFCA28" },
  { name: "HTML5", icon: SiHtml5, level: 100, color: "#E34F26" },
  { name: "CSS", icon: SiCss, level: 95, color: "#1572B6" },
];

const videoSkills = [
  { name: "Premiere Pro", icon: SiBlender, level: 95, color: "#9999FF" },
  { name: "After Effects", icon: SiBlender, level: 85, color: "#9999FF" },
  { name: "YouTube Editing", icon: SiYoutube, level: 90, color: "#FF0000" },
  { name: "Instagram Reels", icon: SiInstagram, level: 95, color: "#E1306C" },
  { name: "Motion Graphics", icon: SiBlender, level: 80, color: "#9999FF" },
  { name: "UI/UX Design", icon: SiFigma, level: 85, color: "#F24E1E" },
];

function SkillCard({ skill, index }: { skill: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="p-6 md:p-8 h-full transition-transform duration-200 ease-out flex flex-col gap-6 group interactive cursor-pointer
                   bg-white/70 backdrop-blur-md rounded-2xl
                   border border-blue-100
                   hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(29,111,235,0.15)] hover:border-blue-200
                   max-w-full"
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-blue-50">
            <Icon className="text-3xl drop-shadow-md" style={{ color: skill.color }} />
          </div>
          <h4 className="font-bold text-xl text-foreground">{skill.name}</h4>
        </div>

        <div className="mt-auto pt-2">
          <div className="flex justify-between text-xs text-slate-400 mb-3 font-mono">
            <span>Proficiency</span>
            <span className="text-primary font-bold">{skill.level}%</span>
          </div>
          <div className="h-2 w-full bg-blue-50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.2 + (index * 0.05) }}
              className="h-full bg-gradient-to-r from-blue-400 to-sky-400 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<"web" | "video">("web");

  return (
    <section id="skills" className="section-padding relative overflow-hidden section-wrap max-w-full">

      {/* ── Background — same treatment as Hero ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={teaBg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.78) saturate(0.65)' }}
        />
        {/* white gradient overlays — identical to Hero */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-blue-50/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-transparent to-white/40" />
      </div>

      {/* ── Fog orbs — same as Hero ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-[120px]" style={{ animation: 'fogDrift 12s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-200/20 rounded-full blur-[100px]" style={{ animation: 'fogDrift 16s ease-in-out infinite reverse' }} />
      </div>

      <div className="container-tight relative z-10 max-w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title mb-4 text-foreground">
              My <span className="text-gradient">Arsenal</span>
            </h2>
            <div className="section-divider" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="flex p-1.5 rounded-full w-fit bg-white/60 backdrop-blur border border-slate-200"
          >
            <button
              onClick={() => setActiveTab("web")}
              className={`interactive px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === "web"
                  ? "bg-primary text-white shadow-md"
                  : "bg-transparent text-slate-600 hover:text-primary"
              }`}
            >
              Web Development
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`interactive px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === "video"
                  ? "bg-primary text-white shadow-md"
                  : "bg-transparent text-slate-600 hover:text-primary"
              }`}
            >
              Video Editing
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {(activeTab === "web" ? webSkills : videoSkills).map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}