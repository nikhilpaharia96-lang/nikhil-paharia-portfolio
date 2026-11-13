import { useState } from "react";
import { X } from "lucide-react";

/** Reusable media block: playable video, click-to-zoom image, original aspect ratio.
 *  With no `src` it renders a clearly-labelled placeholder (no fake screenshots). */
export default function Media({ src, type = "image", alt = "", label = "Media placeholder", poster }: {
  src?: string; type?: "image" | "video"; alt?: string; label?: string; poster?: string;
}) {
  const [open, setOpen] = useState(false);
  if (!src)
    return (
      <div className="sn-glass flex aspect-video w-full items-center justify-center text-center text-[clamp(.7rem,1.3vw,1.1rem)] text-sky-200/70"
        style={{ background: "linear-gradient(135deg,rgba(56,189,248,.12),rgba(168,85,247,.14))" }}>
        ▶ {label}<br />add file in public/studynova/
      </div>
    );
  if (type === "video")
    return <video src={src} poster={poster} controls playsInline preload="metadata" className="w-full rounded-2xl" style={{ height: "auto" }} />;
  return (
    <>
      <img src={src} alt={alt} onClick={() => setOpen(true)} className="h-auto w-full cursor-zoom-in rounded-2xl" />
      {open && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4" onClick={() => setOpen(false)}>
          <button aria-label="Close preview" className="absolute right-4 top-4 sn-btn"><X size={20} /></button>
          <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
        </div>
      )}
    </>
  );
}
