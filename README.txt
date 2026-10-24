CONTACT + FOOTER (main repo jaisa, animated) — kaise lagayein
=============================================================
1) Is zip ka "src" folder apne project ke "src" par copy/replace karein.
2) framer-motion chahiye (package.json me "framer-motion": "^11.13.1"). Pehle se hai to kuch nahi;
   nahi hai to:  npm install framer-motion@^11.13.1

Files:
 - Contact.tsx, Footer.tsx            -> main repo wale (animated)
 - CinematicSection.tsx               -> main repo wala reveal/parallax wrapper (naya)
 - ui/live/Magnetic.tsx, SplitText.tsx-> main repo wale animated helpers (naye; purane ui/Magnetic.tsx, ui/SplitText.tsx ko touch nahi kiya)
 - App.tsx                            -> sirf Contact aur Footer ko CinematicSection me wrap kiya
 - Navbar.tsx                         -> active-link ke liye position measure fix (nahi to Contact hamesha active dikhta)

Footer me main repo ka "Payment" button NAHI hai: wo /payment page (Razorpay/Cashfree + backend) kholta hai,
jo is repo me nahi hai. Chahiye to bata dein.
