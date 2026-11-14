export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16 space-y-8 text-brand-text">
      <div className="border-b border-brand-border pb-6">
        <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
          LEGAL & COMPLIANCE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight mt-1">
          PRIVACY POLICY
        </h1>
        <p className="text-xs text-brand-muted mt-2 font-mono">
          Last updated: January 2026 • Compliant with GDPR, CCPA, and Global Consumer Protections
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-brand-muted leading-relaxed font-sans">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-medium text-brand-text">1. Commitment to Privacy</h2>
          <p>
            At AFAQ SUPPLY, we respect your right to privacy and data autonomy. We collect only the information strictly necessary to process your transactions, coordinate global courier dispatches, and enhance your digital atelier experience.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-medium text-brand-text">2. Information Collected</h2>
          <p>
            When you interact with our website or place an order, we may collect: your full name, shipping and billing addresses, email address, phone number, and IP address for anti-fraud validation. Payment card details are tokenized directly through encrypted payment gateway providers; we never store raw credit card numbers on our servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-medium text-brand-text">3. Third-Party Sharing</h2>
          <p>
            We strictly do not sell, rent, or trade your personal data to advertising brokers or unrelated commercial entities. Your information is shared exclusively with verified operational partners (e.g., DHL, FedEx, Supabase authentication infrastructure) solely for the fulfillment of your orders.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-medium text-brand-text">4. Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or permanent deletion of your personal data stored within our records. Inquiries can be submitted directly to <strong className="text-brand-text">privacy@afaqsupply.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}

