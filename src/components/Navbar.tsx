import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Send } from "lucide-react";
import npLogo from "../assets/logos/np-logo.webp";
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

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Section offsets are measured once (and on resize), never inside the scroll
  // handler — reading offsetTop per scroll tick forces layout work.
  const sectionOffsets = useRef<{ id: string; top: number }[]>([]);

  useEffect(() => {
    const measure = () => {
      sectionOffsets.current = navLinks.map((link) => {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        // Absolute document position (offsetTop is wrong for sections nested in positioned wrappers).
        return { id, top: el ? el.getBoundingClientRect().top + window.scrollY : Infinity };
      });
    };
    measure();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    const settleTimer = setTimeout(measure, 1500);

    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 40);
      let current = "";
      for (const { id, top } of sectionOffsets.current) {
        if (y >= top - 220) current = id;
      }
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      clearTimeout(settleTimer);
    };
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    const element = document.querySelector<HTMLElement>(href);
    if (!element) return;
    // Instant jump; sections carry generous top padding so headings clear the floating bar.
    const top = element.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top, behavior: "auto" });
  }, []);

  // Mobile menu: lock scroll, Escape to close, outside click to close, close on desktop resize.
  useEffect(() => {
    if (!menuOpen) return;
    const unlock = lockBodyScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1280px)");
    const onMq = () => mq.matches && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    mq.addEventListener("change", onMq);
    return () => {
      unlock();
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      mq.removeEventListener("change", onMq);
    };
  }, [menuOpen]);

  const connect = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo("#contact");
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-[200] pointer-events-none px-3 sm:px-5 transition-[padding] duration-300 motion-reduce:transition-none"
      style={{
        paddingTop: `max(env(safe-area-inset-top, 0px), ${isScrolled ? "8px" : "14px"})`,
      }}
    >
      <nav
        aria-label="Primary"
        className={`nav-enter pointer-events-auto mx-auto max-w-[1240px] flex items-center justify-between gap-3 rounded-full border border-white/85 backdrop-blur-[20px] px-2.5 sm:px-3 xl:px-4 h-[60px] sm:h-[68px] transition-[background-color,box-shadow] duration-300 motion-reduce:transition-none ${
          isScrolled
            ? "bg-white/90 shadow-[0_18px_50px_-18px_rgba(8,102,255,0.38)]"
            : "bg-white/78 shadow-[0_14px_40px_-20px_rgba(8,102,255,0.28)]"
        }`}
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#home");
          }}
          aria-label="Nikhil Paharia — back to top"
          className={`group flex items-center gap-2.5 sm:gap-3 min-w-0 rounded-full pr-2 ${focusRing}`}
        >
          <span className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-white ring-1 ring-blue-100 shadow-[0_6px_16px_-6px_rgba(8,102,255,0.4)] flex items-center justify-center overflow-hidden">
            <img src={npLogo} alt="" width={28} height={28} className="h-6 sm:h-7 w-auto" />
          </span>
          <span className="font-sans font-extrabold text-[17px] sm:text-xl tracking-tight text-[#101828] whitespace-nowrap">
            Nikhil <span className="text-primary">Paharia</span>
          </span>
        </a>

        <span aria-hidden="true" className="hidden xl:block w-px h-7 bg-slate-300/70 shrink-0" />

        {/* Desktop links */}
        <ul className="hidden xl:flex items-center gap-1 2xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative block rounded-full px-3 2xl:px-3.5 py-2 text-[15px] font-medium transition-colors duration-200 motion-reduce:transition-none hover:text-primary ${focusRing} ${
                    isActive ? "text-primary" : "text-[#101828]"
                  }`}
                >
                  {link.name}
                  <span
                    aria-hidden="true"
                    className={`absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-primary origin-center transition-transform duration-300 motion-reduce:transition-none ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <MusicToggleButton variant="mobile" />
          <a
            href="#contact"
            onClick={connect}
            className={`hidden sm:inline-flex group items-center gap-2 rounded-full bg-[#0866FF] px-5 py-3 text-[15px] font-semibold text-white shadow-[0_12px_26px_-10px_rgba(8,102,255,0.75)] transition duration-200 hover:brightness-110 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
          >
            Let&apos;s Connect
            <Send
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={`xl:hidden w-11 h-11 rounded-full bg-blue-50/70 border border-blue-100 text-[#101828] flex items-center justify-center hover:bg-blue-100/70 transition-colors motion-reduce:transition-none ${focusRing}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile / tablet menu — always mounted so open/close can transition */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        {...(!menuOpen ? { inert: true } : {})}
        className={`xl:hidden pointer-events-auto mx-auto max-w-[1240px] mt-2 rounded-[28px] border border-white/85 bg-white/92 backdrop-blur-[20px] shadow-[0_28px_60px_-22px_rgba(8,102,255,0.4)] overflow-hidden origin-top transition duration-300 motion-reduce:transition-none ${
          menuOpen ? "opacity-100 translate-y-0 scale-100 visible" : "opacity-0 -translate-y-2 scale-[0.98] invisible pointer-events-none"
        }`}
      >
        <ul className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-[calc(100dvh-7.5rem)] overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors motion-reduce:transition-none ${focusRing} ${
                    isActive ? "bg-primary/10 text-primary" : "text-[#101828] hover:bg-blue-50"
                  }`}
                >
                  {link.name}
                  {isActive && <span aria-hidden="true" className="w-2 h-2 rounded-full bg-primary" />}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="px-3 pb-3 flex flex-col sm:flex-row gap-3 sm:items-center">
          <a
            href="#contact"
            onClick={connect}
            className={`sm:hidden inline-flex items-center justify-center gap-2 rounded-full bg-[#0866FF] px-5 py-3.5 text-base font-semibold text-white shadow-[0_12px_26px_-10px_rgba(8,102,255,0.75)] ${focusRing}`}
          >
            Let&apos;s Connect
            <Send className="w-4 h-4" aria-hidden="true" />
          </a>
          <div className="flex-1">
            <MusicToggleButton variant="desktop" size="large" />
          </div>
        </div>
      </div>
    </header>
  );
          }an aria-hidden="true" className="w-2 h-2 rounded-full bg-primary" />}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="px-3 pb-3 flex flex-col sm:flex-row gap-3 sm:items-center">
          <a
            href="#contact"
            onClick={connect}
            className={`sm:hidden inline-flex items-center justify-center gap-2 rounded-full bg-[#0866FF] px-5 py-3.5 text-base font-semibold text-white shadow-[0_12px_26px_-10px_rgba(8,102,255,0.75)] ${focusRing}`}
          >
            Let&apos;s Connect
            <Send className="w-4 h-4" aria-hidden="true" />
          </a>
          <div className="flex-1">
            <MusicToggleButton variant="desktop" size="large" />
          </div>
        </div>
      </div>
    </header>
  );
}
