"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag, Truck, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();

  const subtotal = getCartTotal();
  const freeShippingThreshold = 200;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
      <div className="flex items-center space-x-2 text-xs font-mono text-brand-muted uppercase tracking-wider mb-6">
        <Link href="/" className="hover:text-brand-text flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="pb-8 border-b border-brand-border flex items-end justify-between">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
            ORDER SUMMARY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal tracking-tight mt-1">
            SHOPPING BAG
          </h1>
        </div>
        <span className="text-xs font-mono text-brand-muted">
          ({items.length} unique items)
        </span>
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center max-w-md mx-auto space-y-4">
          <div className="w-20 h-20 bg-brand-card rounded-full mx-auto flex items-center justify-center text-brand-muted">
            <ShoppingBag className="w-10 h-10 opacity-30" />
          </div>
          <h2 className="font-serif text-2xl text-brand-text">Your bag is currently empty</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            Discover our latest runway collection, archival footwear, and wardrobe foundations.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-brand-text hover:bg-brand-dark text-white rounded text-xs uppercase tracking-luxury font-medium shadow-md transition-all"
            >
              <span>Explore New Arrivals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
          {/* Items Table Left (7 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="hidden sm:grid grid-cols-12 text-[11px] font-mono uppercase tracking-widest text-brand-muted pb-3 border-b border-brand-border">
              <span className="col-span-6">Product</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Price</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            {items.map((item) => (
              <div
                key={item.cartItemId}
                className="flex flex-col sm:grid sm:grid-cols-12 items-start sm:items-center py-4 border-b border-brand-border/70 gap-4"
              >
                {/* Product Meta */}
                <div className="sm:col-span-6 flex items-center space-x-4">
                  <div className="relative w-20 h-24 bg-brand-card rounded overflow-hidden shrink-0 border border-brand-border/60">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-serif text-sm font-medium text-brand-text hover:text-brand-accent transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <div className="text-[11px] text-brand-muted font-sans mt-0.5 space-x-2">
                      <span>Color: {item.color}</span>
                      <span>•</span>
                      <span>Size: {item.size}</span>
                    </div>
                    <button
                      onClick={() => removeItem(item.cartItemId)}
                      className="text-[11px] text-brand-muted hover:text-red-600 flex items-center space-x-1 mt-2 transition-colors font-mono uppercase"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="sm:col-span-2 flex items-center sm:justify-center">
                  <div className="flex items-center border border-brand-border rounded bg-white">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="px-2.5 py-1 text-xs text-brand-text hover:bg-neutral-100"
                    >
                      -
                    </button>
                    <span className="px-2 text-xs font-mono font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="px-2.5 py-1 text-xs text-brand-text hover:bg-neutral-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Unit Price */}
                <div className="sm:col-span-2 text-right font-mono text-xs text-brand-muted hidden sm:block">
                  ${item.price.toFixed(2)}
                </div>

                {/* Subtotal */}
                <div className="sm:col-span-2 text-right font-mono text-xs font-semibold text-brand-text">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Right (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-brand-card/90 border border-brand-border rounded-xl p-6 shadow-luxury space-y-6">
              <h2 className="font-serif text-lg font-medium text-brand-text pb-4 border-b border-brand-border">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-brand-text">
                  <span>Bag Subtotal</span>
                  <span className="font-mono font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-brand-text">
                  <span>Shipping Estimate</span>
                  <span className="font-mono">
                    {shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-brand-accent pt-1">
                  <Truck className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {subtotal >= freeShippingThreshold
                      ? "You unlocked complimentary global priority shipping"
                      : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for complimentary shipping`}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border flex justify-between items-baseline text-brand-text">
                <span className="font-serif text-base font-semibold">Estimated Total</span>
                <span className="font-mono text-xl font-bold">${total.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center space-x-2 bg-brand-text hover:bg-brand-dark text-white py-4 px-6 rounded text-xs uppercase tracking-luxury font-medium transition-all shadow-md hover:shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-[10px] text-center text-brand-muted leading-relaxed">
                Taxes and import duties calculated and collected at checkout.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

