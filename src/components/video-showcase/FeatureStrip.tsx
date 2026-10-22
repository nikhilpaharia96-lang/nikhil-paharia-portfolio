import { showcaseFeatures } from "@/constants/videoShowcase";

export default function FeatureStrip() {
  return (
    <ul className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {showcaseFeatures.map(({ icon: Icon, title, desc }) => (
        <li
          key={title}
          className="flex items-center gap-3.5 px-5 py-4 rounded-2xl bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_18px_40px_-24px_rgba(15,45,90,0.35)]"
        >
          <Icon className="w-8 h-8 shrink-0 text-primary" strokeWidth={1.6} aria-hidden="true" />
          <div className="leading-snug">
            <h4 className="font-sans font-bold text-sm text-slate-900">{title}</h4>
            <p className="text-xs text-slate-500">{desc}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
