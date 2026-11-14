# AFAQ SUPPLY — THE ART OF EVERYDAY STYLE

A luxury, commercial-grade fashion e-commerce platform inspired by the visual language, page composition, product presentation, and fluid interaction physics of high-end international fashion retailers.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **Supabase PostgreSQL**.

---

## 1. Key Architectural Features & Reference Video Implementation

### 1.1 "Try the Look" Multi-Model Runway (00.0s – 05.5s)
- **Interactive Runway:** 6 fashion models arranged horizontally across a neutral warm ivory stage (`#F8F7F4`).
- **Interactive Hotspots:** Pulsing tactile pins over individual outfit pieces (crewnecks, vintage wash denim, archival sneakers).
- **Model Isolation Zoom:** Clicking any model isolates them with smooth zoom and focal clarity.
- **"In This Look" Slide-out Drawer:** Displays worn components with individual prices, bundle discount calculations (*"Save 10% when buying full outfit"*), and single-click `Add full look to bag →` execution.
- **Interactive Timeline Scrubber:** Horizontal navigation track (`01` through `06`).

### 1.2 Suspended Horizontal Clothing Rail Collection Strip (05.5s – 08.0s)
- **Tension Rail Physics:** Garments (heavyweight hoodies, boxy tees, chore jackets, tailored trousers) suspended along a steel cable.
- **Hanger Price Tags:** Every wooden hanger features an authentic dangling price ticket.
- **Active Garment Tracker:** Real-time bottom-left name & price display (`Hoodie / $199.00`).
- **Editorial Brand Statement:** Bottom-right typography (*"Crafted in heavyweight fleece. Cut oversized. Made to last."* with `Shop the Collection →`).
- **Quick-View Modal:** Clicking any piece triggers an isolated hanging quick-view modal with Front/Back angle toggles, size selection pills, and instant add-to-bag feedback.

### 1.3 3D Perspective Footwear Gallery (11.5s – 13.5s)
- **Diagonal Spatial Trajectory:** Floating footwear positioned along an ascending 3D perspective path.
- **Perspective Slider:** Center-bottom scrub track with draggable indicators.
- **European Shoe Size Matrix:** Integrated EU sizes `40` through `46`.

### 1.4 Featured Sneaker Detail & Shopping Interface (13.5s – 16.5s)
- **Large Floating Hero Sneaker:** High-resolution floating sneaker with realistic contact drop shadow.
- **Colorway Thumbnail Carousel:** Horizontally aligned colorway cards with active outline pill styling.
- **State-Driven Add-to-Bag Button:**
  - Disabled state: Greyed out *"Select a size"* until an EU size is picked.
  - Active state: Black button *"Add to bag"*.
  - Purchase state: Transitions into signature restrained burnt orange (`#C66B39`) with *"Added to bag"* and reveals *"View bag →"*.

---

## 2. Complete Website Structure (All 16 Routes Operational)

1. `/` — Homepage (Try The Look, Clothing Rail, Featured Sneaker, 3D Wave, Category Grid, Curated Drops, Editorial Manifesto, Community Grid)
2. `/shop` — Complete catalog with live category tabs, price range filters, size filters, and sorting
3. `/collections/[slug]` — Dynamic collections (`new-arrivals`, `streetwear-essentials`, `curated-footwear`, `luxury-knitwear`, `tailored-street`)
4. `/products/[slug]` — Product detail page with multi-angle gallery, color/size selection, live inventory, size guide modal, materials & care accordion, and related products
5. `/search` — Full-text search across silhouettes, fabrics, and categories with instant suggestion pills
6. `/cart` — Shopping bag page with line item removal, quantity increment, and free shipping calculation
7. `/checkout` — Production-grade multi-step checkout with address validation, payment selector (Cash on Delivery, Bank Remittance, Online Card/Gateway), and order generation
8. `/account` — Customer account portal, profile overview, saved addresses, and saved wishlist pieces
9. `/account/orders` — Order history tracking pipeline with order status badges (`Confirmed`, `Processing`, `Shipped`, `Delivered`)
10. `/about` — Brand story, atelier philosophy, Portuguese fleece milling, and Japanese denim provenance
11. `/contact` — Client concierge support with direct advisory channels and inquiry dispatch form
12. `/faq` — Comprehensive luxury fashion FAQ covering sizing, shipping, care, and returns
13. `/shipping-returns` — Global express logistics, customs duties transparency, and 30-day return policy
14. `/privacy-policy` — GDPR and CCPA-compliant privacy policy
15. `/terms` — Commercial terms and conditions
16. `/admin` — Protected administration dashboard:
    - **Overview:** Total Revenue, Orders count, Active Patrons, Silhouettes count, Recent dispatches
    - **Products:** Complete CRUD, image URL management, category assignment, pricing, and live inventory
    - **Orders:** Order list, customer details, payment method, and live status lifecycle updates
    - **Collections:** Manage drops, associate products, and inspect live previews
    - **Promotions:** Live announcement bar editor, discount codes, and free shipping threshold config
    - **Settings:** Store identity, currency, contact email, and gateway parameters

---

## 3. Technology Stack & Design System

### 3.1 Design Tokens
- **Background:** `#F8F7F4` (Warm Ivory / Off-White)
- **Primary Text:** `#151515` (Deep Charcoal Black)
- **Secondary Text:** `#777777` (Muted Warm Grey)
- **Borders & Dividers:** `#E8E6E1` (Hairline Warm Border)
- **Card Background:** `#F0EFEB` (Warm Tinted Surface)
- **Accent Color:** `#C66B39` (Restrained Burnt Orange for pivotal checkout/added interactions)
- **Dark Sections:** `#171717` (Rich Obsidian Black)

### 3.2 Typography
- **Headings:** `Playfair Display` (Editorial Serif)
- **Body & Controls:** `Inter` (Clean Modern Sans-Serif)
- **Specs & Microcopy:** `Geist Mono` / Monospace uppercase tracking

---

## 4. Supabase PostgreSQL Database Setup

The database schema is fully normalized and located in `supabase/schema.sql`.

### 4.1 Schema Tables
1. `profiles` — Extends `auth.users` with customer details, role (`customer`, `admin`), and phone.
2. `addresses` — Multi-address support with default shipping selection.
3. `categories` & `collections` — Normalized hierarchical taxonomy.
4. `products` — Core catalog table with prices, status, tags, and category FK.
5. `product_variants` — Normalized SKUs, colors, sizes, and variant-specific inventory quantities.
6. `product_images` — Multi-angle product imagery gallery.
7. `orders` & `order_items` — Audited order records with customer snapshots and payment references.
8. `inventory_logs` — Stock adjustment ledger.
9. `discount_codes` — Promotional codes and percentage/fixed discounts.
10. `store_settings` — Key-value JSON store for configurable announcement bar and shipping thresholds.

### 4.2 Applying the Migration
1. Log in to your [Supabase Dashboard](https://supabase.com).
2. Open the **SQL Editor** tab.
3. Paste the contents of `supabase/schema.sql` and run the script.
4. Copy your project URL and `anon` key into `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

*Note: The application includes intelligent fallback resilience. If Supabase credentials are not provided, all catalog, cart, and order functionalities seamlessly run offline in local state without crashing.*

---

## 5. Getting Started & Development

### 5.1 Installation
```bash
npm install
```

### 5.2 Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5.3 Production Build & Start
```bash
npm run build
npm start
```
