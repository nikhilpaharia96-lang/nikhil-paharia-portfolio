import { Play, Briefcase } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { showcaseStats } from "@/constants/videoShowcase";

type ShowcaseIntroProps = {
  onWatchShowreel: () => void;
};

export default function ShowcaseIntro({ onWatchShowreel }: ShowcaseIntroProps) {
  return (
    <div className="relative">
      <SectionHeader label="05 — Cinematography & Video" title="Visual Stories That Feel Real" />

      <p className="mt-8 max-w-md text-base sm:text-[1.05rem] leading-relaxed text-white/90">
        I create cinematic films, travel videos, documentaries and commercial edits that capture
        emotion, tell stories and leave a lasting impact.
      </p>

      <div className="mt-7 hidden sm:flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onWatchShowreel}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 border-2 border-[#050d2b] bg-white !text-[#0b35e8] text-sm font-bold shadow-[6px_6px_0_#050d2b] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
        >
          <Play className="w-4 h-4" aria-hidden="true" />
          Watch Showreel
        </button>
        <a
          href="#contact"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 border-2 border-white text-sm font-bold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        >
          <Briefcase className="w-4 h-4" aria-hidden="true" />
          Hire for Projects
        </a>
      </div>

      <dl className="mt-8 hidden sm:grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5">
        {showcaseStats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-2.5">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-white/80 border border-white/90 flex items-center justify-center shadow-[0_8px_20px_-10px_rgba(15,45,90,0.35)]">
              <Icon className="w-[18px] h-[18px] text-primary" aria-hidden="true" />
            </div>
            <div className="leading-tight">
              <dt className="sr-only">{label}</dt>
              <dd className="font-bold text-base text-white">{value}</dd>
              <span aria-hidden="true" className="block text-[10px] text-white/70">
                {label}
              </span>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
