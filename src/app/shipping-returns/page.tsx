import { Truck, RotateCcw } from "lucide-react";
import { SectionReveal } from "@/components/animations/SectionReveal";

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
          LOGISTICS & CARE
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-brand-text tracking-tight">
          SHIPPING & RETURNS
        </h1>
        <p className="text-xs text-brand-muted max-w-md mx-auto">
          Complimentary insured global delivery and effortless 30-day returns.
        </p>
      </div>

      <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-brand-border rounded-xl p-8 space-y-4 shadow-sm hover:shadow transition-shadow">
          <Truck className="w-6 h-6 text-brand-accent" />
          <h2 className="font-serif text-xl font-medium text-brand-text">
            Complimentary Shipping
          </h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            All orders exceeding $200 qualify for complimentary priority dispatch via DHL Express or FedEx International. Standard orders below $200 are billed at a flat rate of $15.
          </p>
          <ul className="text-xs text-brand-muted space-y-2 list-disc pl-4 pt-2">
            <li>Domestic (US / EU): 2–3 Business Days</li>
            <li>United Kingdom: 2–4 Business Days</li>
            <li>Asia / Middle East: 3–5 Business Days</li>
            <li>Rest of World: 4–6 Business Days</li>
          </ul>
        </div>

        <div className="bg-white border border-brand-border rounded-xl p-8 space-y-4 shadow-sm hover:shadow transition-shadow">
          <RotateCcw className="w-6 h-6 text-brand-accent" />
          <h2 className="font-serif text-xl font-medium text-brand-text">
            30-Day Effortless Returns
          </h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            We offer 30 days from delivery to initiate a return or exchange. A pre-paid insured return shipping label is provided inside every packaging box for immediate convenience.
          </p>
          <ul className="text-xs text-brand-muted space-y-2 list-disc pl-4 pt-2">
            <li>Items must be unworn and unwashed</li>
            <li>Original garment and security tags must remain attached</li>
            <li>Footwear must include undamaged original shoe box & dustbags</li>
            <li>Refunds are credited to the original payment method within 5 days</li>
          </ul>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-brand-card/90 border border-brand-border rounded-xl p-8 space-y-4">
        <h3 className="font-serif text-lg font-medium text-brand-text">
          Import Duties & Taxes
        </h3>
        <p className="text-xs text-brand-muted leading-relaxed">
          For all dispatches to North America, the European Union, the United Kingdom, and the UAE, all applicable import duties, customs clearance tariffs, and local taxes are pre-calculated and collected at checkout. There are never any unexpected COD customs fees upon delivery.
        </p>
      </SectionReveal>
    </div>
  );
}
