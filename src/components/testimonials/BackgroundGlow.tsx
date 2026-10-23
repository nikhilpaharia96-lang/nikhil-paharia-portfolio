import bg from "@/assets/images/showcase-bg.webp";

/**
 * Scenic backdrop: real photo (sky, snow peaks, forest, sunrise) under a soft
 * blue-white veil so cards and text stay readable. No particles or motion.
 */
export default function BackgroundGlow() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <img
        src={bg}
        alt=""
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-[45%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/10 via-white/10 to-white/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/45 via-transparent to-transparent lg:from-white/60" />
    </div>
  );
}
