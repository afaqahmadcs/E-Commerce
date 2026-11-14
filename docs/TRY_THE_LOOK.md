# AFAQ SUPPLY — Try The Look Runway Engine

## 1. Overview
The **Try the Look** hero section reproduces the 0.0s – 5.5s sequence of the reference video. It presents 6 curated outfits styled head-to-toe across an expansive editorial runway.

---

## 2. Component Architecture: `TryTheLookHero.tsx`
- **Model Lineup:** 6 fashion models arranged horizontally with soft floor contact shadows.
- **Interactive Outfit Hotspots:** Pulsing circular markers situated at normalized coordinate percentages (`x`, `y`) matching garments worn by the model.
- **Isolation Zoom:** Clicking a model smoothly isolates the model into center stage, activating camera focus.
- **"In This Look" Slide-out Drawer:**
  - Lists individual items worn with images, titles, and itemized prices.
  - Computes the 10% bundle discount in real-time.
  - Provides `Add full look to bag →` to push the entire outfit into the persistent cart in one action.
- **Scrubber Timeline:** Allows intuitive scrubbing across Look 01 through Look 06.
