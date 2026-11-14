"use client";

import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Eye } from "lucide-react";
import { PRODUCTS_DATA } from "@/data/products";
import { ProductCategory } from "@/types";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as ProductCategory | null;
  const filterParam = searchParams.get("filter");

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(500);

  const categories = [
    { label: "All Collections", value: "all" },
    { label: "Men's Atelier", value: "men" },
    { label: "Women's Studio", value: "women" },
    { label: "Sneakers", value: "sneakers" },
    { label: "Accessories", value: "accessories" },
  ];

  const availableSizes = ["XS", "S", "M", "L", "XL", "40", "41", "42", "43", "44", "45", "46"];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS_DATA];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (filterParam === "new") {
      result = result.filter((p) => p.isNewArrival);
    }

    if (selectedSize) {
      result = result.filter((p) => p.availableSizes.includes(selectedSize));
    }

    result = result.filter((p) => p.basePrice <= maxPrice);

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [selectedCategory, filterParam, selectedSize, maxPrice, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
          CATALOGUE DISPATCH
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-brand-text tracking-tight mt-1">
          {selectedCategory === "all"
            ? "ALL SILHOUETTES"
            : categories.find((c) => c.value === selectedCategory)?.label.toUpperCase()}
        </h1>
        <p className="text-xs text-brand-muted mt-2">
          Architectural proportions, heavyweight cottons, and archival footwear.
        </p>
      </div>

      {/* Filter and Category Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all shrink-0 ${
                selectedCategory === cat.value
                  ? "bg-brand-text text-white font-semibold shadow-sm"
                  : "bg-white border border-brand-border text-brand-text hover:border-brand-text"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort & Size Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs">
            <SlidersHorizontal className="w-4 h-4 text-brand-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-brand-border px-3 py-1.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text font-sans"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest Releases</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <span className="text-xs font-mono text-brand-muted">
            ({filteredProducts.length} pieces)
          </span>
        </div>
      </div>

      {/* Secondary Size Filter Strip */}
      <div className="py-4 flex items-center space-x-2 overflow-x-auto text-xs text-brand-muted no-scrollbar">
        <span className="text-[10px] font-mono uppercase tracking-wider text-brand-text font-semibold shrink-0">
          Filter by Size:
        </span>
        <button
          onClick={() => setSelectedSize(null)}
          className={`px-2.5 py-1 rounded text-[11px] font-mono ${
            selectedSize === null
              ? "bg-brand-text text-white"
              : "hover:text-brand-text"
          }`}
        >
          All
        </button>
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(selectedSize === size ? null : size)}
            className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
              selectedSize === size
                ? "bg-brand-text text-white font-bold"
                : "bg-white border border-brand-border text-brand-text hover:border-brand-text"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 space-y-4">
          <p className="font-serif text-lg text-brand-text">No garments match your selected criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedSize(null);
              setMaxPrice(500);
            }}
            className="px-6 py-2.5 bg-brand-text text-white text-xs uppercase tracking-luxury rounded"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full bg-brand-card rounded-lg overflow-hidden border border-brand-border/60">
                <Image
                  src={product.primaryImage}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {product.isNewArrival && (
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase font-semibold text-brand-text rounded">
                    NEW DROP
                  </span>
                )}

                {/* Hover Action Preview */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between text-white text-xs">
                  <span className="font-sans uppercase text-[10px] tracking-wider">
                    {product.availableSizes.join(" • ")}
                  </span>
                  <span className="flex items-center space-x-1 font-mono text-[11px] underline">
                    <span>Inspect</span>
                    <Eye className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted font-sans font-medium block">
                    {product.category} • {product.subcategory}
                  </span>
                  <h3 className="font-serif text-base text-brand-text group-hover:text-brand-accent transition-colors mt-0.5 line-clamp-1">
                    {product.name}
                  </h3>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-brand-text">
                    ${product.basePrice.toFixed(2)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="font-mono text-xs text-brand-muted line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-12 text-center text-xs font-mono">LOADING CATALOGUE...</div>}>
      <ShopContent />
    </Suspense>
  );
}

