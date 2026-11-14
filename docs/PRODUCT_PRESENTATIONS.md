# AFAQ SUPPLY — Premium Hoodie & Sneaker Product Presentation (Phase 3)

## 1. Architectural Overview & Reference Grounding
Phase 3 recreates the two definitive product presentation experiences from `reference/reference-video.mp4`:
- **08.5s – 11.0s:** The **Minimal Editorial Hoodie Presentation**, where an isolated hoodie suspended on a wooden hanger dominates an expansive neutral canvas with Front/Back angle toggles, cursor zoom lens, and streamlined purchasing controls.
- **13.5s – 16.5s:** The **Featured Sneaker Detail & Purchasing Interface**, featuring a floating hero sneaker with breathing contact shadow, supporting thumbnail viewing angles, colorway gallery updates, EU size matrix (40–46), real-time stock status, and a state-driven orange-accented purchase button.

---

## 2. Part A — Minimal Editorial Hoodie Presentation

### 2.1 Layout Architecture
- **Canvas:** Pure `#F8F7F4` warm ivory canvas without bounding boxes, cards, or unnecessary container borders.
- **Hanger Suspension:** Contoured dark beechwood hanger SVG (`#3D291D` with `#5A3D2B` grain highlight) suspended from a minimal vertical ceiling cord.
- **Front / Back Angle Switcher:** Tactile pill switcher allowing patrons to examine both the front packshot and clean rear silhouette.
- **Interactive Cursor Zoom Lens:**
  - Tracks mouse coordinates `(x, y)` across the container.
  - Dynamically shifts `transformOrigin: ${x}% ${y}%` with smooth $\times 2.2$ scale magnification.
  - Allows tactile inspection of custom-milled 550 GSM French Terry loops, double-needle flatlock seams, and kangaroo pocket bartacks.

### 2.2 Color & Size Matrix
- **Colorways:**
  - Heather Melange (`#D2D0CA`): `/garments/hoodie-archival-grey.png`
  - Washed Black (`#222222`): `/garments/hoodie-charcoal-black.png`
  - Forest Green (`#2D3E35`): `/garments/hoodie-forest-green.png`
  - Bone Cream (`#E5E2DC`): `/garments/hoodie-bone-cream.png`
- **Framer Motion Crossfade:** Transitions smoothly between colorways via `AnimatePresence mode="wait"`.
- **Size Selector:** Circular size pills (`S`, `M`, `L`, `XL`) with active black pill highlights.

---

## 3. Part B — Sneaker Detail & Purchasing Experience

### 3.1 Floating Footwear Stage
- **Floating Hero Sneaker:** High-resolution transparent cutout floating in mid-air with gentle vertical hovering animation.
- **Floor Contact Shadow:** Synchronized breathing blur shadow that expands and contracts with sneaker movement.
- **Interactive Calfskin Zoom:** Cursor-guided magnification to inspect full-grain Italian tumbled calfskin, perforated toe box, and suede mudguards.

### 3.2 Supporting Viewing Angles & Colorways
- **Supporting Thumbnails Row:**
  - Angle 1: Lateral Profile Court View
  - Angle 2: 3/4 Perspective Court View
  - Angle 3: Overhead Top-Down View
  - Angle 4: Herringbone Outsole Tread View
  - Angle 5: Ankle Collar & Heel Badge View
- **Color Options:** Bone White / Cement / Red, Tangerine White, Court Runner, High-Top Noir, and Shadow Runner.
- **EU Size Matrix:** Direct selection of European sizes `40`, `41`, `42`, `43`, `44`, `45`, `46`.
- **Dynamic Stock Status:** Real-time inventory indicator based on active variant.

### 3.3 State-Driven Orange-Accented Purchase Button
Recreates reference video frames 13.5s -> 14.5s -> 16.0s:
1. **Disabled State:** Greyed-out `"Select a size"` until an EU shoe size is chosen.
2. **Active State:** Solid black `"Add to bag"`.
3. **Purchase State:** Transitions to signature restrained burnt orange (`#C66B39`) with `"Added to bag"` and a checkmark, automatically sliding open the global shopping bag drawer after 400ms.
4. **Post-Add Link:** Reveals `"View bag →"` action.

---

## 4. Verification Proofs
The automated Puppeteer test suite (`scripts/verify_phase3_product_presentations.js`) verifies all interactions:
- `reference_frames/verification_phase3_01_hoodie_overview.png`: Minimal editorial stage with suspended hanger.
- `reference_frames/verification_phase3_02_hoodie_back_view.png`: Front/Back angle switcher.
- `reference_frames/verification_phase3_03_hoodie_color_switch.png`: Seamless color transition to Forest Green.
- `reference_frames/verification_phase3_04_hoodie_cart_drawer.png`: Added to bag with live cart drawer.
- `reference_frames/verification_phase3_05_sneaker_overview.png`: Floating sneaker with breathing shadow.
- `reference_frames/verification_phase3_06_sneaker_angle_switch.png`: Viewing angle crossfade.
- `reference_frames/verification_phase3_07_sneaker_cart_drawer.png`: Orange button state & cart integration.
- `reference_frames/verification_phase3_08_home_featured_sneaker.png`: Homepage featured sneaker showcase.
