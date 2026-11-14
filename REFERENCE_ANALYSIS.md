# AFAQ SUPPLY — Reference Video Analysis & Architectural Blueprint

## 1. Executive Summary & Context

This document captures the visual, interactive, and structural analysis of `reference-video/reference-video.mp4` (Duration: 16.57 seconds, 30 FPS, 497 total frames).

The reference video documents a cutting-edge fashion e-commerce interface recorded on a desktop monitor. Our objective is to reproduce the **actual digital interface**—filtering out the monitor bezel, desk hardware, and physical environment—and elevate it into a luxury, commercial-grade fashion e-commerce platform for **AFAQ SUPPLY** ("THE ART OF EVERYDAY STYLE.").

---

## 2. Visual Structure & Screen Proportions

### 2.1 Color Palette & Atmosphere
- **Base Background:** Warm ivory / off-white (`#F8F7F4`), establishing an airy, editorial gallery atmosphere rather than sterile clinical white.
- **Card & Surface Background:** Subtle warm tint (`#F0EFEB`) with crisp, hairline borders (`#E8E6E1`).
- **Primary Typography & High-Contrast Elements:** Deep charcoal / off-black (`#151515`).
- **Secondary Typography & Metadata:** Neutral muted stone (`#777777`).
- **Signature Accent Color:** Restrained burnt orange (`#C66B39` / `#D45D28`), reserved strictly for pivotal transactional interactions such as successful "Added to bag" states, featured badge highlights, and high-value CTAs.
- **Dark Mode / Editorial Sections:** Charcoal black (`#171717`) for select campaign dividers and footer.

### 2.2 Typography & Editorial Hierarchy
- **Primary Editorial Serifs:** Playfair Display for headline moments ("Try the Look.", "NEW COLLECTION", editorial campaign headers).
- **Modern Sans-Serif System:** Inter / Geist for interface labels, navigation, specs, sizing grids, and pricing.
- **Microcopy & Trackers:** Monospace and uppercase tracked styling (`01 / 07`, `LOOK 04`, `SHOE SIZE`, `40 | 41 | 42`).

---

## 3. Reference Timeline & Key Moments

### 3.1 Around 0.0s – 5.5s: "Try the Look" — Multi-Model Outfit Exploration
- **Visual Composition:** 
  - Left header: Large editorial text `Try the Look.` with explanatory subhead: *"Six looks, styled head to toe. Tap a pin to see the piece."*
  - Center stage: A horizontal lineup of 5 to 6 fashion models wearing distinct streetwear/luxury outfits, with realistic floor contact shadows.
  - Interactive Hotspots: Translucent circular pill pins hovering over garments on the active model.
  - Active Model Selection: Clicking or scrubbing selects a model (e.g., Look 04 "Studio Day"), smoothly isolating the model with camera zoom and soft depth of field.
  - Right Side Drawer ("In this look"):
    - Displays individual items worn in the outfit (e.g., Graphic Hoodie $130.00, Retro Sneaker $145.00, Relaxed Denim $108.00).
    - Bundle pricing calculation: *"Complete the look: Save 10% when buying full outfit — Total $492.30"*.
    - High-impact button: `Add full look to bag →`.
  - Bottom Progress Bar: Custom pagination scrubber (`←  01  02  03  04 Studio Day  05  06  →`).

### 3.2 Around 5.5s – 8.0s: Horizontal Suspended Clothing Rail Collection Strip
- **Visual Composition:**
  - An ultra-minimalist horizontal tension rail/cable running across the screen.
  - Apparel items (heavyweight hoodies, boxy tees, chore jackets, tailored trousers) hanging from wooden/metal hangers.
  - Each hanger features a subtle vertical price tag ticket suspended below the neck.
  - Smooth horizontal scrolling/dragging with inertial physics and perspective skew.
  - Selected Garment Spotlight: Bottom-left displays active item name and price (`Hoodie / $199.00`).
  - Bottom-right features editorial brand statement: *"Crafted in heavyweight fleece. Cut oversized. Made to last."* with `Shop the Collection →`.
  - Clicking any hanging item triggers an organic zoom transition into the product quick-view modal.

