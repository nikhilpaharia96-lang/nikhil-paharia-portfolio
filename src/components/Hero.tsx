import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SiReact, SiNodedotjs, SiJavascript, SiTailwindcss, SiMongodb } from "react-icons/si";
import { RiArrowDownSLine } from "react-icons/ri";
import profileImg from "../assets/images/profile-nobg.png";
import teaGardenBg from "../assets/images/tea-garden-hero.png";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      const text = headingRef.current;
      const chars = text.innerText.split("");
      text.innerText = "";
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(50px)";
        text.appendChild(span);
      });

      gsap.to(text.children, {
        opacity: 1,
        y: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: "power3.out",
        delay: 2.5,
      });
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center section-padding overflow-hidden"
    >
      {/* Tea Garden Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={teaGardenBg}
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.88) saturate(0.85)" }}
        />
        {/* Blue cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-blue-50/60 to-transparent" />
        {/* Fog / mist layer */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-white/60 via-white/20 to-transparent" />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,rgba(29,111,235,0.07)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />

      {/* Particles layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}
      </div>

      {/* Ambient blue orbs */}
      <div className="absolute top-1/4 -left-20 w-[480px] h-[480px] bg-primary/10 rounded-full blur-[130px] animate-pulse pointer-events-none" style={{ animationDuration: "9s" }} />
      <div className="absolute bottom-1/3 -right-20 w-[560px] h-[560px] bg-sky-400/10 rounded-full blur-[160px] animate-pulse pointer-events-none" style={{ animationDuration: "13s" }} />

      <div className="container-tight relative z-10 pt-20 lg:pt-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Text content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-primary text-xs font-mono font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[2600ms] fill-mode-both">
              <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
              Available for hire
            </div>

            <h1
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-[68px] font-serif font-bold tracking-tight text-foreground leading-[1.05] mb-6"
            >
              Building Modern Digital Experiences Through <span className="text-gradient">Code &amp; Creativity</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-[3000ms] fill-mode-both">
              Freelance Full Stack Web Developer &amp; Professional Video Editor
              creating cinematic digital experiences from the heart of Assam.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-[3200ms] fill-mode-both">
              <a
                href="#contact"
                className="btn-primary w-full sm:w-auto"
              >
                Hire Me
              </a>
              <a
                href="#projects"
                className="btn-outline w-full sm:w-auto"
              >
                View Projects
              </a>
            </div>

            {/* Stats */}
            <div className="mt-14 flex items-center justify-center lg:justify-start gap-8 sm:gap-12 animate-in fade-in duration-1000 delay-[3400ms] fill-mode-both">
              {[
                { value: "50+", label: "Projects" },
                { value: "3+", label: "Years" },
                { value: "100%", label: "Satisfaction" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-8 sm:gap-12">
                  {i > 0 && <div className="w-px h-10 bg-blue-200" />}
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-serif font-bold text-gradient">{stat.value}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Image — Premium Cinematic */}
          <div className="flex-1 relative order-1 lg:order-2 animate-in fade-in zoom-in duration-1000 delay-[2800ms] fill-mode-both w-full max-w-[280px] sm:max-w-none mx-auto lg:mx-0">
            <div className="relative w-56 h-64 sm:w-64 sm:h-72 md:w-[380px] md:h-[460px] mx-auto">

              {/* Animated rotating light ring behind image */}
              <div
                className="absolute inset-[-24px] rounded-[40%_60%_60%_40%/40%_40%_60%_60%] bg-gradient-to-tr from-primary via-sky-400 to-blue-300 opacity-40 blur-2xl"
                style={{ animation: "spin 12s linear infinite" }}
              />

              {/* Secondary glow pulse */}
              <div className="absolute inset-[-24px] rounded-[40%_60%_55%_45%/45%_40%_60%_55%] bg-gradient-to-tr from-sky-200/40 to-primary/20 blur-3xl animate-pulse" style={{ animationDuration: "8s" }} />

              {/* Glassmorphism frame */}
              <div className="absolute inset-0 rounded-[36px] bg-white/40 backdrop-blur-sm border-2 border-white/80 shadow-[0_8px_48px_rgba(29,111,235,0.25),0_2px_12px_rgba(29,111,235,0.12)] z-10 overflow-hidden">

                {/* Inner light sweep animation */}
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 50%, rgba(255,255,255,0.08) 100%)",
                    animation: "lightSweep 4s ease-in-out infinite",
                  }}
                />

                {/* Profile photo — background removed */}
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-full h-full object-cover object-top scale-110 relative z-10"
                  style={{ animation: "floatUpDown 6s ease-in-out infinite" }}
                />

                {/* Neon bottom edge inside frame */}
                <div className="absolute bottom-0 left-[15%] right-[15%] h-1 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm z-20" />
              </div>

              {/* Blue glow shadow beneath */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-primary/20 rounded-full blur-xl" />

              {/* Floating Tech Icons */}
              <div
                className="absolute -top-3 -left-3 w-11 h-11 bg-white/90 backdrop-blur-md border border-blue-100 shadow-md rounded-full flex items-center justify-center z-30"
                style={{ animation: "floatUpDown 3s ease-in-out infinite" }}
              >
                <SiReact className="text-primary text-lg" />
              </div>
              <div
                className="absolute top-1/4 -right-5 w-12 h-12 bg-white/90 backdrop-blur-md border border-blue-100 shadow-md rounded-full flex items-center justify-center z-30"
                style={{ animation: "floatUpDown 4s ease-in-out infinite", animationDelay: "1s" }}
              >
                <SiNodedotjs className="text-green-500 text-xl" />
              </div>
              <div
                className="absolute bottom-8 -left-5 w-10 h-10 bg-white/90 backdrop-blur-md border border-blue-100 shadow-md rounded-full flex items-center justify-center z-30"
                style={{ animation: "floatUpDown 2.8s ease-in-out infinite", animationDelay: "0.6s" }}
              >
                <SiJavascript className="text-yellow-400 text-base" />
              </div>
              <div
                className="absolute -bottom-3 right-6 w-10 h-10 bg-white/90 backdrop-blur-md border border-blue-100 shadow-md rounded-full flex items-center justify-center z-30"
                style={{ animation: "floatUpDown 3.5s ease-in-out infinite", animationDelay: "1.5s" }}
              >
                <SiTailwindcss className="text-cyan-500 text-base" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-in fade-in duration-1000 delay-[3600ms] fill-mode-both z-20">
        <span className="text-[10px] uppercase tracking-widest text-slate-400">Scroll</span>
        <RiArrowDownSLine className="text-slate-400 animate-bounce text-xl" />
      </div>
    </section>
  );
}