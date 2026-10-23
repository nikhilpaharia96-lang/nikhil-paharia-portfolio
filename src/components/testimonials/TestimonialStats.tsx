import { trustStats } from "@/constants/testimonials";

// Only stats already present in the repo's data (no new numbers invented).
export default function TestimonialStats() {
  return (
    <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5">
      {trustStats.slice(0, 4).map(({ icon: Icon, value, suffix, label, staticText }) => (
        <div key={label} className="flex items-center gap-2.5">
          <Icon className="w-7 h-7 shrink-0 text-primary" strokeWidth={1.6} aria-hidden="true" />
          <div className="leading-tight">
            <dd className="font-bold text-lg text-slate-900 order-first">{staticText ?? `${value}${suffix ?? ""}`}</dd>
            <dt className="text-[11px] text-slate-500">{label}</dt>
          </div>
        </div>
      ))}
    </dl>
  );
}
