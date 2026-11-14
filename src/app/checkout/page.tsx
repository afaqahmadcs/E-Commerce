"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  Building2,
  CheckCircle2,
  ArrowRight,
  Lock,
  ChevronRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCartStore } from "@/store/useCartStore";
import { PaymentMethod, Order } from "@/types";

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();

  const subtotal = getCartTotal();
  const shipping = subtotal >= 200 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "United States",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(null);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      setErrorMessage("Your shopping bag is empty. Please add items before checking out.");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone || !formData.addressLine1 || !formData.city) {
      setErrorMessage("Please complete all required shipping fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate real server-side validation & order generation
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const orderNumber = `AFQ-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber,
        customer: formData,
        items: [...items],
        subtotal,
        shipping,
        discount: 0,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
        orderStatus: "confirmed",
        createdAt: new Date().toISOString(),
      };

      // Persist in local storage for order history
      const existingOrders = JSON.parse(localStorage.getItem("afaq_customer_orders") || "[]");
      localStorage.setItem("afaq_customer_orders", JSON.stringify([newOrder, ...existingOrders]));

      // Clear the live cart
      clearCart();
      setCompletedOrder(newOrder);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#C66B39", "#151515", "#E8E6E1"],
        });
      } catch {
        // Safe fallback
      }
    } catch {
      setErrorMessage("An unexpected error occurred while placing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
            ORDER CONFIRMATION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal tracking-tight mt-1">
            THANK YOU FOR YOUR PATRONAGE.
          </h1>
          <p className="text-xs text-brand-muted mt-2">
            Your order reference is <strong className="font-mono text-brand-text font-bold">{completedOrder.orderNumber}</strong>.
          </p>
        </div>

        <div className="bg-brand-card/80 border border-brand-border rounded-xl p-6 text-left max-w-xl mx-auto space-y-4 text-xs">
          <div className="flex justify-between pb-3 border-b border-brand-border">
            <span className="text-brand-muted">Payment Method:</span>
            <span className="font-mono uppercase font-semibold text-brand-text">
              {completedOrder.paymentMethod === "cod"
                ? "Cash on Delivery"
                : completedOrder.paymentMethod === "bank_transfer"
                ? "Bank Transfer"
                : "Card / Online"}
            </span>
          </div>

          <div className="flex justify-between pb-3 border-b border-brand-border">
            <span className="text-brand-muted">Delivery Address:</span>
            <span className="text-brand-text text-right font-medium">
              {completedOrder.customer.fullName}<br />
              {completedOrder.customer.addressLine1}, {completedOrder.customer.city}
            </span>
          </div>

          <div className="flex justify-between pt-2">
            <span className="font-serif text-sm font-semibold">Total Paid / Due:</span>
            <span className="font-mono text-base font-bold text-brand-text">
              ${completedOrder.total.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link
            href="/account/orders"
            className="px-6 py-3 bg-brand-text text-white text-xs uppercase tracking-luxury font-medium rounded hover:bg-brand-dark transition-colors"
          >
            Track in Order History
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-brand-border text-brand-text text-xs uppercase tracking-luxury font-medium rounded hover:bg-white transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
      {/* Checkout Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs font-mono text-brand-muted uppercase tracking-wider mb-8">
        <Link href="/cart" className="hover:text-brand-text">Bag</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-text font-semibold">Express Checkout</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form Column (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
              FINAL DISPATCH
            </span>
            <h1 className="font-serif text-3xl text-brand-text font-normal tracking-tight mt-1">
              SHIPPING & PAYMENT
            </h1>
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmitOrder} className="space-y-8">
            {/* 1. Contact Information */}
            <div className="space-y-4">
              <h2 className="font-serif text-base font-medium text-brand-text flex items-center justify-between pb-2 border-b border-brand-border">
                <span>1. Contact Information</span>
                <span className="text-[11px] font-sans text-brand-muted font-normal">
                  Already have an account? <Link href="/account" className="underline text-brand-text">Sign in</Link>
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="client@luxury.com"
                    className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="space-y-4">
              <h2 className="font-serif text-base font-medium text-brand-text pb-2 border-b border-brand-border">
                2. Shipping Address
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Marcus Vance"
                    className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="742 Evergreen Terrace, Penthouse B"
                    className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="stateProvince"
                      value={formData.stateProvince}
                      onChange={handleInputChange}
                      placeholder="NY"
                      className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                      className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                    Country / Region *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="space-y-4">
              <h2 className="font-serif text-base font-medium text-brand-text pb-2 border-b border-brand-border">
                3. Payment Selection
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === "cod"
                      ? "border-brand-text bg-white shadow-sm ring-1 ring-brand-text"
                      : "border-brand-border bg-brand-card/50 hover:bg-white"
                  }`}
                >
                  <Truck className="w-5 h-5 text-brand-accent mb-2" />
                  <div>
                    <p className="text-xs font-serif font-semibold text-brand-text">
                      Cash on Delivery
                    </p>
                    <p className="text-[10px] text-brand-muted mt-0.5">
                      Pay upon physical arrival
                    </p>
                  </div>
                </button>

                {/* Direct Bank Wire */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank_transfer")}
                  className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === "bank_transfer"
                      ? "border-brand-text bg-white shadow-sm ring-1 ring-brand-text"
                      : "border-brand-border bg-brand-card/50 hover:bg-white"
                  }`}
                >
                  <Building2 className="w-5 h-5 text-brand-accent mb-2" />
                  <div>
                    <p className="text-xs font-serif font-semibold text-brand-text">
                      Direct Bank Wire
                    </p>
                    <p className="text-[10px] text-brand-muted mt-0.5">
                      Manual IBAN remittance
                    </p>
                  </div>
                </button>

                {/* Card / Digital Gateway */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card_online")}
                  className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === "card_online"
                      ? "border-brand-text bg-white shadow-sm ring-1 ring-brand-text"
                      : "border-brand-border bg-brand-card/50 hover:bg-white"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-brand-accent mb-2" />
                  <div>
                    <p className="text-xs font-serif font-semibold text-brand-text">
                      Card / Gateway
                    </p>
                    <p className="text-[10px] text-brand-muted mt-0.5">
                      Visa / MC / JazzCash
                    </p>
                  </div>
                </button>
              </div>

              {/* Dynamic Payment Details Panel */}
              {paymentMethod === "bank_transfer" && (
                <div className="bg-brand-card p-4 rounded-lg border border-brand-border text-xs text-brand-muted space-y-1.5 font-mono">
                  <p className="font-sans font-semibold text-brand-text uppercase text-[11px]">
                    AFAQ SUPPLY Remittance Wire Instructions:
                  </p>
                  <p>Bank: J.P. Morgan Chase / Luxury Commercial</p>
                  <p>Account Name: AFAQ SUPPLY ATELIER LLC</p>
                  <p>IBAN / Account: US48 CHPO 0001 2345 6789 01</p>
                  <p className="text-[10px] font-sans text-neutral-500 pt-1">
                    * Orders are released immediately upon confirmed bank credit.
                  </p>
                </div>
              )}

              {paymentMethod === "card_online" && (
                <div className="bg-brand-card p-4 rounded-lg border border-brand-border space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-brand-muted">
                    <Lock className="w-3.5 h-3.5 text-brand-accent" />
                    <span className="font-mono text-[11px]">
                      256-bit Encrypted Tokenized Payment Gateway
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Card Number •••• •••• •••• ••••"
                    className="w-full bg-white border border-brand-border px-3 py-2 rounded text-xs font-mono"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="bg-white border border-brand-border px-3 py-2 rounded text-xs font-mono"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="bg-white border border-brand-border px-3 py-2 rounded text-xs font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Order Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className={`w-full py-4 px-6 rounded text-xs uppercase tracking-luxury font-medium transition-all shadow-md flex items-center justify-center space-x-2 ${
                  isSubmitting
                    ? "bg-brand-muted text-white cursor-wait"
                    : "bg-brand-text hover:bg-brand-dark text-white"
                }`}
              >
                {isSubmitting ? (
                  <span>Authorizing Order Dispatch...</span>
                ) : (
                  <>
                    <span>Confirm & Dispatch Order (${total.toFixed(2)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-brand-muted uppercase tracking-wider font-mono mt-3">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                <span>Guaranteed Authentic • Direct European & Japanese Craftsmanship</span>
              </div>
            </div>
          </form>
        </div>

        {/* Right Summary Column (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-brand-card/90 border border-brand-border rounded-xl p-6 shadow-luxury space-y-6 sticky top-24">
            <h2 className="font-serif text-lg font-medium text-brand-text pb-4 border-b border-brand-border">
              In Your Dispatch ({items.length})
            </h2>

            <div className="space-y-4 max-h-72 overflow-y-auto no-scrollbar">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex space-x-3.5 items-center">
                  <div className="relative w-14 h-16 bg-white rounded overflow-hidden shrink-0 border border-brand-border/60">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-xs font-medium text-brand-text truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-brand-muted font-mono">
                      {item.color} • {item.size} • Qty {item.quantity}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold text-brand-text">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-brand-border text-xs">
              <div className="flex justify-between text-brand-muted">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-brand-text">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-brand-muted">
                <span>Express Courier Shipping</span>
                <span className="font-mono text-brand-text">
                  {shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-brand-muted">
                <span>Customs Duties & Handling</span>
                <span className="font-mono text-brand-text">Included</span>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border flex justify-between items-baseline text-brand-text">
              <span className="font-serif text-base font-semibold">Total Payable</span>
              <span className="font-mono text-xl font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

