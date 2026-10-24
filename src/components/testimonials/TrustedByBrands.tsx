import { trustedBrands } from "@/constants/testimonials";
import AvatarImage from "./AvatarImage";

// Display-only: lets one long unspaced name wrap on two tidy lines.
const displayName = (name: string) => (name === "theoutdoorbackpacke" ? "theoutdoor backpacke" : name);

export default function TrustedByBrands() {
  return (
    <div className="mt-[clamp(0.9rem,4vw,1.5rem)] lg:mt-12 rounded-[clamp(1.1rem,5vw,1.6rem)] py-[clamp(1rem,5vw,2rem)] bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_24px_55px_-28px_rgba(15,45,90,0.4)]">
      <div className="text-center mb-[clamp(0.9rem,4.4vw,1.5rem)] px-4">
        <h3 className="inline-block relative font-sans font-bold text-[clamp(0.95rem,4.2vw,1.25rem)] text-[#101828]">
          Trusted by People &amp; Brands
          <span aria-hidden="true" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-9 h-[3px] rounded-full bg-primary" />
        </h3>
      </div>

      <ul className="flex lg:justify-center overflow-x-auto scrollbar-hide px-1 pt-2 snap-x [-webkit-overflow-scrolling:touch]">
        {trustedBrands.map((brand) => (
          <li
            key={brand.name}
            className="snap-start max-[359px]:shrink-0 max-[359px]:w-[88px] min-[360px]:flex-1 min-[360px]:min-w-0 lg:flex-1 lg:min-w-0 xl:flex-none xl:min-w-fit flex flex-col lg:flex-row items-center gap-[clamp(0.3rem,1.6vw,0.5rem)] lg:gap-2.5 px-[clamp(0.15rem,1vw,0.5rem)] lg:px-3 xl:px-6 text-center lg:text-left border-l border-slate-300/60 first:border-l-0"
          >
            <div
              className="w-[clamp(2.1rem,11vw,3.2rem)] h-[clamp(2.1rem,11vw,3.2rem)] lg:w-9 lg:h-9 rounded-full overflow-hidden flex items-center justify-center text-white text-[clamp(0.6rem,3vw,0.85rem)] font-black shrink-0 shadow-[0_6px_14px_-6px_rgba(15,45,90,0.4)]"
              style={{ backgroundColor: brand.color }}
              aria-hidden="true"
            >
              <AvatarImage src={brand.logo} alt="" fallback={brand.shortName} />
            </div>
            <span className="text-[clamp(0.58rem,2.7vw,0.8rem)] lg:text-[13px] xl:text-sm font-medium lg:font-semibold leading-tight text-slate-800">
              {displayName(brand.name)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
