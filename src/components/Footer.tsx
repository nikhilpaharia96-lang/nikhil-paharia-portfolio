import { RiArrowUpLine, RiGithubFill, RiLinkedinFill, RiInstagramLine, RiYoutubeFill } from "react-icons/ri";
import teaBg from "../assets/images/tea-garden-bg.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-blue-50/30 to-white pt-32 pb-12 border-t border-blue-100 overflow-hidden">
      {/* Subtle tea garden watermark */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none">
        <img src={teaBg} className="w-full h-full object-cover object-center grayscale" alt="" />
      </div>
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      <div className="container-tight relative z-10">
        
        {/* Top Decorative Section */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Let's build the <span className="text-gradient">future</span>.
          </h2>
          <p className="text-lg text-slate-500 font-light">
            Available for freelance opportunities globally. Bring your boldest ideas.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
          <div className="text-center md:text-left">
            <a href="#home" className="font-mono text-3xl font-bold text-primary tracking-wider block mb-3 flex items-center justify-center md:justify-start gap-2">
              <span className="text-accent">//</span> DEVFOLIO
            </a>
            <p className="text-slate-500 text-base">Crafting cinematic digital experiences.</p>
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-600">
              <a href="#home" className="hover:text-primary transition-colors interactive">Home</a>
              <a href="#about" className="hover:text-primary transition-colors interactive">About</a>
              <a href="#projects" className="hover:text-primary transition-colors interactive">Projects</a>
              <a href="#videos" className="hover:text-primary transition-colors interactive">Videos</a>
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="interactive w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all duration-300">
                <RiGithubFill className="text-lg" />
              </a>
              <a href="#" className="interactive w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all duration-300">
                <RiLinkedinFill className="text-lg" />
              </a>
              <a href="#" className="interactive w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all duration-300">
                <RiInstagramLine className="text-lg" />
              </a>
              <a href="#" className="interactive w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all duration-300">
                <RiYoutubeFill className="text-lg" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-blue-100">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} DevFolio. <span className="hidden sm:inline">All rights reserved.</span>
          </p>
          
          <p className="text-slate-400 text-xs tracking-widest uppercase font-mono italic">
            Crafted in Assam, for the world
          </p>
          
          <button 
            onClick={scrollToTop}
            className="interactive w-12 h-12 rounded-full bg-white border border-blue-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:shadow-[0_0_20px_rgba(29,111,235,0.4)] hover:-translate-y-1 text-slate-600"
            aria-label="Scroll to top"
          >
            <RiArrowUpLine className="text-2xl" />
          </button>
        </div>
      </div>
    </footer>
  );
}