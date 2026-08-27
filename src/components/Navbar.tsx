import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenu4Line, RiCloseLine } from "react-icons/ri";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Videos", href: "#videos" },
  { name: "Services", href: "#services" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section
      const sections = navLinks.map(link => link.href.substring(1));
      let current = "";
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          current = section;
        }
      }
      
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3 bg-white/85 backdrop-blur-xl border-b border-blue-100/60 shadow-[0_2px_20px_rgba(29,111,235,0.08)]" : "py-6 bg-transparent"
      }`}
    >
      <div className="container-tight flex items-center justify-between">
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
          className="font-mono text-2xl font-bold text-primary tracking-wider text-glow flex items-center gap-1"
        >
          <span className="text-secondary">//</span> DEVFOLIO
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className={`text-sm font-medium transition-all duration-300 uppercase tracking-widest hover:text-primary ${
                  activeSection === link.href.substring(1) 
                    ? "text-primary text-glow" 
                    : "text-slate-600"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="w-px h-6 bg-blue-200" />
          
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
            className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(29,111,235,0.4)] hover:-translate-y-0.5"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-slate-800 hover:text-slate-900 transition-colors w-11 h-11 flex items-center justify-center bg-blue-50/50 rounded-full border border-blue-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenu4Line size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-[72px] bg-white/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 lg:hidden overflow-hidden"
          >
            <div className="absolute top-10 font-mono text-xl font-bold text-primary tracking-wider flex items-center gap-1 opacity-50">
              <span className="text-secondary">//</span> DEVFOLIO
            </div>
            
            {navLinks.map((link, i) => (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className={`text-3xl font-serif font-bold uppercase tracking-widest ${
                  activeSection === link.href.substring(1)
                    ? "text-primary text-glow"
                    : "text-slate-600"
                }`}
              >
                {link.name}
              </motion.a>
            ))}
            
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.05 }}
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="mt-4 bg-primary text-white px-8 py-4 rounded-full text-lg font-bold shadow-[0_0_20px_rgba(29,111,235,0.4)] w-[80%] text-center"
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}