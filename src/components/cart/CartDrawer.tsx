"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ArrowRight, ShoppingBag, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    getCartTotal,
    getItemCount,
  } = useCartStore();

  const subtotal = getCartTotal();
  const itemCount = getItemCount();
  const freeShippingThreshold = 200;
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remainingForFree = Math.max(freeShippingThreshold - subtotal, 0);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dimmed backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#F8F7F4] shadow-2xl flex flex-col border-l border-brand-border"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-brand-border flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-brand-text" />
                  <h2 className="font-sans text-xs tracking-luxury uppercase font-semibold text-brand-text">
                    Shopping Bag ({itemCount})
                  </h2>
                </div>
                <button
                  onClick={closeDrawer}
                  className="p-1.5 text-brand-muted hover:text-brand-text transition-colors rounded-full hover:bg-neutral-200/50"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Complimentary Shipping Progress Tracker */}
              <div className="bg-brand-card px-6 py-3.5 border-b border-brand-border">
                <div className="flex items-center space-x-2 text-[11px] text-brand-text mb-1.5">
                  <Truck className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                  {remainingForFree > 0 ? (
                    <span>
                      Add <strong className="font-semibold">${remainingForFree.toFixed(2)}</strong> more for complimentary shipping
                    </span>
                  ) : (
                    <span className="font-semibold text-brand-accent">
                      You have unlocked complimentary global shipping!
                    </span>
                  )}
                </div>
                <div className="w-full h-1 bg-[#DEDCD5] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-brand-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-brand-card flex items-center justify-center text-brand-muted">
                      <ShoppingBag className="w-8 h-8 opacity-40" />
                    </div>
                    <div>
                      <p className="text-sm font-serif font-medium text-brand-text">
                        Your shopping bag is empty
                      </p>
                      <p className="text-xs text-brand-muted mt-1 max-w-[200px]">
                        Explore our new arrivals and complete looks.
                      </p>
                    </div>
                    <button
                      onClick={closeDrawer}
                      className="mt-4 px-6 py-2.5 bg-brand-text text-white text-xs uppercase tracking-luxury font-medium rounded hover:bg-brand-dark transition-colors"
                    >
                      Explore Catalog
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      key={item.cartItemId}
                      className="flex space-x-4 pb-6 border-b border-brand-border/70 last:border-0"
                    >
                      <div className="relative w-20 h-24 bg-brand-card rounded overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <Link
                              href={`/products/${item.slug}`}
                              onClick={closeDrawer}
                              className="text-xs font-serif font-medium text-brand-text hover:text-brand-accent transition-colors line-clamp-1"
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => removeItem(item.cartItemId)}
                              className="text-brand-muted hover:text-red-600 transition-colors ml-2"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-[11px] text-brand-muted mt-1 flex items-center space-x-2">
                            <span>Color: {item.color}</span>
                            <span>•</span>
                            <span>Size: {item.size}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Controller */}
                          <div className="flex items-center border border-brand-border rounded bg-white">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              className="px-2.5 py-1 text-xs text-brand-text hover:bg-neutral-100 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-mono font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="px-2.5 py-1 text-xs text-brand-text hover:bg-neutral-100 transition-colors"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-xs font-mono font-semibold text-brand-text">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout */}
              {items.length > 0 && (
                <div className="p-6 bg-white border-t border-brand-border space-y-4">
                  <div className="space-y-1.5 text-xs text-brand-muted">
                    <div className="flex justify-between text-brand-text font-medium">
                      <span>Subtotal</span>
                      <span className="font-mono text-sm font-semibold">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Shipping</span>
                      <span>{subtotal >= freeShippingThreshold ? "Complimentary" : "$15.00"}</span>
                    </div>
                    <p className="text-[10px] text-brand-muted">
                      Taxes and final duties calculated at checkout.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Link
                      href="/checkout"
                      onClick={closeDrawer}
                      className="w-full flex items-center justify-center space-x-2 bg-brand-text hover:bg-brand-dark text-white py-3.5 px-4 rounded text-xs uppercase tracking-luxury font-medium transition-all shadow-md hover:shadow-lg"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href="/cart"
                      onClick={closeDrawer}
                      className="block text-center text-[11px] uppercase tracking-wider text-brand-muted hover:text-brand-text transition-colors py-1"
                    >
                      View full cart details
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
