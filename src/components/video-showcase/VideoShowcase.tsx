import { useState } from "react";
import type { Project } from "@/types/video";
import { featuredVideo, projects } from "@/constants/videoShowcase";
import type { VideoFilter } from "@/types/video";
import BackgroundGlow from "./BackgroundGlow";
import ShowcaseIntro from "./ShowcaseIntro";
import FilterChips from "./FilterChips";
import FeaturedVideoCard from "./FeaturedVideoCard";
import ProjectCarousel from "./ProjectCarousel";
import VideoLightbox from "./VideoLightbox";

export default function VideoShowcase() {
  const [filter, setFilter] = useState<VideoFilter>("All");
  const visibleProjects = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  const handlePlayProject = (project: Project) => {
    if (project.videoUrl) setActiveVideo({ url: project.videoUrl, title: project.title });
  };

  return (
    <section
      id="videos"
      className="relative overflow-hidden section-wrap max-w-full pt-20 sm:pt-28 md:pt-36 lg:pt-40 pb-8 sm:pb-10"
      aria-label="Cinematic Reels — My Cinematic Work"
    >
      <BackgroundGlow />

      <div className="container-tight relative z-10 max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <ShowcaseIntro
              onWatchShowreel={() =>
                featuredVideo.videoUrl && setActiveVideo({ url: featuredVideo.videoUrl, title: featuredVideo.title })
              }
            />
          </div>
          <div className="lg:col-span-7">
            <FeaturedVideoCard onPlay={(url) => setActiveVideo({ url, title: featuredVideo.title })} />
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <FilterChips active={filter} onChange={setFilter} />
        </div>

        {visibleProjects.length > 0 ? (
          <ProjectCarousel key={filter} items={visibleProjects} onPlay={handlePlayProject} paused={!!activeVideo} />
        ) : (
          <p className="mt-8 text-center text-sm text-slate-500">No videos in this category yet.</p>
        )}
      </div>

      <VideoLightbox
        url={activeVideo?.url ?? null}
        title={activeVideo?.title}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
