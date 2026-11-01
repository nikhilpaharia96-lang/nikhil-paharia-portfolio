import { useEffect, useRef, type CSSProperties } from "react";
import "./parallax-landscape.css";

/**
 * ParallaxLandscape — the hero's tea-garden photo split into depth layers, with drifting fog and a
 * pulsing sunlight glow between/over them. Replaces the single flat <img>.
 *
 * How the layers are made (no extra photos needed): the same background image is stacked 4 times;
 * each copy beyond the first is cut out with a soft alpha mask (`*-mid / -terrace / -fg.webp`,
 * authored in the photo's own coordinates, so they line up under the same `cover` + position):
 *
 *   far      sky + distant mountains (whole photo, slowest)
 *   mid      misty hills + tree line
 *   terrace  tea terraces
 *   fg       foreground tea plants (fastest — moves a touch faster than the page itself)
 *
 * On scroll each layer is shifted by `scrollY × k` (one CSS variable written per animation frame),
 * so distant layers lag behind and near layers keep up with — or slightly outrun — the page.
 *
 * Fog: two soft bands (masks `fogA/fogB`) between the layers; a tileable cloud pattern inside each
 * slides sideways forever (transform only). Kept ≤ ~35% opacity and masked to the landscape side so
 * the headline text is never veiled.
 *
 * Light: a warm glow + faint rays (`light` mask) sit on the sun and slowly swell and fade.
 *
 * Everything animates with transform/opacity only. Paused when off-screen; fully static for
 * `prefers-reduced-motion`.
 */

export interface LandscapeMasks {
  mid: string;
  terrace: string;
  fg: string;
  fogA: string;
  fogB: string;
  light: string;
}

interface Props {
  src: string;
  /** CSS background-position / mask-position, identical for photo and masks. */
  position: string;
  /** Optional CSS filter applied to the photo layers (brightness/saturate tweaks). */
  filter?: string;
  masks: LandscapeMasks;
  className?: string;
}

const style = (vars: Record<string, string | number>) => vars as CSSProperties;

export default function ParallaxLandscape({ src, position, filter, masks, className = "" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let visible = true;
    const update = () => {
      frame = 0;
      root.style.setProperty("--sy", String(Math.round(Math.min(window.scrollY, 2400))));
    };
    const onScroll = () => {
      if (reduced || !visible || frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Off-screen (or display:none on the other breakpoint) → pause fog/light, skip scroll work.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        root.dataset.paused = visible ? "false" : "true";
        if (visible) onScroll();
      },
      { threshold: 0 },
    );
    io.observe(root);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const base = { "--src": `url(${src})`, "--pos": position, "--filter": filter ?? "none" };
  const mask = (url: string) => `url(${url})`;

  return (
    <div
      ref={rootRef}
      className={`px-stage ${className}`}
      aria-hidden="true"
      data-paused="false"
      style={style(base)}
    >
      {/* far: sky + distant mountains */}
      <div className="px-layer px-img" style={style({ "--k": 0.14 })} />

      {/* fog A — valley between the far mountains and the misty hills */}
      <div className="px-layer px-masked px-fog" style={style({ "--k": 0.115, "--mask": mask(masks.fogA), "--fog-o": 0.34, "--fog-dur": "110s" })}>
        <div className="px-fog__drift" />
      </div>

      {/* mid: misty hills + tree line */}
      <div className="px-layer px-img px-masked" style={style({ "--k": 0.09, "--mask": mask(masks.mid) })} />

      {/* fog B — drifting across the hills, opposite direction */}
      <div className="px-layer px-masked px-fog px-fog--rev" style={style({ "--k": 0.07, "--mask": mask(masks.fogB), "--fog-o": 0.3, "--fog-dur": "150s" })}>
        <div className="px-fog__drift" />
      </div>

      {/* terraces */}
      <div className="px-layer px-img px-masked" style={style({ "--k": 0.045, "--mask": mask(masks.terrace) })} />

      {/* foreground tea plants — moves a little faster than the page */}
      <div className="px-layer px-img px-masked" style={style({ "--k": -0.03, "--mask": mask(masks.fg) })} />

      {/* sunlight: glow + faint rays, tracks the sun in the far layer */}
      <div className="px-layer px-masked px-light" style={style({ "--k": 0.14, "--mask": mask(masks.light) })} />
    </div>
  );
}
