import { useState } from "react";
import { MoveDownLeft } from "lucide-react";
import BackgroundGlow from "./BackgroundGlow";
import FeaturedTestimonial from "./FeaturedTestimonial";
import TestimonialStats from "./TestimonialStats";
import TrustedByBrands from "./TrustedByBrands";
import StoriesGrid from "./StoriesGrid";
import WorkedWithMeCTA from "./WorkedWithMeCTA";
import SubmitTestimonialModal from "./SubmitTestimonialModal";

export default function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden section-wrap max-w-full py-20 sm:py-28 lg:py-32"
      aria-label="Testimonials — Client Stories"
    >
      <BackgroundGlow />

      <div className="container-tight relative z-10 max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_24px_-12px_rgba(15,45,90,0.25)] mb-6">
              <span aria-hidden="true" className="text-primary font-black leading-none">“</span>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase text-primary">
                Client Stories
              </span>
            </div>

            <h2 className="font-sans font-extrabold tracking-tight text-[2.7rem] sm:text-6xl lg:text-[4rem] leading-[1] text-[#101828]">
              Loved by
              <br />
              Clients.
              <br />
              Built on{" "}
              <span className="relative inline-block text-primary">
                Trust.
                <svg
                  aria-hidden="true"
                  className="absolute left-0 -bottom-2 w-full h-3"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path d="M3 8 C 40 2, 110 2, 197 6" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>

            <p className="mt-7 max-w-md text-base sm:text-[1.05rem] leading-relaxed text-slate-600">
              Real stories from founders, creators and businesses I've worked with. Every project is
              crafted with attention to detail, performance and long-term impact.
            </p>

            <TestimonialStats />
          </div>

          <div className="lg:col-span-7 relative">
            <div className="hidden lg:block absolute -top-24 right-0 z-20 w-64">
              <WorkedWithMeCTA variant="floating" onOpen={() => setModalOpen(true)} />
            </div>
            <div
              aria-hidden="true"
              className="hidden xl:flex absolute -top-16 -right-24 flex-col items-start font-script font-bold text-xl leading-tight text-[#14284f] -rotate-6"
            >
              <span>
                Ideas
                <br />
                People
                <br />
                Places
                <br />
                Stories
              </span>
              <MoveDownLeft className="w-6 h-6 text-primary -ml-5" strokeWidth={1.6} />
            </div>
            <FeaturedTestimonial />
            <WorkedWithMeCTA variant="inline" onOpen={() => setModalOpen(true)} />
          </div>
        </div>

        <TrustedByBrands />
        <StoriesGrid />
      </div>

      <SubmitTestimonialModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
