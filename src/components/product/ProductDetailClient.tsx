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
} from "lucide-react";
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
  const [selectedImage, setSelectedImage] = useState(product.primaryImage);
  const [selectedColor, setSelectedColor] = useState(product.availableColors[0]?.name || "Standard");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "materials" | "shipping">("details");

  const { addItem, openDrawer, toggleWishlist, isWishlisted } = useCartStore();
  const wishlisted = isWishlisted(product.id);

  // Variant matching
  const activeVariant = product.variants.find(
    (v) => v.colorName === selectedColor && v.size === selectedSize
  );

  const isOutOfStock = activeVariant ? activeVariant.inventoryQuantity === 0 : false;
  const currentStock = activeVariant ? activeVariant.inventoryQuantity : 10;

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.basePrice,
      color: selectedColor,
      size: selectedSize,
      image: selectedImage,
      quantity,
      maxStock: currentStock,
    });

    setIsAdded(true);
    setTimeout(() => {
      openDrawer();
    }, 300);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.basePrice,
      color: selectedColor,
      size: selectedSize,
      image: selectedImage,
      quantity,
      maxStock: currentStock,
    });

    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs font-mono text-brand-muted uppercase tracking-wider mb-8">
        <Link href="/" className="hover:text-brand-text">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-brand-text">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-text font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Image Gallery (6 cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails Column */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar shrink-0">
            {product.allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded overflow-hidden bg-brand-card border transition-all ${
                  selectedImage === img
                    ? "border-brand-text ring-1 ring-brand-text shadow-sm"
                    : "border-brand-border/70 opacity-70 hover:opacity-100"
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${product.name} angle ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>

          {/* Primary Main Image with Zoom container */}
          <div className="relative flex-1 aspect-[3/4] rounded-xl overflow-hidden bg-brand-card shadow-luxury border border-brand-border/60 group">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 650px"
            />
            {product.isNewArrival && (
              <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase font-semibold text-brand-text rounded">
                SEASON DROP
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Purchasing & Specifications (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-brand-muted uppercase font-mono">
              <span>{product.category} • {product.subcategory}</span>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`flex items-center space-x-1.5 p-1 transition-colors ${
                  wishlisted ? "text-red-600 font-bold" : "hover:text-brand-text"
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? "fill-red-600" : ""}`} />
                <span className="text-[11px]">{wishlisted ? "SAVED" : "SAVE TO WISHLIST"}</span>
              </button>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal tracking-tight mt-2">
              {product.name}
            </h1>

            <div className="mt-2 flex items-center space-x-3">
              <span className="font-mono text-xl font-semibold text-brand-text">
                ${product.basePrice.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="font-mono text-sm text-brand-muted line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
              <span className="text-[11px] bg-green-100 text-green-800 font-mono px-2 py-0.5 rounded font-medium">
                IN STOCK & READY TO SHIP
              </span>
            </div>
          </div>

          <p className="text-xs text-brand-muted leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.availableColors.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-brand-border">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-[11px] uppercase tracking-wider text-brand-text font-semibold">
                  Color: <span className="font-normal text-brand-muted">{selectedColor}</span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {product.availableColors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => {
                      setSelectedColor(col.name);
                      setSelectedImage(col.image);
                      setIsAdded(false);
                    }}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                      selectedColor === col.name
                        ? "border-brand-text scale-110 shadow-sm"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    title={col.name}
                    aria-label={`Select color ${col.name}`}
                  >
                    <span
                      className="block w-full h-full rounded-full shadow-inner"
                      style={{ backgroundColor: col.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
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

            <div className="flex flex-wrap gap-2">
              {product.availableSizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setIsAdded(false);
                    }}
                    className={`min-w-12 h-11 px-3 rounded text-xs font-mono font-medium transition-all flex items-center justify-center ${
                      isSelected
                        ? "bg-brand-text text-white font-bold shadow-sm"
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
                * Please choose a size to proceed.
              </p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 pt-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-brand-text font-semibold">
              Quantity:
            </span>
            <div className="flex items-center border border-brand-border rounded bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-xs text-brand-text hover:bg-neutral-100"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-3 text-xs font-mono font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                className="px-3 py-1.5 text-xs text-brand-text hover:bg-neutral-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className="text-[10px] text-brand-muted font-mono">
              ({currentStock} units available)
            </span>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-brand-border">
            <button
              disabled={!selectedSize || isOutOfStock}
              onClick={handleAddToCart}
              className={`w-full py-4 px-6 rounded text-xs uppercase tracking-luxury font-medium transition-all shadow-md flex items-center justify-center space-x-2 ${
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
                  <span>Added to bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to bag</span>
                </>
              )}
            </button>

            <button
              disabled={!selectedSize || isOutOfStock}
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 rounded text-xs uppercase tracking-luxury font-medium border border-brand-text hover:bg-white text-brand-text transition-all"
            >
              Instant Checkout
            </button>
          </div>

          {/* Accordion Tabs */}
          <div className="pt-6 border-t border-brand-border space-y-4">
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
                Materials & Care
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`pb-2.5 border-b-2 font-medium transition-colors ${
                  activeTab === "shipping"
                    ? "border-brand-text text-brand-text"
                    : "border-transparent text-brand-muted hover:text-brand-text"
                }`}
              >
                Shipping & Returns
              </button>
            </div>

            <div className="text-xs text-brand-muted leading-relaxed min-h-[80px]">
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
                <div className="space-y-2">
                  <p>• Complimentary express DHL delivery on orders over $200.</p>
                  <p>• Pre-paid return labels included with all dispatches within 30 days.</p>
                  <p>• Dispatched in 100% recycled luxury archival packaging.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSizeGuideOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative bg-[#F8F7F4] p-8 rounded-xl max-w-lg w-full border border-brand-border shadow-2xl z-10 space-y-4">
            <h3 className="font-serif text-xl font-medium text-brand-text">
              Sizing & Proportions Guide
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
              className="w-full mt-4 py-2.5 bg-brand-text text-white text-xs uppercase tracking-luxury rounded"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-12 border-t border-brand-border">
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
                <div className="relative aspect-[3/4] w-full bg-brand-card rounded-lg overflow-hidden border border-brand-border/60">
                  <Image
                    src={rel.primaryImage}
                    alt={rel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="25vw"
                  />
                </div>
                <div className="mt-3">
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted block">
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
    </div>
  );
}

