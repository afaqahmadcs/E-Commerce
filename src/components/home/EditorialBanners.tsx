import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EditorialBanners() {
  return (
    <section className="py-20 bg-[#F8F7F4] border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
        {/* Editorial Subheading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
              CAMPAIGN STORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal tracking-tight mt-1">
              SEASONAL EDITORIAL DISPATCH
            </h2>
          </div>
          <p className="text-xs text-brand-muted max-w-md mt-2 sm:mt-0 leading-relaxed">
            Explorations into noble fabrics, European loopwheel knitting mills, and archival court silhouettes.
          </p>
        </div>

        {/* Dual Split Editorial Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Banner 1: Men's Heavyweight Fleeces */}
          <div className="group relative h-[440px] sm:h-[500px] rounded-xl overflow-hidden shadow-luxury border border-brand-border/60">
            <Image
              src="/images/banners/banner_01.jpg"
              alt="Spring Summer 2026 Capsule"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

            <div className="absolute inset-x-8 bottom-8 text-white space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
                SPRING / SUMMER CAPSULE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-wide">
                Architectural Proportions & 500 GSM Fleeces
              </h3>
              <p className="text-xs text-neutral-300 max-w-sm line-clamp-2">
                Sculptural double-layered hoods, dropped shoulders, and custom vintage enzyme washes crafted in Portugal.
              </p>
              <div className="pt-2">
                <Link
                  href="/collections/hoodies"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury text-white font-medium hover:text-brand-accent transition-colors group-hover:underline"
                >
                  <span>Discover Hoodies Collection</span>
                  <ArrowRight className="w-4 h-4 text-brand-accent" />
                </Link>
              </div>
            </div>
          </div>

          {/* Banner 2: Archival Leather & Craft */}
          <div className="group relative h-[440px] sm:h-[500px] rounded-xl overflow-hidden shadow-luxury border border-brand-border/60">
            <Image
              src="/images/banners/banner_02.jpg"
              alt="Atelier Leather Goods & Accessories"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

            <div className="absolute inset-x-8 bottom-8 text-white space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
                ARTISANAL ACCESSORIES
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-wide">
                Full-Grain Tuscan Holdalls & Objects
              </h3>
              <p className="text-xs text-neutral-300 max-w-sm line-clamp-2">
                Hand-burnished weekender duffles and minimalist cardholders built to develop a rich vintage patina.
              </p>
              <div className="pt-2">
                <Link
                  href="/collections/accessories"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury text-white font-medium hover:text-brand-accent transition-colors group-hover:underline"
                >
                  <span>Explore Leather Objects</span>
                  <ArrowRight className="w-4 h-4 text-brand-accent" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
