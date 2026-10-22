import npLogo from "../assets/logos/np-logo.webp";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "@/lib/static-motion";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import Magnetic from "@/components/ui/Magnetic";
import MusicToggleButton from "@/components/MusicToggleButton";
import { lockBodyScroll } from "@/lib/scrollLock";

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

  // Section offsets are read from the DOM once (and on resize), never inside the
  // scroll handler itself — reading offsetTop on every scroll tick forces a
  // layout/reflow on whatever frame the browser is trying to paint a scroll on,
  // which is exactly the kind of jank a smooth-scroll setup can't hide.
  const sectionOffsets = useRef<{ id: string; top: number }[]>([]);

  useEffect(() => {
    const measure = () => {
      sectionOffsets.current = navLinks.map((link) => {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        return { id, top: el ? el.offsetTop : Infinity };
      });
    };

    measure();

    // Re-measure on resize (debounced) and once more after everything (fonts,
    // below-the-fold lazy chunks, images) has settled and may have shifted layout.
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    const settleTimer = setTimeout(measure, 1500);

    const handleScroll = (scrollY: number) => {
      setIsScrolled(scrollY > 40);

      let current = "";
      for (const { id, top } of sectionOffsets.current) {
        if (scrollY >= top - 220) current = id;
      }
      if (current) setActiveSection(current);
    };

    const onNativeScroll = () => handleScroll(window.scrollY);
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    onNativeScroll();

    return () => {
      window.removeEventListener("scroll", onNativeScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      clearTimeout(settleTimer);
    };
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector<HTMLElement>(href);
    if (!element) return;

    // Instant jump (no smooth scrolling); keep the 24px offset the source used.
    const top = element.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top, behavior: "auto" });
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    return lockBodyScroll();
  }, [mobileMenuOpen]);

  return (
    <motion.nav 

      animate={{ y: 0, opacity: 1 }}

      className={`fixed top-0 left-0 right-0 z-[200]   ${
        isScrolled 
          ? "py-2.5 lg:py-3 bg-white/75 backdrop-blur-md border-b border-blue-100/40 shadow-[0_2px_30px_rgba(29,111,235,0.06)]" 
          : "py-4 lg:py-6 bg-transparent lg:bg-white/5 lg:backdrop-blur-[2px]"
      }`}
      style={{ paddingTop: `max(env(safe-area-inset-top, 0px), ${isScrolled ? '10px' : '16px'})` }}
    >
      {/* Layered progressive blur — smooths the hand-off between scrolling
          content and the navbar's flat background instead of a hard edge. */}
      <div className="nav-progressive-blur" aria-hidden="true">
        <div /><div />
      </div>

      <div className="container-tight px-3.5 sm:px-6 flex items-center justify-between h-11 gap-2 relative">
        <Magnetic range={50} strength={0.3}>
         <a 
  href="#home" 
  onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
  className="font-mono text-sm sm:text-xl lg:text-2xl font-bold tracking-wider flex items-center gap-1.5 sm:gap-2 text-foreground   hover:text-primary hover:drop-shadow-[0_0_12px_rgba(29,111,235,0.4)] min-w-0 flex-shrink"
>
  <img src={npLogo} alt="NP logo" className="h-6 sm:h-8 lg:h-9 w-auto flex-shrink-0" />
  <span className="whitespace-nowrap">𝐍𝐢𝐤𝐡𝐢𝐥 <span className="text-primary">𝐏𝐚𝐡𝐚𝐫𝐢𝐚</span></span>
</a>
        </Magnetic>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          <div className="flex items-center gap-7 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className={`relative flex items-center text-xs font-bold   uppercase tracking-widest py-2 px-0.5 hover:text-primary ${
                    isActive ? "text-primary text-glow" : "text-slate-600"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span

                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary rounded-full shadow-[0_1px_8px_rgba(29,111,235,0.6)]"

                    />
                  )}
                </a>
              );
            })}
          </div>
          
          <div className="w-px h-6 bg-blue-200/60" />
          
          <Magnetic range={45} strength={0.25}>
            <MusicToggleButton variant="desktop" />
          </Magnetic>
        </div>

        {/* Mobile-only: music toggle + hamburger, right-aligned */}
        <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
          <MusicToggleButton variant="mobile" />
          <button
            className="text-slate-800 hover:text-slate-900  w-10 h-10 flex items-center justify-center bg-blue-50/50 rounded-full border border-blue-100/60 z-[210] relative self-center flex-shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <RiCloseLine size={20} /> : <RiMenuLine size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div

            animate={{ opacity: 1, y: 0 }}


            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-[200] flex flex-col items-center justify-center lg:hidden overflow-y-auto h-[100dvh] py-20 pb-safe"
          >
            <div className="absolute top-0 left-0 right-0 px-4 sm:px-6 pt-safe flex justify-between items-center z-[210] max-w-7xl mx-auto w-full" style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 2rem)' }}>
              <a 
  href="#home" 
  onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
  className="font-mono text-2xl font-bold tracking-wider flex items-center gap-2 text-foreground"
>
  <img src={npLogo} alt="NP logo" className="h-8 w-auto" />
  Nikhil <span className="text-primary">Paharia</span>
</a>
            </div>
            <div className="flex flex-col items-center gap-6 mt-10">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a

                    animate={{ opacity: 1, y: 0 }}

                    key={link.name}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className={`relative text-3xl font-serif font-bold uppercase tracking-widest ${
                      isActive ? "text-primary text-glow" : "text-slate-600"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-1 bg-primary rounded-full" />
                    )}
                  </motion.a>
                );
              })}
            </div>
            
            <motion.div

              animate={{ opacity: 1, y: 0 }}

              className="mt-8 flex justify-center w-[80%] max-w-sm"
            >
              <MusicToggleButton variant="desktop" size="large" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
