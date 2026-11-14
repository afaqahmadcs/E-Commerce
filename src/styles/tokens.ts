/**
 * AFAQ SUPPLY DESIGN SYSTEM TOKENS
 * "THE ART OF EVERYDAY STYLE."
 */

export const BRAND_COLORS = {
  // Canvases
  canvas: "#F8F7F4", // Warm Ivory base
  cardSurface: "#F0EFEB", // Slightly deeper ivory for cards & modal backdrops
  darkCanvas: "#171717", // Obsidian black for editorial manifestos & footer

  // Typography
  textPrimary: "#151515", // Off-black high-contrast text
  textSecondary: "#777777", // Stone grey metadata and specifications
  textMuted: "#A09E97", // Subdued labels & borders

  // Accents & Borders
  border: "#E8E6E1", // Hairline architectural dividers
  borderDark: "#2B2A27", // Subtle dark divider
  accentOrange: "#C66B39", // Restrained burnt orange for purchase CTA
  accentOrangeHover: "#A85325", // Deep burnt orange on hover
  accentGreen: "#3D6F54", // Sage green for verified badges & in-stock states
} as const;

export const TYPOGRAPHY = {
  serif: "var(--font-playfair), Georgia, serif",
  sans: "var(--font-geist-sans), Inter, sans-serif",
  mono: "var(--font-geist-mono), Menlo, monospace",
} as const;

export const MOTION_TRANSITIONS = {
  springLuxury: {
    type: "spring",
    stiffness: 90,
    damping: 18,
    mass: 0.8,
  },
  easeLuxury: [0.22, 1, 0.36, 1], // Cubic bezier smooth ease-out
  durationNormal: 0.45,
  durationSlow: 0.75,
  durationFast: 0.25,
} as const;

export const VIEWPORTS = {
  mobile: 375,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
} as const;
