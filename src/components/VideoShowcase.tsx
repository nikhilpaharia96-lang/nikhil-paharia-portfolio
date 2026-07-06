import { motion } from "framer-motion";
import { RiPlayFill } from "react-icons/ri";
import teaBg from "../assets/images/tea-sunset-portrait.png";

import vid1 from "../assets/images/video-1.png";
import vid2 from "../assets/images/video-2.png";
import vid3 from "../assets/images/video-3.png";

const videos = [
  { id: 1, title: "Cyberpunk City Nights", duration: "1:45", category: "Cinematic", image: vid1 },
  { id: 2, title: "Creative Workflow", duration: "0:59", category: "Instagram Reels", image: vid2 },
  { id: 3, title: "Neon Festival Aftermovie", duration: "2:15", category: "YouTube", image: vid3 },
];

export default function VideoShowcase() {
  return (
    <section id="videos" className="section-padding relative overflow-hidden section-wrap max-w-full">
      <div className="absolute inset-0 z-0">
        <img src={teaBg} alt="" className="w-full h-full object-cover object-center max-w-full" style={{ filter: "brightness(0.75) saturate(0.6)" }} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/70 to-sky-50/80" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/90 to-transparent" />
      </div>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="container-tight relative z-10 max-w-full">

        {/* Header: title from RIGHT, button from LEFT (both reversed from normal) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="section-title mb-4">Cinematic <span className="text-gradient">Reels</span></h2>
            <div className="section-divider" />
          </motion.div>

          <motion.a
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="interactive btn-outline px-6 py-3 min-h-0 bg-white/90 inline-flex items-center"
          >
            Available for editing <RiPlayFill className="text-primary text-lg ml-2" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video, index) => {
            const fromX = index === 0 ? -60 : index === 2 ? 60 : 0;
            const fromY = index === 1 ? 50 : 0;

            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: fromX, y: fromY }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.65, delay: index * 0.12, type: "spring", stiffness: 110 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-2xl overflow-hidden interactive cursor-pointer shadow-xl hover:shadow-[0_24px_48px_rgba(29,111,235,0.18)] transition-shadow duration-500 border border-white/50"
              >
                <div className="aspect-[9/16] md:aspect-[4/5] w-full relative max-w-full overflow-hidden">

                  {/* Image — zooms OUT on hover (reverse zoom) */}
                  <motion.img
                    loading="lazy"
                    src={video.image}
                    alt={video.title}
                    initial={{ scale: 1.06 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full h-full object-cover max-w-full"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                  {/* Play button — shrinks slightly on hover reveal, then pulses */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shadow-sm group-hover:shadow-[0_0_40px_rgba(29,111,235,0.55)]"
                    >
                      <RiPlayFill className="text-3xl text-white ml-1" />
                    </motion.div>
                  </div>

                  {/* Duration badge — slides from RIGHT on hover */}
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: -4 }}
                    className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-mono font-bold text-white"
                  >
                    {video.duration}
                  </motion.div>

                  {/* Category / title — slides DOWN from top (reversed: normally slides up) */}
                  <motion.div
                    initial={{ y: 0 }}
                    whileHover={{ y: 4 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/80 to-transparent"
                  >
                    <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                      {video.category}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white leading-tight break-words max-w-full">{video.title}</h3>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
