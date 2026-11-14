/**
 * AFAQ SUPPLY - LUXURY GLOBAL MOTION SYSTEM PRESETS
 * High-performance, GPU-accelerated Framer Motion & CSS animation presets.
 * Adheres strictly to the AFAQ SUPPLY architectural design language.
 */

import { Variants } from "framer-motion";

// Luxury Easing Curves
export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
export const SNAPPY_EASE = [0.16, 1, 0.3, 1] as const;
export const GENTLE_EASE = [0.25, 0.1, 0.25, 1] as const;

// 1. Page Entrance & Exit
export const pageEntranceVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: LUXURY_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: SNAPPY_EASE,
    },
  },
};

// 2. Section Scroll Reveal
export const sectionRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: LUXURY_EASE,
    },
  },
};

// 3. Image Reveal (Soft scale-down + Opacity)
export const imageRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.04,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: LUXURY_EASE,
    },
  },
};

// 4. Staggered Product Grid Container & Items
export const staggerGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const gridItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: LUXURY_EASE,
    },
  },
};

// 5. Product Card Hover Motion
export const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    transition: { duration: 0.3, ease: SNAPPY_EASE },
  },
  hover: {
    y: -4,
    transition: { duration: 0.3, ease: SNAPPY_EASE },
  },
};

// 6. Modal Entrance / Exit
export const modalOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.24, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: LUXURY_EASE,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    transition: {
      duration: 0.2,
      ease: SNAPPY_EASE,
    },
  },
};

// 7. Drawer Slide-in (Right)
export const drawerVariants: Variants = {
  hidden: {
    x: "100%",
    opacity: 0.8,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: LUXURY_EASE,
    },
  },
  exit: {
    x: "100%",
    opacity: 0.8,
    transition: {
      duration: 0.28,
      ease: SNAPPY_EASE,
    },
  },
};

// 8. Image Crossfade (Product Color / Angle switch)
export const imageCrossfadeVariants: Variants = {
  initial: { opacity: 0.4, scale: 0.98 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.28, ease: LUXURY_EASE },
  },
  exit: {
    opacity: 0.4,
    scale: 0.98,
    transition: { duration: 0.2, ease: SNAPPY_EASE },
  },
};

