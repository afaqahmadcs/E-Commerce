"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X, Check, ShoppingBag, Eye, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LOOKS_DATA } from "@/data/outfits";
import { useCartStore } from "@/store/useCartStore";

export function TryTheLookHero() {
  const [activeLookIndex, setActiveLookIndex] = useState(3); // Look 04 "Studio Day" as featured in reference
  const [isIsolated, setIsIsolated] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [addedOutfit, setAddedOutfit] = useState(false);

  const { addItem, openDrawer } = useCartStore();

  const currentLook = LOOKS_DATA[activeLookIndex];

  // Calculate bundle pricing
  const originalTotal = currentLook.items.reduce((sum, item) => sum + item.price, 0);
  const discountedTotal = originalTotal * (1 - currentLook.discountPercentage / 100);

  const handlePrev = () => {
    setActiveLookIndex((prev) => (prev > 0 ? prev - 1 : LOOKS_DATA.length - 1));
    setAddedOutfit(false);
  };

  const handleNext = () => {
    setActiveLookIndex((prev) => (prev < LOOKS_DATA.length - 1 ? prev + 1 : 0));
    setAddedOutfit(false);
  };

  const handleAddFullLook = () => {
    // Add all items of current look to cart
    currentLook.items.forEach((item) => {
      addItem({
        productId: item.id,
        slug: item.productSlug,
        name: item.name,
        price: Math.round(item.price * (1 - currentLook.discountPercentage / 100)),
        color: "Standard",
        size: "M",
        image: item.image,
        quantity: 1,
        maxStock: 10,
      });
    });

    setAddedOutfit(true);
    setTimeout(() => {
      openDrawer();
    }, 400);
  };

  return (
    <section className="relative w-full min-h-[92vh] bg-[#F8F7F4] flex flex-col justify-between overflow-hidden border-b border-brand-border select-none">
      {/* Top Section Header */}
      <div className="pt-8 sm:pt-10 px-6 sm:px-12 max-w-7xl mx-auto w-full z-10 flex justify-between items-start">
        <div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-brand-text font-normal tracking-tight">
            Try the Look.
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-2 tracking-wide font-sans">
            Six looks, styled head to toe. Tap a pin to see the piece.
          </p>
        </div>

        {isIsolated && (
          <button
            onClick={() => setIsIsolated(false)}
            className="flex items-center space-x-2 text-xs uppercase tracking-luxury text-brand-text hover:text-brand-accent p-2 bg-white/80 rounded-full border border-brand-border shadow-sm backdrop-blur transition-all"
            aria-label="Return to full lineup"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Return to Lineup</span>
          </button>
        )}
      </div>

      {/* Main Interactive Stage */}
      <div className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center px-4 sm:px-6 my-4">
        <AnimatePresence mode="wait">
          {!isIsolated ? (
            /* Full Lineup View (when not isolated) */
            <motion.div
              key="lineup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex items-end justify-center space-x-2 sm:space-x-6 md:space-x-8 py-6 overflow-x-auto no-scrollbar"
            >
              {LOOKS_DATA.map((look, index) => {
                const isSelected = index === activeLookIndex;
                return (
                  <motion.div
                    key={look.id}
                    layout
                    onClick={() => {
                      setActiveLookIndex(index);
                      setIsIsolated(true);
                    }}
                    className={`group relative flex flex-col items-center cursor-pointer transition-all duration-500 shrink-0 ${
                      isSelected
                        ? "scale-105 opacity-100 z-20"
                        : "opacity-45 hover:opacity-85 scale-95 z-10"
                    }`}
                  >
                    {/* Model Stand Image */}
                    <div className="relative w-36 sm:w-48 md:w-56 h-[440px] sm:h-[520px] md:h-[580px] rounded-lg overflow-hidden shadow-sm transition-all duration-500">
                      <Image
                        src={look.modelImage}
                        alt={look.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        priority={index < 3}
                        sizes="(max-width: 768px) 180px, 260px"
                      />

                      {/* Subtle Floor Contact Shadow */}
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                      {/* Interactive Hotspot Pin preview on active look */}
                      {isSelected && (
                        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                          <span className="relative flex h-8 w-8 items-center justify-center">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-60" />
                            <span className="relative inline-flex rounded-full h-7 w-7 bg-white/90 shadow-md backdrop-blur-sm border border-brand-accent/40 items-center justify-center text-[10px] font-sans font-bold tracking-wider text-brand-text">
                              VIEW
                            </span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Look Label */}
                    <div className="mt-3 text-center">
                      <span className="text-[10px] tracking-widest uppercase font-mono text-brand-muted block">
                        LOOK {look.lookNumber}
                      </span>
                      <span
                        className={`text-xs font-serif transition-colors ${
                          isSelected ? "text-brand-text font-semibold" : "text-brand-muted"
                        }`}
                      >
                        {look.title}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* Single Isolated Model with Side Drawer (Reference 02.5s - 05.0s) */
            <motion.div
              key="isolated"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between max-w-6xl py-4"
            >
              {/* Left Model Stage */}
              <div className="relative w-full max-w-md h-[460px] sm:h-[560px] flex items-center justify-center">
                <div className="relative w-64 sm:w-80 h-full rounded-xl overflow-hidden shadow-luxury">
                  <Image
                    src={currentLook.modelImage}
                    alt={currentLook.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 300px, 400px"
                    priority
                  />

                  {/* Hotspot Pins on Outfit */}
                  {currentLook.items.map((item) => (
                    <div
                      key={item.id}
                      style={{ left: `${item.hotspot.x}%`, top: `${item.hotspot.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        onClick={() => setActiveHotspot(activeHotspot === item.id ? null : item.id)}
                        className="group relative flex items-center justify-center focus:outline-none"
                        aria-label={`View ${item.name}`}
                      >
                        <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-brand-accent/50 opacity-75" />
                        <span className="relative inline-flex rounded-full h-6 w-6 bg-white shadow-md border border-neutral-300 items-center justify-center text-[9px] font-bold text-brand-text group-hover:scale-110 transition-transform">
                          •
                        </span>

                        {/* Tooltip on Hover/Active */}
                        <div className="absolute left-8 bg-brand-text/95 backdrop-blur-md text-white text-[11px] font-sans px-3 py-1.5 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-brand-bg/80 font-mono">${item.price}</p>
                        </div>
                      </button>
                    </div>
                  ))}

                  {/* Model Specs Watermark */}
                  <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded text-[10px] text-brand-text font-mono">
                    {currentLook.modelHeight} • {currentLook.modelWearing}
                  </div>
                </div>
              </div>

              {/* Right Side Drawer ("In this look") */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="w-full lg:w-96 bg-brand-card/90 backdrop-blur-md border border-brand-border rounded-xl p-6 shadow-luxury mt-6 lg:mt-0 space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
                      LOOK {currentLook.lookNumber}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-brand-text">
                      {currentLook.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-sans uppercase tracking-wider text-brand-muted">
                    In this look ({currentLook.items.length})
                  </span>
                </div>

                {/* Outfit Items List */}
                <div className="space-y-4">
                  {currentLook.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3.5 bg-white/70 p-2.5 rounded-lg border border-brand-border/60 hover:border-brand-border transition-colors group"
                    >
                      <div className="relative w-14 h-16 bg-brand-card rounded overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] uppercase tracking-wider text-brand-muted font-medium block">
                          {item.category}
                        </span>
                        <Link
                          href={`/products/${item.productSlug}`}
                          className="text-xs font-serif font-medium text-brand-text hover:text-brand-accent transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs font-mono font-semibold text-brand-text mt-0.5">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="p-1.5 text-brand-muted hover:text-brand-text transition-colors"
                        aria-label="View piece"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Complete The Look Pricing Bundle & CTA */}
                <div className="pt-4 border-t border-brand-border space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-brand-muted">Complete Outfit (3 pieces)</span>
                    <div className="text-right">
                      <span className="text-brand-muted line-through mr-2 font-mono text-[11px]">
                        ${originalTotal.toFixed(2)}
                      </span>
                      <span className="font-mono font-bold text-sm text-brand-text">
                        ${discountedTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 text-[11px] text-brand-accent font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Save {currentLook.discountPercentage}% when buying full styled look</span>
                  </div>

                  <button
                    onClick={handleAddFullLook}
                    className={`w-full py-3.5 px-4 rounded text-xs uppercase tracking-luxury font-medium transition-all flex items-center justify-center space-x-2 shadow-md ${
                      addedOutfit
                        ? "bg-brand-accent text-white"
                        : "bg-brand-text hover:bg-brand-dark text-white"
                    }`}
                  >
                    {addedOutfit ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Full Look Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add full look to bag →</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Timeline Scrubber Navigation (Reference bottom control) */}
      <div className="py-6 px-6 sm:px-12 max-w-7xl mx-auto w-full border-t border-brand-border/60 flex items-center justify-between z-10">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="p-2 text-brand-text hover:text-brand-accent transition-colors flex items-center space-x-1 font-mono text-xs uppercase tracking-wider"
          aria-label="Previous look"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Scrubber Points */}
        <div className="flex items-center space-x-3 sm:space-x-6 overflow-x-auto no-scrollbar">
          {LOOKS_DATA.map((look, index) => {
            const isActive = index === activeLookIndex;
            return (
              <button
                key={look.id}
                onClick={() => {
                  setActiveLookIndex(index);
                  setAddedOutfit(false);
                }}
                className={`flex items-center space-x-2 text-xs font-mono transition-all py-1 ${
                  isActive
                    ? "text-brand-text font-bold border-b-2 border-brand-text"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                <span>{look.lookNumber}</span>
                {isActive && (
                  <span className="font-serif text-[11px] font-normal tracking-normal hidden md:inline ml-1 text-brand-text">
                    {look.title}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="p-2 text-brand-text hover:text-brand-accent transition-colors flex items-center space-x-1 font-mono text-xs uppercase tracking-wider"
          aria-label="Next look"
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
