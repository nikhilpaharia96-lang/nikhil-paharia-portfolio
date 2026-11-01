import type { LandscapeMasks } from "@/components/ParallaxLandscape";

import dMid from "../assets/images/parallax/desktop-mid.webp";
import dTerrace from "../assets/images/parallax/desktop-terrace.webp";
import dFg from "../assets/images/parallax/desktop-fg.webp";
import dFogA from "../assets/images/parallax/desktop-fogA.webp";
import dFogB from "../assets/images/parallax/desktop-fogB.webp";
import dLight from "../assets/images/parallax/desktop-light.webp";

import mMid from "../assets/images/parallax/mobile-mid.webp";
import mTerrace from "../assets/images/parallax/mobile-terrace.webp";
import mFg from "../assets/images/parallax/mobile-fg.webp";
import mFogA from "../assets/images/parallax/mobile-fogA.webp";
import mFogB from "../assets/images/parallax/mobile-fogB.webp";
import mLight from "../assets/images/parallax/mobile-light.webp";

/** Alpha cut-outs authored in the coordinates of the desktop hero photo (1536×1024). */
export const desktopMasks: LandscapeMasks = {
  mid: dMid,
  terrace: dTerrace,
  fg: dFg,
  fogA: dFogA,
  fogB: dFogB,
  light: dLight,
};

/** Alpha cut-outs authored in the coordinates of the mobile hero photo (853×1844). */
export const mobileMasks: LandscapeMasks = {
  mid: mMid,
  terrace: mTerrace,
  fg: mFg,
  fogA: mFogA,
  fogB: mFogB,
  light: mLight,
};
