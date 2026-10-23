import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { MusicProvider } from "@/lib/MusicProvider";
import { MotionConfig } from "motion/react";
import Reveal from "@/components/ui/Reveal";

import GlobalBackground from "@/components/GlobalBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import VideoShowcase from "@/components/video-showcase/VideoShowcase";
import Services from "@/components/Services";
import Testimonials from "@/components/testimonials/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

// Section order matches the design reference. Sections below the Hero fade/lift
// in as they scroll into view (see <Reveal>); the Hero runs its own entrance.
function Portfolio() {
  return (
    <>
      <Navbar />
      <main className="max-w-full overflow-x-hidden">
        <Hero />
        <Marquee />
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Projects />
        </Reveal>
        <Reveal>
          <VideoShowcase />
        </Reveal>
        <Reveal>
          <Services />
        </Reveal>
        <Reveal>
          <Testimonials />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* reducedMotion="user": visitors who prefer reduced motion get fades only,
          no movement/scale from any motion/react animation. */}
      <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <MusicProvider>
          <GlobalBackground />
          <div className="relative overflow-x-hidden max-w-full">
            <Switch>
              <Route path="/" component={Portfolio} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Toaster theme="light" position="bottom-right" />
        </MusicProvider>
      </TooltipProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
}

export default App;
