import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, X } from "lucide-react";
import { featuredVideo, projects } from "@/constants/videoShowcase";
import { parseVideoUrl } from "@/utils/videoEmbed";
import { ease } from "@/animations/videoShowcase.motion";

type PlaylistItem = {
  key: string;
  title: string;
  desc: string;
  image: string;
  url: string;
};

/**
 * Story card: a photo collage that turns into an inline player (no popup),
 * with a small playlist of thumbnails underneath so visitors can hop between
 * films without leaving the section.
 */
export default function FeaturedVideoCard() {
  const prefersReducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  // Playable videos, featured one first, duplicates (same link) removed.
  const playlist = useMemo<PlaylistItem[]>(() => {
    const seen = new Set<string>();
    const items: PlaylistItem[] = [];
    const add = (item: PlaylistItem) => {
      const parsed = parseVideoUrl(item.url);
      if (!parsed || parsed.kind === "unknown" || seen.has(parsed.embedUrl)) return;
      seen.add(parsed.embedUrl);
      items.push(item);
    };
    const featuredMatch = projects.find((p) => p.videoUrl && p.videoUrl === featuredVideo.videoUrl);
    if (featuredVideo.videoUrl) {
      add({
        key: "featured",
        title: featuredMatch?.title ?? `${featuredVideo.title} — ${featuredVideo.subtitle}`,
        desc: featuredMatch?.description ?? featuredVideo.category,
        image: featuredVideo.image,
        url: featuredVideo.videoUrl,
      });
    }
    projects.forEach((p) => p.videoUrl && add({ key: `p-${p.id}`, title: p.title, desc: p.description, image: p.image, url: p.videoUrl }));
    return items;
  }, []);

  const collage = useMemo(() => {
    const imgs = [featuredVideo.image, ...projects.map((p) => p.image)];
    return Array.from(new Set(imgs)).slice(0, 5);
  }, []);

  const current = playlist[activeIdx];
  const parsed = parseVideoUrl(current?.url);
  const hasVideos = playlist.length > 0;

  const open = (idx = 0) => {
    if (!hasVideos) return;
    setActiveIdx(idx);
    setPlaying(true);
  };

  const cardTitle = `${featuredVideo.title} — ${featuredVideo.subtitle}`.toLowerCase();

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease }}
    >
      <motion.div
        animate={prefersReducedMotion || playing ? { y: 0 } : { y: [0, -8, 0] }}
        transition={playing ? { duration: 0.3 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="group relative rounded-[30px] p-[3px] sm:p-[4px] bg-gradient-to-br from-white/90 via-white/50 to-white/80 shadow-[0_50px_100px_-30px_rgba(8,20,45,0.55)]">
          <div className="relative rounded-[27px] overflow-hidden bg-white">
            {!playing ? (
              <>
                {/* ── Collage (click anywhere to play) ── */}
                <button
                  type="button"
                  onClick={() => open(0)}
                  disabled={!hasVideos}
                  aria-label={`Play ${cardTitle}`}
                  className="relative block w-full aspect-[5/4] sm:aspect-[16/10] overflow-hidden bg-[#0a1220] text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 focus-visible:ring-inset disabled:cursor-default"
                >
                  <div className="absolute inset-0 grid grid-cols-[1.25fr_1fr_1fr] grid-rows-2 gap-[3px]">
                    {collage.map((src, i) => (
                      <div key={src} className={`overflow-hidden ${i === 0 ? "row-span-2" : ""}`}>
                        <img
                          src={src}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>

                  <div aria-hidden="true" className="absolute inset-0 bg-[#06142b]/35 transition-colors duration-500 group-hover:bg-[#06142b]/25" />
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-slate-800 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] shadow-sm">
                      {featuredVideo.category}
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white text-[11px] sm:text-xs font-semibold tabular-nums">
                      {featuredVideo.duration}
                    </span>
                  </div>

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="relative">
                      {!prefersReducedMotion && (
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-white/50"
                          animate={{ scale: [1, 1.55, 1], opacity: [0.55, 0, 0.55] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center shadow-[0_18px_40px_-10px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110">
                        <Play className="w-6 h-6 sm:w-8 sm:h-8 text-primary ml-0.5 sm:ml-1" fill="currentColor" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 px-4 pb-3.5 sm:px-6 sm:pb-5">
                    <div className="min-w-0">
                      <p className="text-white font-extrabold text-lg sm:text-2xl leading-tight capitalize truncate">{cardTitle}</p>
                      <p className="text-white/75 text-xs sm:text-sm mt-0.5">Cinematic travel film · {featuredVideo.duration}</p>
                    </div>
                    {hasVideos && (
                      <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[11px] sm:text-xs font-bold text-white shadow-md">
                        <Play className="w-3 h-3" fill="currentColor" aria-hidden="true" />
                        {playlist.length} {playlist.length === 1 ? "Video" : "Videos"}
                      </span>
                    )}
                  </div>
                </button>

                {/* "Click to play" strip */}
                <div className="flex items-center gap-3 px-4 py-2.5 sm:px-6 bg-white border-t border-slate-100">
                  <Play className="w-3.5 h-3.5 text-primary shrink-0" fill="currentColor" aria-hidden="true" />
                  <div aria-hidden="true" className="flex-1 h-[3px] rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full w-1/6 rounded-full bg-primary/70" />
                  </div>
                  <span className="text-[11px] sm:text-xs text-slate-400 whitespace-nowrap">Click to play</span>
                </div>
              </>
            ) : (
              /* ── Inline player + playlist ── */
              <motion.div
                initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease }}
                className="bg-black"
              >
                <div className="bg-black">
                  <div
                    className={`relative mx-auto bg-black ${
                      parsed?.isVertical ? "w-[min(100%,300px)] aspect-[9/16]" : "w-full aspect-video"
                    }`}
                  >
                    {parsed && parsed.kind !== "unknown" && (
                      <iframe
                        key={parsed.embedUrl}
                        src={parsed.embedUrl}
                        title={current.title}
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full border-0"
                      />
                    )}
                  </div>
                </div>

                <div className="bg-[#0a1220] px-4 py-3 sm:px-5 sm:py-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-bold text-white truncate">{current.title}</p>
                      <p className="text-xs text-white/55 line-clamp-1">{current.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPlaying(false)}
                      aria-label="Close video"
                      className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  {playlist.length > 1 && (
                    <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1" role="tablist" aria-label="More videos">
                      {playlist.map((item, i) => {
                        const active = i === activeIdx;
                        return (
                          <button
                            key={item.key}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => setActiveIdx(i)}
                            className={`shrink-0 w-28 sm:w-32 rounded-lg overflow-hidden text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                              active ? "opacity-100 ring-2 ring-primary" : "opacity-60 hover:opacity-100 hover:-translate-y-0.5"
                            }`}
                          >
                            <div className="relative aspect-video bg-slate-800">
                              <img src={item.image} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                              {active && (
                                <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                                  <Play className="w-4 h-4 text-white" fill="currentColor" aria-hidden="true" />
                                </div>
                              )}
                            </div>
                            <p className="text-[10px] sm:text-[11px] text-white leading-tight px-1.5 pt-1 pb-1.5 line-clamp-2">{item.title}</p>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
