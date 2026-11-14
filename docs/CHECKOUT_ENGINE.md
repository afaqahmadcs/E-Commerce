# AFAQ SUPPLY — Cart & Checkout Architecture

## 1. Overview
The **Cart & Checkout Engine** powers the commercial transaction lifecycle of AFAQ SUPPLY, ensuring persistent storage, stock bounds validation, multi-currency compatibility, and celebration micro-interactions.

---

## 2. Technical Components
- **Zustand Persistent Store (`src/store/useCartStore.ts`):** Automatically persists cart items and customer wishlist IDs to localStorage with cross-tab synchronization.
- **Cart Drawer (`CartDrawer.tsx`):** Slide-in drawer with spring physics, free shipping progress bar ($200 threshold), item quantity controls, and one-click checkout link.
- **Full Cart Page (`/cart`):** Detailed breakdown of silhouettes, sizes, quantities, and order totals.
- **Multi-Step Checkout (`/checkout`):**
  - Customer contact and full shipping address validation.
  - Payment method selector:
    1. Cash on Delivery (COD)
    2. Direct Bank Wire / IBAN Remittance
    3. 256-bit Tokenized Card & Regional Gateway (JazzCash / Easypaisa ready)
  - Duplicate order prevention and unique order number generation (`AFQ-2026-XXXXXX`).
  - Confetti celebration micro-interaction upon verified dispatch placement.
