"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SNEAKERS_DATA } from "@/data/sneakers";
import { useCartStore } from "@/store/useCartStore";

export function FeaturedSneakerSection() {
  const [sneakerIndex, setSneakerIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null); // starts null to demonstrate "Select a size"
  const [isAdded, setIsAdded] = useState(false);

  const { addItem, openDrawer } = useCartStore();

  const sneaker = SNEAKERS_DATA[sneakerIndex];
  const activeThumbnail = sneaker.thumbnails[selectedColorIndex] || sneaker.thumbnails[0];

  const handlePrev = () => {
    setSneakerIndex((prev) => (prev > 0 ? prev - 1 : SNEAKERS_DATA.length - 1));
    setSelectedColorIndex(0);
    setSelectedSize(null);
    setIsAdded(false);
  };

  const handleNext = () => {
    setSneakerIndex((prev) => (prev < SNEAKERS_DATA.length - 1 ? prev + 1 : 0));
    setSelectedColorIndex(0);
    setSelectedSize(null);
    setIsAdded(false);
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addItem({
      productId: sneaker.id,
      slug: sneaker.slug,
      name: sneaker.modelName,
      price: sneaker.price,
      color: activeThumbnail.colorway,
      size: `EU ${selectedSize}`,
      image: activeThumbnail.image,
      quantity: 1,
      maxStock: 15,
    });

    setIsAdded(true);
    setTimeout(() => {
      openDrawer();
    }, 400);
  };

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#F8F7F4] border-b border-brand-border select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Large Floating Sneaker & Thumbnails (Matches Reference 14.5s) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* The Floating Sneaker with realistic soft contact shadow */}
            <div className="relative w-full max-w-lg h-72 sm:h-96 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeThumbnail.image}
                  initial={{ opacity: 0.6, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                  exit={{ opacity: 0.6, scale: 0.95 }}
                  transition={{
                    opacity: { duration: 0.25 },
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="relative w-72 sm:w-96 h-56 sm:h-72 drop-shadow-2xl z-10"
                >
                  <Image
                    src={activeThumbnail.image}
                    alt={sneaker.modelName}
                    fill
                    className="object-contain transform -rotate-6 hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 320px, 450px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floor Shadow with breathing scale */}
              <motion.div
                animate={{ scale: [1, 0.9, 1], opacity: [0.2, 0.12, 0.2] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-6 w-64 sm:w-80 h-6 bg-black blur-lg rounded-full z-0"
              />
            </div>

            {/* Horizontal Colorway Thumbnails Carousel Below */}
            <div className="mt-8 flex items-center space-x-3">
              {sneaker.thumbnails.map((thumb, index) => {
                const isActive = index === selectedColorIndex;
                return (
                  <button
                    key={thumb.colorway}
                    onClick={() => {
                      setSelectedColorIndex(index);
                      setIsAdded(false);
                    }}
                    className={`relative w-14 h-14 rounded-lg p-1 bg-white border transition-all ${
                      isActive
                        ? "border-brand-text ring-1 ring-brand-text scale-105 shadow-md"
                        : "border-brand-border/80 hover:border-brand-border opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`Select colorway ${thumb.colorway}`}
                  >
                    <Image
                      src={thumb.image}
                      alt={thumb.colorway}
                      fill
                      className="object-contain p-1"
                      sizes="56px"
                    />
                  </button>
                );
              })}
            </div>

            {/* Pagination Scrubber Control (Reference 14.5s: ← 01 / 07 →) */}
            <div className="mt-6 flex items-center space-x-4 text-xs font-mono">
              <button
                onClick={handlePrev}
                className="p-1.5 text-brand-text hover:text-brand-accent transition-colors"
                aria-label="Previous sneaker"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-brand-muted tracking-widest">
                {String(sneakerIndex + 1).padStart(2, "0")} / {String(SNEAKERS_DATA.length).padStart(2, "0")}
              </span>
              <button
                onClick={handleNext}
                className="p-1.5 text-brand-text hover:text-brand-accent transition-colors"
                aria-label="Next sneaker"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Purchasing Matrix (Matches Reference 13.5s - 16.0s) */}
          <div className="lg:col-span-5 space-y-6 max-w-md mx-auto lg:mx-0 w-full">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
                FLAGSHIP SNEAKER
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-brand-text tracking-tight mt-1">
                {sneaker.modelName}
              </h2>
              <p className="font-mono text-lg font-semibold text-brand-text mt-1">
                ${sneaker.price.toFixed(2)}
              </p>
              <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                {sneaker.description}
              </p>
            </div>

            {/* SHOE SIZE Selector Grid */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-[11px] uppercase tracking-wider text-brand-text font-bold">
                  SHOE SIZE (EU)
                </span>
                <span className="text-[11px] text-brand-muted font-mono">
                  {selectedSize ? `Selected: EU ${selectedSize}` : "Select your size"}
                </span>
              </div>

              {/* Grid of sizes 40 to 46 */}
              <div className="grid grid-cols-4 gap-2">
                {sneaker.availableEuSizes.map((size) => {
                  const isSizeSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setIsAdded(false);
                      }}
                      className={`h-11 rounded text-xs font-mono font-medium transition-all flex items-center justify-center ${
                        isSizeSelected
                          ? "bg-brand-text text-white font-bold shadow-sm"
                          : "bg-white border border-brand-border text-brand-text hover:border-brand-text"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Button with State Machine (Reference 13.5s disabled -> 14.5s black -> 16.0s burnt orange) */}
            <div className="space-y-3 pt-2">
              <button
                disabled={!selectedSize}
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 rounded-full text-xs uppercase tracking-luxury font-medium transition-all shadow-md flex items-center justify-center space-x-2 ${
                  !selectedSize
                    ? "bg-[#D8D6CF] text-neutral-500 cursor-not-allowed" // Disabled state (Frame 13.5s)
                    : isAdded
                    ? "bg-brand-accent text-white" // Burnt orange purchase state (Frame 16.0s)
                    : "bg-brand-text hover:bg-brand-dark text-white" // Active Add to bag (Frame 14.5s)
                }`}
              >
                {!selectedSize ? (
                  <span>Select a size</span>
                ) : isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to bag</span>
                  </>
                ) : (
                  <span>Add to bag</span>
                )}
              </button>

              {/* Frame 16.0s: View bag → link appears when item is added */}
              {isAdded && (
                <button
                  onClick={openDrawer}
                  className="w-full text-center text-xs uppercase tracking-wider text-brand-accent hover:underline flex items-center justify-center space-x-1"
                >
                  <span>View bag</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              <div className="text-center pt-2">
                <Link
                  href={`/products/${sneaker.slug}`}
                  className="text-[11px] text-brand-muted hover:text-brand-text uppercase tracking-luxury underline underline-offset-4"
                >
                  View full details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
