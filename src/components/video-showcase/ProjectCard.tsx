import { Play, ExternalLink, MapPin } from "lucide-react";
import type { Project } from "@/types/video";

const badgeStyles: Record<Project["category"], string> = {
  "Travel Film": "text-primary",
  Documentary: "text-slate-800",
  Commercial: "text-orange-600",
  "Social Media": "text-slate-800",
  Cinematic: "text-indigo-600",
  Others: "text-emerald-700",
};

type ProjectCardProps = {
  project: Project;
  onPlay?: (project: Project) => void;
};

export default function ProjectCard({ project, onPlay }: ProjectCardProps) {
  const playable = Boolean(project.videoUrl);
  const open = () => {
    if (playable) onPlay?.(project);
  };

  return (
    <article className="group relative rounded-[24px] overflow-hidden bg-[#0a1220] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_24px_50px_-22px_rgba(8,20,45,0.6)] ring-1 ring-white/60">
      <img
        src={project.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />

      <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
        <span
          className={`px-2.5 py-1 rounded-full bg-white/95 text-[10px] font-bold uppercase tracking-wide ${badgeStyles[project.category]}`}
        >
          {project.category}
        </span>
        <span className="px-2 py-0.5 rounded-md bg-black/55 backdrop-blur text-white text-[11px] font-semibold">
          {project.duration}
        </span>
      </div>

      <button
        type="button"
        onClick={open}
        disabled={!playable}
        aria-label={playable ? `Play ${project.title}` : `${project.title} (video link coming soon)`}
        className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 disabled:cursor-default"
      >
        <Play className="w-5 h-5 ml-0.5" fill="currentColor" aria-hidden="true" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white">
        <h4 className="font-sans font-bold text-[1.05rem] leading-snug">{project.title}</h4>
        <p className="mt-1 text-[12px] leading-snug text-white/75 line-clamp-2 pr-8">{project.description}</p>
        <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-white/85">
          <MapPin className="w-3 h-3" aria-hidden="true" />
          {project.location}
        </p>
      </div>

      <button
        type="button"
        onClick={open}
        disabled={!playable}
        aria-label={`Open ${project.title}`}
        className="absolute bottom-3.5 right-3.5 z-10 text-white/90 hover:text-white disabled:opacity-60 disabled:cursor-default"
      >
        <ExternalLink className="w-[18px] h-[18px]" aria-hidden="true" />
      </button>
    </article>
  );
}
