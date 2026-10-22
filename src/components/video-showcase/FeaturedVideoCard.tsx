import { Play, Volume2, Settings, Maximize } from "lucide-react";
import { featuredVideo } from "@/constants/videoShowcase";

type FeaturedVideoCardProps = {
  onPlay?: (url: string) => void;
};

export default function FeaturedVideoCard({ onPlay }: FeaturedVideoCardProps) {
  const play = () => {
    if (featuredVideo.videoUrl) onPlay?.(featuredVideo.videoUrl);
  };

  return (
    <div className="relative rounded-[28px] p-[1.5px] bg-gradient-to-br from-white/80 via-white/30 to-primary/40 shadow-[0_40px_80px_-30px_rgba(8,20,45,0.55)]">
      <div className="relative rounded-[27px] overflow-hidden bg-[#0a1220] aspect-[16/10] sm:aspect-video w-full">
        <img
          src={featuredVideo.image}
          alt=""
          aria-hidden="true"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/20 pointer-events-none" />

        <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between z-20">
          <span className="px-3.5 py-1.5 rounded-lg bg-white/25 backdrop-blur-md border border-white/30 text-white text-[11px] font-semibold uppercase tracking-[0.1em]">
            {featuredVideo.category}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-black/45 backdrop-blur-md border border-white/15 text-white text-xs font-semibold">
            {featuredVideo.duration}
          </span>
        </div>

        <div className="absolute inset-0 flex items-start sm:items-center justify-center pt-[16%] sm:pt-0 z-20">
          <button
            type="button"
            onClick={play}
            aria-label={`Play ${featuredVideo.title} — ${featuredVideo.subtitle}`}
            className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-[0_20px_45px_-10px_rgba(0,0,0,0.5)] ring-8 ring-white/20 focus-visible:outline-none focus-visible:ring-primary/50"
          >
            <Play className="w-7 h-7 sm:w-9 sm:h-9 text-primary ml-1" fill="currentColor" aria-hidden="true" />
          </button>
        </div>

        <div className="absolute left-5 sm:left-8 bottom-14 sm:bottom-[4.5rem] z-20 text-white">
          <h3 className="font-sans font-extrabold tracking-tight text-3xl sm:text-5xl lg:text-[3.4rem] leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]">
            {featuredVideo.title}
          </h3>
          <div className="flex items-center gap-3 mt-1 sm:mt-2">
            <span aria-hidden="true" className="hidden sm:block w-10 h-px bg-white/70" />
            <span className="font-script font-bold italic text-2xl sm:text-4xl leading-none">
              {featuredVideo.subtitle}
            </span>
            <span aria-hidden="true" className="hidden sm:block w-14 h-px bg-white/70" />
          </div>
        </div>

        {/* Player bar — visual only; the big play button opens the real video */}
        <div
          aria-hidden="true"
          className="absolute left-4 right-4 bottom-3 sm:left-6 sm:right-6 sm:bottom-4 z-20 flex items-center gap-3 text-white text-xs"
        >
          <Play className="w-3.5 h-3.5" fill="currentColor" />
          <span className="font-medium tabular-nums whitespace-nowrap">0:00 / {featuredVideo.duration}</span>
          <div className="relative flex-1 h-[3px] rounded-full bg-white/35">
            <div className="absolute left-0 top-0 h-full w-[4%] rounded-full bg-primary" />
            <div className="absolute left-[4%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-white/70" />
          </div>
          <Volume2 className="w-4 h-4" />
          <Settings className="w-4 h-4 hidden xs:block" />
          <Maximize className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
