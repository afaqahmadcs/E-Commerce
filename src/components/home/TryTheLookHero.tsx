"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X, Check, ShoppingBag, Eye, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, PanInfo, useReducedMotion } from "framer-motion";
import { LOOKS_DATA } from "@/data/outfits";
import { useCartStore } from "@/store/useCartStore";

export function TryTheLookHero() {
  const [activeLookIndex, setActiveLookIndex] = useState(3); // Look 04 "Studio Day" as featured in reference
  const [isIsolated, setIsIsolated] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [addedOutfit, setAddedOutfit] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const isDraggingRef = useRef(false);

  const shouldReduceMotion = useReducedMotion();
  const { addItem, openDrawer } = useCartStore();

  const currentLook = LOOKS_DATA[activeLookIndex];

  // Window resize listener for responsive model spacing calibration
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate bundle pricing
  const originalTotal = currentLook.items.reduce((sum, item) => sum + item.price, 0);
  const discountedTotal = originalTotal * (1 - currentLook.discountPercentage / 100);

  const handlePrev = useCallback(() => {
    setActiveLookIndex((prev) => (prev > 0 ? prev - 1 : LOOKS_DATA.length - 1));
    setAddedOutfit(false);
    setActiveHotspot(null);
  }, []);

  const handleNext = useCallback(() => {
    setActiveLookIndex((prev) => (prev < LOOKS_DATA.length - 1 ? prev + 1 : 0));
    setAddedOutfit(false);
    setActiveHotspot(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape" && isIsolated) {
        setIsIsolated(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, isIsolated]);

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 35;
    const velocityThreshold = 220;

    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      handleNext();
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      handlePrev();
    }

    // Keep dragging flag briefly to avoid accidental click trigger
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 120);
  };

  const handleModelClick = (index: number) => {
    if (isDraggingRef.current) return;

    if (index === activeLookIndex) {
      // Toggle isolated view when center model is clicked
      setIsIsolated((prev) => !prev);
    } else {
      setActiveLookIndex(index);
      setAddedOutfit(false);
      setActiveHotspot(null);
    }
  };

  const handleAddFullLook = () => {
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
    }, 450);
  };

  // Viewport calibrated horizontal spacing
  const modelSpacing = windowWidth < 640 ? 150 : windowWidth < 1024 ? 190 : 235;

  return (
    <section className="relative w-full min-h-[92vh] bg-[#F8F7F4] flex flex-col justify-between overflow-hidden border-b border-brand-border select-none">
      {/* Top Section Header */}
      <div className="pt-8 sm:pt-10 px-5 sm:px-10 lg:px-12 max-w-7xl mx-auto w-full z-20 flex justify-between items-start">
        <div className="max-w-[280px] sm:max-w-sm">
          <AnimatePresence mode="wait">
            {isIsolated ? (
              <motion.div
                key="header-isolated"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: shouldReduceMotion ? 0.05 : 0.3 }}
              >
                <span className="text-[10px] sm:text-[11px] font-mono tracking-luxury uppercase text-brand-muted block">
                  LOOK {currentLook.lookNumber}
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-brand-text font-normal tracking-tight">
                  {currentLook.title}
                </h1>
                <p className="text-xs sm:text-sm text-brand-muted mt-1 tracking-wide font-sans leading-relaxed">
                  {currentLook.modelHeight} • {currentLook.modelWearing}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="header-lineup"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: shouldReduceMotion ? 0.05 : 0.3 }}
              >
                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-brand-text font-normal tracking-tight">
                  Try the Look.
                </h1>
                <p className="text-xs sm:text-sm text-brand-muted mt-2 tracking-wide font-sans leading-relaxed">
                  Six looks, styled head to toe. Tap a pin to see the piece.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Controls Top Right */}
        <div className="flex items-center space-x-3">
          {isIsolated ? (
            <button
              onClick={() => setIsIsolated(false)}
              className="flex items-center space-x-2 text-xs uppercase tracking-luxury text-brand-text hover:text-brand-accent px-4 py-2 bg-white/90 rounded-full border border-brand-border shadow-sm backdrop-blur transition-all"
              aria-label="Return to full lineup"
            >
              <X className="w-4 h-4" />
              <span className="font-medium">Return to Lineup</span>
            </button>
          ) : (
            <button
              onClick={() => setIsIsolated(true)}
              className="hidden sm:flex items-center space-x-2 text-xs uppercase tracking-luxury text-brand-text hover:text-brand-accent px-4 py-2 bg-white/70 hover:bg-white rounded-full border border-brand-border/80 shadow-sm backdrop-blur transition-all"
            >
              <span>Explore Outfit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Stage with Runway & Docked Right Panel */}
      <div className="relative flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 my-2">
        {/* Left/Center: Horizontal Model Runway */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ touchAction: "pan-y" }}
          className="relative flex-1 w-full h-[500px] sm:h-[580px] md:h-[620px] flex items-end justify-center cursor-grab active:cursor-grabbing overflow-visible touch-pan-y"
        >
          {LOOKS_DATA.map((look, index) => {
            const offset = index - activeLookIndex;
            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);

            const targetX = offset * modelSpacing;

            // Scale calculations: Center is 1.14x, +/-1 is 0.88x, +/-2 is 0.72x
            let scale = 1.14;
            let opacity = 1;
            let zIndex = 30;
            let blurAmount = 0;

            if (isIsolated) {
              if (isCenter) {
                scale = 1.18;
                opacity = 1;
                zIndex = 40;
                blurAmount = 0;
              } else {
                scale = 0.82;
                opacity = 0;
                zIndex = 0;
                blurAmount = 4;
              }
            } else {
              if (absOffset === 0) {
                scale = 1.14;
                opacity = 1;
                zIndex = 30;
                blurAmount = 0;
              } else if (absOffset === 1) {
                scale = 0.88;
                opacity = 0.82;
                zIndex = 20;
                blurAmount = 0;
              } else if (absOffset === 2) {
                scale = 0.72;
                opacity = 0.45;
                zIndex = 10;
                blurAmount = 1.5;
              } else {
                scale = 0.60;
                opacity = 0.15;
                zIndex = 5;
                blurAmount = 3;
              }
            }

            return (
              <motion.div
                key={look.id}
                animate={{
                  x: targetX,
                  scale: shouldReduceMotion ? (isCenter ? 1 : 0.9) : scale,
                  opacity,
                  filter: shouldReduceMotion ? "none" : `blur(${blurAmount}px)`,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0.05 : 0.65,
                  ease: [0.16, 1, 0.3, 1], // Luxury 650ms ease-out curve
                }}
                style={{
                  zIndex,
                  transformOrigin: "bottom center",
                  willChange: "transform, opacity",
                }}
                onClick={() => handleModelClick(index)}
                className="absolute bottom-6 flex flex-col items-center justify-end group pointer-events-auto"
              >
                {/* Full-Body Model Figure */}
                <div className="relative w-52 sm:w-64 md:w-72 h-[450px] sm:h-[520px] md:h-[570px] flex items-end justify-center">
                  {/* Organic Ground Contact Shadow */}
                  <div
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 sm:w-52 h-6 rounded-full blur-[9px] pointer-events-none transform scale-y-45 transition-all duration-700 ${
                      isCenter ? "bg-black/35 blur-[10px]" : "bg-black/15 blur-[6px]"
                    }`}
                  />

                  {/* Cutout Transparent Model Image */}
                  <div className="relative w-full h-full flex items-end justify-center pointer-events-none">
                    <Image
                      src={look.modelImage}
                      alt={look.title}
                      width={380}
                      height={1000}
                      priority={isCenter || absOffset === 1}
                      className="w-auto h-full object-contain object-bottom drop-shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                      sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 380px"
                    />
                  </div>

                  {/* Interactive "VIEW" Pill on Center Model in Lineup Mode */}
                  {isCenter && !isIsolated && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="absolute top-[38%] -right-1 sm:right-2 z-40 pointer-events-auto cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsIsolated(true);
                      }}
                    >
                      <span className="relative flex h-10 w-10 items-center justify-center group/btn">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-40" />
                        <span className="relative inline-flex rounded-full h-9 w-9 bg-white/95 shadow-luxury backdrop-blur-md border border-neutral-300 items-center justify-center text-[10px] font-sans font-bold tracking-widest text-brand-text group-hover/btn:scale-105 transition-transform">
                          VIEW
                        </span>
                      </span>
                    </motion.div>
                  )}

                  {/* Garment Hotspot Pins in Isolated View Mode */}
                  {isCenter && isIsolated && (
                    <div className="absolute inset-0 pointer-events-none z-40">
                      {look.items.map((item) => (
                        <div
                          key={item.id}
                          style={{ left: `${item.hotspot.x}%`, top: `${item.hotspot.y}%` }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHotspot(activeHotspot === item.id ? null : item.id);
                            }}
                            className="group/pin relative flex items-center justify-center focus:outline-none p-2"
                            aria-label={`View ${item.name}`}
                          >
                            <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-brand-accent/50 opacity-60" />
                            <span
                              className={`relative inline-flex rounded-full h-6 w-6 shadow-luxury border items-center justify-center text-[9px] font-bold transition-all ${
                                activeHotspot === item.id
                                  ? "bg-brand-accent text-white border-brand-accent scale-110"
                                  : "bg-white text-brand-text border-neutral-300 hover:scale-110"
                              }`}
                            >
                              •
                            </span>

                            {/* Floating Pin Tooltip */}
                            <div className="absolute left-9 bg-brand-text/95 backdrop-blur-md text-white text-[11px] font-sans px-3 py-1.5 rounded shadow-xl whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none z-50">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-brand-bg/80 font-mono text-[10px]">${item.price}</p>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Model Label in Lineup Mode */}
                {!isIsolated && (
                  <div className="mt-2 text-center pointer-events-none transition-opacity duration-300">
                    <span className="text-[10px] tracking-widest uppercase font-mono text-brand-muted block">
                      LOOK {look.lookNumber}
                    </span>
                    <span
                      className={`text-xs font-serif transition-colors ${
                        isCenter ? "text-brand-text font-medium" : "text-brand-muted/70"
                      }`}
                    >
                      {look.title}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Right Docked Panel: "IN THIS LOOK" (Matching Reference Video) */}
        <motion.div
          layout
          className="w-full lg:w-[340px] xl:w-[360px] bg-white/80 backdrop-blur-md border border-brand-border/80 rounded-2xl p-5 sm:p-6 shadow-sm mt-4 lg:mt-0 space-y-5 z-20 shrink-0"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-brand-border/70">
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
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLook.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: shouldReduceMotion ? 0.05 : 0.28 }}
                className="space-y-2.5"
              >
                {currentLook.items.map((item) => {
                  const isHighlighted = activeHotspot === item.id;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setActiveHotspot(item.id)}
                      onMouseLeave={() => setActiveHotspot(null)}
                      className={`flex items-center space-x-3 p-2.5 rounded-xl border transition-all group ${
                        isHighlighted
                          ? "bg-brand-accent/5 border-brand-accent/40 shadow-sm"
                          : "bg-white/80 border-brand-border/60 hover:border-brand-border hover:bg-white"
                      }`}
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-12 h-14 bg-brand-card rounded-lg overflow-hidden shrink-0 border border-brand-border/40">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="48px"
                        />
                      </div>

                      {/* Product Metadata */}
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

                      {/* View Action Icon */}
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="p-1.5 text-brand-muted hover:text-brand-text transition-colors"
                        aria-label={`View ${item.name}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pricing Bundle & Action Button */}
          <div className="pt-3 border-t border-brand-border/70 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-brand-muted font-sans">Complete Outfit (3 pieces)</span>
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
              <span>Bundle all 3 and save {currentLook.discountPercentage}%</span>
            </div>

            {/* View Outfit Action Button */}
            {!isIsolated && (
              <button
                onClick={() => setIsIsolated(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs uppercase tracking-luxury font-medium border border-brand-border hover:border-brand-text bg-white/90 text-brand-text hover:bg-white transition-all shadow-sm"
              >
                View Outfit Details
              </button>
            )}

            {/* Add full look to bag CTA */}
            <button
              onClick={handleAddFullLook}
              className={`w-full py-3.5 px-4 rounded-xl text-xs uppercase tracking-luxury font-medium transition-all flex items-center justify-center space-x-2 shadow-sm ${
                addedOutfit
                  ? "bg-brand-accent text-white shadow-brand-accent/20"
                  : "bg-brand-text hover:bg-brand-dark text-white shadow-md hover:shadow-lg"
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
      </div>

      {/* Bottom Scrubber Timeline Navigation (Matching Reference Video) */}
      <div className="py-4 sm:py-5 px-5 sm:px-10 lg:px-12 max-w-7xl mx-auto w-full border-t border-brand-border/60 flex items-center justify-between z-20">
        {/* Prev Arrow */}
        <button
          onClick={handlePrev}
          className="p-2 text-brand-text hover:text-brand-accent transition-colors flex items-center space-x-1.5 font-mono text-xs uppercase tracking-wider group"
          aria-label="Previous look"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Timeline Scrubber Points */}
        <div className="flex items-center space-x-2.5 sm:space-x-6 overflow-x-auto no-scrollbar py-1">
          {LOOKS_DATA.map((look, index) => {
            const isActive = index === activeLookIndex;
            return (
              <button
                key={look.id}
                onClick={() => {
                  setActiveLookIndex(index);
                  setAddedOutfit(false);
                  setActiveHotspot(null);
                }}
                className={`relative flex items-center space-x-1.5 text-xs font-mono transition-all py-1.5 px-2 rounded-md ${
                  isActive
                    ? "text-brand-text font-bold"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                <span>{look.lookNumber}</span>
                {isActive && (
                  <span className="font-serif text-[11px] font-normal tracking-normal ml-1 text-brand-text hidden sm:inline">
                    {look.title}
                  </span>
                )}
                {/* Active Indicator Bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeScrubberIndicator"
                    className="absolute inset-x-0 -bottom-1 h-0.5 bg-brand-text"
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          className="p-2 text-brand-text hover:text-brand-accent transition-colors flex items-center space-x-1.5 font-mono text-xs uppercase tracking-wider group"
          aria-label="Next look"
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
}
