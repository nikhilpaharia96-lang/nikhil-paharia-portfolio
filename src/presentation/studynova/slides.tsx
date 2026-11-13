import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import Media from "./Media";

const T = "text-[clamp(1.5rem,4vw,3.75rem)] font-bold leading-tight";
const B = "text-[clamp(.95rem,1.8vw,1.6rem)]";
const rise = (i = 0) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.12 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } });

const Wrap = ({ children }: { children: ReactNode }) => <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col justify-center gap-[clamp(.8rem,2.2vh,1.8rem)] px-[5vw] py-20">{children}</div>;
const Title = ({ k, children }: { k?: string; children: ReactNode }) => (<motion.div {...rise()}>{k && <p className="mb-2 text-[clamp(.7rem,1.2vw,1rem)] font-semibold uppercase tracking-[.3em] text-sky-400">{k}</p>}<h2 className={T}>{children}</h2></motion.div>);
const Tag = ({ children, c = "amber" }: { children: ReactNode; c?: "amber" | "sky" }) => <span className={`inline-block w-fit rounded-full border px-4 py-1 text-[clamp(.7rem,1.2vw,1rem)] font-semibold ${c === "amber" ? "border-amber-400/50 bg-amber-400/10 text-amber-300" : "border-sky-400/50 bg-sky-400/10 text-sky-300"}`}>{children}</span>;
const Bullets = ({ items }: { items: string[] }) => <ul className={`space-y-[1.2vh] ${B}`}>{items.map((t, i) => <motion.li key={t} {...rise(i + 1)} className="flex gap-3"><span className="mt-[.55em] h-2 w-2 shrink-0 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />{t}</motion.li>)}</ul>;
const Chip = ({ children, i = 0 }: { children: ReactNode; i?: number }) => <motion.span {...rise(i)} className="sn-glass inline-block px-4 py-2 text-[clamp(.8rem,1.5vw,1.3rem)]">{children}</motion.span>;

function Flow({ steps, vertical = false }: { steps: string[]; vertical?: boolean }) {
  return (
    <div className={`flex ${vertical ? "flex-col" : "flex-col lg:flex-row"} items-stretch gap-2`}>
      {steps.map((s, i) => (
        <div key={s} className={`flex ${vertical ? "flex-col" : "flex-col lg:flex-row"} items-center gap-2 ${vertical ? "" : "lg:flex-1"}`}>
          <motion.div {...rise(i + 1)} className="sn-glass w-full flex-1 p-[clamp(.6rem,1.4vw,1.2rem)] text-center text-[clamp(.8rem,1.5vw,1.3rem)] font-medium">{s}</motion.div>
          {i < steps.length - 1 && (vertical ? <ArrowDown className="shrink-0 text-sky-400" /> : <><ArrowRight className="hidden shrink-0 text-sky-400 lg:block" /><ArrowDown className="shrink-0 text-sky-400 lg:hidden" /></>)}
        </div>
      ))}
    </div>
  );
}

function Orbit({ center, nodes }: { center: string; nodes: string[] }) {
  const n = nodes.length, pt = (i: number, r = 38) => { const a = (i / n) * 2 * Math.PI - Math.PI / 2; return [50 + r * Math.cos(a), 50 + r * Math.sin(a)]; };
  return (
    <div className="relative mx-auto aspect-square w-[min(62vh,92vw)]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(120,160,255,.18)" strokeWidth=".3" />
        {nodes.map((_, i) => { const [x, y] = pt(i); return <line key={i} x1="50" y1="50" x2={x} y2={y} className="sn-line" />; })}
      </svg>
      <div className="sn-core absolute left-1/2 top-1/2 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-violet-600 text-center text-[clamp(.7rem,1.6vw,1.4rem)] font-bold">{center}</div>
      {nodes.map((t, i) => { const [x, y] = pt(i); return <motion.div key={t} initial={{ opacity: 0, scale: .4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .15 * i + .3 }} className="sn-glass absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-[1.2vmin] py-[.8vmin] text-[clamp(.6rem,1.35vw,1.1rem)]" style={{ left: `${x}%`, top: `${y}%` }}>{t}</motion.div>; })}
    </div>
  );
}

const Phone = ({ children }: { children: ReactNode }) => <div className="sn-glass mx-auto w-[min(86vw,22rem)] overflow-hidden !rounded-[2rem] p-3"><div className="mb-2 flex items-center gap-2 rounded-xl bg-[#0f3d34] px-3 py-2 text-sm font-semibold">💬 StudyNova <span className="ml-auto text-[10px] font-normal opacity-70">simulation</span></div><div className="min-h-[18rem] space-y-2 p-1 text-sm">{children}</div></div>;
const Msg = ({ u, children, d }: { u?: boolean; children: ReactNode; d: number }) => <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d }} className={`max-w-[85%] rounded-2xl px-3 py-2 ${u ? "sn-bubble-u ml-auto" : "sn-bubble-a"}`}>{children}</motion.div>;

