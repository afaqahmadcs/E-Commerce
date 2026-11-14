"use client";

import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon, Heart, ShoppingBag, X } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCTS_DATA } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types";
import { staggerGridVariants, gridItemVariants } from "@/components/animations/motionPresets";

const SUGGESTED_QUERIES = [
  "Hoodie",
  "Sneakers",
  "Luka 5",
  "Merino Knit",
  "Chore Jacket",
  "Denim",
  "Leather",
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const { wishlistIds, toggleWishlist, addItem, openDrawer } = useCartStore();

  const results = useMemo(() => {
    let list = [...PRODUCTS_DATA];

    if (categoryFilter !== "all") {
      list = list.filter((p) => p.category === categoryFilter);
    }

    if (!query.trim()) return list;

    const term = query.toLowerCase();
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.subcategory.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }, [query, categoryFilter]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    const color = product.availableColors[0]?.name || "Standard";
    const size = product.category === "sneakers" ? `EU ${product.availableSizes[0] || "42"}` : product.availableSizes[0] || "M";

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.basePrice,
      color,
      size,
      image: product.primaryImage,
      quantity: 1,
      maxStock: 20,
    });

    openDrawer();
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Editorial Search Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-10">
          <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
            SEARCH CATALOGUE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-brand-text font-normal tracking-tight">
            ARCHIVAL SEARCH
          </h1>
          <p className="text-xs text-brand-muted">
            Search our curated selection of heavyweight cottons, tailoring, and archival footwear.
          </p>

          {/* Search Input Box */}
          <div className="relative mt-6 max-w-lg mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by silhouette, material, category..."
              className="w-full bg-white border border-brand-border px-5 py-3.5 pl-12 pr-10 rounded-full text-xs text-brand-text shadow-sm focus:outline-none focus:border-brand-text font-sans"
            />
            <SearchIcon className="w-4 h-4 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2" />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Suggested Term Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
            <span className="text-[10px] font-mono uppercase text-brand-muted mr-1">Trending:</span>
            {SUGGESTED_QUERIES.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 rounded-full bg-white border border-brand-border text-[11px] font-mono text-brand-text hover:border-brand-text transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border mb-8 text-xs font-mono">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
            {["all", "men", "women", "sneakers", "accessories"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-all ${
                  categoryFilter === cat
                    ? "bg-brand-text text-white font-semibold"
                    : "bg-white border border-brand-border text-brand-muted hover:text-brand-text"
                }`}
              >
                {cat === "all" ? "All Departments" : cat}
              </button>
            ))}
          </div>

          <div className="text-brand-muted flex items-center space-x-2">
            <span>RESULTS ({results.length})</span>
            {query && <span className="font-semibold text-brand-text">FOR &ldquo;{query}&rdquo;</span>}
          </div>
        </div>

        {/* Results Grid */}
        {results.length === 0 ? (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <p className="font-serif text-xl text-brand-text">
              No matching pieces found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-brand-muted leading-relaxed">
              We couldn&apos;t find anything matching your exact search. Try exploring our curated departments or checking for spelling variations.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setQuery("");
                  setCategoryFilter("all");
                }}
                className="px-6 py-2.5 bg-brand-text text-white text-xs font-mono uppercase tracking-wider rounded"
              >
                Reset Search
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {results.map((product) => {
              const wishlisted = wishlistIds.includes(product.id);
              const alternateImage = product.secondaryImage || product.allImages?.[1];

              return (
                <motion.div
                  key={product.id}
                  variants={gridItemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="group flex flex-col bg-brand-card/30 border border-brand-border/60 rounded-lg p-3 hover:border-brand-text/30 transition-all shadow-sm"
                >
                  <Link href={`/products/${product.slug}`} className="relative block">
                    <div className="relative aspect-[3/4] w-full bg-[#F3F2EE] rounded overflow-hidden">
                      <Image
                        src={product.primaryImage}
                        alt={product.name}
                        fill
                        className={`object-cover transition-all duration-700 ${
                          alternateImage
                            ? "group-hover:opacity-0 group-hover:scale-105"
                            : "group-hover:scale-105"
                        }`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />

                      {alternateImage && (
                        <Image
                          src={alternateImage}
                          alt={`${product.name} alternate view`}
                          fill
                          className="object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      )}

                      {/* Labels */}
                      {product.isNewArrival && (
                        <span className="absolute top-3 left-3 bg-brand-accent text-white px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase font-bold rounded shadow-sm z-10">
                          NEW DROP
                        </span>
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
                          wishlisted
                            ? "bg-white text-brand-accent shadow"
                            : "bg-white/80 text-brand-muted hover:text-brand-accent hover:bg-white"
                        }`}
                        title="Save to wishlist"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${wishlisted ? "fill-current text-brand-accent" : ""}`}
                        />
                      </button>

                      {/* Quick Add Button */}
                      <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <button
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="w-full py-2 bg-brand-text/95 hover:bg-brand-dark text-white rounded text-[11px] font-mono uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-lg backdrop-blur-sm active:scale-95 transition-all"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Quick Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </Link>

                  <div className="mt-4 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-brand-muted font-sans font-medium block">
                        {product.category}
                      </span>
                      <Link
                        href={`/products/${product.slug}`}
                        className="font-serif text-base text-brand-text group-hover:text-brand-accent transition-colors mt-0.5 line-clamp-1"
                      >
                        {product.name}
                      </Link>
                    </div>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-brand-border/40">
                      <span className="font-mono text-xs font-semibold text-brand-text">
                        ${product.basePrice.toFixed(2)}
                      </span>
                      <div className="flex items-center space-x-1">
                        {product.availableColors.slice(0, 3).map((col) => (
                          <span
                            key={col.name}
                            className="w-2.5 h-2.5 rounded-full border border-black/10"
                            style={{ backgroundColor: col.hex }}
                            title={col.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center py-24">
          <p className="font-mono text-xs text-brand-muted animate-pulse">Loading Search Dispatch...</p>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
