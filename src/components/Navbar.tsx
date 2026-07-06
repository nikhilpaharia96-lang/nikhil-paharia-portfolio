import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";

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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
        isScrolled ? "py-2.5 lg:py-3 bg-white/85 backdrop-blur-xl border-b border-blue-100/60 shadow-[0_2px_20px_rgba(29,111,235,0.08)]" : "py-4 lg:py-6 bg-transparent"
      }`}
      style={{ paddingTop: `max(env(safe-area-inset-top, 0px), ${isScrolled ? '10px' : '16px'})` }}
    >
      <div className="container-tight flex items-center justify-between h-11">
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
          className="font-mono text-lg sm:text-xl lg:text-2xl font-bold tracking-wider text-glow flex items-center gap-1 text-foreground"
        >
          Nikhil <span className="text-primary">Paharia</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-8">
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
            className="border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-full px-5 py-2 text-sm font-bold shadow-sm"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle — vertically centered, properly sized */}
        <button 
          className="lg:hidden text-slate-800 hover:text-slate-900 transition-colors w-10 h-10 flex items-center justify-center bg-blue-50/50 rounded-full border border-blue-100 z-[210] relative self-center flex-shrink-0"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center lg:hidden overflow-hidden h-[100dvh]"
          >
            <div className="absolute top-8 left-0 right-0 px-4 sm:px-6 flex justify-between items-center z-[210] max-w-7xl mx-auto w-full">
                <a 
                    href="#home" 
                    onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
                    className="font-mono text-2xl font-bold tracking-wider text-glow flex items-center gap-1 text-foreground"
                >
                    Nikhil <span className="text-primary">Paharia</span>
                </a>
            </div>
            <div className="flex flex-col items-center gap-6 mt-10">
                {navLinks.map((link, i) => (
                <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={link.name}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className={`text-4xl font-serif font-bold uppercase tracking-widest ${
                    activeSection === link.href.substring(1)
                        ? "text-primary text-glow"
                        : "text-slate-600"
                    }`}
                >
                    {link.name}
                </motion.a>
                ))}
            </div>
            
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.05 }}
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="mt-8 bg-primary text-white px-8 py-4 rounded-full text-lg font-bold shadow-[0_0_20px_rgba(29,111,235,0.4)] w-[80%] text-center max-w-sm"
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
