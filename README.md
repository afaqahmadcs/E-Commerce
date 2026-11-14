<div align="center">

# AFAQ SUPPLY
### *THE ART OF EVERYDAY STYLE.*

<p align="center">
  <strong>A World-Class Editorial Luxury Fashion & Streetwear E-Commerce Platform</strong>
</p>

[![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-C66B39?style=for-the-badge)](LICENSE)

<br />

<p align="center">
  <a href="#-signature-experiences-from-reference">Signature Experiences</a> •
  <a href="#-full-site-architecture-18-routes">All 18 Routes</a> •
  <a href="#-design-system--typography">Design System</a> •
  <a href="#-database-architecture">Database Schema</a> •
  <a href="#-getting-started">Quick Start</a> •
  <a href="#-project-structure">Architecture</a> •
  <a href="#-author">Author</a>
</p>

---

</div>

## ✦ Overview

**AFAQ SUPPLY** is a luxury digital flagship and streetwear e-commerce platform built to recreate the visual language, editorial typography, spatial physics, and fluid product presentation of premier international fashion houses.

Inspired directly by high-end runway interactive experiences, every micro-interaction—from model isolation zooms to suspended clothing rail physics and 3D perspective footwear trajectories—was engineered with commercial-grade scalability and sub-second performance.

```
┌────────────────────────────────────────────────────────────────────────┐
│  AFAQ SUPPLY ATELIER                                                   │
│  "THE ART OF EVERYDAY STYLE"                                           │
│                                                                        │
│  [TRY THE LOOK] ────► [CLOTHING RAIL] ────► [3D SNEAKER WAVE]         │
│         │                    │                      │                  │
│         ▼                    ▼                      ▼                  │
│  Outfit Bundle        Hanger Quick-View      Featured Sneaker Matrix   │
│  (Save 10% Bundle)    (Front/Back Angles)    (State-driven Add to Bag) │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ✦ Signature Experiences (Recreating Reference Video)

AFAQ SUPPLY translates the visual grammar of the reference recording into functional React & Next.js architectures:

### 1. `Try the Look.` — Multi-Model Interactive Runway (00.0s – 05.5s)
* **Horizontal Model Lineup:** Six complete outfits styled head-to-toe on an expansive warm ivory runway.
* **Tactile Hotspots:** Pulsing interactive pins placed over specific pieces (knitwear, wide denim, sneakers) that reveal item specs on hover.
* **Model Isolation Zoom:** Clicking any model isolates them with smooth camera zoom and depth-of-field focus.
* **"In This Look" Slide-Out Drawer:** Displays all worn items with individual prices, real-time 10% bundle discount calculation (*"Complete the look: Save 10%"*), and a single-click `Add full look to bag →` CTA.
* **Timeline Scrubber:** Integrated pagination track (`← 01 02 03 04 Studio Day 05 06 →`).

### 2. Suspended Horizontal Clothing Rail (05.5s – 08.0s)
* **Tension Cable Physics:** 14 garments (550 GSM hoodies, chore jackets, tailored trousers, overshirts) suspended along a minimal steel wire.
* **Dangling Hanger Price Tags:** Every wooden hanger features an authentic hanging price tag ticket.
* **Active Garment Tracker:** Real-time bottom-left metadata (`Hoodie / $199.00`).
* **Editorial Microcopy:** Bottom-right manifesto: *"Crafted in heavyweight fleece. Cut oversized. Made to last."* with `Shop the Collection →`.
* **Quick-View Modal:** Clicking any piece triggers an isolated hanging quick-view modal with Front/Back angle toggles, size pills (`S`, `M`, `L`, `XL`), and instant add-to-cart feedback.

### 3. 3D Perspective Footwear Gallery (11.5s – 13.5s)
* **Ascending 3D Trajectory:** Floating footwear arranged along a diagonal spatial perspective curve.
* **Interactive Perspective Scrubber:** Drag/slide control with dynamic depth-sorting and opacity attenuation.
* **Shoe Size Matrix:** Direct access to European sizes `40` through `46`.
* **Watermark Branding:** Bold anchored `OBSESSED` typography.

### 4. Featured Sneaker Shopping Interface (13.5s – 16.5s)
* **Floating Hero Sneaker:** High-res floating sneaker with soft breathing contact shadow.
* **Colorway Carousel:** Outlined thumbnail cards switching colorways with smooth crossfade.
* **State-Driven Add-to-Bag Button:**
  1. *Disabled State:* Greyed-out `"Select a size"` until an EU shoe size is chosen.
  2. *Active State:* Solid black `"Add to bag"`.
  3. *Purchase State:* Transitions to signature restrained burnt orange (`#C66B39`) with `"Added to bag"` and reveals `"View bag →"`.

---

## ✦ Full Site Architecture (All 18 Routes Pre-Rendered)

Every single route is built with responsive mobile & desktop UX, accessible semantic HTML, and zero placeholder links:

