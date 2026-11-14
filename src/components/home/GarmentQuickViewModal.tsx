"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HangingGarment } from "@/types";
import { useCartStore } from "@/store/useCartStore";

interface GarmentQuickViewModalProps {
  garment: HangingGarment | null;
  onClose: () => void;
}

export function GarmentQuickViewModal({ garment, onClose }: GarmentQuickViewModalProps) {
  const [selectedView, setSelectedView] = useState<"front" | "back">("front");
  const [selectedSize, setSelectedSize] = useState<string>("S");
  const [isAdded, setIsAdded] = useState(false);

  const { addItem, openDrawer } = useCartStore();

  if (!garment) return null;

  const currentImage =
    selectedView === "front"
      ? garment.imageFront
      : garment.imageBack || garment.imageFront;

  const handleAddToCart = () => {
    addItem({
      productId: garment.id,
      slug: garment.slug,
      name: garment.name,
      price: garment.price,
      color: garment.color,
      size: selectedSize,
      image: garment.imageFront,
      quantity: 1,
      maxStock: 20,
    });

    setIsAdded(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Stage (Matches Reference 08.5s - 11.0s) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#F8F7F4] rounded-2xl border border-brand-border shadow-2xl p-6 sm:p-10 z-10 flex flex-col md:flex-row items-center justify-between gap-8 select-none"
        >
          {/* Top-Right Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-xs uppercase tracking-luxury text-brand-muted hover:text-brand-text flex items-center space-x-1.5 p-1 rounded transition-colors"
            aria-label="Close modal"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>

          {/* Left Side: Suspended Isolated Garment Presentation */}
          <div className="relative flex-1 w-full max-w-md h-[400px] sm:h-[480px] flex flex-col items-center justify-center">
            {/* Subtle hanging cord from top */}
            <div className="w-[1.5px] h-12 bg-neutral-400 mb-[-4px]" />

            {/* Wooden Hanger SVG */}
            <div className="w-36 h-8 text-amber-900/70 mb-[-6px]">
              <svg viewBox="0 0 100 24" fill="currentColor" className="w-full h-full drop-shadow">
                <path d="M50 0 C47 0 45 4 45 7 C45 10 48 12 50 12 L50 15 L2 22 C0 22 0 24 2 24 L98 24 C100 24 100 22 98 22 L50 15 Z" />
              </svg>
            </div>

            {/* Garment Image Card */}
            <motion.div
              key={currentImage}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-72 sm:w-80 h-[360px] rounded-lg overflow-hidden shadow-luxury bg-brand-card"
            >
              <Image
                src={currentImage}
                alt={garment.name}
                fill
                className="object-cover"
                sizes="320px"
                priority
              />
            </motion.div>

            {/* View angle indicators */}
            <div className="mt-4 flex items-center space-x-4 text-xs font-mono">
              <button
                onClick={() => setSelectedView("front")}
                className={`px-3 py-1 rounded transition-colors ${
                  selectedView === "front"
                    ? "bg-brand-text text-white font-semibold"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                Front
              </button>
              <button
                onClick={() => setSelectedView("back")}
                className={`px-3 py-1 rounded transition-colors ${
                  selectedView === "back"
                    ? "bg-brand-text text-white font-semibold"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                Back
              </button>
            </div>
          </div>

          {/* Right Side: Product Details & Size Selector Matrix */}
          <div className="w-full md:w-80 space-y-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-brand-muted">
                {String(garment.hangerIndex).padStart(2, "0")} / 14
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-brand-text mt-1">
                {garment.name}
              </h2>
              <p className="font-mono text-base font-semibold text-brand-text mt-1.5">
                ${garment.price.toFixed(2)}
              </p>
            </div>

            <p className="text-xs text-brand-muted leading-relaxed">
              {garment.description}
            </p>

            {/* Size Pills */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[11px] uppercase tracking-luxury text-brand-text font-semibold">
                  Size
                </span>
                <span className="text-[10px] text-brand-muted">True to size oversized</span>
              </div>

              <div className="flex items-center space-x-2">
                {garment.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setIsAdded(false);
                    }}
                    className={`w-11 h-11 rounded-full text-xs font-mono font-medium transition-all flex items-center justify-center ${
                      selectedSize === size
                        ? "bg-brand-text text-white shadow-sm"
                        : "bg-white border border-brand-border text-brand-text hover:border-brand-text"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add To Cart CTA Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 rounded-full text-xs uppercase tracking-luxury font-medium transition-all shadow-md flex items-center justify-center space-x-2 ${
                  isAdded
                    ? "bg-brand-accent text-white"
                    : "bg-brand-text hover:bg-brand-dark text-white"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to cart</span>
                  </>
                ) : (
                  <span>Add to cart</span>
                )}
              </button>

              {isAdded && (
                <button
                  onClick={() => {
                    onClose();
                    openDrawer();
                  }}
                  className="w-full text-center text-xs uppercase tracking-wider text-brand-accent hover:underline flex items-center justify-center space-x-1"
                >
                  <span>View cart</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              <div className="pt-2 text-center">
                <Link
                  href={`/products/${garment.slug}`}
                  onClick={onClose}
                  className="text-[11px] text-brand-muted hover:text-brand-text uppercase tracking-luxury underline underline-offset-4"
                >
                  View full product page →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
