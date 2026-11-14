"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { GARMENTS_DATA } from "@/data/garments";
import { HangingGarment } from "@/types";
import { GarmentQuickViewModal } from "./GarmentQuickViewModal";

// 22 unique hanging garments matching the dense archive rack in reference video
const EXTENDED_RAIL_DATA: HangingGarment[] = GARMENTS_DATA;

export function ClothingRailSection() {
  const [activeGarment, setActiveGarment] = useState<HangingGarment>(EXTENDED_RAIL_DATA[6]);
  const [modalGarment, setModalGarment] = useState<HangingGarment | null>(null);
  const [hoveredGarmentId, setHoveredGarmentId] = useState<string | null>(null);
  const [constraints, setConstraints] = useState({ left: -3600, right: 0 });

  const railRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  // Framer motion x position for animated scrolling
  const x = useMotionValue(0);
  const smoothX = useSpring(x, {
    stiffness: shouldReduceMotion ? 1000 : 320,
    damping: shouldReduceMotion ? 100 : 32,
    mass: 0.5,
  });

  // Update drag constraints dynamically based on content width
  useEffect(() => {
    const updateConstraints = () => {
      if (railRef.current && containerRef.current) {
        const railWidth = railRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;
        const calculated = containerWidth - railWidth - 100;
        // Never lock to 0: fallback to -3600 for 22 dense garments
        const minScroll = calculated < -200 ? calculated : -3600;
        setConstraints({ left: minScroll, right: 0 });
      }
    };

    updateConstraints();
    const t1 = setTimeout(updateConstraints, 300);
    const t2 = setTimeout(updateConstraints, 1000);
    window.addEventListener("resize", updateConstraints);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", updateConstraints);
    };
  }, []);

  const handleStep = useCallback((direction: "left" | "right") => {
    const stepAmount = 320;
    const current = x.get();
    let target = direction === "left" ? current + stepAmount : current - stepAmount;
    const minLeft = constraints.left < -200 ? constraints.left : -3600;

    target = Math.max(minLeft, Math.min(0, target));
    x.set(target);
  }, [constraints.left, x]);

  // Touchpad two-finger horizontal scroll & mouse wheel navigation
  const handleWheel = useCallback((e: React.WheelEvent) => {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const delta = isHorizontal ? e.deltaX : (e.shiftKey ? e.deltaY : e.deltaY * 0.75);

    if (Math.abs(delta) > 1.5) {
      const current = x.get();
      let target = current - delta * 1.5;
      const minLeft = constraints.left < -200 ? constraints.left : -3600;
      target = Math.max(minLeft, Math.min(0, target));
      x.set(target);
    }
  }, [constraints.left, x]);

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 80);
  };

  const handleGarmentClick = (garment: HangingGarment) => {
    if (isDraggingRef.current) return;
    setActiveGarment(garment);
    setModalGarment(garment);
  };

  return (
    <section 
      onWheel={handleWheel}
      className="relative w-full py-12 sm:py-16 bg-[#F8F7F4] border-b border-brand-border overflow-hidden select-none"
    >
      {/* Top Center Editorial Header (Matches Reference Image 5) */}
      <div className="text-center max-w-xl mx-auto px-5 mb-4 sm:mb-6">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-luxury uppercase text-brand-muted font-medium block">
          NEW COLLECTION &nbsp;&nbsp; PREMIUM STREETWEAR
        </span>
      </div>

      {/* Main Hanging Rail Wire Stage */}
      <div ref={containerRef} className="relative w-full py-6 sm:py-8 overflow-hidden">
        {/* Continuous Precision Steel Tension Wire running across screen */}
        <div className="absolute top-[52px] sm:top-[56px] inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#9A968F] to-transparent z-0 shadow-sm" />
        
        {/* Terminal fixtures on edges */}
        <div className="absolute top-[50px] sm:top-[54px] left-3 w-2.5 h-2 rounded-sm bg-[#5C5A55] z-0 hidden lg:block" />
        <div className="absolute top-[50px] sm:top-[54px] right-3 w-2.5 h-2 rounded-sm bg-[#5C5A55] z-0 hidden lg:block" />

        {/* Draggable Rail Track with Natural Inertia */}
        <motion.div
          ref={railRef}
          style={{ x: smoothX, touchAction: "pan-y" }}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.12}
          onDragStart={handleDragStart}
          onDragEnd={(_e, info) => {
            const current = x.get();
            const minLeft = constraints.left < -200 ? constraints.left : -3600;
            const target = Math.max(minLeft, Math.min(0, current + info.offset.x * 0.3));
            x.set(target);
            handleDragEnd();
          }}
          className="flex items-start space-x-4 sm:space-x-6 px-6 sm:px-16 cursor-grab active:cursor-grabbing relative z-10 py-2 w-max touch-pan-y will-change-transform"
        >
          {EXTENDED_RAIL_DATA.map((garment, index) => {
            const isHovered = hoveredGarmentId === garment.id;
            const isSelected = activeGarment.id === garment.id;

            return (
              <motion.div
                key={`${garment.id}-${index}`}
                onClick={() => handleGarmentClick(garment)}
                onMouseEnter={() => {
                  setHoveredGarmentId(garment.id);
                  setActiveGarment(garment);
                }}
                onMouseLeave={() => setHoveredGarmentId(null)}
                animate={{
                  y: isHovered && !shouldReduceMotion ? -6 : 0,
                  rotate: isHovered && !shouldReduceMotion ? (index % 2 === 0 ? 1.5 : -1.5) : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 24,
                }}
                style={{ transformOrigin: "top center" }}
                className="group relative flex flex-col items-center shrink-0 cursor-pointer"
              >
                {/* 1. Sleek Minimal Metallic Wire Loop Hook resting on cable */}
                <div className="relative w-4 h-6 flex items-center justify-center -mb-1">
                  <svg
                    viewBox="0 0 16 24"
                    fill="none"
                    className="w-full h-full text-neutral-600 drop-shadow-sm"
                  >
                    <path
                      d="M8 2 C5 2 4 5 4 7 C4 9 7 11 8 13 L8 22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* 2. Dangling Crisp White Price Ticket (Matches Reference Image 5) */}
                <div className="relative z-30 -mt-0.5 mb-1 flex flex-col items-center">
                  <div className="w-[1px] h-2 bg-neutral-400" />
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider transition-all duration-200 shadow-sm ${
                      isHovered || isSelected
                        ? "bg-brand-text text-white shadow-md scale-105"
                        : "bg-white border border-neutral-300 text-brand-text font-semibold"
                    }`}
                  >
                    {garment.priceTag}
                  </span>
                </div>

                {/* 3. Authentic Compact Hanging Garment Silhouette */}
                <div className="relative w-20 sm:w-24 md:w-28 h-48 sm:h-56 md:h-64 flex items-start justify-center">
                  <Image
                    src={garment.imageHanging || garment.imageFront}
                    alt={garment.name}
                    width={320}
                    height={600}
                    priority={index < 8}
                    className="w-auto h-full object-contain object-top drop-shadow-[0_8px_18px_rgba(0,0,0,0.07)] transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100px, (max-width: 1024px) 120px, 140px"
                  />

                  {/* Gentle Floating Inspect Badge on Hover */}
                  <div className="absolute inset-x-0 bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="px-2.5 py-0.5 bg-brand-text/90 backdrop-blur-sm text-[9px] font-sans uppercase tracking-widest text-white rounded-full shadow-lg">
                      Inspect
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Floating Discrete Rail Navigation Controls */}
        <button
          onClick={() => handleStep("left")}
          className="absolute left-2 sm:left-6 top-[120px] -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-brand-border shadow-luxury flex items-center justify-center text-brand-text hover:text-brand-accent hover:scale-105 transition-all z-30"
          aria-label="Previous garments"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleStep("right")}
          className="absolute right-2 sm:right-6 top-[120px] -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-brand-border shadow-luxury flex items-center justify-center text-brand-text hover:text-brand-accent hover:scale-105 transition-all z-30"
          aria-label="Next garments"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Editorial Text on Right & Active Garment Summary (Matches Reference Image 5) */}
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-t border-brand-border/60 pt-4">
        {/* Left: Active Garment Specs */}
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono tracking-luxury uppercase text-brand-accent font-semibold block">
              SILHOUETTE {String(activeGarment.hangerIndex).padStart(2, "0")} / 16
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-brand-muted">
              {activeGarment.category}
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-medium text-brand-text mt-0.5">
            {activeGarment.name}
          </h3>

          <p className="text-xs text-brand-muted mt-1 font-sans max-w-md hidden sm:block">
            {activeGarment.description}
          </p>
        </div>

        {/* Right Side Editorial Copy (Exact match from Reference Image 5) */}
        <div className="text-left sm:text-right">
          <p className="text-xs font-serif text-brand-text leading-relaxed font-normal">
            Crafted in heavyweight fleece.
          </p>
          <p className="text-xs font-serif text-brand-muted leading-relaxed font-normal">
            Cut oversized. Made to last.
          </p>

          <Link
            href="/shop"
            className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-luxury text-brand-text hover:text-brand-accent font-semibold mt-2 group"
          >
            <span>Shop the Collection</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Suspended Isolated Quick-View Modal */}
      {modalGarment && (
        <GarmentQuickViewModal
          garment={modalGarment}
          onClose={() => setModalGarment(null)}
        />
      )}
    </section>
  );
}
