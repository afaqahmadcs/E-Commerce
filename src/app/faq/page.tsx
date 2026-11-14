"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What makes AFAQ SUPPLY garments different from standard streetwear?",
      a: "Every silhouette is designed with architectural intent. We mill our own 500-550 GSM French Terry loopback cotton in Portugal, weave our 14oz selvedge denim in Okayama on vintage shuttle looms, and build footwear with Italian calfskin and Margom rubber outsoles. We do not use poly-blends or synthetic fillers.",
    },
    {
      q: "How does sizing work for your hoodies and t-shirts?",
      a: "Our tops are cut with an intentional boxy, drop-shoulder volume. We recommend ordering your normal size to achieve the editorial relaxed drape seen in our lookbooks. If you prefer a traditional slim or tailored silhouette, size down one full size.",
    },
    {
      q: "What are your shipping rates and delivery timelines?",
      a: "We offer complimentary express courier delivery worldwide on all orders exceeding $200. Standard delivery is billed at a flat rate of $15. Orders placed before 2:00 PM EST are dispatched the same business day via DHL Express (2-4 business days for North America and Europe, 3-5 days for international).",
    },
    {
      q: "What is your return policy?",
      a: "We provide a 30-day effortless return window from the date of physical receipt. All returns must be unworn, unwashed, and in their original packaging with security tags intact. Pre-printed complimentary return labels are included inside every dispatch box.",
    },
    {
      q: "What payment methods are supported?",
      a: "We accept all major international credit cards (Visa, MasterCard, American Express), Cash on Delivery (COD) in select territories, and Direct Bank Remittance. We have also engineered our architecture for seamless regional gateway integrations.",
    },
    {
      q: "How should I care for my heavyweight fleece and knitwear?",
      a: "To preserve the dense fiber loft and architectural drape, wash cold inside-out on a delicate cycle with gentle liquid detergent. Never tumble dry; always dry flat in shade.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16">
      <div className="text-center space-y-3 mb-16">
        <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
          HELP & INQUIRIES
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-brand-text tracking-tight">
          FREQUENTLY ASKED
        </h1>
        <p className="text-xs text-brand-muted max-w-md mx-auto">
          Essential information regarding our materials, sizing, global dispatch, and return policies.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white border border-brand-border rounded-xl overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between text-brand-text font-serif text-base sm:text-lg hover:text-brand-accent transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-brand-accent shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-brand-muted shrink-0 ml-4" />
                )}
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-brand-muted leading-relaxed font-sans border-t border-brand-border/40 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

