import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandEditorial() {
  return (
    <section className="relative w-full bg-brand-dark text-white py-24 sm:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Editorial Text Left */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-mono tracking-widest uppercase text-brand-accent font-semibold block">
            THE MANIFESTO
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.1]">
            THE ART OF EVERYDAY STYLE.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-lg">
            We reject the disposable velocity of modern fast-fashion. Every garment bearing the AFAQ SUPPLY label is developed with architectural precision: custom-milled Portuguese fleece, selvedge Japanese denim, and vegetable-tanned Tuscan leather.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Link
              href="/about"
              className="inline-flex items-center justify-center space-x-2 bg-brand-accent hover:bg-brand-accent-hover text-white px-8 py-3.5 rounded text-xs uppercase tracking-luxury font-medium transition-all shadow-md"
            >
              <span>Our Story & Mills</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center space-x-2 border border-white/20 hover:border-white text-white px-8 py-3.5 rounded text-xs uppercase tracking-luxury font-medium transition-all"
            >
              <span>Explore Collection</span>
            </Link>
          </div>
        </div>

        {/* Editorial Imagery Right */}
        <div className="lg:col-span-6 relative flex justify-center">
          <div className="relative w-full max-w-md h-[480px] sm:h-[540px] rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=85"
              alt="AFAQ SUPPLY Archival Campaign"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 500px"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md p-4 rounded-lg border border-white/10">
              <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent">
                STUDIO DISPATCH #04
              </span>
              <p className="text-xs font-serif text-white mt-1">
                550 GSM Loopback Cotton Hoodie — Cut oversized in Porto, Portugal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

