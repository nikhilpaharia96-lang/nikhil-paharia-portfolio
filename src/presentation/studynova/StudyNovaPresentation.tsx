import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize, Minimize, LayoutGrid, StickyNote, Sparkles, Home, X } from "lucide-react";
import { slides } from "./slides";
import Demo from "./Demo";
import "./studynova.css";

export default function StudyNovaPresentation() {
  const [i, setI] = useState(0), [dir, setDir] = useState(1);
  const [overview, setOverview] = useState(false), [notes, setNotes] = useState(false), [demo, setDemo] = useState(false), [fs, setFs] = useState(false);
  const root = useRef<HTMLDivElement>(null), touch = useRef(0);
  const n = slides.length;

  const go = useCallback((to: number) => { setI((c) => { const t = Math.max(0, Math.min(n - 1, to)); setDir(t >= c ? 1 : -1); return t; }); }, [n]);
  const toggleFs = useCallback(() => { if (document.fullscreenElement) document.exitFullscreen?.(); else root.current?.requestFullscreen?.().catch(() => {}); }, []);

  useEffect(() => { const p = document.title; document.title = "StudyNova AI – Hackathon Presentation"; return () => { document.title = p; }; }, []);
  useEffect(() => { const f = () => setFs(!!document.fullscreenElement); document.addEventListener("fullscreenchange", f); return () => document.removeEventListener("fullscreenchange", f); }, []);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (demo) setDemo(false); else if (overview) setOverview(false); return; }
      if (demo) return;
      const k = e.key.toLowerCase();
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(i + 1); }
      else if (e.key === "ArrowLeft") go(i - 1);
      else if (k === "f") toggleFs();
      else if (k === "n") setNotes((v) => !v);
      else if (k === "o") setOverview((v) => !v);
    };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, [i, go, demo, overview, toggleFs]);

  const S = slides[i];
  return (
    <div ref={root} className="sn-root fixed inset-0 z-[100] overflow-hidden"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 60) go(i + (d < 0 ? 1 : -1)); }}>
      <div className="absolute left-0 top-0 z-20 h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-500 transition-all duration-500" style={{ width: `${((i + 1) / n) * 100}%` }} />
      <AnimatePresence mode="wait" custom={dir}>
        <motion.main key={S.id} custom={dir} className="absolute inset-0 overflow-y-auto"
          initial={{ opacity: 0, x: dir * 60, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: dir * -60, filter: "blur(8px)" }} transition={{ duration: 0.45 }}>
          <S.view />
        </motion.main>
      </AnimatePresence>

      <div className="absolute left-0 right-0 top-1 z-30 flex items-center gap-2 p-3">
        <Link href="/" className="sn-btn" aria-label="Back to portfolio"><Home size={18} /></Link>
        <button onClick={() => setDemo(true)} className="sn-btn flex items-center gap-2 text-sm font-semibold"><Sparkles size={16} /><span className="hidden sm:inline">Experience the StudyNova Demo</span><span className="sm:hidden">Demo</span></button>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setNotes((v) => !v)} className="sn-btn" aria-label="Speaker notes" title="Notes (N)"><StickyNote size={18} /></button>
          <button onClick={() => setOverview(true)} className="sn-btn" aria-label="Overview" title="Overview (O)"><LayoutGrid size={18} /></button>
          <button onClick={toggleFs} className="sn-btn" aria-label="Toggle fullscreen" title="Fullscreen (F)">{fs ? <Minimize size={18} /> : <Maximize size={18} />}</button>
        </div>
      </div>

      {notes && <div className="sn-glass absolute inset-x-4 bottom-16 z-30 p-4 text-[clamp(.9rem,1.4vw,1.2rem)]"><b className="text-sky-300">Speaker notes · </b>{S.notes}</div>}

      <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between p-3">
        <button onClick={() => go(i - 1)} disabled={i === 0} className="sn-btn disabled:opacity-30" aria-label="Previous slide"><ChevronLeft /></button>
        <div className="text-sm tabular-nums text-sky-200">{i + 1} / {n} · {S.title}</div>
        <button onClick={() => go(i + 1)} disabled={i === n - 1} className="sn-btn disabled:opacity-30" aria-label="Next slide"><ChevronRight /></button>
      </div>

      {overview && (
        <div className="absolute inset-0 z-40 overflow-y-auto bg-[#03050d]/95 p-6">
          <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-bold">Overview</h2><button onClick={() => setOverview(false)} className="sn-btn" aria-label="Close overview"><X size={18} /></button></div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{slides.map((s, k) => <button key={s.id} onClick={() => { go(k); setOverview(false); }} className={`sn-glass p-4 text-left ${k === i ? "!border-sky-300" : ""}`}><span className="sn-grad text-2xl font-black">{String(k + 1).padStart(2, "0")}</span><div className="text-sm">{s.title}</div></button>)}</div>
        </div>
      )}
      {demo && <Demo onClose={() => setDemo(false)} />}
    </div>
  );
}
