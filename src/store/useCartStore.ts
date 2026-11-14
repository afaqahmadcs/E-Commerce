import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  isSearchOpen: boolean;
  wishlistIds: string[];
  
  // Cart Actions
  addItem: (item: Omit<CartItem, "cartItemId">) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Drawer controls
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  
  // Search modal controls
  openSearch: () => void;
  closeSearch: () => void;
  
  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  
  // Computed helpers
  getCartTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      isSearchOpen: false,
      wishlistIds: [],

      addItem: (item) => {
        const cartItemId = `${item.productId}-${item.color}-${item.size}`;
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((i) => i.cartItemId === cartItemId);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          const newQty = Math.min(
            updated[existingIndex].quantity + item.quantity,
            item.maxStock || 99
          );
          updated[existingIndex].quantity = newQty;
          set({ items: updated, isDrawerOpen: true });
        } else {
          set({
            items: [...currentItems, { ...item, cartItemId }],
            isDrawerOpen: true,
          });
        }
      },

      removeItem: (cartItemId) => {
        set({
          items: get().items.filter((i) => i.cartItemId !== cartItemId),
        });
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.cartItemId === cartItemId
              ? { ...i, quantity: Math.min(quantity, i.maxStock || 99) }
              : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set({ isDrawerOpen: !get().isDrawerOpen }),

      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),

      toggleWishlist: (productId) => {
        const list = get().wishlistIds;
        if (list.includes(productId)) {
          set({ wishlistIds: list.filter((id) => id !== productId) });
        } else {
          set({ wishlistIds: [...list, productId] });
        }
      },

      isWishlisted: (productId) => get().wishlistIds.includes(productId),

      getCartTotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "afaq-supply-cart-v1",
      partialize: (state) => ({
        items: state.items,
        wishlistIds: state.wishlistIds,
      }),
    }
  )
);

