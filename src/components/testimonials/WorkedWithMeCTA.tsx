import { ArrowRight, MessageSquareHeart } from "lucide-react";

type WorkedWithMeCTAProps = {
  onOpen: () => void;
  /** "floating" = desktop card over the carousel; "inline" = compact card beside the heading on phones/tablets. */
  variant: "floating" | "inline";
};

export default function WorkedWithMeCTA({ onOpen, variant }: WorkedWithMeCTAProps) {
  const isFloating = variant === "floating";

  return (
    <div className={isFloating ? "hidden lg:block w-full" : "lg:hidden w-full"}>
      <button
        type="button"
        onClick={onOpen}
        className="group relative w-full text-left rounded-[clamp(1rem,5vw,1.5rem)] p-[clamp(0.5rem,2.7vw,1.25rem)] lg:p-5
                   bg-white/80 backdrop-blur-2xl border border-white/90
                   shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_24px_50px_-18px_rgba(15,45,90,0.3)]
                   transition hover:border-primary/30 hover:shadow-[0_30px_60px_-16px_rgba(15,45,90,0.38)] motion-reduce:transition-none
                   focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
      >
        <div className="flex items-start gap-[clamp(0.3rem,1.6vw,0.75rem)]">
          <div className="w-[clamp(1.4rem,7vw,2.5rem)] h-[clamp(1.4rem,7vw,2.5rem)] rounded-[clamp(0.5rem,2.4vw,0.9rem)] bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <MessageSquareHeart className="w-1/2 h-1/2 text-primary" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-sans font-bold text-[#101828] leading-tight text-[clamp(0.64rem,3vw,1rem)]">Worked with me?</p>
            <p className="font-semibold text-primary leading-tight mt-1 text-[clamp(0.62rem,2.9vw,0.9rem)]">
              Share your experience
              <ArrowRight className="inline-block w-3 h-3 ml-1 align-[-1px]" aria-hidden="true" />
            </p>
          </div>
        </div>
        <div className="h-px bg-slate-200/90 mt-[clamp(0.45rem,2.4vw,0.75rem)]" aria-hidden="true" />
        <p className="text-slate-500 leading-snug mt-[clamp(0.4rem,2.2vw,0.75rem)] text-[clamp(0.6rem,2.7vw,0.8rem)]">
          If we&apos;ve worked together, I&apos;d love to hear about your experience.
        </p>
      </button>
    </div>
  );
}
