INTERACTIVE PLAY BUTTON (glow + pulse) + VIDEO MODAL
====================================================
Copy/replace:
  src/components/testimonials/FeaturedTestimonial.tsx
  src/components/testimonials/TestimonialVideoModal.tsx
  src/index.css   (aapke latest repo ka index.css + play-button CSS block)
Ya agar index.css replace nahi karna: ADD-TO-index.css.txt ka content src/index.css ke END me paste karein.

Kya hota hai: play button par hover (ya keyboard focus) -> blue glow + halka pulse ring.
Click -> client ka video popup me khulta hai (autoplay), niche naam/role/company dikhta hai,
Esc / X / bahar click se band, band hone par focus wapas play button par.
"Reduce motion" wale users ko sirf glow dikhta hai, pulse/scale nahi.

IMPORTANT: video tabhi chalega jab us client ke liye videoUrl diya ho:
  src/constants/testimonials.ts  ->  videoUrl: "https://youtu.be/xxxx"  (ya .mp4/.webm link, ya import kiya hua file)
Jab tak videoUrl nahi hai, button dabane par "Video message coming soon" dikhta hai.
