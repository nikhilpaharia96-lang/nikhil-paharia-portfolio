import { useMemo, useState } from "react";
import { MoveDownLeft } from "lucide-react";
import type { Project, VideoFilter } from "@/types/video";
import { featuredVideo, projects } from "@/constants/videoShowcase";
import BackgroundGlow from "./BackgroundGlow";
import ShowcaseIntro from "./ShowcaseIntro";
import FeaturedVideoCard from "./FeaturedVideoCard";
import FilterChips from "./FilterChips";
import ProjectCard from "./ProjectCard";
import FilmStrip from "./FilmStrip";
import FeatureStrip from "./FeatureStrip";
import VideoLightbox from "./VideoLightbox";

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [filter, setFilter] = useState<VideoFilter>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects.slice(0, 4) : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const playProject = (project: Project) => {
    if (project.videoUrl) setActiveVideo({ url: project.videoUrl, title: project.title });
  };

  const playFeatured = (url = featuredVideo.videoUrl) => {
    if (url) setActiveVideo({ url, title: `${featuredVideo.title} — ${featuredVideo.subtitle}` });
  };

  return (
    <section
      id="videos"
      className="relative overflow-hidden section-wrap max-w-full pt-20 sm:pt-28 lg:pt-32 pb-10 sm:pb-14"
      aria-label="Cinematography and video editing showcase"
    >
      <BackgroundGlow />

      <div className="container-tight relative z-10 max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-5">
            <ShowcaseIntro onWatchShowreel={() => playFeatured()} />
          </div>

          <div className="lg:col-span-7 relative">
            <FeaturedVideoCard onPlay={playFeatured} />
            <div
              aria-hidden="true"
              className="hidden xl:flex absolute -top-14 -right-6 flex-col items-start font-script font-bold italic text-xl leading-tight text-[#14284f] -rotate-6"
            >
              <span>
                Turning
                <br />
                Moments into
                <br />
                Memories
              </span>
              <MoveDownLeft className="w-7 h-7 text-primary mt-1 -ml-4" strokeWidth={1.6} />
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <FilterChips active={filter} onChange={setFilter} />
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} onPlay={playProject} />
          ))}
        </div>

        <div className="mt-10 sm:mt-12">
          <FilmStrip />
        </div>

        <div className="mt-5 sm:mt-6">
          <FeatureStrip />
        </div>
      </div>

      <VideoLightbox
        url={activeVideo?.url ?? null}
        title={activeVideo?.title}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
