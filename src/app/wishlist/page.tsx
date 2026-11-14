"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight, Trash2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { PRODUCTS_DATA } from "@/data/products";
import { staggerGridVariants, gridItemVariants } from "@/components/animations/motionPresets";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { wishlistIds, toggleWishlist, addItem, openDrawer } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const wishlistedProducts = mounted
    ? PRODUCTS_DATA.filter((p) => wishlistIds.includes(p.id))
    : [];

  const handleMoveToBag = (product: typeof PRODUCTS_DATA[0]) => {
    const defaultColor = product.availableColors[0]?.name || "Standard";
    const defaultSize = product.availableSizes[0] || "M";

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.basePrice,
      color: defaultColor,
      size: product.category === "sneakers" ? `EU ${defaultSize}` : defaultSize,
      image: product.primaryImage,
      quantity: 1,
      maxStock: 20,
    });

    openDrawer();
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-mono text-brand-muted uppercase tracking-wider mb-6">
          <Link href="/shop" className="hover:text-brand-text flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Continue Browsing</span>
          </Link>
        </div>

        {/* Editorial Header */}
        <div className="pb-8 border-b border-brand-border flex items-end justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
              SAVED PIECES
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-brand-text font-normal tracking-tight mt-1">
              CLIENT WISHLIST
            </h1>
          </div>
          <span className="text-xs font-mono text-brand-muted">
            ({wishlistedProducts.length} saved)
          </span>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 bg-brand-card rounded-full mx-auto flex items-center justify-center text-brand-muted">
              <Heart className="w-10 h-10 opacity-30" />
            </div>
            <h2 className="font-serif text-2xl text-brand-text">Your wishlist is currently empty</h2>
            <p className="text-xs text-brand-muted leading-relaxed">
              Curate your personal collection. Save your favorite runway silhouettes, heavyweight fleeces, and archival footwear for later.
            </p>
            <div className="pt-4">
              <Link
                href="/shop"
                className="inline-flex items-center space-x-2 px-8 py-3.5 bg-brand-text hover:bg-brand-dark text-white rounded text-xs uppercase tracking-luxury font-medium shadow-md transition-all"
              >
                <span>Discover All Silhouettes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10"
          >
            <AnimatePresence>
              {wishlistedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={gridItemVariants}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="group flex flex-col bg-brand-card/40 border border-brand-border/70 rounded-lg p-3 hover:border-brand-text/30 transition-all shadow-sm"
                >
                  <div className="relative aspect-[3/4] w-full bg-[#F3F2EE] rounded overflow-hidden">
                    <Image
                      src={product.primaryImage}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-brand-accent hover:bg-white shadow transition-transform active:scale-90 z-10"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-col justify-between flex-1 space-y-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-brand-muted font-sans font-medium block">
                        {product.category}
                      </span>
                      <Link
                        href={`/products/${product.slug}`}
                        className="font-serif text-base text-brand-text hover:text-brand-accent transition-colors line-clamp-1 mt-0.5"
                      >
                        {product.name}
                      </Link>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-brand-border/60">
                      <span className="font-mono text-xs font-semibold text-brand-text">
                        ${product.basePrice.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleMoveToBag(product)}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-brand-text hover:bg-brand-dark text-white rounded text-[11px] font-mono uppercase tracking-wider transition-colors shadow-sm active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
