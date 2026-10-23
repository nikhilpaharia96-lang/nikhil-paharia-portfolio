import { trustedBrands } from "@/constants/testimonials";
import AvatarImage from "./AvatarImage";

export default function TrustedByBrands() {
  return (
    <div className="mt-12 sm:mt-14 rounded-[26px] py-7 sm:py-8 bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_24px_55px_-26px_rgba(15,45,90,0.3)]">
      <div className="text-center mb-6 px-6">
        <h3 className="inline-block relative font-sans font-bold text-lg sm:text-xl text-[#101828]">
          Trusted by People &amp; Brands
          <span aria-hidden="true" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-primary" />
        </h3>
      </div>

      <ul className="flex lg:justify-center items-center overflow-x-auto scrollbar-hide divide-x divide-slate-300/60 px-2 [-webkit-overflow-scrolling:touch] snap-x">
        {trustedBrands.map((brand) => (
          <li key={brand.name} className="flex items-center gap-2.5 shrink-0 px-5 sm:px-6 snap-start">
            <div
              className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center text-white text-[11px] font-black shrink-0"
              style={{ backgroundColor: brand.color }}
              aria-hidden="true"
            >
              <AvatarImage src={brand.logo} alt="" fallback={brand.shortName} />
            </div>
            <span className="font-semibold text-sm text-slate-900 whitespace-nowrap">{brand.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
