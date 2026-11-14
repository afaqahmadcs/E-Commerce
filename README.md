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
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  AFAQ SUPPLY FLAGSHIP EXPERIENCE                                                      │
│  "THE ART OF EVERYDAY STYLE"                                                          │
│                                                                                       │
│  [PHASE 1: RUNWAY] ──► [PHASE 2: RAIL] ──► [PHASE 3: SNEAKER] ──► [PHASE 4: ENGINE]    │
│         │                      │                   │                     │            │
│         ▼                      ▼                   ▼                     ▼            │
│  Outfit Bundle Explorer  Suspended Cable     Ascending Wave 3D     Full E-Commerce    │
│  (Framer 700ms Spring)   (Wood Hangers/Tags) (Matrix Sizes & Lens) (Orders, COD & RLS)│
└────────────────────────────────────────────────────────────────────────────────────────┘
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
 │    └── feature/full-ecommerce-engine        ──► Phase 4 (Full E-Commerce & Payments) [COMPLETED]
```

### Branches:
* `main`: Stable production branch with pre-rendered static routes and verified phases.
* `develop`: Integration branch where tested feature branches are consolidated.
* `feature/try-the-look-runway`: Phase 1 interactive model carousel, outfit bundles, and verification suite.
* `feature/clothing-rail-engine`: Phase 2 tension wire mechanics, wooden hangers, dangling tags, and suspended modal.
* `feature/product-presentation-phase3`: Phase 3 minimal editorial hoodie layout, interactive zoom lens, floating sneaker, viewing angle thumbnails, and orange purchase state machine.
* `feature/full-ecommerce-engine`: Phase 4 complete customer account, search, checkout, Pakistani payment gateways, server security, and admin management console.

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
