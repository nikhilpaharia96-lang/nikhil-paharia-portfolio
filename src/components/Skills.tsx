import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { SiHtml5, SiCss, SiJavascript, SiReact, SiNodedotjs, SiMongodb, SiFirebase, SiTailwindcss, SiYoutube, SiInstagram, SiBlender, SiFigma } from "react-icons/si";

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
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card p-6 md:p-8 h-full transition-transform duration-200 ease-out flex flex-col gap-6 group interactive cursor-pointer bg-white gradient-border hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(29,111,235,0.15)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex items-center gap-5" style={{ transform: "translateZ(30px)" }}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner border border-white">
            <Icon className="text-3xl drop-shadow-md" style={{ color: skill.color }} />
          </div>
          <h4 className="font-bold text-xl text-foreground">{skill.name}</h4>
        </div>
        
        <div className="mt-auto pt-2" style={{ transform: "translateZ(20px)" }}>
          <div className="flex justify-between text-xs text-slate-400 mb-3 font-mono">
            <span>Proficiency</span>
            <span className="text-primary font-bold">{skill.level}%</span>
          </div>
          <div className="h-2 w-full bg-blue-100/50 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 + (index * 0.05) }}
              className="h-full bg-gradient-to-r from-primary via-accent to-secondary relative rounded-full"
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-sm shadow-[0_0_8px_rgba(29,111,235,0.6)]" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<"web" | "video">("web");

  return (
    <section id="skills" className="section-padding relative bg-blue-50/60 overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container-tight relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex p-1.5 glass-card rounded-full w-fit"
          >
            <button
              onClick={() => setActiveTab("web")}
              className={`interactive px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === "web" 
                  ? "bg-primary text-white shadow-[0_4px_15px_rgba(29,111,235,0.4)]" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              Web Development
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`interactive px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === "video" 
                  ? "bg-accent text-white shadow-[0_4px_15px_rgba(37,99,235,0.4)]" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
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