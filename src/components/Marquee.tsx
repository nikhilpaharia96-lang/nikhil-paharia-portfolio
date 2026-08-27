import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marquee() {
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (text1Ref.current && text2Ref.current) {
      gsap.to([text1Ref.current, text2Ref.current], {
        xPercent: -100,
        repeat: -1,
        duration: 25,
        ease: "linear",
      });
    }
    if (text3Ref.current && text4Ref.current) {
      gsap.fromTo([text3Ref.current, text4Ref.current], 
        { xPercent: -100 },
        {
          xPercent: 0,
          repeat: -1,
          duration: 30,
          ease: "linear",
        }
      );
    }
  }, []);

  const content1 = "Full Stack Developer ◆ Video Editor ◆ Digital Creator ◆ Freelancer ◆ Storyteller ◆ React Developer ◆ Premium Edits ◆ ";
  const content2 = "Cinematic Storytelling ◆ UI/UX Design ◆ Next.js ◆ Node.js ◆ Content Creation ◆ Motion Graphics ◆ Creative Direction ◆ ";

  return (
    <div className="w-full py-8 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 border-y border-blue-500 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] mix-blend-overlay" />
      
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="flex whitespace-nowrap mb-4 relative">
        <div ref={text1Ref} className="text-xl md:text-2xl font-serif font-bold uppercase tracking-widest text-white/90 pr-8">
          {content1}
        </div>
        <div ref={text2Ref} className="text-xl md:text-2xl font-serif font-bold uppercase tracking-widest text-white/90 pr-8 absolute left-full top-0">
          {content1}
        </div>
      </div>
      
      <div className="flex whitespace-nowrap relative">
        <div ref={text3Ref} className="text-xl md:text-2xl font-serif font-bold uppercase tracking-widest text-white/60 pr-8">
          {content2}
        </div>
        <div ref={text4Ref} className="text-xl md:text-2xl font-serif font-bold uppercase tracking-widest text-white/60 pr-8 absolute left-full top-0">
          {content2}
        </div>
      </div>
    </div>
  );
}