import { useEffect, useRef, useState } from "react";
import { X, Play } from "lucide-react";
import { motion } from "framer-motion";

const STAGES = ["Understanding request", "Planning tasks", "Selecting AI tools", "Processing & generating", "Delivering output"];
const MODS: Record<string, { sample: string; out: string[] }> = {
  "Nova Learn": { sample: "Explain Photosynthesis in Assamese", out: ["Simple explanation (Assamese)", "Structured study notes", "Labelled diagram", "Narration script", "Lecture-video preview", "5 MCQs + quiz"] },
  "Nova Business": { sample: "Create a marketing plan for my digital agency", out: ["Business analysis", "Marketing strategy", "Target audience profiles", "30-day content calendar", "Advertising ideas", "Budget plan", "Final proposal draft"] },
  "Nova Creator": { sample: "Create a promotional video for my business", out: ["Concept & script", "Scene breakdown", "Voiceover draft", "Subtitles", "Video timeline", "Preview placeholder"] },
  "Nova Life": { sample: "Plan my week: classes, assignments and a client follow-up", out: ["Daily task list", "Class schedule", "Assignment reminders", "Deadline tracker", "Goal suggestions"] },
};

export default function Demo({ onClose }: { onClose: () => void }) {
  const [mod, setMod] = useState("Nova Learn");
  const [prompt, setPrompt] = useState(MODS["Nova Learn"].sample);
  const [stage, setStage] = useState(-1);
  const t = useRef<number>();
  const run = () => {
    window.clearInterval(t.current); setStage(0);
    let s = 0;
    t.current = window.setInterval(() => { s++; setStage(s); if (s >= STAGES.length) window.clearInterval(t.current); }, 900);
  };
  useEffect(() => () => window.clearInterval(t.current), []);
  const done = stage >= STAGES.length;
  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#03050d]/95 p-4 sm:p-8" role="dialog" aria-label="StudyNova demo">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold sm:text-4xl">Experience the <span className="sn-grad">StudyNova Demo</span></h2>
          <button onClick={onClose} aria-label="Close demo" className="sn-btn"><X size={20} /></button>
        </div>
        <p className="mb-5 inline-block rounded-full border border-amber-400/50 bg-amber-400/10 px-4 py-1.5 text-sm font-semibold text-amber-300">Prototype Simulation — Not Live AI Processing</p>
        <div className="sn-glass space-y-4 p-4 sm:p-6">
          <div className="flex flex-wrap gap-2">
            {Object.keys(MODS).map((m) => (
              <button key={m} onClick={() => { setMod(m); setPrompt(MODS[m].sample); setStage(-1); }}
                className={`sn-btn ${m === mod ? "!bg-sky-500/30 !border-sky-300" : ""}`}>{m}</button>
            ))}
          </div>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={2} aria-label="Prompt"
            className="w-full rounded-xl border border-sky-400/30 bg-black/40 p-3 text-lg text-white outline-none focus:border-sky-300" />
          <button onClick={run} className="sn-btn flex items-center gap-2 !bg-gradient-to-r !from-sky-500 !to-violet-500 font-semibold"><Play size={16} /> Run Nova Brain</button>
          {stage >= 0 && (
            <ol className="grid gap-2 sm:grid-cols-5">
              {STAGES.map((s, i) => (
                <li key={s} className={`rounded-xl border p-3 text-sm transition ${i < stage ? "border-emerald-400/60 bg-emerald-400/10" : i === stage ? "border-sky-300 bg-sky-400/20 animate-pulse" : "border-white/10 opacity-50"}`}>
                  <b>{i + 1}.</b> {s}
                </li>
              ))}
            </ol>
          )}
          {done && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="sn-glass p-4">
              <p className="mb-2 text-sm text-sky-300">Simulated result for “{prompt}”</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {MODS[mod].out.map((o) => <li key={o} className="rounded-lg bg-white/5 p-3">✔ {o}</li>)}
              </ul>
              <p className="mt-3 text-xs text-amber-300/80">Predefined local mock data · no API calls were made.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
