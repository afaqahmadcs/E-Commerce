"use client";

import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { PRODUCTS_DATA } from "@/data/products";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return PRODUCTS_DATA;
    const term = query.toLowerCase();
    return PRODUCTS_DATA.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.subcategory.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
      <div className="max-w-xl mx-auto text-center space-y-4 mb-12">
        <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
          SEARCH CATALOGUE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal tracking-tight">
          ARCHIVAL SEARCH
        </h1>
        <div className="relative mt-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by silhouette, material, category..."
            className="w-full bg-white border border-brand-border px-5 py-3.5 pl-12 rounded-full text-xs text-brand-text shadow-sm focus:outline-none focus:border-brand-text"
          />
          <SearchIcon className="w-4 h-4 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="flex justify-between items-center pb-4 border-b border-brand-border mb-8 text-xs font-mono text-brand-muted">
        <span>RESULTS ({results.length})</span>
        {query && <span>QUERY: &ldquo;{query}&rdquo;</span>}
      </div>

      {results.length === 0 ? (
        <div className="py-24 text-center space-y-3">
          <p className="font-serif text-lg text-brand-text">
            No matching items found for &ldquo;{query}&rdquo;
          </p>
          <p className="text-xs text-brand-muted max-w-sm mx-auto">
            Try checking for typos or searching general terms like Hoodie, Sneakers, or Knitwear.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {results.map((product) => (
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
                  sizes="25vw"
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
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs font-mono">LOADING SEARCH...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

