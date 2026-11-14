"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal } from "@/components/animations/SectionReveal";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Order Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
        <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
          CLIENT SERVICES
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-brand-text tracking-tight">
          ATELIER CONCIERGE
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
          Our client advisory team is available Monday through Saturday to assist with sizing advice, custom orders, and global dispatch inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
        {/* Contact Info Left (5 cols) */}
        <SectionReveal className="lg:col-span-5 bg-brand-card/90 border border-brand-border rounded-xl p-8 space-y-8 shadow-sm">
          <div>
            <h3 className="font-serif text-xl font-medium text-brand-text">
              Direct Inquiries
            </h3>
            <p className="text-xs text-brand-muted mt-1">
              We endeavor to respond to all concierge dispatches within 24 business hours.
            </p>
          </div>

          <div className="space-y-6 text-xs text-brand-text">
            <div className="flex items-start space-x-3.5">
              <Mail className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-mono uppercase font-semibold text-[11px]">Email Advisory</p>
                <a href="mailto:concierge@afaqsupply.com" className="text-brand-muted hover:text-brand-text transition-colors">
                  concierge@afaqsupply.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <Phone className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-mono uppercase font-semibold text-[11px]">Direct Telephone</p>
                <p className="text-brand-muted">+1 (800) 924-AFAQ (9:00 AM - 6:00 PM EST)</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <MapPin className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-mono uppercase font-semibold text-[11px]">Flagship Showroom</p>
                <p className="text-brand-muted">
                  48 Mercer Street, SoHo<br />
                  New York, NY 10013, USA
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-border">
            <p className="text-[11px] font-mono uppercase text-brand-muted">
              PRESS & WHOLESALE INQUIRIES: <br />
              <span className="text-brand-text">press@afaqsupply.com</span>
            </p>
          </div>
        </SectionReveal>

        {/* Message Form Right (7 cols) */}
        <SectionReveal className="lg:col-span-7 bg-white border border-brand-border rounded-xl p-8 shadow-sm">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="py-16 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-brand-text">Message Received</h3>
                <p className="text-xs text-brand-muted max-w-sm mx-auto">
                  Thank you, {formData.name}. Our client advisor will reply to your registered email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 bg-brand-text text-white text-xs uppercase tracking-luxury rounded hover:bg-brand-dark transition-colors"
                >
                  Send Another Dispatch
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Marcus Vance"
                      className="w-full bg-[#F8F7F4] border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="marcus@example.com"
                      className="w-full bg-[#F8F7F4] border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-all font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                    Subject *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#F8F7F4] border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-all font-sans"
                  >
                    <option value="Order Inquiry">Order Inquiry / Delivery Tracking</option>
                    <option value="Sizing Consultation">Sizing & Styling Consultation</option>
                    <option value="Return & Exchange">Returns & Exchanges</option>
                    <option value="Press & VIP Concierge">Press, Media & VIP Concierge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How may our atelier assist you today?"
                    className="w-full bg-[#F8F7F4] border border-brand-border p-3.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-all font-sans leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-brand-text hover:bg-brand-dark text-white rounded text-xs uppercase tracking-luxury font-medium transition-all shadow-md flex items-center justify-center space-x-2 active:scale-98"
                >
                  <Send className="w-4 h-4 text-brand-accent" />
                  <span>Transmit Inquiry</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </SectionReveal>
      </div>
    </div>
  );
}
