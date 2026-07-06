import { useEffect, useRef, useState } from "react";
import bgVideoDesktop from "../assets/videos/loading-bg-desktop.mp4";
import bgVideoMobile from "../assets/videos/loading-bg-mobile.mp4";

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Safety fallback: even if the video's onEnded doesn't fire for some
    // reason, force-close after the known clip duration (5.9s) + fade.
    const fallback = setTimeout(() => finish(), 6400);
    return () => clearTimeout(fallback);
  }, []);

  const finish = () => {
    if (!containerRef.current) return;
    containerRef.current.style.transition = "opacity 0.4s ease";
    containerRef.current.style.opacity = "0";
    setTimeout(() => setDone(true), 400);
  };

  if (done) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] overflow-hidden bg-[#0b0806]">
      <video
        className="absolute inset-0 w-full h-full object-cover hidden sm:block"
        src={bgVideoDesktop}
        autoPlay
        muted
        playsInline
        onEnded={finish}
      />
      <video
        className="absolute inset-0 w-full h-full object-cover sm:hidden"
        src={bgVideoMobile}
        autoPlay
        muted
        playsInline
        onEnded={finish}
      />
    </div>
  );
}