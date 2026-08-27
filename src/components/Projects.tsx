import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiGithubFill, RiExternalLinkLine } from "react-icons/ri";

import img1 from "../assets/images/project-1.png";
import img2 from "../assets/images/project-2.png";
import img3 from "../assets/images/project-3.png";
import img4 from "../assets/images/project-4.png";
import img5 from "../assets/images/project-5.png";
import img6 from "../assets/images/project-6.png";

const categories = ["All", "Web Apps", "E-commerce", "AI", "Dashboards"];

const projects = [
  {
    id: 1,
    title: "NexaStore",
    category: "E-commerce",
    tags: ["React", "Node.js", "Stripe"],
    image: img1,
  },
  {
    id: 2,
    title: "StudioFolio",
    category: "Web Apps",
    tags: ["Next.js", "GSAP", "Tailwind"],
    image: img2,
  },
  {
    id: 3,
    title: "TaskFlow AI",
    category: "AI",
    tags: ["React", "OpenAI", "MongoDB"],
    image: img3,
  },
  {
    id: 4,
    title: "Taxi Now",
    category: "Web Apps",
    tags: ["React Native", "Firebase", "Maps"],
    image: img4,
  },
  {
    id: 5,
    title: "Brand Studio",
    category: "Web Apps",
    tags: ["React", "Framer Motion"],
    image: img5,
  },
  {
    id: 6,
    title: "AdminPro",
    category: "Dashboards",
    tags: ["React", "Recharts", "Tailwind"],
    image: img6,
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding relative bg-transparent">
      <div className="container-tight">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto shadow-[0_0_10px_rgba(29,111,235,0.8)]" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`interactive px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeCategory === cat 
                  ? "bg-primary border-primary text-white shadow-[0_4px_20px_rgba(29,111,235,0.4)]" 
                  : "bg-white border-blue-100 text-slate-600 hover:text-primary hover:border-blue-300 hover:shadow-md"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="group relative rounded-[2rem] overflow-hidden glass-card interactive cursor-pointer hover:shadow-[0_20px_40px_rgba(29,111,235,0.15)] hover:-translate-y-2 transition-all duration-500"
              >
                <div className="aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  <div className="absolute top-6 right-6 z-20">
                    <span className="px-4 py-2 text-xs font-bold bg-white/95 backdrop-blur shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-full border border-blue-100 text-primary">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-3xl font-serif font-bold text-white mb-3 group-hover:text-sky-300 transition-colors drop-shadow-md">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-mono text-white/90">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <a href="#" className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-xl transition-colors">
                      <RiExternalLinkLine /> Live Demo
                    </a>
                    <a href="#" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-bold rounded-xl transition-colors backdrop-blur">
                      <RiGithubFill /> Code
                    </a>
                  </div>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 border-2 border-primary rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen shadow-[inset_0_0_30px_rgba(29,111,235,0.4)]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}