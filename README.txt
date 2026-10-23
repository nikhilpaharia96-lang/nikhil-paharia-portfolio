TESTIMONIALS UPDATE — kaise lagayein
=====================================

1) Is zip ke andar ka "src" folder apne project ke "src" folder par copy/replace kar dein.
   (11 files: src/components/testimonials/*, src/constants/testimonials.ts, src/types/testimonial.ts)

2) src/index.css me ye 2 cheezein add karein (handwritten "Ideas People Places Stories" note ke liye):

   a) File ki sabse upar wali line me:
      @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&display=swap');

   b) File ke end me:
      .font-script { font-family: 'Caveat', cursive; }

   (Ye na karein to bhi page chalega, bas wo note fallback font me dikhega.)

3) Ye purani files ab use nahi hoti, inhe delete kar dein (na karein to bhi koi error nahi aata):
   src/components/testimonials/CarouselControls.tsx
   src/components/testimonials/Pagination.tsx
   src/components/testimonials/QuoteIcon.tsx
   src/components/testimonials/StarRating.tsx
   src/components/testimonials/TestimonialCard.tsx
   src/hooks/useTestimonialsCarousel.ts

Koi nayi dependency nahi chahiye. Navbar/Services/Projects/Videos ko ye touch nahi karta.
