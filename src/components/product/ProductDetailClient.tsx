"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Check,
  Ruler,
  ChevronRight,
  ShoppingBag,
  ZoomIn,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const isHoodie =
    Boolean(product.subcategory?.toLowerCase().includes("hoodie")) ||
    product.slug.includes("hoodie");

  const isSneaker =
    product.category === "sneakers" ||
    Boolean(product.subcategory?.toLowerCase().includes("sneaker")) ||
    Boolean(product.subcategory?.toLowerCase().includes("footwear")) ||
    product.slug.includes("sneaker") ||
    product.slug.includes("luka");

  const [selectedImage, setSelectedImage] = useState(product.primaryImage);
  const [selectedColor, setSelectedColor] = useState(
    product.availableColors[0]?.name || "Standard"
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const quantity = 1;
  const [isAdded, setIsAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "materials" | "shipping">("details");

  // Hoodie specific states
  const [hoodieView, setHoodieView] = useState<"front" | "back">("front");

  // Zoom lens state
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const { addItem, openDrawer, toggleWishlist, isWishlisted } = useCartStore();
  const wishlisted = isWishlisted(product.id);

  // Variant matching
  const activeVariant = product.variants.find(
    (v) =>
      v.colorName.toLowerCase() === selectedColor.toLowerCase() &&
      v.size === selectedSize
  );

  const isOutOfStock = activeVariant ? activeVariant.inventoryQuantity === 0 : false;
  const currentStock = activeVariant
    ? activeVariant.inventoryQuantity
    : isSneaker
    ? 14
    : 18;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  const handleColorChange = (colName: string, colImage: string) => {
    setSelectedColor(colName);
    setSelectedImage(colImage);
    setIsAdded(false);
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.basePrice,
      color: selectedColor,
      size: isSneaker ? `EU ${selectedSize}` : selectedSize,
      image: selectedImage,
      quantity,
      maxStock: currentStock,
    });

    setIsAdded(true);
    setTimeout(() => {
      openDrawer();
    }, 400);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.basePrice,
      color: selectedColor,
      size: isSneaker ? `EU ${selectedSize}` : selectedSize,
      image: selectedImage,
      quantity,
      maxStock: currentStock,
    });

    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-brand-text select-none">
      {/* Top Editorial Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-8 pb-4">
        <nav className="flex items-center space-x-2 text-[11px] font-mono text-brand-muted uppercase tracking-wider">
          <Link href="/" className="hover:text-brand-text transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-brand-text transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <span className="text-brand-text font-semibold truncate max-w-xs">
            {product.name}
          </span>
        </nav>
      </div>

      {/* =========================================================================
          PART A — HOODIE MINIMAL EDITORIAL LAYOUT (Reference Video 08.5s - 11.0s)
          ========================================================================= */}
      {isHoodie && (
        <section className="max-w-7xl mx-auto px-6 sm:px-12 py-6 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* LEFT/CENTER: Large Isolated Hoodie Stage (Dominates layout, zero card borders) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
              {/* Subtle suspended ceiling cord */}
              <div className="w-[1.5px] h-12 bg-neutral-400 mb-[-2px] z-10" />

              {/* Contoured Beechwood Hanger SVG */}
              <div className="relative w-44 sm:w-52 h-8 -mb-3 z-20">
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

              {/* Dominant Large Isolated Hoodie with Interactive Zoom Lens */}
              <div
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                className="relative w-full max-w-xl h-[480px] sm:h-[580px] lg:h-[640px] flex items-center justify-center overflow-hidden cursor-crosshair z-10"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedImage}-${hoodieView}`}
                    initial={{ opacity: 0.7, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.7, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="relative w-full h-full flex items-center justify-center"
                    style={{
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transform: isZoomed ? "scale(2.2)" : "scale(1)",
                      transition: isZoomed ? "none" : "transform 0.4s ease-out",
                    }}
                  >
                    <Image
                      src={
                        hoodieView === "front"
                          ? selectedImage
                          : product.secondaryImage || selectedImage
                      }
                      alt={product.name}
                      width={650}
                      height={800}
                      priority
                      className="w-auto h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.10)]"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Floor Breathing Soft Shadow */}
                <motion.div
                  animate={{
                    scale: shouldReduceMotion ? 1 : [1, 0.92, 1],
                    opacity: shouldReduceMotion ? 0.16 : [0.18, 0.12, 0.18],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-2 w-72 sm:w-96 h-6 bg-black blur-xl rounded-full -z-10 pointer-events-none"
                />

                {/* Zoom Guidance Pill */}
                <div
                  className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/90 backdrop-blur-md border border-brand-border/80 rounded-full text-[10px] font-mono tracking-wider text-brand-muted flex items-center space-x-1.5 transition-opacity duration-300 pointer-events-none ${
                    isZoomed ? "opacity-0" : "opacity-90"
                  }`}
                >
                  <ZoomIn className="w-3 h-3 text-brand-accent" />
                  <span>Hover to inspect 550 GSM weave</span>
                </div>
              </div>

              {/* Front / Back View Angle Switcher (Matches Reference 09.0s) */}
              <div className="mt-4 flex items-center space-x-2">
                <button
                  onClick={() => setHoodieView("front")}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                    hoodieView === "front"
                      ? "bg-brand-text text-white font-semibold shadow-sm"
                      : "bg-white/80 border border-brand-border text-brand-muted hover:text-brand-text"
                  }`}
                >
                  Front
                </button>
                <button
                  onClick={() => setHoodieView("back")}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                    hoodieView === "back"
                      ? "bg-brand-text text-white font-semibold shadow-sm"
                      : "bg-white/80 border border-brand-border text-brand-muted hover:text-brand-text"
                  }`}
                >
                  Back
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Editorial Product Details & Selection Matrix */}
            <div className="lg:col-span-5 space-y-6 max-w-md mx-auto lg:mx-0 w-full">
              <div>
                <div className="flex items-center justify-between text-xs text-brand-muted uppercase font-mono tracking-widest">
                  <span>07 / 14 • HOODIES</span>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`flex items-center space-x-1 transition-colors ${
                      wishlisted ? "text-red-600 font-bold" : "hover:text-brand-text"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-red-600" : ""}`} />
                    <span className="text-[10px]">{wishlisted ? "SAVED" : "WISHLIST"}</span>
                  </button>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal tracking-tight mt-2">
                  {product.name}
                </h1>

                <div className="mt-2 flex items-center space-x-3">
                  <span className="font-mono text-xl font-semibold text-brand-text">
                    ${product.basePrice.toFixed(2)}
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-xs text-brand-muted font-sans font-medium">
                    {selectedColor}
                  </span>
                </div>
              </div>

              <p className="text-xs text-brand-muted leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Color Selection with Smooth Packshot Crossfade */}
              <div className="space-y-2 pt-2 border-t border-brand-border/70">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-brand-text font-semibold">
                    Color: <span className="font-normal text-brand-muted">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {product.availableColors.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => handleColorChange(col.name, col.image)}
                      className={`relative w-9 h-9 rounded-full border-2 transition-all p-0.5 ${
                        selectedColor === col.name
                          ? "border-brand-text scale-110 shadow-sm"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      title={col.name}
                      aria-label={`Select color ${col.name}`}
                    >
                      <span
                        className="block w-full h-full rounded-full shadow-inner border border-black/10"
                        style={{ backgroundColor: col.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection (Reference 09.0s: S M L XL) */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-brand-text font-semibold">
                    Size
                  </span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-[11px] text-brand-accent hover:underline flex items-center space-x-1 font-mono uppercase"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2.5">
                  {product.availableSizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setIsAdded(false);
                        }}
                        className={`w-12 h-12 rounded-full text-xs font-mono font-medium transition-all flex items-center justify-center ${
                          isSelected
                            ? "bg-brand-text text-white font-bold shadow-md scale-105"
                            : "bg-white border border-brand-border text-brand-text hover:border-brand-text"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {!selectedSize && (
                  <p className="text-[11px] text-amber-800 font-sans mt-1">
                    * Select your size for oversized relaxed drape.
                  </p>
                )}
              </div>

              {/* Add to Bag CTA Button (Tactile Feedback & Drawer Open) */}
              <div className="space-y-3 pt-3 border-t border-brand-border/70">
                <button
                  disabled={!selectedSize}
                  onClick={handleAddToCart}
                  className={`w-full py-4 px-6 rounded-full text-xs uppercase tracking-luxury font-medium transition-all shadow-md flex items-center justify-center space-x-2 ${
                    !selectedSize
                      ? "bg-[#D8D6CF] text-neutral-500 cursor-not-allowed"
                      : isAdded
                      ? "bg-brand-accent text-white shadow-brand-accent/20"
                      : "bg-brand-text hover:bg-brand-dark text-white hover:shadow-lg"
                  }`}
                >
                  {!selectedSize ? (
                    <span>Select a size</span>
                  ) : isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  disabled={!selectedSize}
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 rounded-full text-xs uppercase tracking-luxury font-medium border border-brand-text hover:bg-white text-brand-text transition-all"
                >
                  Instant Checkout
                </button>
              </div>

              {/* Editorial Accordion Tabs */}
              <div className="pt-4 border-t border-brand-border/70 space-y-4">
                <div className="flex border-b border-brand-border text-xs font-mono uppercase tracking-wider">
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`pb-2.5 mr-6 border-b-2 font-medium transition-colors ${
                      activeTab === "details"
                        ? "border-brand-text text-brand-text"
                        : "border-transparent text-brand-muted hover:text-brand-text"
                    }`}
                  >
                    Details & Fit
                  </button>
                  <button
                    onClick={() => setActiveTab("materials")}
                    className={`pb-2.5 mr-6 border-b-2 font-medium transition-colors ${
                      activeTab === "materials"
                        ? "border-brand-text text-brand-text"
                        : "border-transparent text-brand-muted hover:text-brand-text"
                    }`}
                  >
                    Fabric & Care
                  </button>
                  <button
                    onClick={() => setActiveTab("shipping")}
                    className={`pb-2.5 border-b-2 font-medium transition-colors ${
                      activeTab === "shipping"
                        ? "border-brand-text text-brand-text"
                        : "border-transparent text-brand-muted hover:text-brand-text"
                    }`}
                  >
                    Delivery
                  </button>
                </div>

                <div className="text-xs text-brand-muted leading-relaxed min-h-[70px]">
                  {activeTab === "details" && (
                    <ul className="list-disc pl-4 space-y-1.5">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "materials" && (
                    <ul className="list-disc pl-4 space-y-1.5">
                      {product.materialsCare.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "shipping" && (
                    <div className="space-y-1.5">
                      <p>• Complimentary express courier shipping on orders over $200.</p>
                      <p>• 30-day effortless returns with prepaid courier labels.</p>
                      <p>• Dispatched in sustainable rigid luxury gift packaging.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          PART B — SNEAKERS DETAIL EXPERIENCE (Reference Video 13.5s - 16.5s)
          ========================================================================= */}
      {isSneaker && (
        <section className="max-w-7xl mx-auto px-6 sm:px-12 py-6 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* LEFT COLUMN: Large Sneaker Packshot & Supporting Angle Thumbnails */}
            <div className="lg:col-span-7 flex flex-col items-center">
              {/* Floating Hero Sneaker Stage with Soft Breathing Shadow */}
              <div
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                className="relative w-full max-w-xl h-72 sm:h-96 md:h-[460px] flex items-center justify-center overflow-hidden cursor-crosshair select-none"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0.6, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: shouldReduceMotion || isZoomed ? 0 : [0, -10, 0],
                    }}
                    exit={{ opacity: 0.6, scale: 0.95 }}
                    transition={{
                      opacity: { duration: 0.3 },
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="relative w-80 sm:w-[480px] h-60 sm:h-80 z-10 will-change-transform"
                    style={{
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transform: isZoomed ? "scale(2.0)" : "scale(1)",
                      transition: isZoomed ? "none" : "transform 0.4s ease-out",
                    }}
                  >
                    <Image
                      src={selectedImage}
                      alt={product.name}
                      fill
                      className="object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,0.15)]"
                      sizes="(max-width: 1024px) 100vw, 650px"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Floor Contact Breathing Shadow */}
                <motion.div
                  animate={{
                    scale: shouldReduceMotion ? 1 : [1, 0.9, 1],
                    opacity: shouldReduceMotion ? 0.18 : [0.22, 0.12, 0.22],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-6 w-72 sm:w-96 h-6 bg-black blur-xl rounded-full z-0 pointer-events-none"
                />

                {/* Zoom Hint */}
                <div
                  className={`absolute top-4 right-4 px-2.5 py-1 bg-white/90 backdrop-blur-md border border-brand-border/80 rounded-full text-[10px] font-mono tracking-wider text-brand-muted flex items-center space-x-1 pointer-events-none transition-opacity ${
                    isZoomed ? "opacity-0" : "opacity-90"
                  }`}
                >
                  <ZoomIn className="w-3 h-3 text-brand-accent" />
                  <span>Inspect calfskin leather</span>
                </div>
              </div>

              {/* Supporting Angle Thumbnails Row (Reference 14.5s) */}
              <div className="mt-8 flex items-center space-x-3 overflow-x-auto no-scrollbar py-2">
                {product.allImages.map((img, index) => {
                  const isActive = selectedImage === img;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedImage(img);
                        setIsAdded(false);
                      }}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl p-1 bg-white border transition-all ${
                        isActive
                          ? "border-brand-text ring-2 ring-brand-text/80 scale-105 shadow-md"
                          : "border-brand-border/80 hover:border-brand-border opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`Select angle ${index + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 text-center">
                <span className="text-[11px] font-mono text-brand-muted uppercase tracking-widest">
                  Multiple Viewing Perspectives & Angles
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: Sneaker Detail Matrix (Matches Reference 13.5s - 16.5s) */}
            <div className="lg:col-span-5 space-y-6 max-w-md mx-auto lg:mx-0 w-full">
              <div>
                <div className="flex items-center justify-between text-xs text-brand-muted uppercase font-mono tracking-widest">
                  <span className="text-brand-accent font-semibold">FLAGSHIP FOOTWEAR</span>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`flex items-center space-x-1 transition-colors ${
                      wishlisted ? "text-red-600 font-bold" : "hover:text-brand-text"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-red-600" : ""}`} />
                    <span className="text-[10px]">{wishlisted ? "SAVED" : "WISHLIST"}</span>
                  </button>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal tracking-tight mt-1">
                  {product.name}
                </h1>

                <div className="mt-1.5 flex items-center space-x-3">
                  <span className="font-mono text-xl font-semibold text-brand-text">
                    ${product.basePrice.toFixed(2)}
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-[11px] font-mono uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-medium">
                    {currentStock > 5
                      ? `In Stock (${currentStock} pairs)`
                      : `Low Stock — Only ${currentStock} left`}
                  </span>
                </div>
              </div>

              <p className="text-xs text-brand-muted leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Color Options with Dynamic Gallery Updates */}
              <div className="space-y-2 pt-2 border-t border-brand-border/70">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[11px] uppercase tracking-wider text-brand-text font-semibold">
                    Colorway: <span className="font-normal text-brand-muted">{selectedColor}</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.availableColors.map((col) => {
                    const isColSelected = selectedColor === col.name;
                    return (
                      <button
                        key={col.name}
                        onClick={() => handleColorChange(col.name, col.image)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center space-x-2 transition-all ${
                          isColSelected
                            ? "border-brand-text bg-white shadow-sm font-semibold"
                            : "border-brand-border/80 bg-white/60 text-brand-muted hover:border-brand-text"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SHOE SIZE Selector Grid (Reference 14.0s: EU 40 to 46) */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-brand-text font-bold">
                    SHOE SIZE (EU)
                  </span>
                  <span className="text-[11px] text-brand-muted font-mono">
                    {selectedSize ? `Selected: EU ${selectedSize}` : "Select your size"}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {product.availableSizes.map((size) => {
                    const isSizeSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setIsAdded(false);
                        }}
                        className={`h-11 rounded text-xs font-mono font-medium transition-all flex items-center justify-center ${
                          isSizeSelected
                            ? "bg-brand-text text-white font-bold shadow-sm scale-102"
                            : "bg-white border border-brand-border text-brand-text hover:border-brand-text"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {!selectedSize && (
                  <p className="text-[11px] text-amber-800 font-sans mt-1">
                    * Please select an EU shoe size.
                  </p>
                )}
              </div>

              {/* Orange-Accented Purchase Button State Machine (Reference 13.5s -> 14.5s -> 16.0s) */}
              <div className="space-y-3 pt-3 border-t border-brand-border/70">
                <button
                  disabled={!selectedSize || isOutOfStock}
                  onClick={handleAddToCart}
                  className={`w-full py-4 px-6 rounded-full text-xs uppercase tracking-luxury font-medium transition-all shadow-md flex items-center justify-center space-x-2 ${
                    !selectedSize
                      ? "bg-[#D8D6CF] text-neutral-500 cursor-not-allowed" // Disabled (Frame 13.5s)
                      : isAdded
                      ? "bg-brand-accent text-white shadow-brand-accent/25" // Burnt orange purchase state (Frame 16.0s)
                      : "bg-brand-text hover:bg-brand-dark text-white hover:shadow-lg" // Active Add to bag (Frame 14.5s)
                  }`}
                >
                  {!selectedSize ? (
                    <span>Select a size</span>
                  ) : isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to bag</span>
                    </>
                  )}
                </button>

                {/* Frame 16.0s: View bag → link appears when item is added */}
                {isAdded && (
                  <button
                    onClick={openDrawer}
                    className="w-full text-center text-xs uppercase tracking-wider text-brand-accent hover:underline flex items-center justify-center space-x-1"
                  >
                    <span>View bag</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  disabled={!selectedSize || isOutOfStock}
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 rounded-full text-xs uppercase tracking-luxury font-medium border border-brand-text hover:bg-white text-brand-text transition-all"
                >
                  Instant Checkout
                </button>
              </div>

              {/* Technical Specifications Accordion */}
              <div className="pt-4 border-t border-brand-border/70 space-y-4">
                <div className="flex border-b border-brand-border text-xs font-mono uppercase tracking-wider">
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`pb-2.5 mr-6 border-b-2 font-medium transition-colors ${
                      activeTab === "details"
                        ? "border-brand-text text-brand-text"
                        : "border-transparent text-brand-muted hover:text-brand-text"
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab("materials")}
                    className={`pb-2.5 mr-6 border-b-2 font-medium transition-colors ${
                      activeTab === "materials"
                        ? "border-brand-text text-brand-text"
                        : "border-transparent text-brand-muted hover:text-brand-text"
                    }`}
                  >
                    Leather & Care
                  </button>
                  <button
                    onClick={() => setActiveTab("shipping")}
                    className={`pb-2.5 border-b-2 font-medium transition-colors ${
                      activeTab === "shipping"
                        ? "border-brand-text text-brand-text"
                        : "border-transparent text-brand-muted hover:text-brand-text"
                    }`}
                  >
                    Packaging & Returns
                  </button>
                </div>

                <div className="text-xs text-brand-muted leading-relaxed min-h-[70px]">
                  {activeTab === "details" && (
                    <ul className="list-disc pl-4 space-y-1.5">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "materials" && (
                    <ul className="list-disc pl-4 space-y-1.5">
                      {product.materialsCare.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "shipping" && (
                    <div className="space-y-1.5">
                      <p>• Shipped in archival dust bag with extra contrast laces.</p>
                      <p>• Complimentary express worldwide courier delivery.</p>
                      <p>• 30-day effortless size exchange and return policy.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          FALLBACK / STANDARD APPAREL LAYOUT (For other shirts, jackets, pants)
          ========================================================================= */}
      {!isHoodie && !isSneaker && (
        <section className="max-w-7xl mx-auto px-6 sm:px-12 py-6 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Gallery Left */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                className="relative w-full max-w-xl h-[480px] sm:h-[580px] flex items-center justify-center overflow-hidden cursor-crosshair"
              >
                <div
                  className="relative w-full h-full flex items-center justify-center"
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isZoomed ? "scale(2.0)" : "scale(1)",
                    transition: isZoomed ? "none" : "transform 0.4s ease-out",
                  }}
                >
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    width={600}
                    height={750}
                    priority
                    className="w-auto h-full object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.10)]"
                  />
                </div>
              </div>

              {/* Thumbnails */}
              <div className="mt-6 flex items-center space-x-3 overflow-x-auto no-scrollbar py-2">
                {product.allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-20 rounded border transition-all ${
                      selectedImage === img
                        ? "border-brand-text ring-1 ring-brand-text scale-105"
                        : "border-brand-border opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      fill
                      className="object-cover p-1"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right details */}
            <div className="lg:col-span-5 space-y-6 max-w-md mx-auto lg:mx-0 w-full">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-muted">
                  {product.category} • {product.subcategory}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal tracking-tight mt-1">
                  {product.name}
                </h1>
                <p className="font-mono text-xl font-semibold text-brand-text mt-1.5">
                  ${product.basePrice.toFixed(2)}
                </p>
              </div>

              <p className="text-xs text-brand-muted leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Color */}
              {product.availableColors.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-brand-border">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-brand-text font-semibold">
                    Color: <span className="font-normal text-brand-muted">{selectedColor}</span>
                  </span>
                  <div className="flex items-center space-x-3">
                    {product.availableColors.map((col) => (
                      <button
                        key={col.name}
                        onClick={() => handleColorChange(col.name, col.image)}
                        className={`relative w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                          selectedColor === col.name
                            ? "border-brand-text scale-110"
                            : "border-transparent opacity-70"
                        }`}
                      >
                        <span
                          className="block w-full h-full rounded-full"
                          style={{ backgroundColor: col.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-brand-text font-semibold">
                  Size
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-12 h-11 px-3 rounded text-xs font-mono font-medium transition-all ${
                        selectedSize === size
                          ? "bg-brand-text text-white font-bold"
                          : "bg-white border border-brand-border text-brand-text"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3 pt-3 border-t border-brand-border">
                <button
                  disabled={!selectedSize}
                  onClick={handleAddToCart}
                  className={`w-full py-4 px-6 rounded-full text-xs uppercase tracking-luxury font-medium transition-all shadow-md flex items-center justify-center space-x-2 ${
                    !selectedSize
                      ? "bg-[#D8D6CF] text-neutral-500 cursor-not-allowed"
                      : isAdded
                      ? "bg-brand-accent text-white"
                      : "bg-brand-text hover:bg-brand-dark text-white"
                  }`}
                >
                  {!selectedSize ? (
                    <span>Select a size</span>
                  ) : isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSizeGuideOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative bg-[#F8F7F4] p-8 rounded-2xl max-w-lg w-full border border-brand-border shadow-2xl z-10 space-y-4">
            <h3 className="font-serif text-2xl font-medium text-brand-text">
              Sizing & Architectural Proportions
            </h3>
            <p className="text-xs text-brand-muted">
              All garments are cut with intentional architectural volume. For a tailored slim fit, order one size down.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-border text-brand-muted">
                    <th className="py-2">SIZE</th>
                    <th className="py-2">CHEST (IN)</th>
                    <th className="py-2">LENGTH (IN)</th>
                    <th className="py-2">EU SHOE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  <tr>
                    <td className="py-2 font-bold">S</td>
                    <td className="py-2">42 - 44</td>
                    <td className="py-2">27.5</td>
                    <td className="py-2">40 - 41</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold">M</td>
                    <td className="py-2">45 - 47</td>
                    <td className="py-2">28.5</td>
                    <td className="py-2">42 - 43</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold">L</td>
                    <td className="py-2">48 - 50</td>
                    <td className="py-2">29.5</td>
                    <td className="py-2">44 - 45</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold">XL</td>
                    <td className="py-2">51 - 53</td>
                    <td className="py-2">30.5</td>
                    <td className="py-2">46</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setSizeGuideOpen(false)}
              className="w-full mt-4 py-3 bg-brand-text text-white text-xs uppercase tracking-luxury rounded-full hover:bg-brand-dark transition-colors"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

      {/* Complete Your Atelier: Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-20 pt-12 border-t border-brand-border">
          <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
            COMPLETE YOUR ATELIER
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-brand-text font-normal tracking-tight mt-1 mb-8">
            YOU MAY ALSO APPRECIATE
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[3/4] w-full bg-[#F0EFEB] rounded-xl overflow-hidden border border-brand-border/60">
                  <Image
                    src={rel.primaryImage}
                    alt={rel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="25vw"
                  />
                </div>
                <div className="mt-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted block">
                    {rel.category}
                  </span>
                  <h4 className="font-serif text-sm text-brand-text group-hover:text-brand-accent transition-colors mt-0.5 line-clamp-1">
                    {rel.name}
                  </h4>
                  <p className="font-mono text-xs font-semibold text-brand-text mt-1">
                    ${rel.basePrice.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* Mobile Sticky Quick-Action Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-brand-border px-4 py-3 z-40 flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="relative w-10 h-11 bg-brand-card rounded overflow-hidden shrink-0 border border-brand-border">
            <Image src={selectedImage} alt={product.name} fill className="object-cover" sizes="40px" />
          </div>
          <div className="min-w-0">
            <p className="font-serif text-xs font-medium text-brand-text truncate">{product.name}</p>
            <p className="font-mono text-xs font-bold text-brand-accent">${product.basePrice.toFixed(2)}</p>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`ml-3 px-5 py-2.5 rounded-full text-xs uppercase tracking-luxury font-medium transition-all shrink-0 flex items-center space-x-1.5 shadow-sm ${
            !selectedSize
              ? "bg-[#D8D6CF] text-neutral-500 cursor-not-allowed"
              : isAdded
              ? "bg-brand-accent text-white"
              : "bg-brand-text text-white"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : !selectedSize ? (
            <span>Select Size</span>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
