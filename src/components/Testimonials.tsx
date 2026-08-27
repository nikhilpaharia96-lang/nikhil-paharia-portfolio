import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { RiStarFill, RiArrowLeftSLine, RiArrowRightSLine, RiDoubleQuotesL } from "react-icons/ri";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CEO, TechFlow",
    content: "Absolutely phenomenal work. The website looks incredibly premium, and the subtle animations he added made all the difference. Our conversion rate increased by 40% in the first month.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Content Creator",
    content: "He edited my last 10 YouTube videos and the retention graphs are insane. He understands pacing and storytelling better than anyone I've worked with. Worth every penny.",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Founder, Bloom Studio",
    content: "We hired him for a full-stack dashboard and he delivered ahead of schedule. The code is clean, the UI is gorgeous, and the communication was professional throughout.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Marketing Director",
    content: "The promo reel he cut for our product launch looked like a Hollywood movie trailer. We had clients asking which agency we hired.",
    rating: 5,
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Startup Founder",
    content: "He didn't just build what I asked for, he suggested better ways to implement features. A true partner in the development process, not just a freelancer.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section id="testimonials" className="section-padding relative bg-blue-50 overflow-hidden">
      {/* Subtle tea garden pattern/texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzFkNmZlYiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-50" />
      
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
              Client <span className="text-gradient">Stories</span>
            </h2>
            <div className="section-divider" />
          </div>
          
          <div className="flex gap-4">
            <button onClick={scrollPrev} className="interactive w-14 h-14 rounded-full bg-white shadow-lg border border-blue-100 flex items-center justify-center hover:bg-blue-50 hover:text-primary transition-all duration-300 hover:scale-105">
              <RiArrowLeftSLine className="text-3xl" />
            </button>
            <button onClick={scrollNext} className="interactive w-14 h-14 rounded-full bg-white shadow-lg border border-blue-100 flex items-center justify-center hover:bg-blue-50 hover:text-primary transition-all duration-300 hover:scale-105">
              <RiArrowRightSLine className="text-3xl" />
            </button>
          </div>
        </motion.div>

        <div className="overflow-hidden py-8" ref={emblaRef}>
          <div className="flex -ml-6">
            {testimonials.map((t) => (
              <div key={t.id} className="flex-[0_0_100%] md:flex-[0_0_60%] lg:flex-[0_0_40%] min-w-0 pl-6">
                <div className="glass-card p-8 md:p-12 h-full flex flex-col relative group bg-white border-blue-100/60 shadow-xl transition-transform duration-500 hover:-translate-y-2">
                  <RiDoubleQuotesL className="absolute top-8 right-8 text-[120px] text-primary/5 group-hover:text-primary/10 transition-colors duration-500 font-serif leading-none" />
                  
                  <div className="flex gap-1.5 mb-8 relative z-10">
                    {[...Array(t.rating)].map((_, i) => (
                      <RiStarFill key={i} className="text-yellow-400 text-xl drop-shadow-sm" />
                    ))}
                  </div>
                  
                  <p className="text-lg md:text-xl leading-relaxed text-slate-700 mb-10 italic flex-1 relative z-10 font-light">
                    "{t.content}"
                  </p>
                  
                  <div className="flex items-center gap-5 pt-6 border-t border-blue-100/60 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-sky-400 p-[3px] shadow-lg">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xl font-serif font-bold text-primary">
                        {t.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">{t.name}</h4>
                      <p className="text-sm text-slate-500 font-mono mt-1">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}