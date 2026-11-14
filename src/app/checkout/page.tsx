"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Building2,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Smartphone,
  QrCode,
  AlertCircle,
  FileText,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCartStore } from "@/store/useCartStore";
import { PaymentMethod, Order } from "@/types";
import { ATELIER_BANK_ACCOUNTS } from "@/lib/payments/providers/bank-transfer";

interface OrderResponsePayload {
  success: boolean;
  order: Order;
  payment: {
    gateway: string;
    gatewayDisplayName: string;
    status: string;
    transactionReference: string;
    actionInstructions: string[];
    referenceData: Record<string, unknown>;
    customerInstructions: string[];
  };
  error?: string;
}

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();

  const subtotal = getCartTotal();
  const freeShippingThreshold = 200;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
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
    country: "Pakistan",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [paymentResultData, setPaymentResultData] = useState<OrderResponsePayload["payment"] | null>(null);
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
    setErrorMessage(null);

    try {
      // Execute authentic server-side price validation and order creation
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items,
          paymentMethod,
        }),
      });

      const data: OrderResponsePayload = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Order dispatch authorization failed.");
      }

      const confirmedOrder = data.order;

      // Persist in local storage for order history & admin dashboard synchronization
      try {
        const existingOrders = JSON.parse(localStorage.getItem("afaq_customer_orders") || "[]");
        const updated = [confirmedOrder, ...existingOrders];
        localStorage.setItem("afaq_customer_orders", JSON.stringify(updated));

        // Save last used shipping address for customer convenience
        localStorage.setItem("afaq_saved_shipping_address", JSON.stringify(formData));

        // Notify other windows/tabs (e.g. open admin dashboard)
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new CustomEvent("afaq_new_order_placed", { detail: confirmedOrder }));
      } catch (storageErr) {
        console.warn("Storage sync notice:", storageErr);
      }

      // Clear the live cart
      clearCart();
      setCompletedOrder(confirmedOrder);
      setPaymentResultData(data.payment);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C66B39", "#151515", "#E8E6E1", "#2D4A22"],
        });
      } catch {
        // Safe fallback
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred while placing your order. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16 space-y-8">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full mx-auto flex items-center justify-center shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
              OFFICIAL ATELIER DISPATCH CONFIRMATION
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal tracking-tight mt-1">
              THANK YOU FOR YOUR PATRONAGE.
            </h1>
            <p className="text-xs text-brand-muted mt-2">
              Order Reference: <strong className="font-mono text-brand-text text-sm font-bold bg-brand-card px-2.5 py-1 rounded border border-brand-border">{completedOrder.orderNumber}</strong>
            </p>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-luxury space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs pb-6 border-b border-brand-border">
            <div>
              <span className="font-mono text-[10px] uppercase text-brand-muted font-bold block mb-1">
                DISPATCH RECIPIENT
              </span>
              <p className="font-serif text-sm font-medium text-brand-text">
                {completedOrder.customer.fullName}
              </p>
              <p className="text-brand-muted mt-0.5">
                {completedOrder.customer.addressLine1}
                {completedOrder.customer.addressLine2 ? `, ${completedOrder.customer.addressLine2}` : ""}
                <br />
                {completedOrder.customer.city}, {completedOrder.customer.country} {completedOrder.customer.postalCode}
              </p>
              <p className="font-mono text-[11px] text-brand-muted mt-1">
                Phone: {completedOrder.customer.phone}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase text-brand-muted font-bold block mb-1">
                PAYMENT ARCHITECTURE & STATUS
              </span>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-semibold text-brand-text uppercase">
                  {completedOrder.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : completedOrder.paymentMethod === "bank_transfer"
                    ? "Direct Bank Remittance (IBAN)"
                    : completedOrder.paymentMethod === "jazzcash"
                    ? "JazzCash Mobile Gateway"
                    : completedOrder.paymentMethod === "easypaisa"
                    ? "EasyPaisa Mobile Account"
                    : completedOrder.paymentMethod === "kuickpay"
                    ? "1Link 1Bill Inter-Bank Voucher"
                    : "Credit / Debit Card"}
                </span>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  completedOrder.paymentStatus === "paid"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}>
                  {completedOrder.paymentStatus}
                </span>
              </div>

              {/* Instructions Box */}
              {paymentResultData?.actionInstructions && paymentResultData.actionInstructions.length > 0 && (
                <div className="mt-3 bg-brand-card/80 p-3 rounded border border-brand-border/70 space-y-1 font-mono text-[11px] text-brand-text">
                  {paymentResultData.actionInstructions.map((instruction, idx) => (
                    <p key={idx} className="leading-relaxed">
                      • {instruction}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Items Summary */}
          <div>
            <h3 className="font-serif text-sm font-medium text-brand-text pb-3 border-b border-brand-border">
              Archival Silhouettes in This Dispatch ({completedOrder.items.length})
            </h3>
            <div className="divide-y divide-brand-border/60">
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-14 bg-brand-card rounded overflow-hidden shrink-0 border border-brand-border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-serif font-medium text-brand-text">{item.name}</p>
                      <p className="text-[11px] text-brand-muted font-sans">
                        {item.color} • Size {item.size} • Qty {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono font-semibold text-brand-text">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="pt-4 border-t border-brand-border space-y-2 text-xs">
              <div className="flex justify-between text-brand-muted">
                <span>Subtotal</span>
                <span className="font-mono text-brand-text">${completedOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brand-muted">
                <span>Shipping Dispatch</span>
                <span className="font-mono text-brand-text">
                  {completedOrder.shipping === 0 ? "Complimentary" : `$${completedOrder.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-brand-border text-brand-text text-sm font-semibold">
                <span className="font-serif">Total Authorized</span>
                <span className="font-mono text-base font-bold text-brand-accent">
                  ${completedOrder.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/account/orders"
            className="flex items-center justify-center space-x-2 px-8 py-3.5 bg-brand-text text-white text-xs uppercase tracking-luxury font-medium rounded hover:bg-brand-dark transition-all shadow-md"
          >
            <FileText className="w-4 h-4" />
            <span>Track in Order History</span>
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 px-8 py-3.5 border border-brand-border bg-white text-brand-text text-xs uppercase tracking-luxury font-medium rounded hover:bg-brand-card transition-colors"
          >
            <span>Return to Public Atelier</span>
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
        <span className="text-brand-text font-semibold">Express Atelier Dispatch</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form Column (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
              FINAL DISPATCH CHECKOUT
            </span>
            <h1 className="font-serif text-3xl text-brand-text font-normal tracking-tight mt-1">
              SHIPPING & PAYMENT
            </h1>
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-lg flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmitOrder} className="space-y-8">
            {/* 1. Contact Information */}
            <div className="space-y-4">
              <h2 className="font-serif text-base font-medium text-brand-text flex items-center justify-between pb-2 border-b border-brand-border">
                <span>1. Client Contact</span>
                <span className="text-[11px] font-sans text-brand-muted font-normal">
                  Already registered? <Link href="/account" className="underline text-brand-text">Sign in</Link>
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
                    placeholder="client@atelier.com"
                    className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text shadow-sm"
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
                    placeholder="+92 300 1234567 or +1 (555) 0192"
                    className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="space-y-4">
              <h2 className="font-serif text-base font-medium text-brand-text pb-2 border-b border-brand-border">
                2. Shipping Destination
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
                    placeholder="Afaq Ahmad"
                    className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                    Street Address & Apartment/Suite *
                  </label>
                  <input
                    type="text"
                    required
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="House #14, Street 9, Sector F-7/2"
                    className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text shadow-sm"
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
                      placeholder="Islamabad / Lahore / New York"
                      className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text shadow-sm"
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
                      placeholder="Punjab / ICT / NY"
                      className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text shadow-sm"
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
                      placeholder="44000"
                      className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text shadow-sm"
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
                    className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text shadow-sm"
                  >
                    <option value="Pakistan">Pakistan (Domestic Priority Dispatch)</option>
                    <option value="United States">United States (DHL International Express)</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Payment Method Matrix */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-brand-border">
                <h2 className="font-serif text-base font-medium text-brand-text">
                  3. Payment Architecture
                </h2>
                <span className="text-[10px] font-mono uppercase text-brand-muted">
                  Encrypted & Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    paymentMethod === "cod"
                      ? "border-brand-text bg-white shadow-sm ring-1 ring-brand-text"
                      : "border-brand-border bg-brand-card/50 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Truck className="w-5 h-5 text-brand-accent" />
                    <span className="text-[9px] font-mono uppercase bg-neutral-200 text-neutral-800 px-1.5 py-0.5 rounded font-bold">
                      Popular
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-serif font-semibold text-brand-text">
                      Cash on Delivery
                    </p>
                    <p className="text-[10px] text-brand-muted mt-0.5">
                      Pay cash upon courier arrival across Pakistan & USA
                    </p>
                  </div>
                </button>

                {/* 2. Direct Bank Wire */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank_transfer")}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    paymentMethod === "bank_transfer"
                      ? "border-brand-text bg-white shadow-sm ring-1 ring-brand-text"
                      : "border-brand-border bg-brand-card/50 hover:bg-white"
                  }`}
                >
                  <Building2 className="w-5 h-5 text-brand-accent" />
                  <div className="mt-2">
                    <p className="text-xs font-serif font-semibold text-brand-text">
                      Direct Bank Wire (IBAN)
                    </p>
                    <p className="text-[10px] text-brand-muted mt-0.5">
                      Meezan Bank, Standard Chartered & Chase
                    </p>
                  </div>
                </button>

                {/* 3. JazzCash */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("jazzcash")}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    paymentMethod === "jazzcash"
                      ? "border-brand-text bg-white shadow-sm ring-1 ring-brand-text"
                      : "border-brand-border bg-brand-card/50 hover:bg-white"
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-red-600" />
                  <div className="mt-2">
                    <p className="text-xs font-serif font-semibold text-brand-text">
                      JazzCash Mobile Wallet
                    </p>
                    <p className="text-[10px] text-brand-muted mt-0.5">
                      Till #982104 / MPIN mobile authorization
                    </p>
                  </div>
                </button>

                {/* 4. EasyPaisa */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("easypaisa")}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    paymentMethod === "easypaisa"
                      ? "border-brand-text bg-white shadow-sm ring-1 ring-brand-text"
                      : "border-brand-border bg-brand-card/50 hover:bg-white"
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                  <div className="mt-2">
                    <p className="text-xs font-serif font-semibold text-brand-text">
                      EasyPaisa Mobile Account
                    </p>
                    <p className="text-[10px] text-brand-muted mt-0.5">
                      0300-8849201 / OTC Token Remittance
                    </p>
                  </div>
                </button>

                {/* 5. 1Link / Kuickpay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("kuickpay")}
                  className={`p-4 rounded-lg border text-left transition-all sm:col-span-2 ${
                    paymentMethod === "kuickpay"
                      ? "border-brand-text bg-white shadow-sm ring-1 ring-brand-text"
                      : "border-brand-border bg-brand-card/50 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <QrCode className="w-5 h-5 text-brand-accent" />
                    <div>
                      <p className="text-xs font-serif font-semibold text-brand-text">
                        1Link 1Bill / Kuickpay Inter-Bank Voucher
                      </p>
                      <p className="text-[10px] text-brand-muted mt-0.5">
                        Payable via ANY Pakistani Bank Mobile App, Internet Banking, or ATM nationwide
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Dynamic Payment Context Panels */}
              {paymentMethod === "bank_transfer" && (
                <div className="bg-brand-card p-4 rounded-lg border border-brand-border text-xs text-brand-muted space-y-2 font-mono">
                  <p className="font-sans font-semibold text-brand-text uppercase text-[11px]">
                    AFAQ SUPPLY Corporate Bank Remittance Accounts:
                  </p>
                  <div className="divide-y divide-brand-border/60">
                    {ATELIER_BANK_ACCOUNTS.map((acc, idx) => (
                      <div key={idx} className="py-2 space-y-0.5">
                        <p className="font-sans font-medium text-brand-text">{acc.bankName}</p>
                        <p>Title: {acc.accountTitle}</p>
                        <p>IBAN: <span className="font-semibold text-brand-text">{acc.iban}</span></p>
                        <p className="text-[10px] text-neutral-500">Swift: {acc.swiftBic} • Branch: {acc.branch}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-sans text-neutral-500 pt-1">
                    * Orders are prioritized for dispatch immediately upon bank remittance confirmation.
                  </p>
                </div>
              )}

              {paymentMethod === "jazzcash" && (
                <div className="bg-brand-card p-4 rounded-lg border border-brand-border text-xs space-y-2">
                  <p className="font-serif font-medium text-brand-text">
                    JazzCash Corporate Merchant Instructions
                  </p>
                  <p className="font-mono text-xs text-brand-muted">
                    Merchant Till ID: <strong className="text-brand-text">982104</strong> (AFAQ SUPPLY ATELIER)
                  </p>
                  <p className="text-[11px] text-brand-muted leading-relaxed">
                    Upon order confirmation, transfer the PKR equivalent using your JazzCash Mobile App. Your order will receive priority dispatch tracking.
                  </p>
                </div>
              )}

              {paymentMethod === "easypaisa" && (
                <div className="bg-brand-card p-4 rounded-lg border border-brand-border text-xs space-y-2">
                  <p className="font-serif font-medium text-brand-text">
                    EasyPaisa Direct Account Remittance
                  </p>
                  <p className="font-mono text-xs text-brand-muted">
                    Account: <strong className="text-brand-text">0300-8849201</strong> (AFAQ SUPPLY ATELIER)
                  </p>
                  <p className="text-[11px] text-brand-muted leading-relaxed">
                    Transfer PKR equivalent via EasyPaisa App or visit any EasyPaisa franchise shop nationwide.
                  </p>
                </div>
              )}

              {paymentMethod === "kuickpay" && (
                <div className="bg-brand-card p-4 rounded-lg border border-brand-border text-xs space-y-2">
                  <p className="font-serif font-medium text-brand-text">
                    1Link 1Bill Nationwide Clearing
                  </p>
                  <p className="text-[11px] text-brand-muted leading-relaxed">
                    A unique 1Bill Consumer Number will be generated on the next screen. Open your Pakistani banking app (HBL, Meezan, Standard Chartered, Alfalah, UBL, Sadapay, Nayapay) and pay under &ldquo;1Bill Invoices&rdquo;.
                  </p>
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
                  <span>Authorizing Server Dispatch...</span>
                ) : (
                  <>
                    <span>Confirm & Authorize Dispatch (${total.toFixed(2)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-brand-muted uppercase tracking-wider font-mono mt-3">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                <span>256-Bit SSL Encryption • Server-Side Price & Inventory Verification</span>
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
                <div key={item.cartItemId} className="flex items-center space-x-3 text-xs">
                  <div className="relative w-14 h-16 bg-white rounded overflow-hidden shrink-0 border border-brand-border/60">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-serif font-medium text-brand-text line-clamp-1">{item.name}</p>
                    <p className="text-[11px] text-brand-muted font-sans">
                      {item.color} • {item.size} • Qty {item.quantity}
                    </p>
                    <p className="font-mono font-semibold text-brand-text mt-0.5">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-brand-border space-y-2 text-xs">
              <div className="flex justify-between text-brand-muted">
                <span>Subtotal</span>
                <span className="font-mono text-brand-text">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brand-muted">
                <span>Shipping</span>
                <span className="font-mono text-brand-text">
                  {shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-brand-border text-brand-text text-sm font-semibold">
                <span className="font-serif">Estimated Total</span>
                <span className="font-mono text-base font-bold text-brand-accent">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
