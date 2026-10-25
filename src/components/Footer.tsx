import { motion } from "@/lib/static-motion";
import { RiArrowUpLine, RiGithubFill, RiLinkedinFill, RiInstagramLine, RiYoutubeFill } from "react-icons/ri";
import teaBg from "../assets/images/tea-sunset-person-wide.webp";
import footerMobile from "../assets/images/footer-mobile.webp";
import Magnetic from "@/components/ui/Magnetic";
import SplitText from "@/components/ui/SplitText";
import { staggerContainer, cinChildSmall } from "@/lib/revealVariants";

const ease = [0.16, 1, 0.3, 1] as const;

const socials = [
  { Icon: RiGithubFill,    href: "#", label: "GitHub",    hoverBg: "hover:bg-slate-900"   },
  { Icon: RiLinkedinFill,  href: "#", label: "LinkedIn",  hoverBg: "hover:bg-[#0A66C2]"   },
  { Icon: RiInstagramLine, href: "#", label: "Instagram", hoverBg: "hover:bg-[#E1306C]"   },
  { Icon: RiYoutubeFill,   href: "#", label: "YouTube",   hoverBg: "hover:bg-[#FF0000]"   },
];

const navLinks = [
  { label: "Home",     href: "#home"     },
  { label: "About",    href: "#about"    },
  { label: "Projects", href: "#projects" },
  { label: "Videos",   href: "#videos"   },
];

// ── Mobile footer: full-bleed design image with real, clickable hotspots on top.
// Coordinates are in pixels of the 941 × 1672 source image and converted to %.
const IMG_W = 941;
const IMG_H = 1672;
const px = (v: number) => `${((v / IMG_W) * 100).toFixed(3)}%`;
const py = (v: number) => `${((v / IMG_H) * 100).toFixed(3)}%`;

const mobileNav = [
  { label: "Home",     href: "#home",     x: 165, w: 105 },
  { label: "About",    href: "#about",    x: 305, w: 125 },
  { label: "Projects", href: "#projects", x: 465, w: 170 },
  { label: "Videos",   href: "#videos",   x: 660, w: 130 },
];
// Social links — same order as the icons in the image. Put your real URLs in `socials` above.
const mobileSocialCenters = [297, 412, 528, 643];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "auto" });

  return (
    <>
    {/* ═══ MOBILE (below md): full-bleed design image + clickable hotspots ═══ */}
    <footer className="md:hidden relative w-full overflow-hidden bg-[#dfeaf7]" aria-label="Footer">
      <img
        src={footerMobile}
        alt="Let's build the future. Available for freelance opportunities globally. Bring your boldest ideas. Nikhil Paharia — Crafting cinematic digital experiences."
        className="block w-full h-auto select-none"
        draggable={false}
        width={IMG_W}
        height={IMG_H}
        loading="lazy"
      />

      {mobileNav.map((l) => (
        <a
          key={l.label}
          href={l.href}
          aria-label={l.label}
          className="absolute rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          style={{ left: px(l.x), width: px(l.w), top: py(880), height: py(65) }}
        />
      ))}

      {socials.map(({ href, label }, i) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="absolute rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          style={{ left: px(mobileSocialCenters[i] - 44), width: px(88), top: py(1041 - 44), height: py(88) }}
        />
      ))}

      <a
        href="#home"
        aria-label="Nikhil Paharia — home"
        className="absolute focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        style={{ left: px(185), width: px(575), top: py(700), height: py(90) }}
      />

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="absolute rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        style={{ left: px(470 - 55), width: px(110), top: py(1565 - 55), height: py(110) }}
      />
    </footer>

    {/* ═══ DESKTOP / TABLET (md and up): original footer ═══ */}
    <footer className="hidden md:block relative bg-gradient-to-b from-blue-50/30 to-white pt-32 pb-12 border-t border-blue-100 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none">
        <img src={teaBg} className="w-full h-full object-cover object-center grayscale" alt="" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container-tight relative z-10">

        {/* Hero text */}
        <motion.div

          whileInView={{ opacity: 1, y: 0 }}


          className="text-center mb-24 max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            <SplitText type="words">Let's build the future.</SplitText>
          </h2>
          <p className="text-lg text-slate-500 font-light">
            Available for freelance opportunities globally. Bring your boldest ideas.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">

          {/* Brand — from LEFT */}
          <motion.div

            whileInView={{ opacity: 1, x: 0 }}


            className="text-center md:text-left"
          >
            <Magnetic range={50} strength={0.2}>
              <a href="#home" className="font-mono text-3xl font-bold tracking-wider block mb-3 flex items-center justify-center md:justify-start gap-2 text-foreground hover:opacity-80 ">
                Nikhil <span className="text-primary">Paharia</span>
              </a>
            </Magnetic>
            <p className="text-slate-500 text-base">Crafting cinematic digital experiences.</p>
          </motion.div>

          {/* Nav + Socials — from RIGHT */}
          <motion.div
            variants={staggerContainer}

            whileInView="show"


            className="flex flex-col items-center gap-6"
          >
            {/* Nav links */}
            <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-600">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}

                  variants={cinChildSmall}
                  className="hover:text-primary  interactive"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Social icons wrapped in Magnetic */}
            <div className="flex gap-4">
              {socials.map(({ Icon, href, label, hoverBg }) => (
                <Magnetic key={label} range={45} strength={0.4} scaleHover={1.15}>
                  <motion.a
                    href={href}
                    aria-label={label}

                    variants={cinChildSmall}
                    className={`interactive w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center ${hoverBg} hover:text-white  `}
                  >
                    <Icon className="text-lg" />
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div

          whileInView={{ opacity: 1, y: 0 }}


          className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-blue-100"
        >
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} Nikhil Paharia. <span className="hidden sm:inline">All rights reserved.</span>
          </p>
          <p className="text-slate-500 text-sm italic">Crafted in Assam, for the world.</p>

          {/* Back-to-top — elastic morph button with Magnetic */}
          <Magnetic range={60} strength={0.45} scaleHover={1.1}>
            <motion.button
              onClick={scrollToTop}



              className="interactive w-12 h-12 rounded-full bg-white border border-blue-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary   text-slate-600"
              aria-label="Scroll to top"
            >
              <motion.div


              >
                <RiArrowUpLine className="text-2xl" />
              </motion.div>
            </motion.button>
          </Magnetic>
        </motion.div>
      </div>
    </footer>
    </>
  );
}