```
├── / ......................... Flagship Homepage (Runway, Rail, Sneaker Matrix, Drops)
├── /shop ..................... Complete Catalog with Category & Size Filters
├── /collections/[slug] ....... Curated Drops (New Arrivals, Streetwear, Footwear, Knitwear)
├── /products/[slug] .......... Product Detail (Gallery, Zoom, Variants, Size Guide, Tabs)
├── /search ................... Real-Time Search across Silhouettes & Materials
├── /cart ..................... Shopping Bag with Free Shipping Meter ($200 Threshold)
├── /checkout ................. Multi-Step Checkout (Address, COD, Wire, Gateway Validation)
├── /account .................. Client Portal (Profile, Saved Addresses, Wishlist)
├── /account/orders ........... Order History Pipeline (Confirmed → Shipped → Delivered)
├── /about .................... Brand Manifesto, Portuguese Fleece & Japanese Denim Mills
├── /contact .................. Client Concierge & Flagship SoHo Showroom Inquiries
├── /faq ...................... Sizing, Care, Global Shipping & Returns FAQ
├── /shipping-returns ......... Global Logistics & 30-Day Effortless Return Guidelines
├── /privacy-policy ........... GDPR & CCPA Data Autonomy Policy
├── /terms .................... Commercial Terms & Intellectual Property
├── /admin .................... Protected Store Administration Dashboard
│   ├── Overview .............. Revenue, Orders, Patrons & Silhouette Analytics
│   ├── Products .............. Full Product CRUD, Variants & Live Inventory
│   ├── Orders ................ Order Fulfillment Lifecycle & Status Updater
│   ├── Collections ........... Manage Drops & Product Associations
│   ├── Promotions ............ Live Global Announcement Bar Editor
│   └── Settings .............. Brand Identity, Shipping Fees & Currency
├── /sitemap.xml .............. Dynamic SEO Search Engine Index
└── /robots.txt ............... Automated Crawler Directives
```

---

## ✦ Design System & Color Tokens

AFAQ SUPPLY adheres strictly to an understated international luxury aesthetic:

| Token | Hex Code | Visual Application |
|---|---|---|
| **Base Background** | `#F8F7F4` | Warm ivory canvas creating an airy art-gallery feel |
| **Primary Text** | `#151515` | High-contrast charcoal/off-black for headlines & buttons |
| **Secondary Text** | `#777777` | Neutral stone grey for specifications & metadata |
| **Borders** | `#E8E6E1` | Fine hairline dividers maintaining structure |
| **Card Surface** | `#F0EFEB` | Warm tinted card background |
| **Accent Color** | `#C66B39` | **Restrained Burnt Orange** reserved for purchase feedback |
| **Dark Obsidian** | `#171717` | Editorial campaign sections & luxury footer |

### Typography Hierarchy
* **Headlines:** `Playfair Display` (Classic editorial high-fashion serif)
* **Interface & Body:** `Inter` / `Geist` (Modern, readable Swiss sans-serif)
* **Specs & Numbers:** `Geist Mono` (Monospaced uppercase tracking for sizes, SKUs, and prices)

---

## ✦ Database Architecture (Supabase PostgreSQL)

Located in [`supabase/schema.sql`](supabase/schema.sql), the database consists of 19 normalized tables:

```sql
profiles                  ──► Extends auth.users with roles & contact
addresses                 ──► Customer multi-address book
categories & collections  ──► Hierarchical collection taxonomy
products                  ──► Core catalog with pricing & statuses
product_variants          ──► Normalized SKUs, colors, sizes, stock
product_images            ──► Multi-angle photography gallery
orders & order_items      ──► Transaction ledger with snapshots
inventory_logs            ──► Audited stock movements
discount_codes            ──► Percentage & fixed promotion engine
store_settings            ──► Dynamic config (Announcement bar, thresholds)
```

* **Security:** Row Level Security (RLS) policies enforce customer data isolation while granting full administration capabilities to staff roles.
* **Resilience:** If Supabase credentials are not provided during development, the application automatically uses an offline-resilient local state without crashing.

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

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Supabase credentials (optional for local offline browsing):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) to view the admin management dashboard.

### 5. Production Build
```bash
npm run build
npm start
```

---

## ✦ Project Structure

```
├── public/                     # Static assets and icons
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── about/              # Brand story
│   │   ├── account/            # Customer profile & orders
│   │   ├── admin/              # Staff management dashboard
│   │   ├── cart/               # Full shopping bag page
│   │   ├── checkout/           # Multi-step checkout flow
│   │   ├── collections/        # Dynamic collection routes
│   │   ├── contact/            # Client concierge
│   │   ├── faq/                # FAQ accordion
│   │   ├── products/           # Product detail page
│   │   ├── search/             # Catalog search
│   │   ├── shipping-returns/   # Logistics & return policies
│   │   ├── shop/               # Catalog with filters
│   │   ├── layout.tsx          # Root layout with Header & Footer
│   │   ├── page.tsx            # Signature Flagship Homepage
│   │   ├── robots.ts           # SEO Crawler rules
│   │   └── sitemap.ts          # Automated sitemap
│   ├── components/
│   │   ├── cart/               # Cart drawer with spring animations
│   │   ├── home/               # TryTheLook, ClothingRail, Sneakers, etc.
│   │   ├── layout/             # Header, Footer, AnnouncementBar
│   │   ├── product/            # ProductDetailClient, SizeGuide
│   │   └── search/             # Instant search overlay
│   ├── data/                   # Outfits, Garments, Sneakers & Products
│   ├── lib/                    # Supabase client & utilities
│   ├── store/                  # Persistent Zustand cart & wishlist store
│   └── types/                  # TypeScript interface definitions
├── supabase/
│   └── schema.sql              # Normalized PostgreSQL schema + RLS
└── tailwind.config.ts          # Luxury design tokens & typography
```

---

## ✦ Author

**Afaq Ahmad**  
- **GitHub:** [@afaqahmadcs](https://github.com/afaqahmadcs)  
- **Project Repository:** [https://github.com/afaqahmadcs/E-Commerce](https://github.com/afaqahmadcs/E-Commerce)

---

<div align="center">
  <sub>Designed & Developed with architectural precision. © 2026 AFAQ SUPPLY CO. All rights reserved.</sub>
</div>
