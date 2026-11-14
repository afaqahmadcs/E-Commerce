"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag, Truck, ArrowLeft, ShieldCheck, RefreshCw } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { PRODUCTS_DATA } from "@/data/products";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal, addItem, openDrawer } = useCartStore();

  const subtotal = getCartTotal();
  const freeShippingThreshold = 200;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Recommended accessories to reach free shipping
  const suggestedAccessories = PRODUCTS_DATA.filter((p) => p.category === "accessories").slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-mono text-brand-muted uppercase tracking-wider mb-6">
          <Link href="/shop" className="hover:text-brand-text flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Editorial Header */}
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
            {/* Items Table Left (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Meter Banner */}
              <div className="p-4 bg-white rounded-lg border border-brand-border/80 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center space-x-1.5 text-brand-text font-semibold">
                    <Truck className="w-4 h-4 text-brand-accent" />
                    <span>
                      {subtotal >= freeShippingThreshold
                        ? "Complimentary Global Express Delivery Unlocked!"
                        : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for complimentary shipping`}
                    </span>
                  </span>
                  <span className="text-brand-accent font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-accent rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Table Column Headers */}
              <div className="hidden sm:grid grid-cols-12 text-[11px] font-mono uppercase tracking-widest text-brand-muted pb-3 border-b border-brand-border">
                <span className="col-span-6">Product</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Price</span>
                <span className="col-span-2 text-right">Total</span>
              </div>

              {/* Items List */}
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

                  {/* Quantity Controls */}
                  <div className="sm:col-span-2 flex items-center sm:justify-center">
                    <div className="flex items-center border border-brand-border rounded-lg bg-white px-2 py-0.5 shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-2 py-1 text-xs text-brand-text hover:text-brand-accent font-bold"
                      >
                        -
                      </button>
                      <span className="px-2.5 text-xs font-mono font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-2 py-1 text-xs text-brand-text hover:text-brand-accent font-bold"
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
                      {shipping === 0 ? (
                        <span className="text-emerald-700 font-semibold uppercase">Complimentary</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-border flex justify-between items-baseline text-brand-text">
                  <span className="font-serif text-base font-semibold">Estimated Total</span>
                  <span className="font-mono text-xl font-bold">${total.toFixed(2)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center space-x-2 bg-brand-text hover:bg-brand-dark text-white py-4 px-6 rounded-lg text-xs uppercase tracking-luxury font-medium transition-all shadow-md hover:shadow-lg active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Trust Guarantees */}
                <div className="pt-4 border-t border-brand-border/60 space-y-2 text-[11px] text-brand-muted font-sans">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>256-bit encrypted checkout & verified order dispatch</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>30-day effortless returns with prepaid labels</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Accompanying Accessories */}
        {items.length > 0 && suggestedAccessories.length > 0 && (
          <div className="mt-20 pt-12 border-t border-brand-border">
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
              COMPLETE YOUR ORDER
            </span>
            <h3 className="font-serif text-2xl text-brand-text font-normal mt-1 mb-8">
              CURATED ACCESSORIES
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedAccessories.map((acc) => (
                <div
                  key={acc.id}
                  className="group flex flex-col bg-brand-card/40 border border-brand-border/70 rounded-lg p-3"
                >
                  <Link href={`/products/${acc.slug}`} className="relative aspect-[3/4] w-full bg-[#F3F2EE] rounded overflow-hidden">
                    <Image
                      src={acc.primaryImage}
                      alt={acc.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="25vw"
                    />
                  </Link>
                  <div className="mt-3 flex flex-col justify-between flex-1">
                    <Link
                      href={`/products/${acc.slug}`}
                      className="font-serif text-sm font-medium text-brand-text hover:text-brand-accent line-clamp-1"
                    >
                      {acc.name}
                    </Link>
                    <div className="mt-2 flex items-center justify-between pt-2 border-t border-brand-border/60">
                      <span className="font-mono text-xs font-semibold text-brand-text">
                        ${acc.basePrice.toFixed(2)}
                      </span>
                      <button
                        onClick={() => {
                          addItem({
                            productId: acc.id,
                            slug: acc.slug,
                            name: acc.name,
                            price: acc.basePrice,
                            color: acc.availableColors[0]?.name || "Standard",
                            size: acc.availableSizes[0] || "One Size",
                            image: acc.primaryImage,
                            quantity: 1,
                            maxStock: 20,
                          });
                          openDrawer();
                        }}
                        className="px-2.5 py-1 bg-brand-text hover:bg-brand-dark text-white rounded text-[10px] font-mono uppercase tracking-wider transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
