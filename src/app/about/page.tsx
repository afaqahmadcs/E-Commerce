import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Scissors, ShieldCheck, Feather } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Editorial Hero */}
      <div className="relative w-full h-[60vh] bg-brand-dark flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/campaigns/campaign_08.jpg"
          alt="AFAQ SUPPLY Atelier Workshop"
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-[10px] sm:text-xs font-mono tracking-luxury uppercase text-brand-accent block">
            ATELIER PHILOSOPHY
          </span>
          <h1 className="font-serif text-4xl sm:text-7xl font-normal tracking-tight">
            THE ART OF EVERYDAY STYLE.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto font-sans leading-relaxed">
            Founded with a singular conviction: luxury is not an aesthetic of excess, but an exacting commitment to substance, drape, and longevity.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-20 space-y-16">
        <div className="space-y-6 text-brand-text leading-relaxed">
          <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
            OUR ARCHIVAL ESSENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight">
            Built to Outlast Seasons.
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            AFAQ SUPPLY was established as a counterbalance to modern hyper-accelerated retail. Rather than releasing seasonal waves of disposable trends, our atelier focuses on perfecting foundational streetwear silhouettes through the lens of architectural tailoring.
          </p>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Every garment begins with custom yarn milling. Our 550 GSM French Terry loopback is knitted in Porto, Portugal using long-staple combed cotton. Our selvedge denim is woven on restored 1960s Toyoda shuttle looms in Okayama, Japan. Our leather goods and footwear are assembled in Florence by multi-generational leather artisans.
          </p>
        </div>

        {/* 3 Pillars of Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-brand-border">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-brand-card flex items-center justify-center text-brand-accent">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-semibold text-brand-text">
              Architectural Proportions
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              We design volumes that drape effortlessly across diverse body types without losing clean, intentional structure.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-brand-card flex items-center justify-center text-brand-accent">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-semibold text-brand-text">
              Material Provenance
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Certified organic, GOTS-compliant fibers, chrome-free tanning, and zero synthetic plastic fillers.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-brand-card flex items-center justify-center text-brand-accent">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-semibold text-brand-text">
              Lifetime Durability
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Double-needle flatlock stitching, reinforced bartacks, and heavy-duty YKK Japanese hardware.
            </p>
          </div>
        </div>

        {/* Studio Image & Quote */}
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-luxury border border-brand-border">
          <Image
            src="/images/campaigns/campaign_02.jpg"
            alt="Tailoring craftsmanship"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-8 text-center">
            <blockquote className="font-serif text-xl sm:text-2xl text-white max-w-xl italic">
              &ldquo;True style does not demand attention through volume. It commands presence through cut, texture, and silence.&rdquo;
            </blockquote>
          </div>
        </div>

        {/* CTA to Explore */}
        <div className="text-center pt-8 border-t border-brand-border space-y-4">
          <h3 className="font-serif text-2xl text-brand-text">
            Experience the Atelier Collection
          </h3>
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-brand-text hover:bg-brand-dark text-white rounded text-xs uppercase tracking-luxury font-medium shadow-md transition-all"
            >
              <span>Explore All Pieces</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

