export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16 space-y-8 text-brand-text">
      <div className="border-b border-brand-border pb-6">
        <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
          LEGAL & COMPLIANCE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight mt-1">
          TERMS & CONDITIONS
        </h1>
        <p className="text-xs text-brand-muted mt-2 font-mono">
          Effective Date: January 1, 2026
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-brand-muted leading-relaxed font-sans">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-medium text-brand-text">1. Atelier Agreement</h2>
          <p>
            By accessing or placing an order through the AFAQ SUPPLY website (afaqsupply.com), you agree to be bound by these Terms and Conditions. All content, imagery, typography, and original silhouettes displayed on this website are the intellectual property of AFAQ SUPPLY CO.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-medium text-brand-text">2. Orders & Commercial Pricing</h2>
          <p>
            All prices are stated in United States Dollars (USD) unless explicitly switched in your region settings. We reserve the right to decline or cancel orders resulting from inadvertent typographical errors or system anomalies. In such rare events, any debited funds are immediately returned in full.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-medium text-brand-text">3. Intellectual Property</h2>
          <p>
            AFAQ SUPPLY, the AFAQ typographic emblem, &ldquo;THE ART OF EVERYDAY STYLE,&rdquo; and custom apparel silhouettes are protected by international copyright and trademark conventions. Unauthorized reproduction, modification, or commercial exploitation is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-medium text-brand-text">4. Governing Law</h2>
          <p>
            These terms are governed in accordance with commercial laws, and any disputes shall be resolved through binding arbitration.
          </p>
        </section>
      </div>
    </div>
  );
}

