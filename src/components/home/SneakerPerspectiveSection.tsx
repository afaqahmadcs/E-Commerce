"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SNEAKERS_DATA } from "@/data/sneakers";

export function SneakerPerspectiveSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedEuSize, setSelectedEuSize] = useState<number | null>(40);
  const wheelAccumulatorRef = useRef(0);
  const wheelCooldownRef = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  const activeSneaker = SNEAKERS_DATA[activeIndex];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : SNEAKERS_DATA.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < SNEAKERS_DATA.length - 1 ? prev + 1 : 0));
  }, []);

  // Touchpad two-finger swipe & mouse wheel support
  const handleWheel = useCallback((e: React.WheelEvent) => {
    const now = Date.now();
    if (now - wheelCooldownRef.current < 160) return;

    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const delta = isHorizontal ? e.deltaX : (e.shiftKey ? e.deltaY : (Math.abs(e.deltaY) > 20 ? e.deltaY : 0));

    if (Math.abs(delta) > 4) {
      wheelAccumulatorRef.current += delta;

      if (Math.abs(wheelAccumulatorRef.current) > 24) {
        if (wheelAccumulatorRef.current > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        wheelAccumulatorRef.current = 0;
        wheelCooldownRef.current = now;
      }
    }
  }, [handleNext, handlePrev]);

  return (
    <section 
      onWheel={handleWheel}
      className="relative w-full min-h-[84vh] bg-[#F8F7F4] pt-16 sm:pt-20 pb-10 px-6 sm:px-12 flex flex-col justify-between overflow-hidden border-b border-brand-border select-none scroll-mt-24"
    >
      {/* Top Header & Active Sneaker Meta with generous top breathing room */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-start z-10 pt-4 sm:pt-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-brand-muted">
            {String(activeIndex + 1).padStart(2, "0")} / {String(SNEAKERS_DATA.length).padStart(2, "0")}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-brand-text mt-1">
            {activeSneaker.modelName}
          </h2>
          <p className="font-mono text-base font-semibold text-brand-text mt-1">
            ${activeSneaker.price.toFixed(2)}
          </p>
          <Link
            href={`/products/${activeSneaker.slug}`}
            className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-luxury text-brand-accent hover:underline mt-3"
          >
            <span>View details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="hidden md:block text-right">
          <span className="text-[10px] font-mono tracking-widest uppercase text-brand-muted block">
            FOOTWEAR DIVISION
          </span>
          <span className="text-xs font-sans text-brand-text font-medium">
            Archival & Performance Engineering
          </span>
        </div>
      </div>

      {/* Main 3D Spatial Diagonal Perspective Orbit Stage with Fluid Drag */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        onDragEnd={(_e, info) => {
          if (info.offset.x < -25 || info.velocity.x < -80) {
            handleNext();
          } else if (info.offset.x > 25 || info.velocity.x > 80) {
            handlePrev();
          }
        }}
        className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-6 min-h-[340px] cursor-grab active:cursor-grabbing select-none touch-pan-y"
      >
        <div className="relative w-full h-[380px] flex items-center justify-center pointer-events-none">
          {SNEAKERS_DATA.map((sneaker, index) => {
            // Calculate diagonal 3D trajectory positions
            const offset = index - activeIndex;
            const xPos = offset * 180;
            const yPos = -offset * 50;
            const scale = 1 - Math.abs(offset) * 0.15;
            const opacity = Math.max(1 - Math.abs(offset) * 0.35, 0.2);
            const zIndex = 20 - Math.abs(offset);

            // Hide items too far off
            if (Math.abs(offset) > 3) return null;

            return (
              <div
                key={sneaker.id}
                onClick={() => setActiveIndex(index)}
                style={{
                  transform: `translate3d(${xPos}px, ${yPos}px, 0) scale(${shouldReduceMotion ? 1 : scale})`,
                  opacity,
                  zIndex,
                }}
                className="absolute cursor-pointer transition-all duration-700 ease-out flex flex-col items-center group pointer-events-auto"
              >
                <div className="relative w-64 sm:w-80 h-44 sm:h-52 drop-shadow-xl">
                  <Image
                    src={sneaker.image}
                    alt={sneaker.modelName}
                    fill
                    className="object-contain transform -rotate-12 group-hover:scale-110 transition-transform duration-500"
                    sizes="320px"
                  />
                </div>
                {/* Contact Shadow */}
                <div className="w-48 h-5 bg-black/15 blur-md rounded-full mt-2 -rotate-12" />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom Controls Bar (Matches Reference 12.5s bottom) */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6 z-10 pt-4 border-t border-brand-border/60">
        {/* Left Section Label */}
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={handlePrev}
            className="p-1 rounded-full border border-neutral-300 hover:border-black text-brand-text transition-colors"
            aria-label="Previous sneaker"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1 rounded-full border border-neutral-300 hover:border-black text-brand-text transition-colors"
            aria-label="Next sneaker"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <p className="text-[10px] font-mono tracking-widest uppercase text-brand-muted ml-2">
            TOUCH / DRAG / WHEEL PERSPECTIVE
          </p>
        </div>

        {/* Center Perspective Slider Control */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-3 bg-brand-card/90 px-4 py-2 rounded-full border border-brand-border shadow-sm">
            {SNEAKERS_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex ? "w-8 bg-brand-text" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
                aria-label={`Slide to sneaker ${i + 1}`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">
            DRAG OR SWIPE TO ROTATE
          </span>
        </div>

        {/* Right European Shoe Size Matrix */}
        <div className="flex items-center space-x-1.5">
          <span className="text-[11px] font-mono uppercase text-brand-muted mr-1 hidden sm:inline">
            EU
          </span>
          {[40, 41, 42, 43, 44, 45, 46].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedEuSize(size)}
              className={`w-8 h-8 rounded text-xs font-mono transition-all flex items-center justify-center ${
                selectedEuSize === size
                  ? "bg-brand-text text-white font-bold shadow-sm"
                  : "bg-white border border-brand-border text-brand-text hover:border-brand-text"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* OBSESSED Bold Watermark Header (Matches Reference 12.5s bottom edge) */}
      <div className="text-center pt-6 overflow-hidden pointer-events-none opacity-10">
        <span className="font-sans font-black text-6xl sm:text-8xl tracking-widest uppercase text-brand-text">
          OBSESSED
        </span>
      </div>
    </section>
  );
}
