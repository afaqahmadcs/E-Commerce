"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { GARMENTS_DATA } from "@/data/garments";
import { HangingGarment } from "@/types";
import { GarmentQuickViewModal } from "./GarmentQuickViewModal";

export function ClothingRailSection() {
  const [activeGarment, setActiveGarment] = useState<HangingGarment>(GARMENTS_DATA[6]); // Archival Hoodie $199
  const [modalGarment, setModalGarment] = useState<HangingGarment | null>(null);
  const [hoveredGarmentId, setHoveredGarmentId] = useState<string | null>(null);
  const [constraints, setConstraints] = useState({ left: -1600, right: 0 });

  const railRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  // Framer motion x position for animated scrolling
  const x = useMotionValue(0);
  const smoothX = useSpring(x, {
    stiffness: shouldReduceMotion ? 1000 : 240,
    damping: shouldReduceMotion ? 100 : 28,
  });

  // Update drag constraints dynamically based on content width
  useEffect(() => {
    const updateConstraints = () => {
      if (railRef.current && containerRef.current) {
        const railWidth = railRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;
        const maxScroll = Math.min(0, containerWidth - railWidth - 60);
        setConstraints({ left: maxScroll, right: 0 });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  const handleStep = (direction: "left" | "right") => {
    const stepAmount = 360;
    const current = x.get();
    let target = direction === "left" ? current + stepAmount : current - stepAmount;

    // Clamp within constraints
    target = Math.max(constraints.left, Math.min(0, target));
    x.set(target);
  };

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 120);
  };

  const handleGarmentClick = (garment: HangingGarment) => {
    if (isDraggingRef.current) return;
    setActiveGarment(garment);
    setModalGarment(garment);
  };

  return (
    <section className="relative w-full py-14 sm:py-20 lg:py-24 bg-[#F8F7F4] border-b border-brand-border overflow-hidden select-none">
      {/* Centered Editorial Header (Matches Reference 06.0s) */}
      <div className="text-center max-w-xl mx-auto px-5 mb-8 sm:mb-12">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-luxury uppercase text-brand-accent font-semibold block">
          NEW COLLECTION
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-brand-text font-normal tracking-tight mt-1">
          PREMIUM STREETWEAR
        </h2>
        <p className="text-xs text-brand-muted mt-2 tracking-wide font-sans leading-relaxed">
          Suspended silhouettes. Drag horizontally along the rail to explore cuts and fabrics.
        </p>
      </div>

      {/* Main Hanging Rail Wire Stage */}
      <div ref={containerRef} className="relative w-full py-8 sm:py-10 overflow-hidden">
        {/* The Precision Steel Tension Wire running across screen */}
        <div className="absolute top-[88px] inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#8C8880] to-transparent z-0 shadow-sm" />
        
        {/* Subtle wire terminal fixtures on both edges */}
        <div className="absolute top-[85px] left-2 w-2 h-2.5 rounded-sm bg-[#5C5A55] z-0 hidden lg:block" />
        <div className="absolute top-[85px] right-2 w-2 h-2.5 rounded-sm bg-[#5C5A55] z-0 hidden lg:block" />

        {/* Draggable Rail Track with Natural Inertia */}
        <motion.div
          ref={railRef}
          style={{ x: smoothX, touchAction: "pan-y" }}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.12}
          dragTransition={{ bounceStiffness: 280, bounceDamping: 26, power: 0.16 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          className="flex items-start space-x-8 sm:space-x-14 px-8 sm:px-20 cursor-grab active:cursor-grabbing relative z-10 py-4 w-max touch-pan-y will-change-transform"
        >
          {GARMENTS_DATA.map((garment, index) => {
            const isHovered = hoveredGarmentId === garment.id;
            const isSelected = activeGarment.id === garment.id;

            return (
              <motion.div
                key={garment.id}
                onClick={() => handleGarmentClick(garment)}
                onMouseEnter={() => {
                  setHoveredGarmentId(garment.id);
                  setActiveGarment(garment);
                }}
                onMouseLeave={() => setHoveredGarmentId(null)}
                animate={{
                  y: isHovered && !shouldReduceMotion ? -6 : 0,
                  rotate: isHovered && !shouldReduceMotion ? (index % 2 === 0 ? 1.4 : -1.4) : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 24,
                }}
                style={{ transformOrigin: "top center" }}
                className="group relative flex flex-col items-center shrink-0"
              >
                {/* 1. Realistic Metal Hanger Hook resting on the cable */}
                <div className="relative w-6 h-8 flex items-center justify-center -mb-1">
                  <svg
                    viewBox="0 0 24 32"
                    fill="none"
                    className="w-full h-full text-neutral-600 drop-shadow-sm"
                  >
                    <path
                      d="M12 2 C8 2 7 6 7 9 C7 12 11 14 12 16 L12 28"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* 2. Curved Luxury Beechwood Hanger Beam */}
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

                {/* 3. Dangling Minimal Price Tag (Reference 06.0s price tag under hanger) */}
                <div className="relative z-30 -mt-0.5 mb-2 flex flex-col items-center">
                  <div className="w-[1px] h-3 bg-neutral-400" />
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider transition-all duration-200 shadow-sm ${
                      isHovered || isSelected
                        ? "bg-brand-text text-white shadow-md scale-105"
                        : "bg-white/95 border border-brand-border text-brand-text font-medium"
                    }`}
                  >
                    {garment.priceTag}
                  </span>
                </div>

                {/* 4. Isolated Transparent Hanging Garment Asset (NO CARDS, NO BOXES) */}
                <div className="relative w-52 sm:w-64 md:w-72 h-60 sm:h-72 md:h-80 flex items-start justify-center">
                  <Image
                    src={garment.imageFront}
                    alt={garment.name}
                    width={400}
                    height={700}
                    priority={index < 4}
                    className="w-auto h-full object-contain object-top drop-shadow-[0_14px_24px_rgba(0,0,0,0.08)] transition-transform duration-300 group-hover:scale-102"
                    sizes="(max-width: 640px) 210px, (max-width: 1024px) 260px, 300px"
                  />

                  {/* Gentle Floating Inspect Badge on Hover */}
                  <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="px-3 py-1 bg-brand-text/90 backdrop-blur-sm text-[10px] font-sans uppercase tracking-widest text-white rounded-full shadow-lg">
                      Inspect Silhouette
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
          className="absolute left-2 sm:left-6 top-[130px] -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-brand-border shadow-luxury flex items-center justify-center text-brand-text hover:text-brand-accent hover:scale-105 transition-all z-30"
          aria-label="Previous garments"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={() => handleStep("right")}
          className="absolute right-2 sm:right-6 top-[130px] -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-brand-border shadow-luxury flex items-center justify-center text-brand-text hover:text-brand-accent hover:scale-105 transition-all z-30"
          aria-label="Next garments"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Bottom Editorial Microcopy & Active Silhouette Spotlight (Matches Reference 06.0s) */}
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-t border-brand-border/60 pt-6">
        {/* Bottom Left: Selected Garment Specs */}
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono tracking-luxury uppercase text-brand-accent font-semibold block">
              SILHOUETTE {String(activeGarment.hangerIndex).padStart(2, "0")} / 12
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-brand-muted">
              {activeGarment.category}
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-brand-text mt-1">
            {activeGarment.name}
          </h3>

          <div className="flex items-center space-x-3 mt-1.5">
            <p className="font-mono text-sm font-semibold text-brand-text">
              ${activeGarment.price.toFixed(2)}
            </p>
            <span className="text-neutral-300">•</span>
            <p className="text-xs text-brand-muted font-sans">
              {activeGarment.color}
            </p>
          </div>
        </div>

        {/* Bottom Right: Brand Statement & CTA */}
        <div className="sm:text-right max-w-sm">
          <p className="text-xs text-brand-text leading-relaxed font-sans font-normal">
            Crafted in heavyweight fleece. Cut oversized. Made to last.
          </p>
          <div className="mt-2.5 flex items-center sm:justify-end space-x-4">
            <button
              onClick={() => setModalGarment(activeGarment)}
              className="text-xs font-mono uppercase tracking-luxury text-brand-text hover:text-brand-accent font-semibold flex items-center space-x-1"
            >
              <span>Quick View</span>
              <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            </button>
            <span className="text-neutral-300">•</span>
            <Link
              href="/shop?category=men"
              className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-luxury text-brand-accent hover:text-brand-dark font-medium group"
            >
              <span>Shop All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick View Modal (Reference 07.5s - 11.0s) */}
      <GarmentQuickViewModal
        garment={modalGarment}
        onClose={() => setModalGarment(null)}
      />
    </section>
  );
}
