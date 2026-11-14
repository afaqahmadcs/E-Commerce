# AFAQ SUPPLY — Footwear 3D Perspective Wave & Flagship Detail

## 1. Overview
The footwear experience captures the 11.5s – 16.5s reference moments:
1. **3D Spatial Perspective Wave (`SneakerPerspectiveSection.tsx`)**
2. **Featured Sneaker Detail & Purchasing Interface (`FeaturedSneakerSection.tsx`)**

---

## 2. Technical Features
- **Spatial Diagonal Curve:** Mathematically calculated 3D offsets with scale reduction and opacity depth attenuation.
- **Center Perspective Scrubber:** Track indicators allow users to slide and rotate through models.
- **Shoe Size Matrix:** Direct selection across European shoe sizes `40` to `46`.
- **Floating Sneaker Elevation:** Smooth hovering physics with responsive breathing drop shadow.
- **State-Driven Purchase CTA:**
  - Disabled state: Greyed-out button `"Select a size"`.
  - Active state: Solid black `"Add to bag"`.
  - Purchase confirmation: Restrained burnt orange (`#C66B39`) with `"Added to bag"` and `"View bag →"`.
