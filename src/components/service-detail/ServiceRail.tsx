import { Link } from "wouter";
import { services } from "@/components/Services";

/**
 * "All services" switcher, numbered 01–08.
 *  – lg+ : fixed rail on the RIGHT edge; hover/focus slides the title out.
 *  – <lg : horizontally scrollable number strip (rendered inline by the page).
 */
export function ServiceRail({ current }: { current: string }) {
  return (
    <nav aria-label="All services" className="pointer-events-none fixed right-3 top-1/2 z-[150] hidden -translate-y-1/2 lg:block xl:right-6">
      <p className="mb-3 text-right text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">All services</p>
      <ul className="pointer-events-auto flex flex-col items-end gap-2">
        {services.map((s, i) => {
          const active = s.slug === current;
          return (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                aria-current={active ? "page" : undefined}
                className="group flex items-center gap-2"
              >
                <span
                  className={`max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-slate-900 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:max-w-[260px] group-hover:px-3 group-hover:opacity-100 group-focus-visible:max-w-[260px] group-focus-visible:px-3 group-focus-visible:opacity-100 ${active ? "max-w-[260px] px-3 opacity-100" : ""}`}
                >
                  {s.title}
                </span>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs font-extrabold shadow-sm transition duration-300 group-hover:scale-110 ${
                    active ? "border-primary bg-primary text-white shadow-primary/30" : "border-slate-200 bg-white/90 text-slate-600 backdrop-blur group-hover:border-primary group-hover:text-primary"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function ServiceStrip({ current }: { current: string }) {
  return (
    <nav aria-label="All services" className="-mx-4 mb-7 overflow-x-auto px-4 lg:hidden [scrollbar-width:none]">
      <ul className="flex w-max items-center justify-end gap-2 ml-auto">
        <li className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">All services</li>
        {services.map((s, i) => {
          const active = s.slug === current;
          return (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                title={s.title}
                aria-label={s.title}
                aria-current={active ? "page" : undefined}
                className={`flex h-9 w-9 items-center justify-center rounded-full border font-mono text-xs font-extrabold transition ${
                  active ? "border-primary bg-primary text-white" : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
