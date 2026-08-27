import { motion } from "framer-motion";
import { RiCodeSSlashLine, RiLayoutMasonryLine, RiSmartphoneLine, RiVideoChatLine, RiMovieLine, RiDashboard3Line, RiInstagramLine, RiBrushLine } from "react-icons/ri";

const services = [
  {
    title: "Full Stack Web Dev",
    desc: "End-to-end web applications with React, Node.js, and databases.",
    icon: RiCodeSSlashLine,
    price: "From $500",
  },
  {
    title: "Responsive Design",
    desc: "Websites that look perfect on every device and screen size.",
    icon: RiSmartphoneLine,
    price: "From $300",
  },
  {
    title: "Landing Pages",
    desc: "High-converting, beautiful landing pages that drive sales.",
    icon: RiLayoutMasonryLine,
    price: "From $200",
  },
  {
    title: "Admin Dashboards",
    desc: "Complex data visualization and management panels.",
    icon: RiDashboard3Line,
    price: "From $600",
  },
  {
    title: "UI/UX Design",
    desc: "Wireframes, prototypes, and stunning user interfaces in Figma.",
    icon: RiBrushLine,
    price: "From $250",
  },
  {
    title: "Cinematic Editing",
    desc: "Premium video editing for YouTube, commercials, and events.",
    icon: RiMovieLine,
    price: "From $150",
  },
  {
    title: "Social Media Reels",
    desc: "Fast-paced, engaging short-form content for TikTok and IG.",
    icon: RiInstagramLine,
    price: "From $50",
  },
  {
    title: "Motion Graphics",
    desc: "Custom animations, intros, and visual effects for videos.",
    icon: RiVideoChatLine,
    price: "From $100",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white -z-10" />
      
      <div className="container-tight relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="section-title mb-4">
            What I <span className="text-gradient">Offer</span>
          </h2>
          <div className="section-divider mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const num = (index + 1).toString().padStart(2, '0');
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 interactive cursor-pointer relative overflow-hidden bg-white border border-blue-100 rounded-3xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(29,111,235,0.12)] gradient-border"
              >
                {/* Background number */}
                <div className="absolute -right-4 -top-6 text-[120px] font-serif font-black text-blue-50/50 group-hover:text-primary/5 transition-colors duration-500 select-none z-0">
                  {num}
                </div>
                
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-sky-400/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 relative z-10 shadow-inner">
                  <Icon className="text-3xl text-primary group-hover:text-accent transition-colors duration-500" />
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4 relative z-10 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-8 relative z-10 font-light">{service.desc}</p>
                
                <div className="mt-auto pt-6 border-t border-blue-100/50 flex items-center justify-between relative z-10">
                  <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-mono text-sm font-bold">
                    {service.price}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}