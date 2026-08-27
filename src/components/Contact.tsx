import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { RiGithubFill, RiLinkedinFill, RiInstagramLine, RiYoutubeFill, RiSendPlaneFill } from "react-icons/ri";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully!", {
        description: "I'll get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-transparent">
      {/* Decorative Background */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent -z-10" />
      <div className="absolute -left-[20%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container-tight relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="flex-1 w-full relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 leading-[1.1] text-foreground">
                Ready to start your <br/> <span className="text-gradient">next project?</span>
              </h2>
              <p className="text-xl text-slate-600 mb-12 font-light max-w-lg leading-relaxed">
                Whether you need a full-stack application, a cinematic video, or a complete digital brand overhaul, let's build something extraordinary together.
              </p>
              
              <div className="flex gap-6">
                <a href="#" className="interactive w-16 h-16 rounded-full bg-white shadow-lg border border-blue-100 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <RiGithubFill className="text-3xl" />
                </a>
                <a href="#" className="interactive w-16 h-16 rounded-full bg-white shadow-lg border border-blue-100 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <RiLinkedinFill className="text-3xl" />
                </a>
                <a href="#" className="interactive w-16 h-16 rounded-full bg-white shadow-lg border border-blue-100 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <RiInstagramLine className="text-3xl" />
                </a>
                <a href="#" className="interactive w-16 h-16 rounded-full bg-white shadow-lg border border-blue-100 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <RiYoutubeFill className="text-3xl" />
                </a>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            <form onSubmit={handleSubmit} className="glass-card bg-white/95 p-8 md:p-12 flex flex-col gap-8 shadow-2xl border-blue-100/80">
              <div className="relative">
                <label 
                  className={`absolute left-5 transition-all duration-300 font-mono text-sm pointer-events-none z-10 ${
                    focusedField === 'name' ? '-top-3 bg-white px-2 text-primary font-bold shadow-sm rounded-full' : 'top-5 text-slate-400'
                  }`}
                >
                  Full Name
                </label>
                <input 
                  type="text" 
                  required
                  onFocus={() => setFocusedField('name')}
                  onBlur={(e) => setFocusedField(e.target.value ? 'name' : null)}
                  className="w-full bg-blue-50/30 border border-blue-200 rounded-2xl px-5 py-5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all interactive text-lg"
                />
              </div>
              
              <div className="relative">
                <label 
                  className={`absolute left-5 transition-all duration-300 font-mono text-sm pointer-events-none z-10 ${
                    focusedField === 'email' ? '-top-3 bg-white px-2 text-primary font-bold shadow-sm rounded-full' : 'top-5 text-slate-400'
                  }`}
                >
                  Email Address
                </label>
                <input 
                  type="email" 
                  required
                  onFocus={() => setFocusedField('email')}
                  onBlur={(e) => setFocusedField(e.target.value ? 'email' : null)}
                  className="w-full bg-blue-50/30 border border-blue-200 rounded-2xl px-5 py-5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all interactive text-lg"
                />
              </div>

              <div className="relative">
                <label 
                  className={`absolute left-5 transition-all duration-300 font-mono text-sm pointer-events-none z-10 ${
                    focusedField === 'subject' ? '-top-3 bg-white px-2 text-primary font-bold shadow-sm rounded-full' : 'top-5 text-slate-400'
                  }`}
                >
                  Subject
                </label>
                <input 
                  type="text" 
                  required
                  onFocus={() => setFocusedField('subject')}
                  onBlur={(e) => setFocusedField(e.target.value ? 'subject' : null)}
                  className="w-full bg-blue-50/30 border border-blue-200 rounded-2xl px-5 py-5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all interactive text-lg"
                />
              </div>
              
              <div className="relative">
                <label 
                  className={`absolute left-5 transition-all duration-300 font-mono text-sm pointer-events-none z-10 ${
                    focusedField === 'message' ? '-top-3 bg-white px-2 text-primary font-bold shadow-sm rounded-full' : 'top-5 text-slate-400'
                  }`}
                >
                  Message
                </label>
                <textarea 
                  rows={4}
                  required
                  onFocus={() => setFocusedField('message')}
                  onBlur={(e) => setFocusedField(e.target.value ? 'message' : null)}
                  className="w-full bg-blue-50/30 border border-blue-200 rounded-2xl px-5 py-5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none interactive text-lg"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="interactive w-full py-5 bg-primary text-white font-bold rounded-2xl uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(29,111,235,0.4)] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-2 text-sm hover:-translate-y-1"
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