import { Users, Clapperboard, Star, Heart } from "lucide-react";
import { trustStats } from "@/constants/testimonials";

// Icons follow the design (people, clapperboard, star, heart). Numbers and labels
// come from the existing trustStats data — nothing invented.
const icons = [Users, Clapperboard, Star, Heart];

export default function TestimonialStats() {
  return (
    <dl className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-x-4 gap-y-5 rounded-[clamp(1.1rem,5vw,1.5rem)] bg-white/55 backdrop-blur-md border border-white/70 px-[clamp(0.9rem,4vw,1.5rem)] py-[clamp(0.9rem,4vw,1.25rem)]">
      {trustStats.slice(0, 4).map(({ value, suffix, label, staticText }, i) => {
        const Icon = icons[i] ?? Star;
        return (
          <div key={label} className="flex items-center gap-[clamp(0.5rem,2.4vw,0.85rem)] min-w-0">
            <Icon
              className="w-[clamp(1.75rem,8vw,2.5rem)] h-[clamp(1.75rem,8vw,2.5rem)] shrink-0 text-[#0866FF]"
              strokeWidth={2}
              aria-hidden="true"
            />
            <div className="min-w-0 leading-none">
              <dd className="order-first whitespace-nowrap font-sans font-extrabold tracking-tight text-[#0b1530] text-[clamp(1.35rem,6vw,2rem)]">
                {staticText ?? `${value}${suffix ?? ""}`}
              </dd>
              <dt className="mt-1.5 text-[clamp(0.7rem,3vw,0.9rem)] leading-tight text-slate-500 text-balance">{label}</dt>
            </div>
          </div>
        );
      })}
    </dl>
  );
}
