"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Sparkles, ShieldCheck } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative py-24 sm:py-32 bg-brand-dark text-white overflow-hidden border-b border-brand-dark-border">
      {/* Background Subtle Atelier Photo */}
      <div className="absolute inset-0 opacity-15">
        <Image
          src="/images/campaigns/campaign_04.jpg"
          alt="Loom craftsmanship"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/90" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-widest text-brand-accent">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRIVATE ATELIER DISPATCH</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight">
          Join the Inner Circle
        </h2>

        <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
          Receive privileged access to private showroom drops, archival re-issues, and invitations to intimate runway previews.
        </p>

        <div className="pt-4 max-w-md mx-auto">
          {submitted ? (
            <div className="p-4 bg-brand-accent/20 border border-brand-accent/40 rounded-lg text-xs font-mono flex items-center justify-center space-x-2 text-white">
              <Check className="w-4 h-4 text-brand-accent" />
              <span>You have been registered for the private dispatch.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex rounded-lg overflow-hidden shadow-2xl border border-white/20">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-white/10 backdrop-blur-md px-5 py-3.5 text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:bg-white/15 grow font-sans"
              />
              <button
                type="submit"
                className="bg-brand-accent hover:bg-brand-accent-hover text-white px-6 py-3.5 text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center justify-center shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </form>
          )}
        </div>

        <div className="pt-4 flex items-center justify-center space-x-6 text-[11px] font-mono text-neutral-400">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
            <span>Zero Spam Guarantee</span>
          </span>
          <span>•</span>
          <span>Unsubscribe Anytime</span>
        </div>
      </div>
    </section>
  );
}
