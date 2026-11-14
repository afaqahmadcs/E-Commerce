"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { GARMENTS_DATA } from "@/data/garments";
import { HangingGarment } from "@/types";
import { GarmentQuickViewModal } from "./GarmentQuickViewModal";

export function ClothingRailSection() {
  const [activeGarment, setActiveGarment] = useState<HangingGarment>(GARMENTS_DATA[6]); // Hoodie $199
  const [modalGarment, setModalGarment] = useState<HangingGarment | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#F8F7F4] border-b border-brand-border overflow-hidden select-none">
      {/* Centered Editorial Header (Matches Reference 06.0s) */}
      <div className="text-center max-w-xl mx-auto px-4 mb-12 sm:mb-16">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-luxury uppercase text-brand-accent font-semibold block">
          NEW COLLECTION
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-brand-text font-normal tracking-tight mt-1">
          PREMIUM STREETWEAR
        </h2>
        <p className="text-xs text-brand-muted mt-2 tracking-wide">
          Suspended archives. Drag along the rail to explore silhouettes.
        </p>
      </div>

      {/* Horizontal Rail Wire & Suspended Hangers Stage */}
      <div className="relative w-full py-12">
        {/* The Minimal Tension Cable / Wire across screen */}
        <div className="absolute top-[82px] inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C2BFB6] to-transparent z-0" />

        {/* Scrollable Container with Clothes */}
        <div
          ref={scrollContainerRef}
          className="flex items-start space-x-8 sm:space-x-12 px-8 sm:px-16 overflow-x-auto no-scrollbar scroll-smooth relative z-10 py-4"
        >
          {GARMENTS_DATA.map((garment) => {
            const isSelected = garment.id === activeGarment.id;

            return (
              <div
                key={garment.id}
                onClick={() => {
                  setActiveGarment(garment);
                  setModalGarment(garment);
                }}
                onMouseEnter={() => setActiveGarment(garment)}
                className={`group flex flex-col items-center cursor-pointer transition-all duration-300 shrink-0 ${
                  isSelected ? "scale-105" : "hover:scale-102 opacity-85 hover:opacity-100"
                }`}
              >
                {/* Hanger Hook resting on the wire */}
                <div className="w-[1px] h-6 bg-neutral-500 mb-[-2px]" />

                {/* Wooden Hanger */}
                <div className="w-28 h-6 text-amber-950/80 mb-[-4px]">
                  <svg viewBox="0 0 100 24" fill="currentColor" className="w-full h-full drop-shadow-sm">
                    <path d="M50 0 C47 0 45 4 45 7 C45 10 48 12 50 12 L50 15 L2 22 C0 22 0 24 2 24 L98 24 C100 24 100 22 98 22 L50 15 Z" />
                  </svg>
                </div>

                {/* Dangling Price Tag (Reference 06.0s price tag under hanger) */}
                <div className="z-20 -mt-1 mb-1">
                  <span className="px-1.5 py-0.5 bg-white/95 border border-brand-border text-[9px] font-mono text-brand-text font-semibold rounded shadow-sm">
                    {garment.priceTag}
                  </span>
                </div>

                {/* Garment Silhouette Card */}
                <div
                  className={`relative w-44 sm:w-52 h-64 sm:h-76 rounded-lg overflow-hidden shadow-luxury bg-brand-card transition-all duration-300 ${
                    isSelected ? "ring-2 ring-brand-text shadow-xl" : "border border-brand-border/60"
                  }`}
                >
                  <Image
                    src={garment.imageFront}
                    alt={garment.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="200px"
                  />
                  
                  {/* Subtle garment overlay on hover */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[10px] font-sans uppercase tracking-wider font-semibold text-brand-text rounded-full shadow-md">
                      Inspect piece
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rail Arrow Controls */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-brand-border shadow-md flex items-center justify-center text-brand-text hover:text-brand-accent hover:scale-110 transition-all z-20"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => handleScroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-brand-border shadow-md flex items-center justify-center text-brand-text hover:text-brand-accent hover:scale-110 transition-all z-20"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Editorial Microcopy & Active Garment Tracker (Matches Reference 06.0s bottom) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        {/* Bottom Left Active Item */}
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-brand-muted block">
            SELECTED SILHOUETTE
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-brand-text mt-0.5">
            {activeGarment.name}
          </h3>
          <p className="font-mono text-sm font-semibold text-brand-text mt-0.5">
            ${activeGarment.price.toFixed(2)}
          </p>
        </div>

        {/* Bottom Right Brand Microcopy & Link */}
        <div className="sm:text-right max-w-sm">
          <p className="text-xs text-brand-text leading-relaxed font-sans">
            Crafted in heavyweight fleece. Cut oversized. Made to last.
          </p>
          <Link
            href="/shop?category=men"
            className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-luxury text-brand-accent hover:text-brand-accent-hover font-medium mt-2"
          >
            <span>Shop the Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <GarmentQuickViewModal
        garment={modalGarment}
        onClose={() => setModalGarment(null)}
      />
    </section>
  );
}

