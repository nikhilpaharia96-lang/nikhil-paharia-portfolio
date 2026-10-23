import { trustStats } from "@/constants/testimonials";

// Only numbers already present in the repo's data — nothing invented.
export default function TestimonialStats() {
  return (
    <dl className="grid grid-cols-2 sm:grid-cols-4 rounded-[26px] bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_24px_50px_-28px_rgba(15,45,90,0.45)] lg:grid-cols-4 lg:gap-x-3 lg:px-4 lg:py-1 lg:rounded-[22px]">
      {trustStats.slice(0, 4).map(({ icon: Icon, value, suffix, label, staticText }) => (
        <div
          key={label}
          className="flex flex-col items-center text-center gap-1 px-2 py-4 border-slate-300/60 max-sm:[&:nth-child(even)]:border-l max-sm:[&:nth-child(n+3)]:border-t sm:[&:not(:first-child)]:border-l lg:border-0! lg:flex-row lg:text-left lg:gap-2.5 lg:py-3 lg:px-1"
        >
          <Icon className="w-7 h-7 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
          <div className="leading-tight">
            <dd className="font-bold text-xl lg:text-lg text-slate-900 order-first">{staticText ?? `${value}${suffix ?? ""}`}</dd>
            <dt className="text-[12px] lg:text-[11px] text-slate-500 text-balance mt-0.5">{label}</dt>
          </div>
        </div>
      ))}
    </dl>
  );
}
