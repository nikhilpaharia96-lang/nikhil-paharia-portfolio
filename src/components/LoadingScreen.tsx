import { useEffect, useRef } from "react";
import gsap from "gsap";
import teaBg from "../assets/images/tea-garden-hero.png";

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      const chars = text.innerText.split("");
      text.innerText = "";
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        text.appendChild(span);
      });

      const tl = gsap.timeline();

      tl.to(text.children, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
      });

      tl.to(progressRef.current, {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut",
      }, "-=0.5");

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white"
    >
      <img src={teaBg} className="absolute inset-0 w-full h-full object-cover opacity-5 grayscale" alt="" />
      
      <div className="relative z-10 flex flex-col items-center">
        <h1 
          ref={textRef}
          className="text-4xl md:text-6xl font-serif font-bold text-slate-900 tracking-[0.2em] mb-8 uppercase"
        >
          DevFolio
        </h1>
        
        <div className="w-64 h-1 bg-blue-100 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-primary to-secondary w-0 shadow-[0_0_10px_rgba(29,111,235,0.8)]"
          />
        </div>
        
        <p className="mt-4 text-[10px] tracking-[0.3em] text-slate-400 uppercase">
          Loading Experience
        </p>
        <p className="mt-2 text-[8px] tracking-[0.2em] text-primary uppercase font-serif italic">
          From Assam, For the World
        </p>
      </div>
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[100px] rounded-full" />
    </div>
  );
}