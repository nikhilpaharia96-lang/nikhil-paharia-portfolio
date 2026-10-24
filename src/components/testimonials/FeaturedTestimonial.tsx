import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { allTestimonials } from "@/constants/testimonials";
import photo from "@/assets/images/my-new-photo.jpg";
import AvatarImage from "./AvatarImage";

const arrow =
  "w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur border border-white shadow-[0_10px_24px_-10px_rgba(15,45,90,0.45)] flex items-center justify-center text-slate-900 transition hover:bg-white hover:shadow-[0_0_0_4px_rgba(8,102,255,0.16)] active:scale-95 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40";

export default function FeaturedTestimonial() {
  const [index, setIndex] = useState(() => Math.max(0, allTestimonials.findIndex((x) => x.company === "Travel Assam")));
  const touchX = useRef<number | null>(null);
  const count = allTestimonials.length;
  const t = allTestimonials[index];
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured client testimonial"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
      className="focus-visible:outline-none"
    >
      <figure className="relative overflow-hidden rounded-[26px] bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_30px_60px_-30px_rgba(15,45,90,0.5)] min-[360px]:min-h-[clamp(15rem,60vw,19rem)] lg:min-h-[22rem]">
        <div key={index} className="testi-swap relative z-10 p-4 sm:p-8 min-[360px]:w-[58%] lg:w-[62%] flex flex-col min-[360px]:min-h-[inherit]">
          <Quote className="w-[clamp(1.75rem,8.5vw,3rem)] h-[clamp(1.75rem,8.5vw,3rem)] text-primary mb-2 sm:mb-3" fill="currentColor" strokeWidth={0} aria-hidden="true" />
          <blockquote className="flex-1 text-[clamp(0.8rem,3.5vw,1.15rem)] lg:text-xl leading-[1.5] text-slate-800">
            “{t.content}”
          </blockquote>
          <div className="h-px bg-primary/15 my-3 sm:my-5" />
          <figcaption className="flex items-center gap-3">
            <div
              className="w-[clamp(2rem,10vw,3rem)] h-[clamp(2rem,10vw,3rem)] rounded-full overflow-hidden flex items-center justify-center text-white text-xs font-black shrink-0 ring-2 ring-white"
              style={{ background: `linear-gradient(135deg, ${t.avatarFrom}, ${t.avatarTo})` }}
            >
              <AvatarImage src={t.avatarImg} alt={t.name} fallback={t.initials} />
            </div>
            <div className="min-w-0 leading-tight">
              <p className="font-bold text-slate-900 text-[clamp(0.8rem,3.4vw,1rem)]">{t.name}</p>
              <p className="text-[clamp(0.66rem,2.9vw,0.85rem)] text-slate-500 mt-0.5">
                {t.role} · <span className="font-semibold text-primary">{t.company}</span>
              </p>
            </div>
          </figcaption>
        </div>

        <div className="relative h-52 min-[360px]:absolute min-[360px]:inset-y-0 min-[360px]:right-0 min-[360px]:h-auto min-[360px]:w-[50%] lg:w-[48%] pointer-events-none">
          <img
            src={photo}
            alt=""
            aria-hidden="true"
            width={1536}
            height={1024}
            loading="lazy"
            decoding="async"
            className="testi-photo absolute inset-0 w-full h-full object-cover object-[50%_72%]"
          />
        </div>
      </figure>

      <p className="sr-only" role="status" aria-live="polite">
        Testimonial {index + 1} of {count}: {t.name}, {t.company}
      </p>

      <div className="mt-4 flex items-center justify-between min-[360px]:grid min-[360px]:grid-cols-[1fr_auto_1fr]">
        <div className="hidden min-[360px]:block" aria-hidden="true" />
        <div className="flex items-center" role="group" aria-label="Choose testimonial">
          {allTestimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}: ${item.name}`}
              aria-current={i === index}
              className="p-1.5 rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
            >
              <span
                className={`block h-2 rounded-full transition-all motion-reduce:transition-none ${
                  i === index ? "w-7 bg-primary" : "w-2 bg-slate-400 ring-1 ring-white/80"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2.5 justify-self-end">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={arrow}>
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={arrow}>
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
