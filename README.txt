TESTIMONIALS (mobile-first) UPDATE — kaise lagayein
===================================================
1) Is zip ka "src" folder apne project ke "src" par copy/replace karein.
   (Isme naya background image src/assets/images/showcase-bg.webp bhi hai.
    Agar Video Showcase wale step se pehle se hai to replace ho jayegi, koi dikkat nahi.)
2) ADD-TO-index.css.txt kholein aur uske 2 hisse src/index.css me add karein.
3) Optional (delete): src/components/testimonials/{CarouselControls,Pagination,QuoteIcon,StarRating,TestimonialCard}.tsx
   aur src/hooks/useTestimonialsCarousel.ts — ab use nahi hote.
Koi nayi dependency nahi. Baaki sections ko ye touch nahi karta.
