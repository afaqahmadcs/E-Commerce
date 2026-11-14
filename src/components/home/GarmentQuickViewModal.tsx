"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { HangingGarment } from "@/types";
import { useCartStore } from "@/store/useCartStore";

interface GarmentQuickViewModalProps {
  garment: HangingGarment | null;
  onClose: () => void;
}

export function GarmentQuickViewModal({ garment, onClose }: GarmentQuickViewModalProps) {
  const [selectedView, setSelectedView] = useState<"front" | "back">("front");
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [isAdded, setIsAdded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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
    setTimeout(() => {
      openDrawer();
    }, 450);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Stage (Matches Reference 07.5s - 11.0s) */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.1 }
              : { type: "spring", damping: 28, stiffness: 320 }
          }
          className="relative w-full max-w-4xl bg-[#F8F7F4] rounded-3xl border border-brand-border shadow-2xl p-6 sm:p-12 z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
        >
          {/* Top-Right Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-xs uppercase tracking-luxury text-brand-muted hover:text-brand-text flex items-center space-x-1.5 p-1.5 rounded-full hover:bg-neutral-200/60 transition-colors"
            aria-label="Close modal"
          >
            <span className="font-mono text-[11px]">Close</span>
            <X className="w-4 h-4" />
          </button>

          {/* Left Side: Suspended Isolated Garment Presentation */}
          <div className="relative flex-1 w-full max-w-md h-[420px] sm:h-[480px] flex flex-col items-center justify-center">
            {/* Subtle hanging cord from top */}
            <div className="w-[1.5px] h-12 bg-neutral-400 mb-[-2px]" />

            {/* Wooden Hanger SVG */}
            <div className="relative w-36 sm:w-44 h-7 -mb-2 z-20">
              <svg
                viewBox="0 0 160 28"
                className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
              >
                <path
                  d="M80 2 C72 2 68 8 68 12 L4 25 C1 26 1 28 3 28 L157 28 C159 28 159 26 156 25 L92 12 C92 8 88 2 80 2 Z"
                  fill="#3D291D"
                />
                <path
                  d="M80 4 C74 4 70 9 70 12 L12 25 L148 25 L90 12 C90 9 86 4 80 4 Z"
                  fill="#5A3D2B"
                  opacity="0.6"
                />
              </svg>
            </div>

            {/* Isolated Transparent Garment Asset (NO CARDS, NO BOXES) */}
            <motion.div
              key={currentImage}
              initial={{ opacity: 0.85, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative w-72 sm:w-84 h-[340px] sm:h-[380px] flex items-start justify-center"
            >
              <Image
                src={currentImage}
                alt={garment.name}
                width={500}
                height={700}
                className="w-auto h-full object-contain object-top drop-shadow-[0_16px_32px_rgba(0,0,0,0.12)]"
                priority
              />
            </motion.div>

            {/* Front / Back View Angle Switcher */}
            <div className="mt-3 flex items-center space-x-2 text-xs font-mono">
              <button
                onClick={() => setSelectedView("front")}
                className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider transition-all ${
                  selectedView === "front"
                    ? "bg-brand-text text-white font-semibold shadow-sm"
                    : "text-brand-muted hover:text-brand-text bg-white/70"
                }`}
              >
                Front
              </button>
              <button
                onClick={() => setSelectedView("back")}
                className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider transition-all ${
                  selectedView === "back"
                    ? "bg-brand-text text-white font-semibold shadow-sm"
                    : "text-brand-muted hover:text-brand-text bg-white/70"
                }`}
              >
                Back
              </button>
            </div>
          </div>

          {/* Right Side: Product Details & Size Selector Matrix */}
          <div className="w-full md:w-80 space-y-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-brand-muted uppercase">
                {String(garment.hangerIndex).padStart(2, "0")} / 12 • {garment.category}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-brand-text mt-1">
                {garment.name}
              </h2>
              <p className="font-mono text-lg font-semibold text-brand-text mt-1">
                ${garment.price.toFixed(2)}
              </p>
            </div>

            <p className="text-xs text-brand-muted leading-relaxed font-sans">
              {garment.description}
            </p>

            {/* Size Pills Grid */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[11px] uppercase tracking-luxury text-brand-text font-semibold">
                  Select Size
                </span>
                <span className="text-[10px] text-brand-muted font-sans">Relaxed oversized cut</span>
              </div>

              <div className="flex items-center space-x-2.5">
                {garment.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setIsAdded(false);
                    }}
                    className={`w-11 h-11 rounded-full text-xs font-mono font-medium transition-all flex items-center justify-center ${
                      selectedSize === size
                        ? "bg-brand-text text-white shadow-md scale-105"
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
                    ? "bg-brand-accent text-white shadow-brand-accent/20"
                    : "bg-brand-text hover:bg-brand-dark text-white hover:shadow-lg"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to cart</span>
                  </>
                )}
              </button>

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
