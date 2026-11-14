"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Truck, CheckCircle, Clock } from "lucide-react";
import { Order } from "@/types";

export default function OrdersHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem("afaq_customer_orders") || "[]");
      if (savedOrders.length > 0) {
        setOrders(savedOrders);
      } else {
        // Seed default sample order for demo
        const demoOrder: Order = {
          id: "ord-demo-01",
          orderNumber: "AFQ-2026-819241",
          customer: {
            fullName: "Marcus Vance",
            email: "marcus.vance@atelier.com",
            phone: "+1 (555) 392-1840",
            addressLine1: "742 Evergreen Terrace, Penthouse B",
            city: "New York",
            stateProvince: "NY",
            postalCode: "10001",
            country: "United States",
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
              image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=85",
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
              image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=85",
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
          orderStatus: "processing",
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        };
        setOrders([demoOrder]);
      }
    } catch {
      setOrders([]);
    }
  }, []);

  const getStatusBadge = (status: Order["orderStatus"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-200";
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
            DISPATCH HISTORY
          </h1>
        </div>
        <span className="text-xs font-mono text-brand-muted">
          ({orders.length} dispatches)
        </span>
      </div>

      <div className="mt-8 space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-sm space-y-6"
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-base font-bold text-brand-text">
                    {order.orderNumber}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-semibold ${getStatusBadge(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
                <p className="text-[11px] text-brand-muted font-mono">
                  Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-brand-muted block">
                  Total Value
                </span>
                <span className="font-mono text-base font-bold text-brand-text">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Tracking Progress Bar */}
            <div className="py-2">
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono uppercase tracking-wider text-brand-muted mb-2">
                <span className="text-brand-text font-semibold flex items-center justify-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Confirmed</span>
                </span>
                <span className="text-brand-text font-semibold flex items-center justify-center space-x-1">
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>Processing</span>
                </span>
                <span className="flex items-center justify-center space-x-1">
                  <Truck className="w-3 h-3" />
                  <span>Dispatched</span>
                </span>
                <span>Delivered</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-text rounded-full w-1/2" />
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3 pt-2">
              {order.items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center space-x-4 bg-brand-card/40 p-3 rounded-lg border border-brand-border/60"
                >
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
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-serif text-xs font-medium text-brand-text hover:text-brand-accent transition-colors truncate block"
                    >
                      {item.name}
                    </Link>
                    <p className="text-[10px] text-brand-muted font-mono">
                      Color: {item.color} • Size: {item.size} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold text-brand-text">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Delivery Meta */}
            <div className="pt-2 text-[11px] text-brand-muted flex flex-col sm:flex-row justify-between border-t border-brand-border gap-2">
              <span>
                Shipping to: {order.customer.fullName}, {order.customer.city},{" "}
                {order.customer.country}
              </span>
              <span className="font-mono">
                Payment: {order.paymentMethod.toUpperCase()} ({order.paymentStatus.toUpperCase()})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

