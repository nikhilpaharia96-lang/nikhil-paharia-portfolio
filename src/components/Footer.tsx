import type { MouseEvent } from "react";
import { RiArrowUpLine, RiGithubFill, RiLinkedinFill, RiInstagramLine, RiYoutubeFill } from "react-icons/ri";

const FONT_CONDENSED = "'Anton', 'Impact', sans-serif";
const FONT_BODY = "'DM Sans', 'Inter', sans-serif";

// Entries left as "#" stay visible but inert — replace with your real profile links.
const socials = [
  { Icon: RiGithubFill,    href: "https://github.com/nikhilpaharia96-lang", label: "GitHub"    },
  { Icon: RiLinkedinFill,  href: "#", label: "LinkedIn"  },
  { Icon: RiInstagramLine, href: "#", label: "Instagram" },
  { Icon: RiYoutubeFill,   href: "#", label: "YouTube"   },
];

const navLinks = [
  { label: "Home",     href: "#home"     },
  { label: "About",    href: "#about"    },
  { label: "Projects", href: "#projects" },
  { label: "Videos",   href: "#videos"   },
  { label: "Contact",  href: "#contact"  },
];

const outlined =
  "inline-flex items-center justify-center border border-white/80 text-white transition-colors " +
  "hover:bg-white hover:text-[#0b35e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

export default function Footer() {
  const scrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{ background: "#2f5bff", fontFamily: FONT_BODY }}
    >
      <div className="container-tight relative z-10 pt-10 sm:pt-14 pb-12">
        {/* Back to top */}
        <div className="flex justify-end">
          <a
            href="#home"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-xl sm:text-2xl underline underline-offset-4 hover:opacity-80"
          >
            Back to top <RiArrowUpLine aria-hidden="true" />
          </a>
        </div>

        {/* Social */}
        <h2
          className="mt-14 sm:mt-20 text-[84px] sm:text-[140px] leading-[0.95] uppercase"
          style={{ fontFamily: FONT_CONDENSED }}
        >
          Social
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {socials.map(({ Icon, href, label }) => {
            const external = /^https?:\/\//.test(href);
            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`${outlined} h-[62px] w-[62px] rounded-[4px] text-3xl`}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : { onClick: (e: MouseEvent<HTMLAnchorElement>) => e.preventDefault() })}
              >
                <Icon aria-hidden="true" />
              </a>
            );
          })}
        </div>

        {/* Explore */}
        <h2
          className="mt-16 sm:mt-24 text-[84px] sm:text-[140px] leading-[0.95] uppercase"
          style={{ fontFamily: FONT_CONDENSED }}
        >
          Explore
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`${outlined} h-[46px] px-5 rounded-[4px] text-lg sm:text-xl`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Note */}
        <p className="mt-14 max-w-xl text-base sm:text-lg leading-snug text-white/90">
          Available for freelance web development and video editing projects worldwide.
          Bring your boldest ideas — let's build something that matters.
        </p>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/25">
        <div className="container-tight flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div
            className="inline-block self-start bg-black px-4 py-3 text-white"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 82%, 92% 100%, 0 100%)" }}
          >
            <span
              className="block text-4xl sm:text-5xl leading-[0.95] uppercase"
              style={{ fontFamily: FONT_CONDENSED }}
            >
              Crafted in
              <br />
              Assam, for
              <br />
              the world.
            </span>
          </div>
          <p className="text-sm text-white/85">
            © {new Date().getFullYear()} Nikhil Paharia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
