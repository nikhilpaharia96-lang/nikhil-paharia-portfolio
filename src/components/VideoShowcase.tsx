import { motion } from "framer-motion";
import { RiPlayFill } from "react-icons/ri";
import teaBg from "../assets/images/tea-garden-bg.png";

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
    <section id="videos" className="section-padding relative overflow-hidden">
      {/* Tea garden background */}
      <div className="absolute inset-0 z-0">
        <img src={teaBg} alt="" className="w-full h-full object-cover object-center" style={{ filter: "brightness(0.85) saturate(0.7)" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/75 via-white/65 to-sky-50/75" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/80 to-transparent" />
      </div>
      {/* Ambient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" style={{ animationDelay: "2s" }}/>

      <div className="container-tight relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="section-title mb-4">
              Cinematic <span className="text-gradient">Reels</span>
            </h2>
            <div className="section-divider" />
          </div>
          
          <a href="#contact" className="interactive btn-outline px-6 py-3 min-h-0 bg-white/90">
            Available for editing <RiPlayFill className="text-primary text-lg ml-2" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden interactive cursor-pointer shadow-xl hover:shadow-[0_20px_40px_rgba(29,111,235,0.2)] transition-all duration-500 border border-white/50"
            >
              <div className="aspect-[9/16] md:aspect-[4/5] w-full relative">
                <img 
                  src={video.image} 
                  alt={video.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(29,111,235,0.7)] border border-white/50">
                    <RiPlayFill className="text-4xl text-white ml-2 drop-shadow-md" />
                  </div>
                </div>

                <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-mono font-bold text-white shadow-lg border border-white/10">
                  {video.duration}
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-md">
                    {video.category}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white leading-tight drop-shadow-md">{video.title}</h3>
                </div>
                
                {/* Neon bottom border on hover */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_20px_rgba(29,111,235,0.8)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}