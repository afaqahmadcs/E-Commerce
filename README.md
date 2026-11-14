<div align="center">

# AFAQ SUPPLY
### *THE ART OF EVERYDAY STYLE.*

<p align="center">
  <strong>A World-Class Editorial Luxury Fashion & Streetwear Flagship E-Commerce Platform</strong>
</p>

[![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-C66B39?style=for-the-badge)](LICENSE)

<br />

<p align="center">
  <a href="#-signature-experiences-from-reference-video">Signature Experiences</a> •
  <a href="#-phase-1--try-the-look-interactive-runway-verified">Phase 1 Runway</a> •
  <a href="#-phase-2--animated-hanging-clothing-rail-verified">Phase 2 Clothing Rail</a> •
  <a href="#-phase-3--premium-hoodie--sneaker-product-presentation-verified">Phase 3 Details</a> •
  <a href="#-phase-4--full-e-commerce-engine--pakistani-payments-verified">Phase 4 Full E-Commerce</a> •
  <a href="#-phase-5--luxury-motion-design--responsive-optimization-verified">Phase 5 Motion & Responsive</a> •
  <a href="#-phase-6--final-reference-video-comparison-and-qa-audit-verified">Phase 6 QA Audit</a> •
  <a href="#-git-branch-architecture--contributions">Git Workflow</a> •
  <a href="#-full-site-architecture-all-21-routes">All 21 Routes</a> •
  <a href="#-getting-started">Quick Start</a> •
  <a href="#-author">Author</a>
</p>

---

</div>

## ✦ Overview

**AFAQ SUPPLY** is a luxury digital flagship and streetwear e-commerce platform built to recreate the visual language, editorial typography, spatial physics, and fluid product presentation of premier international fashion houses.

Inspired directly by the high-end runway and interactive retail experience recorded in `reference/reference-video.mp4`, every micro-interaction—from model isolation zooms to suspended clothing rail physics, 3D perspective footwear trajectories, and multi-gateway Pakistani & international payment flows—was engineered with commercial-grade scalability and sub-second performance.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  AFAQ SUPPLY FLAGSHIP EXPERIENCE                                                                        │
│  "THE ART OF EVERYDAY STYLE"                                                                            │
│                                                                                                         │
│  [PHASE 1: RUNWAY] ──► [PHASE 2: RAIL] ──► [PHASE 3: SNEAKER] ──► [PHASE 4: ENGINE] ──► [PHASE 5: MOTION]│
│         │                      │                   │                     │                     │        │
│         ▼                      ▼                   ▼                     ▼                     ▼        │
│  Outfit Bundle Explorer  Suspended Cable     Ascending Wave 3D     Full E-Commerce       650ms Luxury   │
│  (Framer 700ms Spring)   (Wood Hangers/Tags) (Matrix Sizes & Lens) (Orders, COD & RLS)   (4 Viewports)  │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ✦ Signature Experiences (From Reference Video)

### 1. `TRY THE LOOK.` — Multi-Model Interactive Runway (00.0s – 05.5s)
* **Horizontal Model Lineup:** Six complete full-body silhouettes styled head-to-toe on an expansive warm ivory runway with realistic contact floor drop shadows.
* **Framer Motion 700ms Physics:** Center model prominently scales up while adjacent models smoothly glide and attenuate scale.
* **Docked "In This Look" Panel:** Real-time synchronized outfit breakdown featuring multiple individual garments with live pricing and a 10% bundle discount calculator.
* **Isolated Mode Inspection:** Smooth zoom transition into isolated outfit inspection with instant return-to-lineup mechanics.
* **Single-Click Bundle Checkout:** "Add full look to bag" adds all outfit components directly into the global shopping bag.

### 2. Suspended Horizontal Clothing Rail (05.5s – 08.0s & 08.0s – 11.5s)
* **Zero Card Grids:** No generic rectangular card boxes. Apparel hangs directly on a continuous brushed steel tension cable spanning the screen.
* **Realistic Beechwood Hangers:** Custom SVG walnut/beechwood hanger beams with steel loop hooks resting on the cable.
* **Dangling Minimal Price Tickets:** Each piece features a suspended price tag ticket (`$199`, `$185`, `$245`, etc.) that inverts on hover.
* **12 Curated Cutout Garments:** 550 GSM heavyweight fleece hoodies, chore jackets, bombed canvas outerwear, boiled wool crewnecks, and boxy tees with crisp transparent alpha edges.
* **Natural Inertia Drag Physics:** Full horizontal touch swiping, mouse drag with spring inertia, discrete stepped left/right navigation, and hover tilt sway ($\pm 1.4^\circ$).
* **Suspended Quick-View Modal:** Clicking any silhouette transitions to an isolated vertical suspension modal featuring Front/Back view angle toggles, circular size selector pills (`S`, `M`, `L`, `XL`), and instant add-to-bag feedback.

### 3. 3D Perspective Footwear Gallery (11.5s – 13.5s)
* **Ascending 3D Trajectory:** Floating footwear arranged along a diagonal spatial perspective curve.
* **Interactive Perspective Scrubber:** Drag/slide control with dynamic depth-sorting and opacity attenuation.
* **Shoe Size Matrix:** Direct access to European sizes `40` through `46`.

