import { trustedBrands } from "@/constants/testimonials";
import AvatarImage from "./AvatarImage";

export default function TrustedByBrands() {
  return (
    <div className="mt-6 lg:mt-12 rounded-[26px] py-6 sm:py-8 bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_24px_55px_-28px_rgba(15,45,90,0.4)]">
      <div className="text-center mb-5 sm:mb-6 px-6">
        <h3 className="inline-block relative font-sans font-bold text-lg sm:text-xl text-[#101828]">
          Trusted by People &amp; Brands
          <span aria-hidden="true" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-9 h-[3px] rounded-full bg-primary" />
        </h3>
      </div>

      <ul className="flex lg:justify-center overflow-x-auto scrollbar-hide px-2 pt-2 snap-x [-webkit-overflow-scrolling:touch]">
        {trustedBrands.map((brand) => (
          <li
            key={brand.name}
            className="snap-start shrink-0 w-[96px] min-[560px]:w-auto min-[560px]:flex-1 lg:flex-none flex flex-col lg:flex-row items-center gap-2 lg:gap-2.5 px-2 lg:px-6 text-center lg:text-left border-l border-slate-300/60 first:border-l-0"
          >
            <div
              className="w-12 h-12 lg:w-9 lg:h-9 rounded-full overflow-hidden flex items-center justify-center text-white text-xs font-black shrink-0 shadow-[0_6px_14px_-6px_rgba(15,45,90,0.4)]"
              style={{ backgroundColor: brand.color }}
              aria-hidden="true"
            >
              <AvatarImage src={brand.logo} alt="" fallback={brand.shortName} />
            </div>
            <span className="text-[12px] lg:text-sm font-medium lg:font-semibold leading-tight text-slate-800 [overflow-wrap:anywhere]">
              {brand.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
