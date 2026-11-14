"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Truck, CheckCircle2, Clock, PackageCheck, AlertCircle, RefreshCw } from "lucide-react";
import { Order } from "@/types";

export default function OrdersHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem("afaq_customer_orders") || "[]");
      if (savedOrders.length > 0) {
        setOrders(savedOrders);
      } else {
        // Seed default sample order for demonstration if empty
        const demoOrder: Order = {
          id: "ord-demo-01",
          orderNumber: "AFQ-20261114-8192",
          customer: {
            fullName: "Afaq Ahmad",
            email: "afaq@atelier.com",
            phone: "+92 300 8849201",
            addressLine1: "House #14, Street 9, Sector F-7/2",
            city: "Islamabad",
            stateProvince: "ICT",
            postalCode: "44000",
            country: "Pakistan",
          },
          items: [
            {
              cartItemId: "item-demo-1",
              productId: "prod-001",
              slug: "afaq-signature-statement-hoodie-grey",
              name: "AFAQ Signature Archival Hoodie",
              price: 199,
              color: "Heather Melange",
              size: "L",
              image: "/images/products/hoodies/hoodie_01.jpg",
              quantity: 1,
              maxStock: 10,
            },
            {
              cartItemId: "item-demo-2",
              productId: "prod-002",
              slug: "afaq-luka-5-retro-runner",
              name: "AFAQ LUKA 5",
              price: 149,
              color: "Bone White / Red",
              size: "EU 42",
              image: "/sneakers/luka5-retro-high-bred.png",
              quantity: 1,
              maxStock: 15,
            },
          ],
          subtotal: 348,
          shipping: 0,
          discount: 0,
          total: 348,
          paymentMethod: "cod",
          paymentStatus: "pending",
          orderStatus: "confirmed",
          createdAt: new Date().toISOString(),
        };
        setOrders([demoOrder]);
        localStorage.setItem("afaq_customer_orders", JSON.stringify([demoOrder]));
      }
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();

    // Listen for cross-window / checkout events
    const handleStorageChange = () => loadOrders();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("afaq_new_order_placed", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("afaq_new_order_placed", handleStorageChange);
    };
  }, []);

  const getStatusBadge = (status: Order["orderStatus"]) => {
    switch (status) {
      case "delivered":
        return { label: "Delivered", bg: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: CheckCircle2 };
      case "shipped":
        return { label: "In Transit", bg: "bg-blue-100 text-blue-800 border-blue-200", icon: Truck };
      case "processing":
        return { label: "Atelier Assembly", bg: "bg-amber-100 text-amber-800 border-amber-200", icon: Clock };
      case "confirmed":
        return { label: "Order Confirmed", bg: "bg-neutral-100 text-neutral-800 border-neutral-300", icon: PackageCheck };
      default:
        return { label: status, bg: "bg-neutral-100 text-neutral-800 border-neutral-200", icon: AlertCircle };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
      <div className="flex items-center space-x-2 text-xs font-mono text-brand-muted uppercase tracking-wider mb-6">
        <Link href="/account" className="hover:text-brand-text flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Back to Account</span>
        </Link>
      </div>

      <div className="pb-8 border-b border-brand-border flex items-end justify-between">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
            CLIENT ARCHIVE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal tracking-tight mt-1">
            DISPATCH & ORDER HISTORY
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Review real-time tracking, courier references, and archival receipts.
          </p>
        </div>

        <button
          onClick={loadOrders}
          className="flex items-center space-x-1.5 px-3 py-1.5 border border-brand-border rounded text-xs font-mono text-brand-muted hover:text-brand-text hover:bg-brand-card transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Refresh</span>
        </button>
      </div>

      {loading ? (
        <div className="py-24 text-center text-xs font-mono text-brand-muted">
          SYNCHRONIZING ATELIER LEDGER...
        </div>
      ) : orders.length === 0 ? (
        <div className="py-24 text-center max-w-sm mx-auto space-y-4">
          <p className="font-serif text-lg text-brand-text">No dispatches found</p>
          <p className="text-xs text-brand-muted">
            You haven’t placed an order yet. Explore our latest runway collection.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2.5 bg-brand-text text-white text-xs uppercase tracking-luxury rounded font-medium hover:bg-brand-dark transition-colors"
          >
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="space-y-8 mt-8">
          {orders.map((order) => {
            const badge = getStatusBadge(order.orderStatus);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={order.id}
                className="bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-sm space-y-6"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm font-bold text-brand-text">
                        {order.orderNumber}
                      </span>
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold border ${badge.bg}`}
                      >
                        <BadgeIcon className="w-3 h-3" />
                        <span>{badge.label}</span>
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-brand-muted mt-1">
                      Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-mono uppercase text-brand-muted block">
                      Total Authorized
                    </span>
                    <span className="font-mono text-base font-bold text-brand-text">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-brand-border/60">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-4 flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-20 bg-brand-card rounded overflow-hidden shrink-0 border border-brand-border">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/products/${item.slug}`}
                            className="font-serif text-sm font-medium text-brand-text hover:text-brand-accent transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-[11px] text-brand-muted font-sans mt-0.5">
                            Color: {item.color} • Size: {item.size} • Qty: {item.quantity}
                          </p>
                          <p className="font-mono text-[11px] text-brand-muted mt-1">
                            Unit Price: ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-semibold text-brand-text">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment Meta Footer */}
                <div className="pt-4 border-t border-brand-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-brand-muted">
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-brand-text block mb-1">
                      Destination
                    </span>
                    <p>
                      {order.customer.fullName}<br />
                      {order.customer.addressLine1}, {order.customer.city}, {order.customer.country}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-brand-text block mb-1">
                      Settlement Details
                    </span>
                    <p className="font-mono uppercase">
                      Method: {order.paymentMethod} • Status: {order.paymentStatus}
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-1">
                      Priority dispatch via TCS Express (Domestic) / DHL Express (International).
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
