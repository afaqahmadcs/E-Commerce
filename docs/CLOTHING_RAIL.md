# AFAQ SUPPLY — Suspended Clothing Rail Engine (Phase 2)

## 1. Architectural Overview & Reference Grounding
The **Suspended Clothing Rail** is the second core signature luxury experience of **AFAQ SUPPLY**, reproducing seconds **05.0s – 08.0s** (and the isolated quick-view inspection at **08.0s – 11.5s**) from the primary reference video (`reference/reference-video.mp4`).

Unlike traditional e-commerce stores that display garments trapped inside rectangular card grids or bounding boxes, AFAQ SUPPLY presents apparel suspended along a precision steel tension cable, replicating high-end architectural fashion boutiques and showroom displays.

### Visual Authority Observations:
- **Reference Frame 06.5s (`frame_06.5s.jpg`):** A subtle brushed steel tension line spans across an ivory `#F8F7F4` background. Individual cutout garments hang from realistic dark beechwood hangers with steel loop hooks. Underneath each collar hangs a discrete dangling price tag (`$199`, `$185`, `$145`, etc.).
- **Reference Frame 07.5s (`frame_07.5s.jpg`):** Clicking any garment seamlessly transitions into a floating quick-view inspection modal. The selected garment is suspended vertically in mid-air from a ceiling cord, flanked by editorial typography, front/back view angle toggles, circular size selector pills (`S`, `M`, `L`, `XL`), and an instant "Add to cart" action.

---

## 2. Component Structure & Data Flow

```
src/
├── components/
│   └── home/
│       ├── ClothingRailSection.tsx     # Steel tension cable, drag physics, hangers, tags
│       └── GarmentQuickViewModal.tsx   # Suspended modal, front/back toggle, size pills, cart
├── data/
│   └── garments.ts                     # 12 curated streetwear silhouettes with cutouts
public/
└── garments/                           # Standardized transparent cutout PNG assets (700px)
    ├── hoodie-archival-grey.png        # $199 Signature 550 GSM Archive Hoodie
    ├── hoodie-charcoal-black.png       # $185 Heavyweight Washed Fleece Hoodie
    ├── hoodie-forest-green.png         # $190 Forest Evergreen Minimal Hoodie
    ├── hoodie-bone-cream.png           # $185 Bone Oatmeal Heavyweight Hoodie
    ├── jacket-chore-charcoal.png       # $245 Charcoal Wool Minimal Chore Jacket
    ├── jacket-bomber-black.png         # $280 Heavy Canvas Washed Bomber Jacket
    ├── overshirt-navy-twill.png        # $165 Japanese Heavy Twill Overshirt
    ├── crewneck-burgundy.png           # $215 Boiled Wool Crewneck Sweater
    ├── sweater-olive-merino.png        # $195 Textured Olive Merino Knit
    ├── sweater-thermal-sand.png        # $175 Thermal Waffle Mockneck
    ├── tee-boxy-white.png              # $85 Heavyweight 300 GSM Boxy Tee
    └── tee-emblem-black.png            # $95 Washed Black Emblem Tee
```

---

## 3. Engineering & Physics Specifications

### 3.1 Tension Cable & Hanger Anatomy
- **Steel Tension Wire:** A sub-pixel 2.5px gradient line (`#8C8880`) running continuously across the viewport with dark anchoring hardware.
- **Precision Beechwood Hanger:** Custom inline SVG with:
  - Steel loop hook (`strokeWidth="2.5"`).
  - Contoured walnut/beechwood crossbeam (`fill="#3D291D"` with `#5A3D2B` grain highlight).
  - Real-time contact drop shadow (`rgba(0, 0, 0, 0.18)`).
- **Dangling Price Tag:** Suspended from a 1px hanging thread with an adaptive white/charcoal pill ticket that illuminates into inverse black on hover/selection.

### 3.2 Drag Physics & Inertia Engine
- Powered by `framer-motion`:
  - `useMotionValue(0)` and `useSpring(x, { stiffness: 220, damping: 28 })` for fluid, jitter-free glide.
  - Dynamic drag constraint recalculation on window resize (`railRef.current.scrollWidth - containerWidth`).
  - Tactile drag inertia: `dragElastic={0.12}`, `bounceStiffness: 300`, `bounceDamping: 25`, `power: 0.2`.
  - Directional discrete stepped scroll buttons (`ChevronLeft` / `ChevronRight`) incrementing $\pm 380\text{px}$.

### 3.3 Micro-Interactions & Sway Physics
- Hovering any garment triggers a spring-loaded vertical lift ($-6\text{px}$) and subtle pendulum angular sway ($\pm 1.4^{\circ}$ alternating by index) with `transformOrigin: "top center"`.
- Prevents accidental modal clicks during active drag operations with a 120ms drag threshold lock (`isDraggingRef.current`).

---

## 4. Garment Quick-View Modal Mechanics

1. **Floating Suspension:** The garment is rendered in high resolution (500x700) suspended from an upper cord and wooden hanger with a soft ground contact shadow.
2. **Front/Back View Angle Switcher:** Toggles between front and back packshots with crossfade transition.
3. **Size Selector Matrix:** Circular size pills (`S`, `M`, `L`, `XL`) with active black pill highlights.
4. **Cart Drawer Integration:** Clicking "Add to cart" dispatches to Zustand `useCartStore`, toggles button state to "Added to Bag" with a green checkmark, and smoothly slides open the global shopping bag drawer after 450ms.

---

## 5. Visual Quality & Zero-Compromise Standards
- **Zero Card Grids:** No rectangular borders, no white card tiles, no visual clutter.
- **Isolated Transparent PNG Cutouts:** 12 studio-grade transparent assets with crisp alpha edges.
- **100% Responsive:** Flawless horizontal scrolling and touch swiping across mobile, tablet, laptop, and ultra-wide displays.