function LearnPreview() {
  const [tab, setTab] = useState("Notes"), [pick, setPick] = useState<number | null>(null);
  const tabs = ["Notes", "Diagram", "Quiz"];
  return (
    <div className="sn-glass p-4">
      <div className="mb-3 flex gap-2">{tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`sn-btn text-sm ${t === tab ? "!bg-sky-500/30 !border-sky-300" : ""}`}>{t}</button>)}</div>
      {tab === "Notes" && <div className="space-y-2 text-[clamp(.85rem,1.4vw,1.2rem)]"><p className="font-semibold">সালোকসংশ্লেষণ (Photosynthesis)</p><p>উদ্ভিদে সূৰ্যৰ পোহৰ, পানী আৰু কাৰ্বন ডাই অক্সাইড ব্যৱহাৰ কৰি খাদ্য তৈয়াৰ কৰা প্ৰক্ৰিয়া।</p><p className="text-sky-300/80 text-sm">Sample text — illustrative preview, not generated live.</p></div>}
      {tab === "Diagram" && <div className="flex items-center justify-around text-center text-[clamp(.8rem,1.4vw,1.2rem)]"><span>☀️ Sunlight</span><ArrowRight className="text-sky-400" /><span className="sn-glass px-4 py-3">🌿 Leaf<br /><small>chlorophyll</small></span><ArrowRight className="text-sky-400" /><span>🍬 Glucose<br />+ O₂</span></div>}
      {tab === "Quiz" && <div className="space-y-2 text-[clamp(.85rem,1.4vw,1.2rem)]"><p>Which gas do plants absorb for photosynthesis?</p>{["Oxygen", "Carbon dioxide", "Nitrogen"].map((o, i) => <button key={o} onClick={() => setPick(i)} className={`sn-btn block w-full text-left ${pick === i ? (i === 1 ? "!bg-emerald-500/30 !border-emerald-300" : "!bg-rose-500/30 !border-rose-300") : ""}`}>{o}{pick === i && (i === 1 ? " ✔ Correct" : " ✘ Try again")}</button>)}</div>}
    </div>
  );
}

function WhatsApp() {
  const [ex, setEx] = useState(0);
  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-2"><button onClick={() => setEx(0)} className={`sn-btn text-sm ${ex === 0 ? "!bg-sky-500/30" : ""}`}>Example 1</button><button onClick={() => setEx(1)} className={`sn-btn text-sm ${ex === 1 ? "!bg-sky-500/30" : ""}`}>Example 2</button></div>
      <Phone key={ex}>
        {ex === 0 ? <>
          <Msg u d={0.2}>Explain Newton's Three Laws of Motion in Assamese.</Msg>
          <Msg d={1}>Sure! I'll prepare a simple explanation for you.</Msg>
          <Msg d={2}>✅ Your learning package is ready!<div className="mt-2 flex flex-wrap gap-1">{["Read Notes", "View Lecture", "Take Quiz"].map((b) => <span key={b} className="rounded-full border border-sky-300/50 px-2 py-1 text-xs text-sky-200">{b}</span>)}</div></Msg>
        </> : <>
          <Msg u d={0.2}>Remind me to follow up with my client tomorrow.</Msg>
          <Msg d={1}>Your reminder has been added to your daily planner. ⏰</Msg>
        </>}
      </Phone>
    </div>
  );
}

