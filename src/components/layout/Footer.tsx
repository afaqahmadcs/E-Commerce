"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-brand-dark text-[#DCDAD4] pt-16 pb-12 border-t border-brand-dark-border">
      {/* Brand Guarantees Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#2A2A2A]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3.5">
            <Truck className="w-5 h-5 text-brand-accent shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-white">
                Global Express Delivery
              </p>
              <p className="text-[12px] text-neutral-400 mt-0.5">
                Complimentary on orders over $200
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-3.5">
            <RefreshCw className="w-5 h-5 text-brand-accent shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-white">
                30-Day Effortless Returns
              </p>
              <p className="text-[12px] text-neutral-400 mt-0.5">
                Pre-paid labels included with every dispatch
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-3.5">
            <ShieldCheck className="w-5 h-5 text-brand-accent shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-white">
                Archival Craftsmanship
              </p>
              <p className="text-[12px] text-neutral-400 mt-0.5">
                Milled in Portugal & Japan. Guaranteed for life.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-16">
          {/* Brand Manifesto & Newsletter */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <Link href="/" className="inline-block">
                <span className="font-serif text-2xl tracking-wider text-white">
                  AFAQ SUPPLY
                </span>
                <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-sans mt-1">
                  The Art of Everyday Style
                </p>
              </Link>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              An independent design studio exploring the intersection of architectural streetwear, European artisanal tailoring, and archival footwear.
            </p>

            <div className="pt-2">
              <p className="text-[11px] uppercase tracking-luxury text-white font-semibold mb-2">
                Join the Private Dispatch
              </p>
              <p className="text-[11px] text-neutral-400 mb-3">
                Be the first to access limited production runs and private sales.
              </p>

              {subscribed ? (
                <div className="flex items-center space-x-2 text-xs text-brand-accent font-medium py-2">
                  <Check className="w-4 h-4" />
                  <span>You have been added to our private dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-[#242424] border border-[#333] text-white text-xs px-3.5 py-2.5 focus:outline-none focus:border-brand-accent grow placeholder:text-neutral-500"
                  />
                  <button
                    type="submit"
                    className="bg-brand-accent hover:bg-brand-accent-hover text-white px-4 text-xs tracking-wider uppercase font-medium transition-colors flex items-center justify-center shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Nav Column: Collections */}
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-luxury text-white font-semibold">
              Collections
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/shop?filter=new" className="hover:text-white transition-colors">
                  New Arrivals SS26
                </Link>
              </li>
              <li>
                <Link href="/shop?category=men" className="hover:text-white transition-colors">
                  Men&apos;s Ready-to-Wear
                </Link>
              </li>
              <li>
                <Link href="/shop?category=women" className="hover:text-white transition-colors">
                  Women&apos;s Studio
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sneakers" className="hover:text-white transition-colors">
                  Archival Footwear
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="hover:text-white transition-colors">
                  Leather Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Column: Concierge & Client Care */}
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-luxury text-white font-semibold">
              Client Care
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/shipping-returns" className="hover:text-white transition-colors">
                  Shipping & Customs
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Concierge Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Column: Company & Legal */}
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-luxury text-white font-semibold">
              The Brand
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Brand Philosophy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-brand-accent/80">
                  Staff Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#262626] flex flex-col md:flex-row items-center justify-between text-[11px] text-neutral-500 space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} AFAQ SUPPLY CO. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <span>Global Flagship / New York / Paris</span>
            <span>Currency: USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

