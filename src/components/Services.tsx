import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import {
  SiReact, SiNodedotjs, SiGoogleads, SiInstagram, SiFigma,
  SiWhatsapp, SiShopify, SiWordpress, SiDavinciresolve,
} from "react-icons/si";
import { RiCameraLensLine, RiRobot2Line } from "react-icons/ri";
import ServicesMobileStack from "@/components/ServicesMobileStack";
import SectionHeader from "@/components/ui/SectionHeader";
import premiereProLogo from "../assets/logos/premiere-pro.svg";
import afterEffectsLogo from "../assets/logos/after-effects.svg";
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
    badges: [
      { label: "React", icon: SiReact, color: "#61DAFB" },
      { label: "Node.js", icon: SiNodedotjs, color: "#339933" },
    ],
    price: "₹2,999",
    image: websiteImage,
  },
  {
    title: "Video Editing",
    desc: "Professional video editing for YouTube, Instagram Reels and commercials.",
    badges: [
      { label: "Premiere Pro", logo: premiereProLogo, color: "#9999FF" },
      { label: "After Effects", logo: afterEffectsLogo, color: "#9999FF" },
    ],
    price: "₹499",
    image: videoEditingImage,
    imageFrame: true,
  },
  {
    title: "Digital Marketing",
    desc: "Social Media, Google Ads, SEO, Lead Generation and Brand Growth.",
    badges: [
      { label: "Google Ads", icon: SiGoogleads, color: "#4285F4" },
      { label: "Instagram", icon: SiInstagram, color: "#E1306C" },
    ],
    price: "₹1,999/month",
    image: digitalMarketingImage,
    imageFrame: true,
  },
  {
    title: "Graphic Designing",
    desc: "Logos, Banners, Social Media Posts, Branding and Print Design.",
    badges: [
      { label: "Photoshop", text: "Ps", color: "#31A8FF" },
      { label: "Illustrator", text: "Ai", color: "#FF9A00" },
    ],
    price: "₹499",
    image: graphicDesignImage,
    imageFrame: true,
  },
  {
    title: "UI/UX Design",
    desc: "Modern, user-friendly interfaces for web and mobile applications.",
    badges: [
      { label: "Figma", icon: SiFigma, color: "#F24E1E" },
      { label: "Adobe XD", text: "Xd", color: "#FF2BC2" },
    ],
    price: "₹1,499",
    image: uiuxImage,
    imageFrame: true,
  },
  {
    title: "Automation & AI Solutions",
    desc: "WhatsApp Chatbots, Workflow Automation, CRM and API Integration.",
    badges: [
      { label: "AI Automation", icon: RiRobot2Line, color: "#7C3AED" },
      { label: "WhatsApp", icon: SiWhatsapp, color: "#25D366" },
    ],
    price: "₹4,999",
    image: automationImage,
    imageFrame: true,
  },
  {
    title: "E-Commerce Solutions",
    desc: "Online Stores, Product Setup, Payment Integration and Store Management.",
    badges: [
      { label: "Shopify", icon: SiShopify, color: "#7AB55C" },
      { label: "WordPress", icon: SiWordpress, color: "#21759B" },
    ],
    price: "₹4,999",
    image: ecommerceImage,
  },
  {
    title: "Cinematography & Video Production",
    desc: "Professional Video Shooting, Cinematography, Promotional Videos and Content Creation.",
    badges: [
      { label: "Camera", icon: RiCameraLensLine, color: "#0F172A" },
      { label: "DaVinci Resolve", icon: SiDavinciresolve, color: "#233A51" },
    ],
    price: "₹2,999",
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
      <div className="container-tight relative z-10">

        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: rm ? 0 : 140 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div>
            <SectionHeader
              label="04 — Services"
              title="What I Offer"
              subtitle="Websites, video, design and automation — everything a brand needs to launch and grow."
              align="center"
            />
          </div>
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