function Planner() {
  const init = [["8:30", "Morning class: Physics", true], ["11:00", "Submit DBMS assignment", false], ["14:00", "Follow up with client", false], ["18:00", "Revise Nova Learn notes", false]] as const;
  const [done, setDone] = useState<boolean[]>(init.map((x) => x[2]));
  const pct = Math.round((done.filter(Boolean).length / done.length) * 100);
  return (
    <div className="sn-glass space-y-2 p-4">
      {init.map(([t, l], i) => <button key={l} onClick={() => setDone(done.map((d, j) => (j === i ? !d : d)))} className="flex w-full items-center gap-3 rounded-lg bg-white/5 p-3 text-left text-[clamp(.85rem,1.4vw,1.2rem)]"><span className="text-sky-400">{t}</span><span className={done[i] ? "line-through opacity-50" : ""}>{l}</span><span className="ml-auto">{done[i] ? "✔" : "○"}</span></button>)}
      <div className="pt-2 text-sm text-sky-200">Today's goal · {pct}%</div><div className="h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500 transition-all" style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

export const Logo = ({ big = false }: { big?: boolean }) => <div className={`sn-grad font-black tracking-[.15em] ${big ? "text-[clamp(2.2rem,9vw,8rem)]" : "text-3xl"}`}>STUDYNOVA AI</div>;
const Tagline = () => <p className="text-[clamp(1.2rem,3vw,2.6rem)] font-light text-sky-200">One AI. Your Entire World.</p>;

export interface SlideDef { id: string; title: string; notes: string; view: () => JSX.Element }
export const slides: SlideDef[] = [
  { id: "opening", title: "Opening", notes: "Introduce yourself and StudyNova AI: one AI companion across learning, work, creativity and life.", view: () => (
    <Wrap><div className="flex flex-col items-center gap-6 text-center">
      <motion.div initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}><Logo big /></motion.div>
      <motion.div {...rise(5)}><Tagline /></motion.div>
      <motion.p {...rise(7)} className={`max-w-4xl ${B} text-slate-300`}>An AI-powered personal life companion and universal AI ecosystem.</motion.p>
      <motion.div {...rise(9)} className="relative mt-2 h-[26vh] w-full max-w-3xl">
        {["📚 Education", "💼 Business", "🎬 Creative", "💻 Tech"].map((t, i) => <span key={t} className="sn-glass sn-float absolute px-3 py-2 text-[clamp(.7rem,1.4vw,1.1rem)]" style={{ left: `${[2, 68, 12, 76][i]}%`, top: `${[5, 0, 62, 58][i]}%`, animationDelay: `${i * .7}s` }}>{t}</span>)}
        <div className="sn-core absolute left-1/2 top-1/2 h-[min(20vh,9rem)] w-[min(20vh,9rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-violet-600" />
      </motion.div></div></Wrap>) },
  { id: "problem", title: "The Problem", notes: "Stress fragmentation: too many disconnected tools, each doing one task.", view: () => (
    <Wrap><Title k="The Problem">The World Has Too Many Tools. People Need One Intelligent Companion.</Title>
      <div className="grid items-center gap-6 lg:grid-cols-2"><Bullets items={["Students struggle to understand complex topics and prepare learning materials.", "Business owners use separate tools for marketing, management and planning.", "Creators need different tools for scripts, graphics, videos and audio.", "People waste time switching between disconnected applications.", "Existing AI experiences often focus on individual tasks."]} />
        <div className="relative mx-auto h-[38vh] w-full max-w-md">{["Notes", "Slides", "Email", "Design", "Video", "Calendar", "Docs"].map((t, i) => <span key={t} className="sn-glass sn-float absolute px-3 py-2 text-[clamp(.7rem,1.3vw,1.1rem)]" style={{ left: `${(i * 37) % 75}%`, top: `${(i * 29) % 80}%`, animationDelay: `${i * .5}s` }}>{t}</span>)}</div></div></Wrap>) },
  { id: "vision", title: "Our Vision", notes: "Seven domains, one intelligent companion at the centre.", view: () => (
    <Wrap><Title k="Our Vision">Imagine One AI That Understands What You Need.</Title><div className="grid items-center gap-4 lg:grid-cols-[1fr_auto]"><div><p className={`${B} mb-3 text-slate-300`}>StudyNova AI aims to become one intelligent companion that connects:</p><Bullets items={["Education", "Business", "Creativity", "Research", "Software Development", "Personal Productivity", "Automation"]} /></div><Orbit center="StudyNova" nodes={["Education", "Business", "Creativity", "Research", "Dev", "Productivity", "Automation"]} /></div></Wrap>) },
  { id: "solution", title: "The Solution", notes: "One natural instruction in; a completed result out.", view: () => (
    <Wrap><Title k="The Solution">Meet StudyNova AI.</Title><Flow steps={["One instruction", "Understanding", "Planning", "AI Tools", "Completed Result"]} />
      <div className="flex flex-wrap gap-3">{["⌨️ Text", "🎙️ Voice", "🖼️ Images", "📄 Documents"].map((c, i) => <Chip key={c} i={i + 6}>{c}</Chip>)}</div>
      <motion.p {...rise(10)} className={`${B} text-slate-300`}>The AI understands the goal, plans the work and coordinates specialized AI modules.</motion.p></Wrap>) },
  { id: "brain", title: "Nova Brain", notes: "Emphasise: this is the PROPOSED architecture, not a finished system.", view: () => (
    <Wrap><Title k="The Brain">Meet Nova Brain — The Intelligence Behind Everything.</Title><Tag>Proposed system architecture</Tag>
      <Flow steps={["1 · Understand the request", "2 · Plan the tasks", "3 · Select specialized AI tools", "4 · Process & generate", "5 · Deliver the output"]} />
      <div className="sn-glass sn-core mx-auto px-8 py-3 text-center text-[clamp(1rem,2vw,1.8rem)] font-bold sn-grad">🧠 NOVA BRAIN</div></Wrap>) },
  { id: "learn", title: "Nova Learn", notes: "Click Notes / Diagram / Quiz in the preview. The Assamese sample is illustrative.", view: () => (
    <Wrap><Title k="Nova Learn">Turn Any Topic Into a Complete Learning Experience.</Title>
      <Chip>“Explain Photosynthesis in Assamese.”</Chip>
      <div className="grid gap-5 lg:grid-cols-2"><Bullets items={["Understand the topic", "Generate a simple explanation", "Create study notes", "Generate diagrams", "Prepare narration", "Create a lecture-video preview", "Generate MCQs and quizzes"]} /><LearnPreview /></div></Wrap>) },
  { id: "business", title: "Nova Business", notes: "Dashboard layout is a concept; bars are illustrative, not real data.", view: () => (
    <Wrap><Title k="Nova Business">Your AI Business Partner.</Title><Chip>“Create a marketing plan for my digital agency.”</Chip>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{["Business analysis", "Marketing strategy", "Target audience", "Content calendar", "Advertising ideas", "Budget planning"].map((t, i) => <motion.div key={t} {...rise(i + 2)} className="sn-glass p-4 text-[clamp(.8rem,1.4vw,1.2rem)]">{t}<div className="mt-3 h-2 rounded bg-white/10"><motion.div initial={{ width: 0 }} animate={{ width: `${55 + ((i * 17) % 40)}%` }} transition={{ delay: .6 + i * .1, duration: 1 }} className="h-full rounded bg-gradient-to-r from-sky-400 to-violet-500" /></div></motion.div>)}
        <motion.div {...rise(9)} className="sn-glass col-span-2 p-4 font-semibold sn-grad lg:col-span-2">📄 Final marketing proposal</motion.div></div><Tag c="sky">Illustrative concept dashboard</Tag></Wrap>) },
  { id: "creator", title: "Nova Creator", notes: "Walk the pipeline left to right. The video area is a placeholder until you add a file.", view: () => (
    <Wrap><Title k="Nova Creator">From One Idea to Professional Content.</Title><Chip>“Create a promotional video for my business.”</Chip>
      <Flow steps={["Idea", "Script", "Scenes", "Voiceover", "Subtitles", "Timeline", "Final Preview"]} />
      <div className="grid items-center gap-4 lg:grid-cols-2"><Media label="Video preview placeholder" /><div className="sn-glass space-y-2 p-4">{[["Video", "from-sky-500 to-indigo-500", 90], ["Voice", "from-violet-500 to-fuchsia-500", 70], ["Subtitles", "from-cyan-400 to-sky-500", 80]].map(([n, g, w], i) => <div key={n as string} className="flex items-center gap-3 text-sm"><span className="w-16">{n}</span><motion.div initial={{ width: 0 }} animate={{ width: `${w}%` }} transition={{ delay: .5 + i * .2, duration: 1 }} className={`h-5 rounded bg-gradient-to-r ${g}`} /></div>)}<p className="pt-1 text-xs text-sky-300/80">Simulated editor interface</p></div></div></Wrap>) },
  { id: "life", title: "Nova Life", notes: "Tap tasks in the planner to tick them off.", view: () => (
    <Wrap><Title k="Nova Life">An AI That Helps Organize Your Entire Day.</Title><div className="grid items-center gap-5 lg:grid-cols-2"><Bullets items={["Daily tasks", "Class schedules", "Assignment reminders", "Important notes", "Deadlines", "Goals", "Personal productivity suggestions"]} /><Planner /></div></Wrap>) },
  { id: "whatsapp", title: "WhatsApp Integration", notes: "Visual simulation only. Real integration would use the official WhatsApp Business Platform.", view: () => (
    <Wrap><Title k="WhatsApp Integration">Your AI Companion, Right Inside WhatsApp.</Title><Tag>Visual simulation — no real WhatsApp connection</Tag>
      <div className="grid items-center gap-5 lg:grid-cols-[1.1fr_1fr]"><Flow vertical steps={["WhatsApp Message", "StudyNova Backend", "Nova Brain", "Nova Learn", "Learning Package", "WhatsApp Response"]} /><WhatsApp /></div></Wrap>) },
  { id: "wearable", title: "Future Wearable", notes: "Say clearly: future concept only, consent-based, not an existing device.", view: () => (
    <Wrap><Title k="Future Concept">An AI Companion That Understands Your Day.</Title><Tag>Future concept — not an existing working device</Tag>
      <div className="grid items-center gap-6 lg:grid-cols-2"><Bullets items={["Voice interaction", "Consent-based classroom recording", "Lecture summaries", "Assignment tracking", "Client meeting summaries", "Personal productivity assistance"]} />
        <div className="flex flex-col items-center gap-5"><div className="sn-float sn-core relative h-[22vh] w-[min(60vw,14rem)] rounded-[2.5rem] border border-sky-300/40 bg-gradient-to-br from-slate-800 to-slate-950"><span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_#67e8f9]" /></div>
          <p className="sn-grad text-center text-[clamp(1.1rem,2.4vw,2.2rem)] font-bold">Your data. Your permission. Your control.</p></div></div></Wrap>) },
  { id: "ecosystem", title: "Complete Ecosystem", notes: "Nine modules, all coordinated by Nova Brain.", view: () => (
    <Wrap><Title k="Complete AI Ecosystem">Nine Interconnected Modules</Title><Orbit center="Nova" nodes={["Nova Brain", "Nova Learn", "Nova Memory", "Nova Life", "Nova Business", "Nova Creator", "Nova Builder", "Nova Research", "Nova Automation"]} /></Wrap>) },
  { id: "architecture", title: "Innovation Architecture", notes: "Top to bottom. WhatsApp is a potential extra channel.", view: () => (
    <Wrap><Title k="Innovation Architecture">How It All Fits Together</Title><div className="grid items-center gap-4 lg:grid-cols-[1fr_auto]"><Flow vertical steps={["USER", "MULTIMODAL INPUT (Text / Voice / Camera / Files)", "NOVA BRAIN", "AI ORCHESTRATION ENGINE", "SPECIALIZED AI MODULES", "RESULT GENERATION", "USER RECEIVES COMPLETED OUTPUT"]} /><motion.div {...rise(4)} className="sn-glass border-dashed p-4 text-center">💬 WhatsApp<br /><small className="text-sky-300">potential interaction channel</small></motion.div></div></Wrap>) },
  { id: "impact", title: "Social Impact", notes: "Multilingual access (Assamese, Hindi) is the key inclusion message. Impact is expected, not measured.", view: () => (
    <Wrap><Title k="Social Impact">Making Advanced AI Accessible to Everyone.</Title><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{["Students get personalized learning support.", "Teachers can organize educational content.", "Small businesses get access to AI-powered productivity tools.", "Creators can simplify content production.", "Multilingual support can make technology more accessible, including Assamese and Hindi."].map((t, i) => <motion.div key={t} {...rise(i + 1)} className={`sn-glass p-5 ${B}`}>{t}</motion.div>)}</div></Wrap>) },
  { id: "roadmap", title: "Roadmap", notes: "None of these future phases are implemented yet — say so.", view: () => (
    <Wrap><Title k="Development Roadmap">From an Idea to a Universal AI Ecosystem.</Title><Tag>Planned — not yet implemented</Tag><div className="grid gap-3 lg:grid-cols-5">{["Build Nova Brain and Nova Learn prototype.", "Add Nova Memory and personalized assistance.", "Expand into Business, Creator and Builder modules.", "Develop WhatsApp integration through the appropriate official platform.", "Explore consent-based wearable AI companion technology."].map((t, i) => <motion.div key={t} {...rise(i + 1)} className="sn-glass p-4"><div className="sn-grad text-3xl font-black">0{i + 1}</div><div className="text-xs uppercase tracking-widest text-sky-400">Phase {i + 1}</div><p className="mt-2 text-[clamp(.85rem,1.3vw,1.15rem)]">{t}</p></motion.div>)}</div></Wrap>) },
  { id: "closing", title: "Closing", notes: "Pause, then deliver the closing line. Offer the live demo.", view: () => (
    <Wrap><div className="flex flex-col items-center gap-6 text-center"><div className="sn-core flex h-[18vh] w-[18vh] items-center justify-center rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-violet-600 text-4xl font-black">N</div><Logo big /><Tagline /><motion.p {...rise(4)} className={`max-w-4xl ${B} text-slate-300`}>Not just an AI that answers questions. An intelligent companion designed to help turn ideas into action.</motion.p></div></Wrap>) },
];
