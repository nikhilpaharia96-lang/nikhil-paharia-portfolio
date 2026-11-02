import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import ServicesMobileStack from "@/components/ServicesMobileStack";
import websiteImage from "../assets/images/fullstack-service.webp";
import videoEditingImage from "../assets/images/service-02.webp";
import digitalMarketingImage from "../assets/images/service-digital-marketing.webp";
import graphicDesignImage from "../assets/images/service-graphic-design.webp";
import uiuxImage from "../assets/images/service-uiux.webp";
import automationImage from "../assets/images/service-automation-ai.webp";
import ecommerceImage from "../assets/images/service-ecommerce.webp";
import cinematographyImage from "../assets/images/service-cinematography.webp";

// `imageFrame: true` = opaque picture (shown as a rounded photo);
// without it the image is a transparent cut-out that floats on the card.
export const services = [
  {
    title: "Website Development",
    desc: "Modern, fast and responsive websites for businesses and brands.",
    image: websiteImage,
  },
  {
    title: "Video Editing",
    desc: "Professional video editing for YouTube, Instagram Reels and commercials.",
    image: videoEditingImage,
    imageFrame: true,
  },
  {
    title: "Digital Marketing",
    desc: "Social Media, Google Ads, SEO, Lead Generation and Brand Growth.",
    image: digitalMarketingImage,
    imageFrame: true,
  },
  {
    title: "Graphic Designing",
    desc: "Logos, Banners, Social Media Posts, Branding and Print Design.",
    image: graphicDesignImage,
    imageFrame: true,
  },
  {
    title: "UI/UX Design",
    desc: "Modern, user-friendly interfaces for web and mobile applications.",
    image: uiuxImage,
    imageFrame: true,
  },
  {
    title: "Automation & AI Solutions",
    desc: "WhatsApp Chatbots, Workflow Automation, CRM and API Integration.",
    image: automationImage,
    imageFrame: true,
  },
  {
    title: "E-Commerce Solutions",
    desc: "Online Stores, Product Setup, Payment Integration and Store Management.",
    image: ecommerceImage,
  },
  {
    title: "Cinematography & Video Production",
    desc: "Professional Video Shooting, Cinematography, Promotional Videos and Content Creation.",
    image: cinematographyImage,
    imageFrame: true,
  },
];

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  const { scrollY } = useScroll();

  // text grows while scrolling DOWN, shrinks while scrolling UP — reverses with direction
  const scaleRaw = useMotionValue(1);
  const scale = useSpring(scaleRaw, { stiffness: 120, damping: 22, mass: 0.5 });
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (rm) return;
    const diff = latest - lastY.current;
    lastY.current = latest;
    const step = diff * 0.0022; // scroll sensitivity
    const next = Math.min(1.4, Math.max(0.7, scaleRaw.get() + step));
    scaleRaw.set(next);
  });

  return (
    <section id="services" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white -z-10" />

      <div className="container-tight relative z-10">

        {/* Header — enters from the RIGHT; grows on scroll-down, shrinks on scroll-up */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: rm ? 0 : 140 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.h2 style={{ scale }} className="section-title mb-4 inline-block">
            What I <span className="text-gradient">Offer</span>
          </motion.h2>
          <div className="section-divider mx-auto" />
        </motion.div>

        {/* Fanned overlapping card stack — same on mobile and desktop
            (width capped on large screens so the cards don't stretch) */}
        <div className="max-w-xl md:max-w-2xl mx-auto">
          <ServicesMobileStack services={services} />
        </div>
      </div>
    </section>
  );
}
