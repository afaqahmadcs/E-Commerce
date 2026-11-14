"use client";

import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  SlidersHorizontal,
  Heart,
  ShoppingBag,
  X,
} from "lucide-react";
import { PRODUCTS_DATA } from "@/data/products";
import { ProductCategory, Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { staggerGridVariants, gridItemVariants } from "@/components/animations/motionPresets";

const CATEGORY_BANNERS: Record<string, { title: string; subtitle: string; desc: string; image: string }> = {
  all: {
    title: "ALL SILHOUETTES",
    subtitle: "CATALOGUE DISPATCH",
    desc: "Architectural proportions, heavyweight Portuguese cottons, and handcrafted archival footwear.",
    image: "/images/banners/banner_01.jpg",
  },
  men: {
    title: "MEN'S ATELIER",
    subtitle: "READY-TO-WEAR",
    desc: "500+ GSM French Terry hoodies, relaxed vintage denim, and structured chore jackets.",
    image: "/images/collections/collection_02.jpg",
  },
  women: {
    title: "WOMEN'S STUDIO",
    subtitle: "SCULPTURAL TAILORING",
    desc: "Noble natural fibers, fluid wide-leg silhouettes, and architectural wool coats.",
    image: "/images/collections/collection_04.jpg",
  },
  sneakers: {
    title: "ARCHIVAL FOOTWEAR",
    subtitle: "ENGINEERED RUNNERS & COURTS",
    desc: "Full-grain Italian calfskin leather with responsive cushioning and herringbone traction.",
    image: "/images/collections/collection_03.jpg",
  },
  accessories: {
    title: "LEATHER OBJECTS",
    subtitle: "ARTISANAL ACCENTS",
    desc: "Hand-burnished weekender duffles, cardholders, and precision sapphire chronographs.",
    image: "/images/banners/banner_02.jpg",
  },
};

const COLOR_OPTIONS = [
  { name: "Black", hex: "#1A1A1A" },
  { name: "White", hex: "#FDFDFD" },
  { name: "Grey", hex: "#8E8E93" },
  { name: "Cream", hex: "#F3EBDD" },
  { name: "Green", hex: "#2E473B" },
  { name: "Navy", hex: "#1C2D42" },
  { name: "Olive", hex: "#556B2F" },
  { name: "Burgundy", hex: "#6B1D2F" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as ProductCategory | null;
  const filterParam = searchParams.get("filter");

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(500);

  const { wishlistIds, toggleWishlist, addItem, openDrawer } = useCartStore();

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

    if (selectedColor) {
      result = result.filter((p) =>
        p.availableColors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()))
      );
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
  }, [selectedCategory, filterParam, selectedColor, selectedSize, maxPrice, sortBy]);

  const activeBanner = CATEGORY_BANNERS[selectedCategory] || CATEGORY_BANNERS.all;

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

  const hasActiveFilters = selectedColor || selectedSize || maxPrice < 500;

  const clearFilters = () => {
    setSelectedColor(null);
    setSelectedSize(null);
    setMaxPrice(500);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Category Editorial Hero Banner */}
      <div className="relative w-full h-[320px] sm:h-[400px] bg-brand-dark flex items-center justify-center text-white overflow-hidden">
        <Image
          src={activeBanner.image}
          alt={activeBanner.title}
          fill
          className="object-cover opacity-65"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
            {activeBanner.subtitle}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
            {activeBanner.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
            {activeBanner.desc}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        {/* Department Category Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
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

          {/* Sort & Count Controls */}
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

        {/* Filter Toolbar: Color, Size & Price */}
        <div className="py-4 border-b border-brand-border/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            {/* Color Swatches */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted">Color:</span>
              <div className="flex items-center space-x-1.5">
                {COLOR_OPTIONS.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(selectedColor === col.name ? null : col.name)}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      selectedColor === col.name
                        ? "ring-2 ring-brand-accent ring-offset-2 scale-110"
                        : "border-brand-border hover:scale-105"
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Filter Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted">Size:</span>
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    selectedSize === size
                      ? "bg-brand-text text-white font-bold"
                      : "bg-white border border-brand-border text-brand-text hover:border-brand-text"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center space-x-1 text-[11px] font-mono uppercase tracking-wider text-brand-accent hover:underline"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <p className="font-serif text-lg text-brand-text">No garments match your selected criteria.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-brand-text text-white text-xs uppercase font-mono tracking-wider rounded"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10"
          >
            {filteredProducts.map((product) => {
              const wishlisted = wishlistIds.includes(product.id);
              const alternateImage = product.secondaryImage || product.allImages?.[1];

              return (
                <motion.div
                  key={product.id}
                  variants={gridItemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                  className="group flex flex-col bg-brand-card/30 border border-brand-border/60 rounded-lg p-3 hover:border-brand-text/30 transition-all shadow-sm"
                >
                  <Link href={`/products/${product.slug}`} className="relative block">
                    <div className="relative aspect-[3/4] w-full bg-[#F3F2EE] rounded overflow-hidden">
                      {/* Primary Packshot */}
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

                      {/* Genuine Alternate Angle / Lifestyle Reveal on Hover */}
                      {alternateImage && (
                        <Image
                          src={alternateImage}
                          alt={`${product.name} alternate view`}
                          fill
                          className="object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      )}

                      {/* Labels and Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                        {product.isNewArrival && (
                          <span className="bg-brand-accent text-white px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase font-bold rounded shadow-sm">
                            NEW DROP
                          </span>
                        )}
                        {product.isFeatured && (
                          <span className="bg-white/95 backdrop-blur-sm text-brand-text px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase font-semibold rounded shadow-sm">
                            ARCHIVE
                          </span>
                        )}
                      </div>

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

                      {/* Quick Add Button on Hover */}
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
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-semibold text-brand-text">
                          ${product.basePrice.toFixed(2)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="font-mono text-xs text-brand-muted line-through">
                            ${product.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-1">
                        {product.availableColors.slice(0, 3).map((col) => (
                          <span
                            key={col.name}
                            className="w-2.5 h-2.5 rounded-full border border-black/10"
                            style={{ backgroundColor: col.hex }}
                            title={col.name}
                          />
                        ))}
                        {product.availableColors.length > 3 && (
                          <span className="text-[9px] font-mono text-brand-muted">
                            +{product.availableColors.length - 3}
                          </span>
                        )}
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

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center py-24">
          <p className="font-mono text-xs text-brand-muted animate-pulse">Loading Atelier Catalogue...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