### 4. Featured Sneaker Shopping Interface (13.5s – 16.5s)
* **Floating Hero Sneaker:** High-res floating sneaker with soft breathing contact shadow.
* **Colorway Carousel:** Outlined thumbnail cards switching colorways with smooth crossfade.
* **State-Driven Add-to-Bag Button:** Disabled -> Active -> Signature Burnt Orange (`#C66B39`) with purchase confirmation.

---

## ✦ Phase 1 — "Try The Look" Interactive Runway [VERIFIED]

Phase 1 recreates the initial fashion runway sequence from the reference video with mathematical precision:

| Verification Stage | Browser Output |
|---|---|
| **Full Runway Lineup** | Center model highlighted with smooth contact shadows across ivory canvas |
| **Carousel Transition** | Glide smoothly to Look 05 (Earthy Knitwear) with 700ms spring physics |
| **Isolated Outfit View** | Camera zooms into the selected model with detailed worn garment breakdown |
| **Cart Drawer Integration** | "Add full look to bag" dispatches outfit items to the cart drawer |

---

## ✦ Phase 2 — Premium Image Acquisition & Asset Library [VERIFIED]

Phase 2 replaces all external and temporary placeholder photography with an exhaustive, high-resolution, unwatermarked local asset library stored directly in the repository:

* **88 High-Resolution Categorized Local Assets:**
  * **Fashion Models (12):** Full-body male and female models in neutral studio streetwear (`public/images/models/model_01.jpg` – `model_12.jpg`).
  * **Clothing (24):** Heavyweight hoodies, streetwear shirts, tailored trousers, and outerwear jackets (`public/images/products/`).
  * **Footwear (14):** Luxury lifestyle court runners and trainers (`public/images/products/sneakers/`).
  * **Leather Goods & Accessories (10):** Full-grain weekender duffles, totes, cardholders, and watches (`public/images/products/accessories/`).
  * **Urban Streetwear Lifestyle (10):** High-fashion editorial lookbook photos (`public/images/lifestyle/`).
  * **Atelier Craftsmanship (8):** Loom weaving, pattern cutting, and workshop visuals (`public/images/campaigns/`).
  * **Collection Banners (10):** Editorial banners and covers (`public/images/collections/`, `public/images/banners/`).
