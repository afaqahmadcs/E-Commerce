"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { PRODUCTS_DATA } from "@/data/products";

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useCartStore();
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSearchTerm("");
    }
  }, [isSearchOpen]);

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return PRODUCTS_DATA.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.subcategory.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const quickPills = ["Hoodie", "LUKA 5", "Denim", "Merino", "Outerwear", "Tee"];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 md:p-20">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-[#F8F7F4] rounded-lg shadow-2xl border border-brand-border overflow-hidden"
            >
              {/* Search Header Bar */}
              <div className="p-6 border-b border-brand-border flex items-center space-x-4">
                <Search className="w-5 h-5 text-brand-muted shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products, silhouettes, fabrics, sneakers..."
                  className="w-full bg-transparent text-sm sm:text-base font-sans text-brand-text placeholder:text-brand-muted focus:outline-none"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-xs text-brand-muted hover:text-brand-text p-1 font-mono"
                  >
                    CLEAR
                  </button>
                )}
                <button
                  onClick={closeSearch}
                  className="p-1 text-brand-muted hover:text-brand-text transition-colors rounded-full hover:bg-neutral-200"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Filter Tags */}
              <div className="px-6 py-3.5 bg-brand-card/70 border-b border-brand-border flex items-center space-x-2 overflow-x-auto text-xs">
                <span className="text-[11px] uppercase tracking-luxury text-brand-muted shrink-0 mr-1 flex items-center space-x-1">
                  <Tag className="w-3 h-3 mr-1" /> Trending:
                </span>
                {quickPills.map((pill) => (
                  <button
                    key={pill}
                    onClick={() => setSearchTerm(pill)}
                    className="px-2.5 py-1 bg-white border border-brand-border rounded-full text-xs text-brand-text hover:border-brand-accent hover:text-brand-accent transition-colors shrink-0"
                  >
                    {pill}
                  </button>
                ))}
              </div>

              {/* Results Area */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {searchTerm.trim() === "" ? (
                  <div className="text-center py-10 text-brand-muted space-y-2">
                    <p className="text-xs uppercase tracking-luxury">Type to search AFAQ SUPPLY catalog</p>
                    <p className="text-xs text-neutral-400">Search by collection, category, material or product name</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="text-center py-12 text-brand-muted space-y-3">
                    <p className="text-sm font-serif">No products found for &ldquo;{searchTerm}&rdquo;</p>
                    <p className="text-xs max-w-xs mx-auto text-neutral-400">
                      Try checking your spelling or searching for a broader term like &ldquo;Hoodie&rdquo; or &ldquo;Sneakers&rdquo;.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={closeSearch}
                        className="flex items-center space-x-3.5 p-2.5 rounded-md hover:bg-brand-card border border-transparent hover:border-brand-border transition-all group"
                      >
                        <div className="relative w-16 h-20 bg-brand-card rounded overflow-hidden shrink-0">
                          <Image
                            src={product.primaryImage}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-brand-accent font-semibold block">
                            {product.category} • {product.subcategory}
                          </span>
                          <p className="text-xs font-serif font-medium text-brand-text truncate group-hover:text-brand-accent transition-colors">
                            {product.name}
                          </p>
                          <p className="text-xs font-mono font-semibold text-brand-text mt-1">
                            ${product.basePrice.toFixed(2)}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-text group-hover:translate-x-1 transition-all shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Direct Route */}
              {searchTerm.trim() && (
                <div className="p-4 bg-brand-card border-t border-brand-border text-center">
                  <Link
                    href={`/search?q=${encodeURIComponent(searchTerm)}`}
                    onClick={closeSearch}
                    className="text-xs uppercase tracking-luxury text-brand-text hover:text-brand-accent font-medium"
                  >
                    View all results for &ldquo;{searchTerm}&rdquo; →
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
