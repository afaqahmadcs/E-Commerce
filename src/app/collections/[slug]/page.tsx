import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { COLLECTIONS_DATA } from "@/data/collections";
import { PRODUCTS_DATA } from "@/data/products";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = COLLECTIONS_DATA.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  // Filter products by collection logic
  let products = PRODUCTS_DATA;
  if (slug === "streetwear-essentials") {
    products = PRODUCTS_DATA.filter((p) => p.category === "men" || p.subcategory === "Hoodies");
  } else if (slug === "curated-footwear") {
    products = PRODUCTS_DATA.filter((p) => p.category === "sneakers");
  } else if (slug === "new-arrivals") {
    products = PRODUCTS_DATA.filter((p) => p.isNewArrival);
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Editorial Collection Hero Banner */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] bg-brand-dark flex items-center justify-center text-white overflow-hidden">
        <Image
          src={collection.coverImage}
          alt={collection.name}
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-1.5 text-[11px] font-mono tracking-widest uppercase text-brand-accent hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Collections</span>
          </Link>
          <span className="text-[10px] sm:text-xs font-mono tracking-luxury uppercase text-neutral-300 block">
            {collection.subtitle}
          </span>
          <h1 className="font-serif text-3xl sm:text-6xl font-normal tracking-tight">
            {collection.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Collection Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        <div className="flex items-center justify-between pb-6 border-b border-brand-border mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-muted">
            COLLECTION ITEMS ({products.length})
          </span>
          <Link
            href="/shop"
            className="text-xs font-mono uppercase tracking-luxury text-brand-accent hover:underline flex items-center space-x-1"
          >
            <span>Browse Full Store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
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
      </div>
    </div>
  );
}

