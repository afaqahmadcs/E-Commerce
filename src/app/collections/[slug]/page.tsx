import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { COLLECTIONS_DATA } from "@/data/collections";
import { PRODUCTS_DATA } from "@/data/products";
import { Product } from "@/types";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COLLECTIONS_DATA.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = COLLECTIONS_DATA.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  // Filter products by collection slug
  let products: Product[] = [];

  switch (slug) {
    case "men":
    case "mens-collection":
    case "streetwear-essentials":
      products = PRODUCTS_DATA.filter((p) => p.category === "men");
      break;
    case "women":
    case "womens-collection":
    case "luxury-knitwear":
      products = PRODUCTS_DATA.filter((p) => p.category === "women");
      break;
    case "sneakers":
    case "curated-footwear":
      products = PRODUCTS_DATA.filter((p) => p.category === "sneakers");
      break;
    case "hoodies":
      products = PRODUCTS_DATA.filter(
        (p) =>
          p.subcategory?.toLowerCase().includes("hoodie") ||
          p.name.toLowerCase().includes("hoodie")
      );
      break;
    case "t-shirts":
      products = PRODUCTS_DATA.filter(
        (p) =>
          p.subcategory?.toLowerCase().includes("t-shirt") ||
          p.subcategory?.toLowerCase().includes("shirt") ||
          p.name.toLowerCase().includes("tee") ||
          p.name.toLowerCase().includes("t-shirt")
      );
      break;
    case "jackets":
    case "tailored-street":
      products = PRODUCTS_DATA.filter(
        (p) =>
          p.subcategory?.toLowerCase().includes("jacket") ||
          p.subcategory?.toLowerCase().includes("outerwear") ||
          p.name.toLowerCase().includes("jacket") ||
          p.name.toLowerCase().includes("overshirt")
      );
      break;
    case "accessories":
      products = PRODUCTS_DATA.filter((p) => p.category === "accessories");
      break;
    case "new-arrivals":
      products = PRODUCTS_DATA.filter((p) => p.isNewArrival);
      break;
    default:
      products = PRODUCTS_DATA.filter((p) => p.category === slug);
  }

  // Fallback if strict filter yields few items
  if (products.length === 0) {
    products = PRODUCTS_DATA.slice(0, 8);
  }

  // Sibling collections for footer navigation
  const siblingCollections = COLLECTIONS_DATA.filter((c) => c.slug !== slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Editorial Collection Hero Banner */}
      <div className="relative w-full h-[45vh] sm:h-[55vh] min-h-[380px] bg-brand-dark flex items-center justify-center text-white overflow-hidden">
        <Image
          src={collection.coverImage}
          alt={collection.name}
          fill
          className="object-cover opacity-60 scale-105 transition-transform duration-1000"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/35" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-1.5 text-[11px] font-mono tracking-widest uppercase text-brand-accent hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Departments</span>
          </Link>
          <span className="text-[10px] sm:text-xs font-mono tracking-luxury uppercase text-neutral-300 block">
            {collection.subtitle}
          </span>
          <h1 className="font-serif text-3xl sm:text-6xl font-normal tracking-tight text-white">
            {collection.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Collection Grid Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        <div className="flex items-center justify-between pb-6 border-b border-brand-border mb-10">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-text font-semibold">
              COLLECTION PIECES ({products.length})
            </span>
          </div>

          <Link
            href="/shop"
            className="text-xs font-mono uppercase tracking-luxury text-brand-accent hover:underline flex items-center space-x-1"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const alternateImage = product.secondaryImage || product.allImages?.[1];

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group flex flex-col bg-brand-card/30 border border-brand-border/60 rounded-lg p-3 hover:border-brand-text/30 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
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

                  {product.isNewArrival && (
                    <span className="absolute top-3 left-3 bg-brand-accent text-white px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase font-bold rounded shadow-sm z-10">
                      NEW DROP
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-brand-muted font-sans font-medium block">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-base text-brand-text group-hover:text-brand-accent transition-colors mt-0.5 line-clamp-1">
                      {product.name}
                    </h3>
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
              </Link>
            );
          })}
        </div>

        {/* Sibling Collections Strip */}
        <div className="mt-24 pt-12 border-t border-brand-border">
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
              CONTINUE THE DISPATCH
            </span>
            <h3 className="font-serif text-2xl text-brand-text font-normal mt-1">
              RELATED CAPSULES
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siblingCollections.map((sib) => (
              <Link
                key={sib.slug}
                href={`/collections/${sib.slug}`}
                className="group relative h-48 rounded-lg overflow-hidden border border-brand-border/80 shadow-sm"
              >
                <Image
                  src={sib.coverImage}
                  alt={sib.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 text-white">
                  <h4 className="font-serif text-base font-medium group-hover:text-brand-accent transition-colors">
                    {sib.name}
                  </h4>
                  <p className="text-[11px] text-neutral-300 line-clamp-1 mt-0.5">
                    {sib.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
