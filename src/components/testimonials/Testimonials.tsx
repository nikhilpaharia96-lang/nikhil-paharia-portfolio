import { useState } from "react";
import { MoveDownLeft } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import BackgroundGlow from "./BackgroundGlow";
import FeaturedTestimonial from "./FeaturedTestimonial";
import TestimonialStats from "./TestimonialStats";
import TrustedByBrands from "./TrustedByBrands";
import WorkedWithMeCTA from "./WorkedWithMeCTA";
import SubmitTestimonialModal from "./SubmitTestimonialModal";

export default function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden section-wrap max-w-full pt-28 pb-14 sm:pt-32 sm:pb-20 lg:py-32"
      aria-label="Testimonials — Client Stories"
    >
      <div className="container-tight relative z-10 max-w-full">
        {/* Mobile order: intro → feedback card → carousel → stats. Desktop: two columns. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6 lg:gap-y-10 items-start">
          {/* Intro. Phones/tablets: heading column on the left, compact feedback card on the right (as in the design). */}
          <div className="lg:col-span-5 lg:row-start-1 grid grid-cols-1 min-[360px]:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)] gap-x-[clamp(0.6rem,3vw,1.5rem)] lg:block">
            <div className="min-[360px]:col-span-1">
              <SectionHeader label="06 — Client Stories" title="Loved by Clients" />
            </div>

            <p className="mt-[clamp(0.8rem,4vw,1.5rem)] max-w-md text-[clamp(0.72rem,3.1vw,1rem)] lg:text-[1.05rem] leading-[1.55] text-white/90 min-[360px]:row-start-3">
              Real stories from founders, creators and businesses I've worked with. Every project is
              crafted with attention to detail, performance and long-term impact.
            </p>

            <div className="mt-5 min-[360px]:mt-0 min-[360px]:col-start-2 min-[360px]:row-start-2 min-[360px]:row-span-2 min-[360px]:self-start lg:hidden">
              <WorkedWithMeCTA variant="inline" onOpen={() => setModalOpen(true)} />
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-center relative">
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
          </div>

          <div className="lg:col-span-5 lg:row-start-2">
            <TestimonialStats />
          </div>
        </div>

        <TrustedByBrands />
      </div>

      <SubmitTestimonialModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
