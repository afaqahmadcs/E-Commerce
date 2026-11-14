# AFAQ SUPPLY — Phase 1: Interactive Model Carousel & "In This Look" Engine

## 1. Executive Overview & Reference Compliance
The **Try the Look** hero section meticulously reproduces the signature 0.0s – 5.5s experience from the reference video (`reference-video/reference-video.mp4`). It delivers an editorial fashion runway experience featuring six full-body models standing directly on a seamless ivory canvas (`#F8F7F4`), grounded with organic floor contact shadows and powered by fluid gesture-driven physics.

---

## 2. Visual Architecture & Design Principles

### 2.1 Seamless Grounding & Asset Standards
- **No Card Enclosures:** Models do not sit inside bordered boxes or white cards. They stand freely on the studio floor, mirroring the luxury brand aesthetic of the reference.
- **Head-to-Toe Cutouts:** Standardized 1000px height transparent PNG assets (`/models/model-01.png` through `/models/model-06.png`) preserving natural human proportions, fabric draping, and footwear grounding.
- **Organic Floor Contact Shadows:** Multi-stop radial gradients beneath each model's shoes (`bg-black/35 blur-[10px]`), automatically scaling and adjusting opacity in synchronization with model depth and movement.

### 2.2 Spatial Hierarchy & Focus Distribution
- **Center Selected Model ($\Delta = 0$):**
  - Scale: `1.14x`
  - Opacity: `1.0`
  - Z-Index: `30`
  - Interactive "VIEW" Pill: Pulsing glassmorphic button situated beside the model's torso.
- **Immediate Flanking Neighbors ($\Delta = \pm 1$):**
  - Scale: `0.88x`
  - Opacity: `0.82`
  - Z-Index: `20`
  - Spacing: `240px` offset from center stage.
- **Outer Perimeter ($\Delta = \pm 2$):**
  - Scale: `0.72x`
  - Opacity: `0.45`
  - Z-Index: `10`
  - Depth of Field: `blur(1.5px)` simulating physical lens blur.

---

## 3. Motion & Transition Engineering
- **Unified Lineup Gliding:** When any look is selected (via model click, horizontal drag, scrubber, or keyboard arrows), all 6 models glide simultaneously along the horizontal plane.
- **Transition Duration:** Approximately 700ms using a custom luxury cubic-bezier easing curve:
  ```ts
  transition: {
    duration: 0.7,
    ease: [0.16, 1, 0.3, 1],
  }
  ```
- **Ground-Anchored Scaling:** All transform origins are anchored to `bottom center` so that scaling occurs with feet remaining on the baseline floor.
- **Gesture Dragging & Thresholds:**
  - Mouse and touch swipe with `dragElastic={0.18}` and distance/velocity thresholds (>40px / >250px/s).
  - Drag debouncing flag (`isDraggingRef`) ensures dragging never triggers accidental clicks.

---

## 4. "In This Look" Purchasing Matrix & Isolated Mode

### 4.1 Docked Right Panel
- Positioned on the right edge of the stage, updating reactively with the active look's garments:
  - **Category Tag & Title:** Editorial sans/serif pairing with item thumbnail.
  - **Itemized Pricing:** Individual prices and quick-view links.
  - **Dynamic Bundle Pricing:** Automated 10% discount calculation when buying the full styled ensemble.
  - **Add Full Look to Bag:** Single-tap purchasing that populates the Zustand cart store with all 3 items and opens the sliding bag drawer.
  - **View Outfit Details Action:** Seamlessly transitions into garment inspection mode.

### 4.2 Isolated Outfit Inspection Mode (Reference 02.5s – 05.0s)
- Center model expands into prime focus (`scale: 1.18x`).
- Adjacent models smoothly fade out.
- Header transforms to display look specifications (model height, sizes worn).
- Interactive hotspot pins animate onto the garment coordinates (T-shirt/Sweater, Jeans/Trousers, Sneakers/Boots).
- Hovering/clicking a pin highlights the garment in the side panel and reveals floating tooltips.
- Dedicated `✕ RETURN TO LINEUP` button restores full runway composition.

---

## 5. Verification Records & Artifacts
The implementation was verified using headless Chrome automation (`scripts/verify_hero.js`). Generated visual proof assets:
1. `reference_frames/verification_01_lineup.png` — Default runway lineup with Look 04 ("Studio Day") centered.
2. `reference_frames/verification_02_look05_center.png` — Horizontal gliding transition to Look 05 ("Earthy Knitwear").
3. `reference_frames/verification_03_isolated_view.png` — Isolated outfit mode with garment hotspot pins and specs.
4. `reference_frames/verification_04_cart_opened.png` — Bundle addition to sliding shopping bag with automated 10% discount.
