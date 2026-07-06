import { motion } from "framer-motion";
import teaAboutBg from "../assets/images/tea-sunset-person-wide.png";
import { RiCodeSSlashLine, RiVideoAddLine, RiPaletteLine } from "react-icons/ri";

const timeline = [
  { year: "2020", title: "Started Video Editing", desc: "Discovered the art of visual storytelling. Spent countless hours mastering Premiere Pro and After Effects." },
  { year: "2021", title: "Learned Web Development", desc: "HTML, CSS, JavaScript became my new tools. Realized I could build the things I imagined." },
  { year: "2022", title: "Built First Client Projects", desc: "Turned skills into freelance income. Delivered high-quality websites and edits to local businesses." },
  { year: "2023", title: "Full Stack Mastery", desc: "React, Node.js, MongoDB became my stack. Started building complex, interactive web applications." },
  { year: "2024", title: "Premium Digital Creator", desc: "Fusing code and video to build truly cinematic digital experiences for global clients." },
];

const statCards = [
  { Icon: RiCodeSSlashLine, color: "text-primary", val: "15+", label: "Techs" },
  { Icon: RiVideoAddLine, color: "text-accent", val: "50+", label: "Videos" },
  { Icon: RiPaletteLine, color: "text-secondary", val: "100%", label: "Passion" },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden section-wrap max-w-full">
      <div className="absolute inset-0 z-0">
        <img src={teaAboutBg} alt="" className="w-full h-full object-cover object-center max-w-full" style={{ filter: "brightness(0.82) saturate(0.8)" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-blue-50/70 to-white/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/80" />
      </div>

      <div className="container-tight relative z-10 max-w-full">

        {/* Header — slides from LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-20"
        >
          <h2 className="section-title mb-4">The <span className="text-gradient">Story</span></h2>
          <div className="section-divider" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 w-full">

          {/* Timeline — alternates left / right */}
          <div className="flex-1 order-2 lg:order-1 relative w-full">
            <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-primary via-accent to-sky-300 rounded-full opacity-60" />

            <div className="flex flex-col gap-12 w-full">
              {timeline.map((item, index) => {
                const isRight = index % 2 !== 0;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: isRight ? 60 : -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                    className="relative pl-14 md:pl-0 md:w-1/2 group max-w-full overflow-hidden"
                    style={{ marginLeft: isRight ? 'auto' : '0' }}
                  >
                    <div
                      className="absolute left-0 md:left-auto md:right-[-20px] top-1 w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center z-10 shadow-[0_0_15px_rgba(29,111,235,0.4)] group-hover:scale-110 transition-transform"
                      style={isRight ? { left: '-20px', right: 'auto' } : {}}
                    >
                      <motion.div whileHover={{ scale: 1.4 }} className="w-3 h-3 rounded-full bg-primary group-hover:shadow-[0_0_10px_rgba(29,111,235,0.8)]" />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02, x: isRight ? -4 : 4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="glass-card p-6 card-hover md:mr-10"
                      style={isRight ? { marginLeft: '2.5rem', marginRight: '0' } : {}}
                    >
                      <div className="text-sm font-mono text-primary mb-2 tracking-widest bg-blue-50 w-fit px-3 py-1 rounded-full">{item.year}</div>
                      <h3 className="text-xl font-bold text-foreground mb-3 font-serif">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right panel — slides from RIGHT (reverse) */}
          <div className="flex-1 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="sticky top-32 glass-card p-8 md:p-12 glow-border"
            >
              <div className="mb-8 pb-6 border-b border-blue-100/60">
                <p className="text-primary/80 italic font-serif text-lg text-center">
                  "From the green hills of Assam to the digital world..."
                </p>
              </div>

              <h3 className="text-3xl font-serif font-bold mb-6 text-foreground">Who am I?</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-6 font-light">
                From learning to edit videos at 16, to building full-stack web apps, this is the story of a creator who never stopped learning.
              </p>
              <p className="text-slate-500 leading-relaxed mb-10">
                I don't just write code or cut clips. I craft experiences. Whether it's a high-converting e-commerce platform, a stunning portfolio, or a high-retention YouTube reel, my goal is always the same: capture attention and leave a lasting impression.
              </p>

              <div className="grid grid-cols-3 gap-4">
                {statCards.map(({ Icon, color, val, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.08, y: -4 }}
                    className="glass-card p-4 text-center cursor-default"
                  >
                    <Icon className={`text-3xl ${color} mx-auto mb-2`} />
                    <div className="text-xl font-bold text-foreground">{val}</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">{label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
