import { motion } from "framer-motion";
import { RiArrowUpLine, RiGithubFill, RiLinkedinFill, RiInstagramLine, RiYoutubeFill } from "react-icons/ri";
import teaBg from "../assets/images/tea-garden-bg.png";

const socials = [
  { Icon: RiGithubFill, href: "#", hoverBg: "hover:bg-slate-900" },
  { Icon: RiLinkedinFill, href: "#", hoverBg: "hover:bg-[#0A66C2]" },
  { Icon: RiInstagramLine, href: "#", hoverBg: "hover:bg-[#E1306C]" },
  { Icon: RiYoutubeFill, href: "#", hoverBg: "hover:bg-[#FF0000]" },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Videos", href: "#videos" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-gradient-to-b from-blue-50/30 to-white pt-32 pb-12 border-t border-blue-100 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none">
        <img src={teaBg} className="w-full h-full object-cover object-center grayscale" alt="" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container-tight relative z-10">

        {/* Hero text — slides from BOTTOM then reverses on scroll */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24 max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Let's build the <span className="text-gradient">future</span>.
          </h2>
          <p className="text-lg text-slate-500 font-light">
            Available for freelance opportunities globally. Bring your boldest ideas.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">

          {/* Brand — from LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <a href="#home" className="font-mono text-3xl font-bold tracking-wider block mb-3 flex items-center justify-center md:justify-start gap-2 text-foreground">
              Nikhil <span className="text-primary">Paharia</span>
            </a>
            <p className="text-slate-500 text-base">Crafting cinematic digital experiences.</p>
          </motion.div>

          {/* Nav + Socials — from RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-600">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ y: -2, color: "#1D6FEB" }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="hover:text-primary transition-colors interactive"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="flex gap-4">
              {socials.map(({ Icon, href, hoverBg }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.2, y: -4, rotate: -6 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 300 }}
                  className={`interactive w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center ${hoverBg} hover:text-white transition-colors duration-300`}
                >
                  <Icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-blue-100"
        >
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} Nikhil Paharia. <span className="hidden sm:inline">All rights reserved.</span>
          </p>
          <p className="text-slate-500 text-sm italic">Crafted in Assam, for the world.</p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.15, y: -4, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 280 }}
            className="interactive w-12 h-12 rounded-full bg-white border border-blue-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors duration-300 hover:shadow-[0_0_20px_rgba(29,111,235,0.4)] text-slate-600"
            aria-label="Scroll to top"
          >
            <RiArrowUpLine className="text-2xl" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
