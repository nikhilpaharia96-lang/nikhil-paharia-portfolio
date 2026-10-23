import { RiArrowDownLine } from "react-icons/ri";
import { scrollToId } from "@/lib/scroll";

/**
 * "Scroll" cue under the Hero. A real <button>: keyboard-focusable and
 * announced as an action; clicking glides to the next section. The bounce is
 * CSS-only (transform) and switched off for reduced-motion users.
 */
export default function ScrollIndicator({
  targetId = "about",
  size = "md",
  className = "",
}: {
  targetId?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const sm = size === "sm";
  return (
    <button
      type="button"
      onClick={() => scrollToId(targetId)}
      aria-label="Scroll to the next section"
      className={`group flex flex-col items-center ${sm ? "gap-0.5" : "gap-2"} cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${className}`}
    >
      <span className={`${sm ? "text-[9px]" : "text-xs"} text-slate-500 tracking-widest uppercase font-mono transition-colors group-hover:text-primary`}>
        Scroll
      </span>
      <span className="scroll-bounce flex flex-col items-center">
        <RiArrowDownLine className={`text-primary ${sm ? "text-sm" : "text-xl"}`} />
      </span>
    </button>
  );
}
