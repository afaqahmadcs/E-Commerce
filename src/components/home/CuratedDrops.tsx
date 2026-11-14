import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS_DATA } from "@/data/products";

export function CuratedDrops() {
  const featuredProducts = PRODUCTS_DATA.slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-[#F8F7F4] border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
              CURATED SELECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal tracking-tight mt-1">
              SEASONAL ESSENTIALS
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-luxury text-brand-text hover:text-brand-accent transition-colors font-medium mt-4 sm:mt-0"
          >
            <span>Explore All Pieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
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
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase font-semibold text-brand-text rounded">
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
    </section>
  );
}

