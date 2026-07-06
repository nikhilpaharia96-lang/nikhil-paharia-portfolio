import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { RiGithubFill, RiLinkedinFill, RiInstagramLine, RiYoutubeFill, RiSendPlaneFill } from "react-icons/ri";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully!", {
        description: "I'll get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-transparent section-wrap max-w-full">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent -z-10" />
      <div className="absolute -left-20 top-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="container-tight relative z-10 max-w-full">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center">
          
          <div className="w-full relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-[1.1] text-foreground max-w-full">
                Ready to start your <br/> <span className="text-gradient">next project?</span>
              </h2>
              <p className="text-xl text-slate-600 mb-12 font-light max-w-lg leading-relaxed max-w-full">
                Whether you need a full-stack application, a cinematic video, or a complete digital brand overhaul, let's build something extraordinary together.
              </p>
              
              <div className="flex gap-4 flex-wrap">
                <a href="#" className="w-11 h-11 rounded-full flex items-center justify-center border border-blue-100 hover:bg-blue-50 hover:border-primary/40 transition-all text-slate-700">
                  <RiGithubFill className="text-2xl" />
                </a>
                <a href="#" className="w-11 h-11 rounded-full flex items-center justify-center border border-blue-100 hover:bg-blue-50 hover:border-primary/40 transition-all text-slate-700">
                  <RiLinkedinFill className="text-2xl" />
                </a>
                <a href="#" className="w-11 h-11 rounded-full flex items-center justify-center border border-blue-100 hover:bg-blue-50 hover:border-primary/40 transition-all text-slate-700">
                  <RiInstagramLine className="text-2xl" />
                </a>
                <a href="#" className="w-11 h-11 rounded-full flex items-center justify-center border border-blue-100 hover:bg-blue-50 hover:border-primary/40 transition-all text-slate-700">
                  <RiYoutubeFill className="text-2xl" />
                </a>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-full"
          >
            <form onSubmit={handleSubmit} className="glass-premium p-8 md:p-12 flex flex-col gap-6">
              <div className="grid sm:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    required
                    className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    required
                    className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition"
                  />
              </div>
              <input 
                type="text" 
                placeholder="Subject"
                required
                className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition"
              />
              <textarea 
                rows={5}
                placeholder="Message"
                required
                className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition resize-none"
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(29,111,235,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-2"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Send Message <RiSendPlaneFill className="text-xl" /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
