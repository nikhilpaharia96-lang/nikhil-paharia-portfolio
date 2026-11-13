import { Link } from "wouter";

/** Entry card for the StudyNova AI hackathon presentation (route: /studynova-presentation). */
export default function StudyNovaCard() {
  return (
    <section id="studynova-presentation" className="px-4 py-16">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-8 text-white sm:p-12"
        style={{ background: "radial-gradient(ellipse at 15% 0,#1d3a8a 0,transparent 55%),radial-gradient(ellipse at 90% 100%,#4c1d95 0,transparent 55%),#050816", boxShadow: "0 20px 80px -20px rgba(59,130,246,.6)" }}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[.3em] text-sky-300">Hackathon Presentation</p>
        <h3 className="text-3xl font-black sm:text-5xl">StudyNova AI – Hackathon Presentation</h3>
        <p className="mt-2 text-xl font-light text-sky-200">“One AI. Your Entire World.”</p>
        <p className="mt-4 max-w-2xl text-slate-300">An intelligent AI ecosystem designed to transform how people learn, work, create and manage their lives.</p>
        <Link href="/studynova-presentation" className="mt-8 inline-block rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-7 py-3 font-semibold shadow-lg transition hover:scale-105">Explore Presentation →</Link>
      </div>
    </section>
  );
}
