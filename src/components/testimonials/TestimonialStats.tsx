import { trustStats } from "@/constants/testimonials";

// Only numbers already present in the repo's data — nothing invented.
export default function TestimonialStats() {
  return (
    <dl className="grid grid-cols-2 min-[360px]:grid-cols-4 rounded-[clamp(1.1rem,5vw,1.6rem)] bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_24px_50px_-28px_rgba(15,45,90,0.45)] lg:gap-x-3 lg:px-4 lg:py-1 lg:rounded-[22px]">
      {trustStats.slice(0, 4).map(({ icon: Icon, value, suffix, label, staticText }) => (
        <div
          key={label}
          className="flex flex-col items-center text-center gap-1 px-1.5 py-[clamp(0.7rem,3.4vw,1.1rem)] border-slate-300/60 max-[359px]:[&:nth-child(even)]:border-l max-[359px]:[&:nth-child(n+3)]:border-t min-[360px]:[&:not(:first-child)]:border-l lg:border-0! lg:flex-row lg:text-left lg:gap-2.5 lg:py-3 lg:px-1"
        >
          <Icon className="w-[clamp(1.3rem,6.4vw,1.9rem)] h-[clamp(1.3rem,6.4vw,1.9rem)] shrink-0 text-primary lg:w-7 lg:h-7" strokeWidth={1.5} aria-hidden="true" />
          <div className="leading-tight">
            <dd className="font-bold text-[clamp(0.95rem,4.6vw,1.4rem)] lg:text-lg text-slate-900 order-first">{staticText ?? `${value}${suffix ?? ""}`}</dd>
            <dt className="text-[clamp(0.6rem,2.7vw,0.8rem)] lg:text-[11px] text-slate-500 text-balance mt-0.5">{label}</dt>
          </div>
        </div>
      ))}
    </dl>
  );
}
