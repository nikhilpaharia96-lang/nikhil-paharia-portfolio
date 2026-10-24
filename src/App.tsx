import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { MusicProvider } from "@/lib/MusicProvider";

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
import CinematicSection from "@/components/CinematicSection";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

// Section order matches the design reference. Everything renders statically:
// no loading screen, no reveal wrappers, no smooth scrolling, no custom cursor.
function Portfolio() {
  return (
    <>
      <Navbar />
      <main className="max-w-full overflow-x-hidden">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <VideoShowcase />
        <Services />
        <Testimonials />
        <CinematicSection parallax={40} delay={0.05}>
          <Contact />
        </CinematicSection>
      </main>
      <CinematicSection parallax={20} delay={0}>
        <Footer />
      </CinematicSection>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
