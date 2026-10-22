import { LayoutGrid, Mountain, FileText, ShoppingBag, Camera, Clapperboard, MoreHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { VideoFilter } from "@/types/video";
import { filters } from "@/constants/videoShowcase";

const icons: Record<VideoFilter, LucideIcon> = {
  All: LayoutGrid,
  "Travel Film": Mountain,
  Documentary: FileText,
  Commercial: ShoppingBag,
  "Social Media": Camera,
  Cinematic: Clapperboard,
  Others: MoreHorizontal,
};

type FilterChipsProps = {
  active: VideoFilter;
  onChange: (filter: VideoFilter) => void;
};

export default function FilterChips({ active, onChange }: FilterChipsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter videos by category"
      className="flex lg:justify-center gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 pb-1"
    >
      {filters.map((filter) => {
        const Icon = icons[filter];
        const selected = filter === active;
        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(filter)}
            className={`shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 ${
              selected
                ? "bg-primary text-white border-primary shadow-[0_12px_26px_-10px_rgba(29,111,235,0.75)]"
                : "bg-white/75 backdrop-blur-xl text-slate-700 border-white/80 shadow-[0_8px_20px_-12px_rgba(15,45,90,0.3)] hover:bg-white"
            }`}
          >
            <Icon className={`w-4 h-4 ${selected ? "" : "text-primary/80"}`} aria-hidden="true" />
            {filter}
          </button>
        );
      })}
    </div>
  );
}