### 3.3 Around 8.0s – 11.5s: Minimal Hanging Hoodie Presentation & Quick-View
- **Visual Composition:**
  - Suspended isolated product presentation against warm off-white canvas.
  - Right-aligned product detail card:
    - Index indicator: `07 / 14`
    - Product title: `Hoodie`
    - Price: `$199.00`
    - View Switcher: `Front` / `Back` toggle smoothly rotating or crossfading the apparel graphic.
    - Size Selector Pills: `S`, `M`, `L`, `XL`.
    - CTA Button: `Add to cart` in black pill. Upon clicking, transitions to `Added to cart` state with confirmation feedback, revealing `View cart →`.
    - Deep links: Direct link to `/products/[slug]` ("View product page") and specification accordion.

### 3.4 Around 11.5s – 13.5s: 3D Perspective Sneaker Wave / Footwear Gallery
- **Visual Composition:**
  - Floating footwear displayed along an ascending 3D spatial diagonal trajectory.
  - Interactive perspective track / slider at the bottom center with draggable progress indicator.
  - Top-left header: Sequence counter `07 / 07`, sneaker model name `LUKA 5`, price `$149.00`, and `View details →`.
  - Bottom-right EU shoe size grid (`40`, `41`, `42`, `43`, `44`, `45`, `46`).
  - Next section visual teaser: Bold typography `OBSESSED` anchoring the bottom edge.

### 3.5 Around 13.5s – 16.5s: Featured Sneaker Detail & Shopping Interface
- **Visual Composition:**
  - Large floating sneaker presentation with realistic soft contact shadow.
  - Below shoe: Horizontal thumbnail carousel of colorways / models with active rounded border indicators.
  - Center pagination: `←  01 / 07  →`.
  - Right-side purchasing matrix:
    - Sneaker Name: Large bold sans-serif header.
    - Price: Clean, legible typography.
    - Size Selector Grid: Interactive size buttons with disabled state ("Select a size") before selection.
    - Size Selection Interaction: Selecting size `40` enables the button.
    - Add to Bag Interaction: Clicking `Add to bag` activates the accent burnt orange state (`#C66B39`), text changes to `Added to bag`, and a subtle `View bag →` prompt appears.

---

## 4. Component Plan & Technical Implementation Decisions

| Component Name | Reference Inspiration | Implementation Tech | Key Features |
|---|---|---|---|
| `TryTheLookHero` | 0.0s – 5.5s multi-model lineup | Framer Motion + React | Horizontal drag, outfit pins, model isolation zoom, "In this look" slide-out sidebar, bundle discount calculation, add full look to bag. |
| `ClothingRailCollection` | 5.5s – 8.0s suspended rail | Framer Motion + Canvas/SVG | Smooth horizontal swipe, hanger tags, real-time active garment tracking, click-to-zoom quick modal. |
| `GarmentQuickViewModal` | 8.0s – 11.5s isolated hoodie | Framer Motion + Portal | Front/Back view toggle, size selection validation, live inventory feedback, add-to-cart state transition. |
| `SneakerPerspectiveShowcase` | 11.5s – 13.5s diagonal wave | Framer Motion 3D transforms | Depth-sorted floating shoes, perspective slider, interactive focus, size selector integration. |
| `FeaturedSneakerDetail` | 13.5s – 16.5s sneaker shopping | Framer Motion + State machine | High-res floating shoe, colorway carousel, size selector validation, burnt orange purchase feedback. |
| `CartDrawer` & `CartPage` | Core luxury requirement | Zustand / Context + LocalStorage | Persistent cart, real-time calculations, free shipping threshold bar, checkout redirect. |
| `ShopFilterSystem` | Full-stack e-commerce | Next.js Server & Client Components | Categories (Men, Women, Sneakers, Accessories), sorting, price range, color/size filters. |
| `AdminDashboard` | Complete business control | Next.js App Router + Supabase RLS | Revenue metrics, order lifecycle management, product/variant CRUD, announcement editor. |

---

## 5. Technology Architecture
- **Framework:** Next.js 15+ (App Router) with TypeScript.
- **Styling:** Tailwind CSS with custom design tokens (`bg-sand`, `accent-terracotta`, `charcoal-dark`, etc.) and Lucide icons.
- **Animations:** Framer Motion for gesture-driven drag, layout animations (`layoutId`), staggered entrances, and micro-interactions.
- **Database & Auth:** Supabase PostgreSQL with fully normalized tables, Row Level Security policies, secure session cookies, and mock/offline fallback resilience.
- **State Management:** Zustand for lightweight, persistent cart, wishlist, and outfit builder states.

