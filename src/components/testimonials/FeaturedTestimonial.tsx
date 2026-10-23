import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { allTestimonials } from "@/constants/testimonials";
import portrait from "@/assets/images/my-new-photo.jpg";
import AvatarImage from "./AvatarImage";

const btn =
  "w-11 h-11 rounded-full bg-white/85 backdrop-blur border border-white/90 flex items-center justify-center text-slate-800 shadow-[0_10px_24px_-10px_rgba(15,45,90,0.4)] transition hover:bg-white hover:shadow-[0_0_0_4px_rgba(8,102,255,0.15)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 motion-reduce:transition-none";

export default function FeaturedTestimonial() {
  const [index, setIndex] = useState(0);
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
      className="focus-visible:outline-none"
    >
      <figure className="relative rounded-[28px] overflow-hidden bg-white/75 backdrop-blur-2xl border border-white/80 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_40px_80px_-34px_rgba(15,45,90,0.45)] min-h-[20rem] lg:min-h-[22rem]">
        <img
          src={portrait}
          alt=""
          aria-hidden="true"
          width={600}
          height={800}
          loading="lazy"
          decoding="async"
          className="hidden md:block absolute right-0 top-0 h-full w-[46%] object-cover object-top [mask-image:linear-gradient(to_right,transparent,black_45%)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_45%)]"
        />

        <div className="relative z-10 p-6 sm:p-9 md:w-[62%] flex flex-col h-full min-h-[inherit]">
          <Quote className="w-12 h-12 text-primary/80 mb-4" fill="currentColor" strokeWidth={0} aria-hidden="true" />
          <blockquote className="flex-1 text-[1.05rem] sm:text-xl leading-snug text-slate-800 text-balance">
            “{t.content}”
          </blockquote>
          <div className="h-px bg-primary/15 my-5" />
          <figcaption className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center text-white text-sm font-black shrink-0 ring-2 ring-white"
              style={{ background: `linear-gradient(135deg, ${t.avatarFrom}, ${t.avatarTo})` }}
            >
              <AvatarImage src={t.avatarImg} alt={t.name} fallback={t.initials} />
            </div>
            <div className="min-w-0 leading-tight">
              <p className="font-bold text-slate-900">{t.name}</p>
              <p className="text-sm text-slate-500 mt-0.5">
                {t.role} · <span className="font-semibold text-primary">{t.company}</span>
              </p>
            </div>
          </figcaption>
        </div>
      </figure>

      <p className="sr-only" role="status" aria-live="polite">
        Testimonial {index + 1} of {count}: {t.name}, {t.company}
      </p>

      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-2" role="group" aria-label="Choose testimonial">
          {allTestimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}: ${item.name}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 ${
                i === index ? "w-7 bg-primary" : "w-2 bg-primary/25 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={btn}>
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={btn}>
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
