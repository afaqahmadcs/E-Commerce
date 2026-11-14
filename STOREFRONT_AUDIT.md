# AFAQ SUPPLY — STOREFRONT UPGRADE AUDIT REPORT
### *Phase 1: Complete Project Audit, Architecture Organization & Modernization Strategy*

**Date:** November 14, 2026  
**Auditor:** Antigravity AI (Google DeepMind Team)  
**Project:** AFAQ SUPPLY Fashion Flagship (`THE ART OF EVERYDAY STYLE.`)  
**Repository:** [https://github.com/afaqahmadcs/E-Commerce.git](https://github.com/afaqahmadcs/E-Commerce.git)  
**Reference Benchmark:** `reference/reference-video.mp4`

---

## 1. Executive Summary

Following the completion of the Phase 1–6 visual and functional milestones, a deep-dive storefront inspection was conducted across all 21 application routes. 

While the signature showcase experiences on the homepage (the *Try The Look* interactive runway, the *Suspended Clothing Rail*, the *3D Perspective Footwear Orbit*, and the *Featured Sneaker Purchasing Interface*) closely emulate the physics and visual fidelity of the reference video, **the remainder of the storefront exhibits significant variance**:
1. **Pervasive Static Layouts:** 16 out of 21 routes lack entrance animations, staggered item reveals, hover transitions, or scroll physics, making them feel like traditional, flat e-commerce templates rather than an international luxury fashion house.
2. **Generic Unsplash Stock Imagery:** Over 40% of catalog items and grid sections (`CategoryGrid`, `CommunityGrid`, `CuratedDrops`, `Shop`, `Search`, `About`) rely on generic Unsplash photography with conflicting lighting, inconsistent backgrounds, and repeated model faces.
3. **Sparse Catalog Depth:** `PRODUCTS_DATA` contains only 9 individual products (1 hoodie, 1 sneaker, 1 tee, 1 denim, 1 knit, 1 trench, 1 duffle, 1 cardholder), leading to empty category filters (Women has only 1 product, Sneakers has only 1 in the main grid, Accessories has 2).
4. **Architectural Organization:** Component files, animation primitives, UI atoms, hooks, and image assets required structured compartmentalization to support rapid, non-breaking design upgrades in subsequent phases.

This report establishes the baseline diagnostic, documents every route, introduces the newly reorganized architectural hierarchy, catalogs missing assets, and presents a phased roadmap for the complete storefront upgrade.

---

## 2. Comprehensive Route-by-Route Storefront Audit

| Route & URL | Visual Design Status | Animation Level | Image Asset Quality | Current Condition & Deficiencies | Required Improvements for Next Phases |
|---|:---:|:---:|:---:|---|---|
| **1. Homepage**<br>`/` | **Fully Designed** (Hero/Rail/Sneakers) / **Partially Designed** (Bottom Sections) | **High** (Top 4 sections) / **Static** (Bottom 4 sections) | **High** (Custom packshots & models) / **Mixed** (Unsplash grids) | Top half features 700ms spring runway, 16-garment cable rail, 3D footwear orbit, and Luka 5 showroom. However, `CategoryGrid`, `CuratedDrops`, `BrandEditorial`, and `CommunityGrid` at the bottom are completely static and reuse identical Unsplash model photos. | • Add scroll-triggered staggered reveals to bottom sections.<br>• Replace repeated Unsplash portraits with unique studio campaign photography.<br>• Add interactive quick-view drawer dispatch to `CuratedDrops`. |
| **2. Shop (All Silhouettes)**<br>`/shop` | **Partially Designed** | **Static** (`hasMotionElements: false`) | **Mixed** (7 Unsplash out of 9 products) | Standard 4-column rectangular card grid with static category pills and select dropdowns. No entrance fade-in, no hover image swap (front-to-back), no floating filter drawer, and no live quick-add button on product cards. | • Implement animated `StaggerContainer` on product grid.<br>• Add secondary hover packshot crossfade.<br>• Add Quick-Buy size selector directly on card hover.<br>• Replace Unsplash cards with isolated transparent assets on `#F8F7F4`. |
| **3. Men's Atelier**<br>`/shop?category=men` | **Partially Designed** | **Static** | **Mixed** (4 Unsplash, 1 Local) | Displays 5 products. Layout lacks dedicated editorial hero banner or department manifesto. Cards are static rectangular boxes. | • Add dedicated Men's Atelier editorial header with Portuguese loopback fleece narrative.<br>• Expand collection to include archival workwear, chore jackets, and heavyweight thermals. |
| **4. Women's Studio**<br>`/shop?category=women` | **Incomplete / Sparse** | **Static** | **Low** (Only 1 product: Trench Coat) | Currently contains only a single product (`afaq-sculptural-trench-coat-camel`). Look and feel feels deserted and unpopulated. | • Expand women's collection to 6+ foundational silhouettes (Oversized Wool Coat, Silk-Cotton Longsleeve, Relaxed Wide Trousers, Cashmere Knit).<br>• Add editorial campaign photography. |
| **5. Sneakers Department**<br>`/shop?category=sneakers` | **Partially Designed** | **Static** | **High** (Luka 5 Transparent) | Displays only 1 sneaker in the main shop grid, even though `src/data/sneakers.ts` and `public/sneakers/` contain 7 complete models (Court Zero, Retro Runner '88, Tangerine, etc.). | • Synchronize `PRODUCTS_DATA` with `SNEAKERS_DATA` so all 7 footwear colorways appear in the shop catalog.<br>• Add 360° interactive rotation thumbnail preview on card hover. |
| **6. Accessories**<br>`/shop?category=accessories` | **Sparse** | **Static** | **Stock Photos** (Unsplash Duffle & Cardholder) | Contains only 2 products. Photography is realistic but does not match the clean, warm ivory studio backdrop of the apparel and footwear lines. | • Introduce custom isolated packshots for leather goods, beanies, caps, and socks.<br>• Add materials & hardware accordion details. |
| **7. Curated Drops**<br>`/collections/[slug]` | **Partially Designed** | **Partial** (Hero banner motion only) | **Mixed** (Unsplash covers) | Hero banner features full-bleed dark image with text overlay. Product grid below is a duplicate of the shop grid without interactive filtering or sorting. | • Add editorial drop countdown / release status.<br>• Add lookbook split-screen layout combining editorial styling with buyable garments. |
| **8. Product Detail (Apparel)**<br>`/products/[slug]` | **Fully Designed** | **High** (Zoom lens, accordion, variants) | **High** (Isolated packshots on ivory) | Suspended wooden hanger packshot on clean ivory, front/back toggle, $2.2\times$ cursor loupe zoom, size selection matrix, and Add to Bag drawer integration. | • Add customer styling gallery ("How Patrons Style This").<br>• Add real-time stock countdown indicator ("Only 3 left in size L"). |
| **9. Product Detail (Sneakers)**<br>`/products/afaq-luka-5-retro-runner` | **Fully Designed** | **High** (Breathing shadow, multi-angle) | **High** (Clean transparent cutouts) | Clean floating presentation with pulsing shadow, 5 viewing angle thumbnails, and orange confirmation CTA. | • Support 3D drag perspective directly on the PDP canvas.<br>• Add lace color swap customization. |
| **10. Archival Search**<br>`/search` | **Partially Designed** | **Static** | **Mixed** | Basic input field with instant filtering. No autocomplete pill suggestions, no trending searches, and no empty-state curated recommendations. | • Add animated search pills ("Heavyweight Fleece", "Selvedge Denim", "Luka 5").<br>• Implement instant visual thumbnail suggestions in a floating dropdown. |
| **11. Cart (Shopping Bag)**<br>`/cart` & Drawer | **Fully Designed** | **Moderate** (Slide-over drawer animation) | **High** (Cart item thumbnails) | Functional slide-over drawer and standalone cart page with \$200 free shipping meter, quantity steppers, and subtotal calculation. | • Add cross-sell carousel inside the cart drawer ("Complete the Look with Archival Socks").<br>• Add gift wrapping and atelier note options. |
| **12. Express Checkout**<br>`/checkout` | **Fully Designed** | **Static** | **N/A** (Form inputs & summary) | Multi-step form with customer contact, shipping address, order summary, server-side price validation, and multi-gateway payment selector (COD, Bank Transfer, JazzCash, EasyPaisa, Kuickpay). | • Add smooth step-to-step progress animation with layout morphing.<br>• Add postal code address auto-lookup. |
| **13. About (Atelier Manifesto)**<br>`/about` | **Partially Designed** | **Static** (`hasMotionElements: false`) | **Mixed** (Unsplash workshop images) | High-quality editorial copy covering Portuguese fleece and Japanese denim mills, but the layout is entirely static. No scroll parallax, no animated quote reveals, and no interactive mill map. | • Convert to luxury editorial storytelling with scroll-driven typography reveals.<br>• Add interactive atelier material explorer (Portuguese Cotton, Okayama Denim, Tuscan Leather). |
| **14. Contact (Concierge)**<br>`/contact` | **Partially Designed** | **Static** | **N/A** | Clean 2-column contact form and concierge telephone/email details. Lacks interactive FAQ accordion or live concierge chat trigger. | • Add interactive inquiry selector with dynamic form fields.<br>• Add flagship showroom address with interactive map coordinate preview. |
| **15. Frequently Asked Questions**<br>`/faq` | **Partially Designed** | **Static** | **N/A** | Clean card-based FAQ list. Questions are displayed in open blocks rather than space-saving animated accordions. | • Implement Framer Motion animated accordion dropdowns with smooth height expansion.<br>• Add category tabs (Sizing, Orders, Shipping, Care). |
| **16. Shipping & Returns**<br>`/shipping-returns` | **Partially Designed** | **Static** | **N/A** | Minimal 2-column informative layout with DHL/FedEx logistics details and 30-day return policy. | • Add interactive global shipping rate calculator.<br>• Add return label generator simulation. |
| **17. Privacy & Terms**<br>`/privacy-policy` & `/terms` | **Partially Designed** | **Static** | **N/A** | Legally structured markdown prose for GDPR, CCPA, and commercial terms. | • Add sticky table of contents navigation on left sidebar with smooth anchor scrolling. |
| **18. Customer Account Portal**<br>`/account` | **Fully Designed** | **Moderate** (Tab switching) | **Mixed** (Wishlist thumbnails) | Authentication state toggle (Sign In / Register / Forgot Password), profile editor, saved shipping addresses, and live wishlist with instant Add to Bag. | • Add order tracking progress bar directly on dashboard.<br>• Add membership tier reward progress meter. |
| **19. Order History**<br>`/account/orders` | **Fully Designed** | **Static** | **Mixed** (Item thumbnails) | Displays past customer orders with status badges (Confirmed, In Transit, Delivered) and item breakdowns. | • Add animated step-by-step dispatch tracking timeline.<br>• Add one-click invoice download (PDF generation). |
| **20. Atelier Admin Portal**<br>`/admin` | **Fully Designed** | **Static** | **N/A** (Dashboard tables & charts) | Passcode-protected (`1994`) administrative control center with KPI analytics, product CRUD simulation, warehouse stock counter, and order fulfillment pipeline. | • Add live revenue sparkline charts.<br>• Add image asset upload dropzone preview. |

---

## 3. Updated Project Folder Architecture

The codebase has been refactored into modular, purpose-driven directories. Shared components, animation primitives, UI atoms, services, hooks, and design tokens have been isolated while retaining 100% backward compatibility via barrel re-exports:

```
src/
├── app/                                 # All Next.js App Router routes & server actions
│   ├── layout.tsx                       # Root layout with font definitions & hydration guards
│   ├── page.tsx                         # Flagship homepage
│   ├── shop/page.tsx                    # Full catalog with filtering & sorting
│   ├── collections/[slug]/page.tsx      # Curated drop landing pages
│   ├── products/[slug]/page.tsx         # Dynamic product detail pages
│   ├── cart/page.tsx                    # Standalone shopping bag
│   ├── checkout/page.tsx                # Multi-gateway commercial checkout
│   ├── search/page.tsx                  # Search results
│   ├── account/page.tsx                 # Patron authentication & profile portal
│   ├── account/orders/page.tsx          # Order fulfillment history
│   ├── about/page.tsx                   # Atelier manifesto & mill provenance
│   ├── contact/page.tsx                 # Client concierge advisory
│   ├── faq/page.tsx                     # Customer FAQ
│   ├── shipping-returns/page.tsx        # Global logistics policy
│   ├── privacy-policy/page.tsx          # Data privacy documentation
│   ├── terms/page.tsx                   # Commercial terms
│   ├── admin/page.tsx                   # Atelier administration dashboard
│   └── api/orders/route.ts              # Server-side order validation endpoint
│
├── components/                          # Modular React components
│   ├── layout/                          # Global structural components
│   │   ├── Header.tsx                   # Main navigation header with cart bag counter
│   │   ├── Footer.tsx                   # Obsidian footer with newsletter & directory
│   │   └── AnnouncementBar.tsx          # Promotional ticker
│   │
│   ├── navigation/                      # Navigation wrappers & mobile drawer [NEW]
│   │   └── index.ts                     # Barrel exports for navigation interfaces
│   │
│   ├── storefront/                      # Landing page showcase sections [NEW]
│   │   ├── index.ts                     # Barrel exports for all storefront experiences
│   │   ├── TryTheLookHero.tsx           # Interactive runway carousel with bundle calculator
│   │   ├── ClothingRailSection.tsx      # Suspended clothing rail on tension wire
│   │   ├── FeaturedSneakerSection.tsx   # Luka 5 showroom & purchase state machine
│   │   ├── SneakerPerspectiveSection.tsx# 3D parabolic perspective footwear orbit
│   │   ├── CategoryGrid.tsx             # Department routing grid
│   │   ├── CuratedDrops.tsx             # Seasonal essentials showcase
│   │   ├── BrandEditorial.tsx           # Atelier manifesto highlight
│   │   ├── CommunityGrid.tsx            # Curated patron styling gallery
│   │   └── GarmentQuickViewModal.tsx    # Suspended apparel quick-view modal
│   │
│   ├── products/                        # Product-specific components [NEW]
│   │   ├── index.ts                     # Barrel exports for product interfaces
│   │   └── ProductDetailClient.tsx      # Editorial product detail view with zoom lens
│   │
│   ├── collections/                     # Collection & drop components [NEW]
│   │
│   ├── cart/                            # Shopping bag interfaces
│   │   └── CartDrawer.tsx               # Slide-over bag drawer with free shipping progress
│   │
│   ├── search/                          # Search overlays & inputs
│   │   └── SearchModal.tsx              # Quick search modal
│   │
│   ├── animations/                      # Reusable Framer Motion primitives [NEW]
│   │   ├── FadeIn.tsx                   # Directional fade-in with viewport triggers
│   │   ├── StaggerContainer.tsx         # Staggered entrance animation for grids & lists
│   │   └── MagneticButton.tsx           # Luxury magnetic cursor attraction for CTAs
│   │
│   └── ui/                              # Atomic design tokens & controls [NEW]
│       ├── Button.tsx                   # Luxury button with primary, secondary, outline & accent
│       └── Badge.tsx                    # Minimalist monospaced editorial badges
│
├── hooks/                               # Custom React hooks [NEW]
│   ├── useMounted.ts                    # Hydration-safe client mount detection
│   └── useMediaQuery.ts                 # Responsive viewport breakpoint detection
│
├── services/                            # Business logic & API services [NEW]
│   ├── productService.ts                # Catalog querying, filtering & stock checks
│   └── orderService.ts                  # Order submission & server validation
│
├── styles/                              # Centralized design system tokens [NEW]
│   └── tokens.ts                        # Master color palette, typography & motion easings
│
├── data/                                # Master dataset records
│   ├── products.ts                      # Full catalog product records & variants
│   ├── outfits.ts                       # Runway look configurations & hotspot pins
│   ├── garments.ts                      # Suspended rail apparel records
│   ├── sneakers.ts                      # Footwear models & multi-angle galleries
│   └── collections.ts                   # Seasonal drop metadata
│
├── lib/                                 # Utilities & third-party connectors
│   ├── supabase.ts                      # Supabase client & connection status
│   └── payments/                        # Multi-gateway payment providers
│
├── store/                               # Global state management
│   └── useCartStore.ts                  # Zustand persistent cart & wishlist store
│
└── types/                               # TypeScript interfaces & types
    └── index.ts                         # Complete domain entity definitions
```

### Public Image Asset Hierarchy (`public/images/`)
All image assets have been organized into categorized subdirectories to eliminate root clutter and facilitate transparent studio asset migration:

```
public/
├── images/
│   ├── models/                          # Runway full-body model cutouts (model-01 through 06)
│   ├── products/
│   │   ├── hoodies/                     # Transparent studio hoodie packshots (grey, cream, black, green)
│   │   ├── shirts/                      # Boxy tees & twill overshirts
│   │   ├── jackets/                     # Bomber jackets, chore jackets, crewnecks & knitwear
│   │   ├── sneakers/                    # Transparent footwear angles (Luka 5, Court Zero, Retro Runner)
│   │   └── accessories/                 # Tuscan leather bags, cardholders, headwear & belts
│   ├── collections/                     # Drop campaign banners & hero photography
│   ├── campaigns/                       # Atelier story & mill photography
│   ├── banners/                         # Seasonal announcement assets
│   ├── lifestyle/                       # Patron community lookbook photos
│   └── icons/                           # Architectural SVG brand icons
│
├── garments/                            # Preserved legacy garment paths (zero breaking changes)
├── models/                              # Preserved legacy model paths
└── sneakers/                            # Preserved legacy sneaker paths
```

---

## 4. Missing & Low-Fidelity Image Assets Catalog

To achieve the immaculate editorial consistency of the reference video across the entire website, the following assets must be replaced or added in Phase 2:

### A. Missing Apparel & Product Packshots
1. **Women's Studio Collection (5 Missing):**
   - `wool-coat-charcoal.png` (Minimal double-breasted oversized wool coat)
   - `silk-longsleeve-bone.png` (Raw silk draped longsleeve top)
   - `trouser-wide-camel.png` (Pleated relaxed tailoring trousers)
   - `cashmere-crewneck-ivory.png` (Featherweight brushed cashmere knit)
   - `skirt-pleated-black.png` (Architectural midi skirt)
2. **Men's Workwear Expansion (3 Missing):**
   - `chore-jacket-duck-canvas.png` (14oz Japanese canvas chore jacket)
   - `thermal-waffle-sand.png` (Heavyweight thermal waffle long sleeve)
   - `carpenter-pant-washed-black.png` (Double-knee selvedge carpenter denim)
3. **Footwear Catalog Integration (4 Unlinked in Shop):**
   - `luka5-chalk-cream.png` (Currently in `public/sneakers/` but omitted from `products.ts`)
   - `luka5-vintage-olive.png` (Omitted from `products.ts`)
   - `luka5-triple-black.png` (Omitted from `products.ts`)
   - `luka5-court-sky-indigo.png` (Omitted from `products.ts`)
4. **Leather Accessories (3 Missing Studio Renders):**
   - `duffle-bag-black-leather.png` (Currently uses noisy Unsplash photo)
   - `cardholder-bordeaux.png` (Currently uses Unsplash photo)
   - `atelier-cap-olive.png` (Heavyweight twill 6-panel cap)

### B. Repeated Unsplash Images to Replace
1. **Unsplash ID `photo-1507003211169-0a1dd7228f2d`:** Currently reused across `CategoryGrid` (Men's Atelier) and `CommunityGrid` (Elena Noir). Requires distinct editorial photography.
2. **Unsplash ID `photo-1552346154-21d32810aba3`:** Currently reused across `CategoryGrid` (Archival Sneakers) and `CommunityGrid` (Kenzo Style).
3. **Unsplash ID `photo-1515886657613-9f3515b0c78f`:** Currently reused across `CategoryGrid` (Women's Studio) and `CommunityGrid` (Marcus V).
4. **Unsplash ID `photo-1509967419530-da38b4704bc6`:** Reused across `BrandEditorial` and `/about` hero banner.

---

## 5. Pages Requiring Design & Animation Modernization

### Category 1: Comprehensive Redesign Required (3 Pages)
1. **Women's Studio (`/shop?category=women`):** Requires complete layout redesign with an editorial collection header, 6+ foundational garments, and lifestyle campaign imagery.
2. **About / Atelier Story (`/about`):** Transform from a static text block into a scroll-driven multimedia editorial experience featuring Portuguese & Japanese mill deep-dives, interactive fabric spec cards, and animated quotes.
3. **Curated Drops (`/collections/[slug]`):** Redesign from a plain product grid into an exclusive drop presentation with release timer badges, collection lookbook sliders, and bundle buy features.

### Category 2: Animation & Motion Modernization Required (7 Pages)
1. **Shop All (`/shop`):** Implement `StaggerContainer` entry animation, card hover zoom, secondary packshot flip on hover, and Quick-Buy drawer dispatch directly from cards.
2. **Men's Atelier (`/shop?category=men`):** Integrate entrance motion curves and category filter pill morphing.
3. **Homepage Bottom Sections (`CategoryGrid`, `CuratedDrops`, `BrandEditorial`, `CommunityGrid`):** Upgrade from static server blocks to scroll-triggered Framer Motion containers with subtle parallax on imagery.
4. **FAQ (`/faq`):** Replace static question blocks with smooth height-expanding Framer Motion accordion components.
5. **Customer Account & Wishlist (`/account`):** Add tab-switch layout animations and animated heart-to-drawer wishlist dispatches.
6. **Checkout (`/checkout`):** Add step-to-step accordion morphing and payment method selection radio transitions.
7. **Search (`/search`):** Add animated search pills and visual result drop-in transitions.

---

## 6. Implementation Plan for Phase 2 Onwards

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  AFAQ SUPPLY STOREFRONT UPGRADE ROADMAP                                                                 │
│                                                                                                         │
│  [PHASE 1: AUDIT & ORG] ──► [PHASE 2: ASSETS & DATA] ──► [PHASE 3: SHOPPING UX] ──► [PHASE 4: PAGES]    │
│         │                             │                           │                          │          │
│         ▼                             ▼                           ▼                          ▼          │
│  • 21-Route Inspection         • Studio Packshots          • Animated Product Cards   • About Manifesto │
│  • Folder Restructuring        • Expand PRODUCTS_DATA      • Quick-Buy on Grid Hover  • Women's Studio  │
│  • STOREFRONT_AUDIT.md         • Eliminate Unsplash Dups   • Staggered Entrances      • Smooth FAQ Accord│
│  [COMPLETED]                   [NEXT]                      [UPCOMING]                 [FINAL]           │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Phase 2: High-Fidelity Asset Generation & Catalog Expansion
- Generate and isolate high-resolution transparent studio packshots for missing women's, men's, and accessories items.
- Expand `src/data/products.ts` from 9 products to 24+ fully fleshed-out products across all four departments.
- Populate `public/images/products/` with uniform white/transparent packshots on the `#F8F7F4` background.
- Replace repeated Unsplash photos with unique editorial photography.

### Phase 3: Luxury Product Card & Catalog Animation Upgrade
- Build `ProductCard.tsx` incorporating:
  - Staggered entrance physics (`StaggerContainer`).
  - Image crossfade on hover (Front packshot -> Back packshot or styling angle).
  - Quick-Buy overlay with instant size selection pills (`S`, `M`, `L`, `XL` / `40`–`46`).
  - One-tap Add to Bag drawer trigger without navigating away from the grid.
- Deploy modern filter drawer with animated pill transitions across `/shop`.

### Phase 4: Editorial Storytelling & Secondary Page Redesign
- Redesign `/about` into a luxury scrollytelling experience.
- Redesign `/faq` with animated Framer Motion accordions.
- Modernize `/contact`, `/shipping-returns`, and `/collections/[slug]`.
- Verify full site responsiveness and run end-to-end browser regression tests.

---

## 7. Sign-Off & Verification

- [x] Complete 21-route inspection conducted and documented.
- [x] Full folder architecture reorganized into `src/components/{storefront, products, animations, ui, navigation}`, `src/hooks`, `src/services`, `src/styles`, and `public/images/`.
- [x] Zero breaking changes introduced; all existing routes and e-commerce functionalities preserved.
- [x] Strict TypeScript check passed (`npx tsc --noEmit` exit code 0).
- [x] ESLint check passed (`npm run lint` — *✔ No ESLint warnings or errors*).
- [x] Production build confirmed (`npm run build` exit code 0).

**Audit Status:** **PHASE 1 AUDIT & ORGANIZATION COMPLETED & APPROVED**  
**Signed:** *Antigravity AI Team*