* **Complete Image Asset Manifest:** Full documentation in [`IMAGE_ASSET_MANIFEST.md`](file:///d:/SMIT%20Projects/E-Commerce/IMAGE_ASSET_MANIFEST.md) recording filename, category, resolution, file size, license, and website section.
* **Authentic Side-Profile Hanging Garment Silhouettes:**
  * Created 9 authentic side-profile hanging garments (`hoodie-side-grey.png`, `hoodie-side-charcoal.png`, `hoodie-side-cream.png`, `hoodie-side-green.png`, `jacket-side-navy.png`, `tee-side-black.png`, `tee-side-white.png`, `sweater-side-olive.png`, `sweater-side-burgundy.png`) matching the reference video (Image 5).
  * Rendered as slender hanging silhouettes with precision steel loop hooks and dangling white price tags.
* **Full-Body Runway Proportions & Responsive Touchpad/Mouse Movement:**
  * Models calibrated to 100% full-body head-to-toe with soft ground shadows.
  * Responsive viewport scaling (`max-h-[50vh]`) guaranteeing no bottom clipping on laptop screens (600px–768px height).
  * 5 models displayed simultaneously in a balanced composition with soft distance blur.
  * Fluid mouse drag (`dragElastic={0.25}`) and horizontal touchpad swipe (`e.deltaX`) navigation.
* **Sneaker Haze Removal & 100% Local Catalog:**
  * Cleaned 21 sneaker PNG assets of low-alpha background haze artifacts (zero grey boxes).
  * Zero external Unsplash URLs across all 21 routes.

---

## ✦ Phase 2 — Animated Hanging Clothing Rail [VERIFIED]

Phase 2 replaces conventional e-commerce card grids with an architectural suspended clothing rail:

1. **Precision Steel Tension Wire:** A sub-pixel 2.5px gradient cable running across `#F8F7F4` with anchoring hardware fixtures.
2. **Realistic Hangers & Dangling Tags:** Custom inline SVG dark beechwood hangers with metal loop hooks and dangling miniature price tickets.
3. **12 Transparent Isolated Garments:** 700px studio cutouts generated with lightweight local AI background removal (`u2netp`) and color grading.
4. **Spring Physics & Pendulum Sway:** Hovering lifts the garment $-6\text{px}$ with a $\pm 1.4^\circ$ alternating pendulum tilt.
5. **Suspended Quick-View Modal:** Isolates the garment suspended from a cord with Front/Back angle toggles, size pills (`S`, `M`, `L`, `XL`), and direct dispatch to the cart drawer.

---

## ✦ Phase 3 — Premium Hoodie & Sneaker Product Presentation [VERIFIED]

Phase 3 implements the two core product presentation and purchasing experiences from seconds **08.5s – 11.0s** and **13.5s – 16.5s** of `reference/reference-video.mp4`:

### Part A — Minimal Editorial Hoodie Presentation (08.5s – 11.0s)
1. **Dominant Isolated Packshot:** Large isolated hoodie asset on neutral `#F8F7F4` warm ivory background with zero bounding card borders.
2. **Suspended Wooden Hanger:** Contoured dark beechwood hanger with suspended vertical cord.
3. **Front / Back Angle Switcher:** Interactive pills toggling between the front graphic packshot and clean reverse silhouette.
4. **Interactive Cursor Zoom Lens:** Dynamic $\times 2.2$ magnification following cursor position `(x, y)` to inspect 550 GSM French Terry loops, flatlock seams, and kangaroo pocket bartacks.
5. **Colorway Matrix:** Smooth Framer Motion crossfade across Heather Melange, Washed Black, Forest Green, and Bone Cream.
6. **Size Selector & Cart Integration:** Circular pills (`S`, `M`, `L`, `XL`), tactile feedback button, and instant sliding shopping bag drawer.

### Part B — Sneaker Detail & Purchasing Experience (13.5s – 16.5s)
1. **Floating Hero Sneaker:** High-resolution transparent sneaker with soft breathing contact floor shadow.
2. **Calfskin Inspection Zoom:** Cursor-guided magnification to inspect Italian tumbled calfskin leather and suede mudguards.
3. **Supporting Viewing Angles:** Horizontal carousel of supporting perspective thumbnails (Lateral Profile, 3/4 Perspective Court, Overhead Top-Down, Outsole Tread, Heel Badge).
4. **Color Options Swatches:** Swatches updating the entire image gallery with smooth crossfade.
5. **EU Size Selector Grid:** Direct selection of sizes `40` through `46` with dynamic inventory indicator (*"In Stock (14 pairs)"* / *"Low Stock"*).
6. **State-Driven Orange-Accented Purchase Button:**
   - *Disabled State:* Greyed-out `"Select a size"` until an EU shoe size is chosen.
   - *Active State:* Solid black `"Add to bag"`.
   - *Purchase State:* Transitions to signature restrained burnt orange (`#C66B39`) with `"Added to bag"` and reveals `"View bag →"`.

---

## ✦ Phase 4 — Full E-Commerce Engine & Pakistani Payments [VERIFIED]

Phase 4 completes the commercial and administrative infrastructure:

### 1. Customer Shopping & Authentication Lifecycle (`/account`, `/account/orders`)
- **Interactive Authentication Portal:** 3-mode switcher between **Sign In**, **Create Patron Account**, and **Password Recovery** with Supabase Auth & atomic local session fallback.
- **Client Profile & Saved Addresses:** Patron profile management and multi-address destination management with default selector.
- **Real-Time Order History:** Displays dispatches with live fulfillment status (`Confirmed` $\rightarrow$ `Atelier Assembly` $\rightarrow$ `In Transit` $\rightarrow$ `Delivered`), item images, colorways, sizes, courier tracking, and totals.

### 2. Server-Side Security & Order Validation (`/api/orders`)
- **Authoritative Catalog Price Validation:** Compares incoming cart items against server-authoritative `PRODUCTS_DATA`. Any tampered price is rejected with HTTP 400.
- **Duplicate Order Prevention (Idempotency):** 15-second hash cache prevents accidental double-charging.
- **Order Number Generation:** Production format `AFQ-YYYYMMDD-XXXX` (e.g. `AFQ-20261114-8192`).
- **PostgreSQL Row Level Security (RLS):** All 19 database tables protected with RLS in `supabase/schema.sql`.

### 3. Pakistani & International Payment Architecture
Designed around `IPaymentGatewayProvider` in `src/lib/payments/types.ts`:
- **Cash on Delivery (COD):** Domestic Pakistan & International express courier settlement.
- **Direct Bank Wire (IBAN Remittance):** Meezan Bank (Islamic Banking), Standard Chartered Bank Pakistan, and JPMorgan Chase Commercial (USA).
- **JazzCash Mobile Wallet & 3D-Secure:** HMAC-SHA256 signature calculations and Till #982104 integration.
- **EasyPaisa Mobile Account & OTC:** Mobile account push and 72-hour voucher remittance (`0300-8849201`).
- **1Link / Kuickpay 1Bill Voucher:** 18-digit consumer number generator allowing payment via 40+ Pakistani banking apps (HBL, Meezan, SCB, Alfalah, Nayapay, Sadapay) and ATMs.
- *Strict Compliance:* Extensible architecture with explicit configuration requirements; does not simulate fake successful transactions.

### 4. Atelier Admin Management Console (`/admin`)
- **Security Passcode Gate:** Restricted personnel access with authorization passcode (`1994`).
- **Overview & Analytics:** Real-time KPI counters for revenue, dispatches, active patrons, and active silhouettes.
- **Product Catalog CRUD:** Create new silhouettes with live image preview and category mapping.
- **Live Inventory Warehouse:** Unit counters per silhouette with low-stock warnings ($< 5$ units) and instant $+ / -$ adjustments.
- **Orders Pipeline:** Real-time order synchronization with interactive status update selector (`pending`, `confirmed`, `processing`, `shipped`, `delivered`, `cancelled`).
- **Patrons Directory:** Aggregates unique client orders, contact information, and lifetime value (LTV).
- **Store Settings & Announcements:** Live global announcement bar ticker editor and complimentary shipping threshold settings.

```
reference_frames/
├── verification_phase4_01_catalog.png            # Complete catalog with filters & sorting
├── verification_phase4_02_search.png             # Archival search matching "hoodie"
├── verification_phase4_03_cart_drawer.png        # Persistent cart with size L added
├── verification_phase4_04_checkout_form.png      # Express checkout with shipping fields
├── verification_phase4_05_order_confirmation.png # Server order authorization confirmation
├── verification_phase4_06_account_orders.png     # Customer order history pipeline
├── verification_phase4_07_admin_orders.png       # Real-time admin orders synchronization
└── verification_phase4_08_admin_inventory.png    # Live warehouse inventory stock controller
```

---

## ✦ Phase 5 — Luxury Motion Design & Responsive Optimization [VERIFIED]

Phase 5 refines every micro-interaction and responsive layout across **Desktop ($1440\text{px}+$)*, **Laptop ($1024\text{px}-1439\text{px}$)**, **Tablet ($768\text{px}-1023\text{px}$)**, and **Smartphone ($375\text{px}-767\text{px}$)** to international luxury fashion standards without breaking existing commercial shopping functionality:

### 1. Luxury Motion Easing Curves & Spatial Timing
- **Editorial Deceleration Curve:** Standardized on `cubic-bezier(0.16, 1, 0.3, 1)` (custom 650ms luxury glide) across runway models, product galleries, and drawer entrances.
- **Physics-Tuned Springs:** Fine-tuned `stiffness: 280-320` and `damping: 24-28` to deliver high-end mechanical tactile feedback without bouncy cartoon physics.
- **Hardware Layer Acceleration (`.gpu-layer`):** Applied `transform: translate3d(0, 0, 0)` and `will-change: transform, opacity` to all animated elements to isolate compositing layers and maintain 60–120 FPS on high-refresh ProMotion displays.
- **Accessible Motion (`prefers-reduced-motion`):** Built-in `useReducedMotion()` hooks across all interactive components gracefully substitute multi-axis translations and continuous breathing loops with immediate, dignified opacity fades.

### 2. Multi-Viewport Responsive Matrix
| Viewport Profile | Resolution Range | Model Runway Spacing | Suspended Rail UX | Product Detail Ergonomics |
|---|---|---|---|---|
| **Desktop Flagship** | $\ge 1440\text{px}$ | $235\text{px}$ center offset | Full inertia drag with hover pendulum sway | Split-screen with $\times 2.2$ cursor zoom lens |
| **Laptop Compact** | $1024\text{px} - 1439\text{px}$ | $210\text{px}$ center offset | Drag with discrete arrow controls | Responsive dual-column editorial layout |
| **Tablet Portrait** | $768\text{px} - 1023\text{px}$ | $190\text{px}$ center offset | Touch swipe with `touch-action: pan-y` | Stacked photography with tap-to-zoom |
| **Smartphone** | $375\text{px} - 767\text{px}$ | $150\text{px}$ calibrated peek-in | Native horizontal swipe & touch cards | **Sticky Quick-Buy Bar** with instant packshot & price |

### 3. Mobile Flagship Innovations
- **Animated Mobile Navigation Drawer:** Luxury full-screen sliding overlay with staggered editorial typography links (`Atelier`, `Collections`, `Footwear`, `Archive`, `Client Concierge`), bag counter badge, and client account shortcuts.
- **Touch Ergonomics (`touch-action: pan-y`):** Enabled vertical page scrolling across all draggable carousels and rails, eliminating touch gesture locking on iOS Safari and Android Chrome.
- **Calibrated Runway Spacing:** Reduced model offsets from 240px to 150px on smartphones, ensuring adjacent silhouettes gracefully peek into the viewport matching luxury lookbooks.
- **Sticky Bottom Quick-Action Bar:** On mobile screens, product detail pages present a fixed bottom utility bar displaying the active packshot thumbnail, silhouette name, price, and one-tap **Add to Bag** trigger.

```
reference_frames/
├── verification_phase5_01_desktop_runway.png    # Desktop (1440x960) 650ms model transition
├── verification_phase5_02_desktop_quickview.png # Desktop Suspended Rail Quick-View Modal
├── verification_phase5_03_laptop_shop.png       # Laptop (1024x768) responsive catalog view
├── verification_phase5_04_tablet_runway.png     # Tablet (768x1024) calibrated 190px runway
├── verification_phase5_05_tablet_sneaker.png    # Tablet responsive sneaker gallery
├── verification_phase5_06_mobile_nav_drawer.png # Smartphone (375x812) animated luxury drawer
├── verification_phase5_07_mobile_runway.png     # Smartphone 150px calibrated lookbook peek-in
└── verification_phase5_08_mobile_pdp_sticky.png # Smartphone sticky bottom quick-buy bar
```

---

## ✦ Visual Fidelity & Touchpad Navigation Overhaul [VERIFIED]

Calibrated directly against user monitor captures of the reference video (`reference-video/reference-video.mp4`):

### 1. True Full-Body Model Presentation (Head to Shoes)
- Calibrated stage height so the entire silhouette (including shoes touching the floor plane with organic drop shadows) fits within standard laptop and desktop viewports without vertical clipping.
- Restructured `LOOKS_DATA` model lineup to match the reference sequence:
  - **Center Hero (Look 04 "Studio Day"):** Black streetwear emblem tee, sunglasses, vintage wash wide denim, and white retro high court sneakers.
  - **Adjacent Left (Look 03):** Sage green textured knit, navy overshirt, and vintage olive low sneakers.
  - **Adjacent Right (Look 05):** Burgundy boiled wool sweater, charcoal chore jacket, and chalk cream court sneakers.
  - **Outer Silhouettes:** White boxy tee and heather grey fleece.
- Synchronized right-hand **"In this look"** floating panel using crisp local transparent packshots instead of uncoordinated stock photos.

### 2. Dense Suspended Clothing Rail (16 Silhouettes & Dangling Tags)
- Replaced oversized front-facing garment cards with a dense, authentic 16-garment retail rack running along a horizontal steel tension wire.
- Custom minimal metallic hanger loops hooked over the wire with crisp white dangling price tickets (`$199`, `$185`, `$165`, `$105`, etc.).
- Integrated right-side editorial copy matching the reference monitor:
  ```
  Crafted in heavyweight fleece.
  Cut oversized. Made to last.

  Shop the Collection →
  ```

### 3. Native Touchpad & Mouse Wheel Horizontal Navigation
- Implemented `onWheel` event accumulators with velocity thresholds across Runway, Suspended Clothing Rail, and 3D Perspective Footwear Orbit.
- Seamlessly handles horizontal two-finger touchpad swipes (`deltaX`), shift-wheel horizontal panning, and standard wheel events with inertia.

### 4. Zero-Artifact Image Sanitization
- Executed connected-component segmentation and alpha-channel sanitization across all footwear and apparel assets, removing over 375,000 low-alpha haze pixels from `luka5-hightop-blackred.png`, `luka5-shadow-runner.png`, `tee-boxy-white.png`, and `tee-emblem-black.png`.
- Guaranteed 0 dirty edge pixels and pure `#F8F7F4` background harmony.

```
reference_frames/
├── verification_overhaul_01_try_the_look.png             # Full-body models with shoes on floor & matched outfits
├── verification_overhaul_02_runway_after_wheel.png        # Runway look transition via touchpad horizontal swipe
├── verification_overhaul_03_clothing_rail.png             # 16-garment dense cable rail with dangling price tags
├── verification_overhaul_04_clothing_rail_scrolled.png    # Clothing rail scrolled via touchpad two-finger gesture
├── verification_overhaul_05_featured_sneaker.png          # Featured sneaker with zero gray box artifacts
└── verification_overhaul_06_perspective_orbit.png         # 3D perspective footwear orbit with clean transparency
```

---

## ✦ Phase 6 — Final Reference Video Comparison and QA Audit [VERIFIED]

Phase 6 concluded the project with an exhaustive visual and functional quality assurance audit comparing every keyframe of `reference/reference-video.mp4` and user monitor captures against the live production build.

The complete audit results, fidelity ratings, and architectural certifications are published in [FINAL_AUDIT.md](file:///d:/SMIT%20Projects/E-Commerce/FINAL_AUDIT.md).

### 12-Stage Automated Browser QA Verification Matrix

| Audit ID | Section / Workflow | Viewport | Verification Artifact | Status |
|:---:|---|:---:|---|:---:|
| **01** | Runway Carousel (Look 04 "Studio Day") | 1440 × 900 | [`audit_01_desktop_runway_look04.png`](file:///d:/SMIT%20Projects/E-Commerce/reference_frames/audit_01_desktop_runway_look04.png) | **PASS** |
| **02** | Runway Touchpad Swipe (Look 05 Transition) | 1440 × 900 | [`audit_02_desktop_runway_look05.png`](file:///d:/SMIT%20Projects/E-Commerce/reference_frames/audit_02_desktop_runway_look05.png) | **PASS** |
| **03** | Suspended Clothing Rail (16 Dense Garments) | 1440 × 900 | [`audit_03_desktop_clothing_rail.png`](file:///d:/SMIT%20Projects/E-Commerce/reference_frames/audit_03_desktop_clothing_rail.png) | **PASS** |
| **04** | Featured Sneaker (Luka 5 & Contact Shadow) | 1440 × 900 | [`audit_04_desktop_featured_sneaker.png`](file:///d:/SMIT%20Projects/E-Commerce/reference_frames/audit_04_desktop_featured_sneaker.png) | **PASS** |
| **05** | 3D Perspective Footwear Orbit (Clean Alpha) | 1440 × 900 | [`audit_05_desktop_perspective_orbit.png`](file:///d:/SMIT%20Projects/E-Commerce/reference_frames/audit_05_desktop_perspective_orbit.png) | **PASS** |
| **06** | Editorial Hoodie PDP (Isolated Packshot & Zoom) | 1440 × 900 | [`audit_06_desktop_pdp_hoodie.png`](file:///d:/SMIT%20Projects/E-Commerce/reference_frames/audit_06_desktop_pdp_hoodie.png) | **PASS** |
| **07** | Shopping Bag Drawer (Shipping Meter & Dispatch) | 1440 × 900 | [`audit_07_desktop_cart_drawer.png`](file:///d:/SMIT%20Projects/E-Commerce/reference_frames/audit_07_desktop_cart_drawer.png) | **PASS** |
| **08** | Commercial Checkout & Multi-Gateway Selector | 1440 × 900 | [`audit_08_desktop_checkout_form.png`](file:///d:/SMIT%20Projects/E-Commerce/reference_frames/audit_08_desktop_checkout_form.png) | **PASS** |
| **09** | Atelier Admin Portal (Passcode `1994` & KPIs) | 1440 × 900 | [`audit_09_desktop_admin_portal.png`](file:///d:/SMIT%20Projects/E-Commerce/reference_frames/audit_09_desktop_admin_portal.png) | **PASS** |
| **10** | Mobile Runway Carousel (150px Peek-In) | 375 × 812 | [`audit_10_mobile_runway.png`](file:///d:/SMIT%20Projects/E-Commerce/reference_frames/audit_10_mobile_runway.png) | **PASS** |
| **11** | Mobile Navigation Sliding Drawer | 375 × 812 | [`audit_11_mobile_nav_drawer.png`](file:///d:/SMIT%20Projects/E-Commerce/reference_frames/audit_11_mobile_nav_drawer.png) | **PASS** |
| **12** | Mobile PDP Sticky Quick-Buy Bar | 375 × 812 | [`audit_12_mobile_pdp_sticky.png`](file:///d:/SMIT%20Projects/E-Commerce/reference_frames/audit_12_mobile_pdp_sticky.png) | **PASS** |

### Quality Assurance Sign-Off
- **TypeScript:** Strict type checking passed with exit code 0 (`npx tsc --noEmit`).
- **ESLint:** Code style and syntax verified with zero warnings (`npm run lint`).
- **Production Build:** Static and dynamic route compilation confirmed across all 21 endpoints (`npm run build`).
- **Hydration Safe:** Root layouts and header components fortified with hydration suppression and client mount guards.

---

## ✦ Storefront Upgrade — Phase 1: Complete Project Audit & Organization [VERIFIED]

Following the completion of the baseline flagship experience, an exhaustive storefront-wide inspection was executed across all 21 routes to modernize all remaining static pages, eliminate repeated Unsplash stock imagery, and organize the codebase into modular domains.

The comprehensive audit findings, route deficiency breakdown, and multi-phase implementation roadmap are published in [STOREFRONT_AUDIT.md](file:///d:/SMIT%20Projects/E-Commerce/STOREFRONT_AUDIT.md).

### Modular Architecture Reorganization
- **Animation Primitives (`src/components/animations/`):** Reusable Framer Motion components (`FadeIn.tsx`, `StaggerContainer.tsx`, `MagneticButton.tsx`).
- **UI Atoms (`src/components/ui/`):** Luxury button and badge tokens (`Button.tsx`, `Badge.tsx`).
- **Domain Modules (`src/components/{storefront, products, navigation, collections}`):** Clean separation of homepage showcases, product detail interfaces, and global navigation.
- **Service Layer (`src/services/`):** Extracted `productService.ts` and `orderService.ts` for standardized data fetching and server validation.
- **Design Tokens (`src/styles/tokens.ts`):** Centralized ivory canvases (`#F8F7F4`), obsidian contrasts (`#171717`), burnt orange accents (`#C66B39`), and luxury spring physics.
- **Organized Asset Hierarchy (`public/images/`):** Categorized directories for `models`, `products/{hoodies, shirts, jackets, sneakers, accessories}`, `collections`, `campaigns`, `lifestyle`, and `icons`.

---

## ✦ Git Branch Architecture & Contributions

Development follows an enterprise Git flow with discrete feature branches and linear contribution histories:

```
main (Production Releases)
 │
 ├── develop (Integration & Staging)
 │    │
 │    ├── feature/try-the-look-runway          ──► Phase 1 (Model Runway & Bundles) [MERGED]
 │    │
 │    ├── feature/clothing-rail-engine         ──► Phase 2 (Suspended Rail & Modal) [MERGED]
 │    │
 │    ├── feature/product-presentation-phase3  ──► Phase 3 (Hoodie & Sneaker Detail) [MERGED]
 │    │
 │    ├── feature/full-ecommerce-engine        ──► Phase 4 (Full E-Commerce & Payments) [MERGED]
 │    │
 │    ├── feature/motion-and-responsive-optimization ──► Phase 5 (Luxury Motion & 4 Viewports) [MERGED]
 │    │
 │    ├── feature/visual-overhaul-and-touchpad-navigation ──► Visual Fidelity & Touchpad Navigation [MERGED]
 │    │
 │    ├── feature/perspective-sneakers-asset-replacement ──► 3D Footwear Orbit Transparent Asset Overhaul [MERGED]
 │    │
 │    ├── feature/phase6-final-audit-and-qa   ──► Phase 6 Final Reference Video Comparison & QA [MERGED]
 │    │
 │    ├── feature/storefront-upgrade-phase1-audit-org ──► Storefront Upgrade Phase 1 (Audit & Org) [MERGED]
 │    │
 │    ├── feature/phase2-image-acquisition-and-asset-library ──► Storefront Upgrade Phase 2 (Asset Library & Video Fidelity) [MERGED]
 │    │
 │    └── feature/phase3-multi-page-storefront-redesign ──► Storefront Upgrade Phase 3 (Multi-Page Redesign) [VERIFIED]
```

### Branches:
* `main`: Stable production branch with pre-rendered static routes and verified phases.
* `develop`: Integration branch where tested feature branches are consolidated.
* `feature/try-the-look-runway`: Phase 1 interactive model carousel, outfit bundles, and verification suite.
* `feature/clothing-rail-engine`: Phase 2 tension wire mechanics, wooden hangers, dangling tags, and suspended modal.
* `feature/product-presentation-phase3`: Phase 3 minimal editorial hoodie layout, interactive zoom lens, floating sneaker, viewing angle thumbnails, and orange purchase state machine.
* `feature/full-ecommerce-engine`: Phase 4 complete customer account, search, checkout, Pakistani payment gateways, server security, and admin management console.
* `feature/motion-and-responsive-optimization`: Phase 5 luxury easing curves, GPU acceleration, mobile navigation drawer, touch-pan-y drag freedom, sticky quick-buy bar, and 4-viewport test matrix.
* `feature/visual-overhaul-and-touchpad-navigation`: Visual fidelity alignment with reference video monitor frames (full-body models with shoes on ground, matching Look 04 Studio Day styling, 16-garment dense cable rail with dangling price tags, true zero-alpha artifact removal, and native touchpad/mouse wheel horizontal navigation across all sections).
* `feature/perspective-sneakers-asset-replacement`: Complete overhaul of the 3D perspective footwear orbit replacing all mismatched card photos and hazy low-alpha cutouts with 7 high-resolution, solid-bodied, pure-transparent luxury streetwear sneakers.
* `feature/phase6-final-audit-and-qa`: Phase 6 comprehensive reference video comparison, 12-stage automated browser QA suite, zero-error hydration hardening, and publication of `FINAL_AUDIT.md`.
* `feature/storefront-upgrade-phase1-audit-org`: Storefront Upgrade Phase 1 inspection of all 21 routes, creation of `STOREFRONT_AUDIT.md`, modular architecture re-organization (`src/components/{storefront, products, ui, animations}`, `src/hooks`, `src/services`, `src/styles`, `public/images/`), and cataloging of missing assets.
* `feature/phase2-image-acquisition-and-asset-library`: Storefront Upgrade Phase 2 downloading 88 high-resolution local images, eliminating all external Unsplash URLs, creating authentic side-profile hanging garments for the clothing rail, full-body head-to-toe model scaling with 5 models visible, responsive touchpad and mouse drag navigation, and eliminating all sneaker background haze artifacts.
* `feature/phase3-multi-page-storefront-redesign`: Storefront Upgrade Phase 3 complete multi-page redesign: consistent luxury header with animated mega menus and local category imagery, full 10-section homepage (runway, rail, sneaker spotlight, 3D orbit, category grid, curated drops, split editorial banners, brand manifesto, community looks, private newsletter dispatch), dynamic shopping catalogue with color/size/price filters, dedicated individual visual experiences across all 8 collections with unique banners, PDP with live quantity selectors, related products and recently viewed tracker, dedicated client wishlist page, and upgraded search/cart/account flows.

---

## ✦ Storefront Upgrade Phase 3 — Complete Multi-Page Storefront Redesign [VERIFIED]

Phase 3 elevates every customer-facing surface across the application into a cohesive international luxury fashion house experience:

1. **Global Navigation & Mega Menus:**
   * Unified luxury header featuring `NEW ARRIVALS (SS26)`, `MEN`, `WOMEN`, `SNEAKERS`, `ACCESSORIES`, `SEARCH`, `WISHLIST`, `ACCOUNT`, and `BAG`.
   * Desktop mega menus with categorized editorial columns and rich featured visual cards showcasing local photography.
   * Mobile navigation drawer with direct quick client portal buttons and clean typography.
2. **10-Section Flagship Homepage:**
   * **Try The Look Runway:** 5 full-body models head-to-toe with fluid horizontal touchpad swipe & mouse drag.
   * **Suspended Clothing Rail:** Catenary steel cable with slender side-profile hanging garments and dangling white price tags.
   * **Featured Sneaker Presentation:** AFAQ Luka 5 color switching, size selector, and stock counters.
   * **3D Perspective Footwear Gallery:** Clean solid-body sneakers floating in perspective orbit.
   * **Shop by Department:** 4-card department grid with local high-res photography.
   * **Curated Seasonal Drops:** Seasonal essentials with hover zoom and quick navigation.
   * **Dual Split Editorial Banners:** Campaign stories for 500 GSM fleeces and full-grain Tuscan leather holdalls.
   * **Brand Manifesto & Loom Craftsmanship:** Okayama shuttle looms and Porto craftsmanship.
   * **Curated Community Looks:** Streetwear community curation.
   * **Private Atelier Dispatch Newsletter:** Integrated email signup with instant interactive confirmation.
3. **Elevated Shopping Catalogue (`/shop`):**
   * Dynamic editorial category banners matching the selected department.
   * Real-time color swatches (Black, White, Grey, Cream, Green, Navy, Olive, Burgundy) and size filters (XS–XL, EU 40–46).
   * Responsive product cards with hover quick add to bag, wishlist toggle, and product labels.
4. **Individual Visual Collection Experiences (`/collections/[slug]`):**
   * Distinctive hero banners and descriptions for Men's Atelier, Women's Studio, Archival Sneakers, Hoodies, T-Shirts, Outerwear & Jackets, Accessories, and New Arrivals.
   * Dynamic product filtering and sibling collection navigation strips.
5. **Enhanced Product Detail Pages (`/products/[slug]`):**
   * High-resolution zoom lens, multiple angle packshots, colorway switching, and size selector.
   * Interactive **Quantity Selector** (`-` and `+` buttons) respecting warehouse stock limits.
   * **Recently Viewed Silhouettes:** Client-side browsing history tracking displaying recently explored pieces.
   * **Complete Your Atelier:** Curated related items gallery.
6. **Dedicated Client Wishlist (`/wishlist`):**
   * Curated personal collection with one-click "Add to Bag" and removal actions.
7. **Refined Cart & Search:**
   * Free shipping progress meter ($200 threshold with live percentage progress bar).
   * Companion accessories recommendation strip to unlock complimentary global express shipping.
   * Enhanced search with trending search suggestion pills and department filters.

---

## ✦ Full Site Architecture (All 21 Routes)

Every single route is built with responsive mobile & desktop UX, accessible semantic HTML, and zero placeholder links:

```
├── / ......................... Flagship Homepage (Runway, Rail, Sneaker Matrix, Drops)
├── /shop ..................... Complete Catalog with Category & Size Filters
├── /collections/[slug] ....... Curated Drops (New Arrivals, Streetwear, Footwear, Knitwear)
├── /products/[slug] .......... Product Detail (Gallery, Zoom, Variants, Size Guide, Tabs)
├── /search ................... Real-Time Search across Silhouettes & Materials
├── /cart ..................... Shopping Bag with Free Shipping Meter ($200 Threshold)
├── /checkout ................. Multi-Step Checkout (Address, COD, Wire, Gateway Validation)
├── /account .................. Client Portal (Profile, Saved Addresses, Wishlist, Auth)
├── /account/orders ........... Order History Pipeline (Confirmed → Shipped → Delivered)
├── /about .................... Brand Manifesto, Portuguese Fleece & Japanese Denim Mills
├── /contact .................. Client Concierge & Flagship SoHo Showroom Inquiries
├── /faq ...................... Sizing, Care, Global Shipping & Returns FAQ
├── /shipping-returns ......... Global Logistics & 30-Day Effortless Return Guidelines
├── /privacy-policy ........... GDPR & CCPA Data Autonomy Policy
├── /terms .................... Commercial Terms & Intellectual Property
├── /admin .................... Protected Store Administration Dashboard
│   ├── Overview .............. Revenue, Orders, Patrons & Silhouette Analytics
│   ├── Products .............. Full Product CRUD & Variants
│   ├── Live Inventory ........ Warehouse Unit Counters & Low-Stock Alerts
│   ├── Orders ................ Real-Time Fulfillment Pipeline & Status Updater
│   ├── Patrons ............... Customer Directory & Lifetime Spend
│   ├── Collections ........... Manage Drops & Product Associations
│   ├── Promotions ............ Live Global Announcement Bar Editor
│   └── Settings .............. Brand Identity, Shipping Fees & Currency
├── /api/orders ............... Server-Side Order Processing & Price Validation API
├── /sitemap.xml .............. Dynamic SEO Search Engine Index
└── /robots.txt ............... Automated Crawler Directives
```

---

## ✦ Design System & Color Tokens

| Token | Hex Code | Visual Application |
|---|---|---|
| **Base Canvas** | `#F8F7F4` | Warm ivory canvas creating an airy art-gallery feel |
| **Primary Text** | `#151515` | High-contrast charcoal/off-black for headlines & buttons |
| **Secondary Text** | `#777777` | Neutral stone grey for specifications & metadata |
| **Borders** | `#E8E6E1` | Fine hairline dividers maintaining architectural structure |
| **Card Surface** | `#F0EFEB` | Warm tinted card background |
| **Accent Color** | `#C66B39` | **Restrained Burnt Orange** reserved for purchase feedback |
| **Dark Obsidian** | `#171717` | Editorial campaign sections & luxury footer |

### Typography Hierarchy
* **Headlines:** `Playfair Display` (Classic editorial high-fashion serif)
* **Interface & Body:** `Inter` / `Geist` (Modern, readable Swiss sans-serif)
* **Specs & Numbers:** `Geist Mono` (Monospaced uppercase tracking for sizes, SKUs, and prices)

---

## ✦ Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or pnpm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/afaqahmadcs/E-Commerce.git
cd E-Commerce
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Production Build & Run
```bash
npm run build
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) to view the admin management dashboard (Passcode: `1994`).

---

## ✦ Author

**Afaq Ahmad**  
- **GitHub:** [@afaqahmadcs](https://github.com/afaqahmadcs)  
- **Project Repository:** [https://github.com/afaqahmadcs/E-Commerce](https://github.com/afaqahmadcs/E-Commerce)

---

<div align="center">
  <sub>Designed & Developed with architectural precision. © 2026 AFAQ SUPPLY CO. All rights reserved.</sub>
</div>
