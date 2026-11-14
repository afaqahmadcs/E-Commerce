"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Package, MapPin, Heart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { PRODUCTS_DATA } from "@/data/products";
import Image from "next/image";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "wishlist" | "addresses">("profile");
  const { wishlistIds, toggleWishlist } = useCartStore();

  const [customerProfile] = useState({
    fullName: "Marcus Vance",
    email: "marcus.vance@atelier.com",
    phone: "+1 (555) 392-1840",
    membershipTier: "Patron Member",
  });

  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    try {
      const orders = JSON.parse(localStorage.getItem("afaq_customer_orders") || "[]");
      setOrdersCount(orders.length);
    } catch {
      setOrdersCount(0);
    }
  }, []);

  const wishlistedProducts = PRODUCTS_DATA.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
      {/* Account Header */}
      <div className="pb-8 border-b border-brand-border flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
            CLIENT PORTAL
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal tracking-tight mt-1">
            MY ACCOUNT
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Welcome back, {customerProfile.fullName}.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/account/orders"
            className="flex items-center space-x-2 px-4 py-2 bg-brand-text text-white rounded text-xs uppercase tracking-wider font-mono hover:bg-brand-dark transition-colors shadow-sm"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Order History ({ordersCount})</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
        {/* Navigation Sidebar (3 cols) */}
        <div className="md:col-span-3 space-y-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-xs font-mono uppercase tracking-wider transition-all text-left ${
              activeTab === "profile"
                ? "bg-brand-card text-brand-text font-semibold border-l-2 border-brand-accent"
                : "text-brand-muted hover:text-brand-text hover:bg-brand-card/50"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Client Profile</span>
          </button>

          <Link
            href="/account/orders"
            className="w-full flex items-center justify-between px-4 py-3 rounded text-xs font-mono uppercase tracking-wider text-brand-muted hover:text-brand-text hover:bg-brand-card/50 transition-all text-left"
          >
            <div className="flex items-center space-x-3">
              <Package className="w-4 h-4" />
              <span>Orders & Dispatches</span>
            </div>
            <span className="font-mono text-[10px] bg-brand-border px-1.5 py-0.5 rounded">
              {ordersCount}
            </span>
          </Link>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded text-xs font-mono uppercase tracking-wider transition-all text-left ${
              activeTab === "wishlist"
                ? "bg-brand-card text-brand-text font-semibold border-l-2 border-brand-accent"
                : "text-brand-muted hover:text-brand-text hover:bg-brand-card/50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Heart className="w-4 h-4" />
              <span>Saved Pieces</span>
            </div>
            <span className="font-mono text-[10px] bg-brand-border px-1.5 py-0.5 rounded">
              {wishlistIds.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-xs font-mono uppercase tracking-wider transition-all text-left ${
              activeTab === "addresses"
                ? "bg-brand-card text-brand-text font-semibold border-l-2 border-brand-accent"
                : "text-brand-muted hover:text-brand-text hover:bg-brand-card/50"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Addresses</span>
          </button>
        </div>

        {/* Tab Content (9 cols) */}
        <div className="md:col-span-9 bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-sm">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <h2 className="font-serif text-xl font-medium text-brand-text">
                  Personal Atelier Profile
                </h2>
                <span className="text-[10px] font-mono uppercase tracking-luxury bg-brand-card px-2.5 py-1 rounded text-brand-accent font-semibold">
                  {customerProfile.membershipTier}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-brand-muted mb-1">
                    Full Name
                  </label>
                  <p className="font-serif text-sm font-medium text-brand-text">
                    {customerProfile.fullName}
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-brand-muted mb-1">
                    Email Address
                  </label>
                  <p className="font-mono text-sm text-brand-text">
                    {customerProfile.email}
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-brand-muted mb-1">
                    Phone Number
                  </label>
                  <p className="font-mono text-sm text-brand-text">
                    {customerProfile.phone}
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-brand-muted mb-1">
                    Language / Region
                  </label>
                  <p className="font-sans text-sm text-brand-text">
                    English (US) • USD ($)
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-border flex items-center justify-between">
                <span className="text-[11px] text-brand-muted">
                  Secured via Supabase Authentication & 256-bit SSL
                </span>
                <button
                  onClick={() => alert("Profile updated successfully.")}
                  className="px-5 py-2 bg-brand-text text-white text-xs uppercase tracking-luxury font-medium rounded hover:bg-brand-dark transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-medium text-brand-text pb-4 border-b border-brand-border">
                Saved Archival Pieces ({wishlistedProducts.length})
              </h2>

              {wishlistedProducts.length === 0 ? (
                <div className="text-center py-16 text-brand-muted space-y-3">
                  <Heart className="w-8 h-8 mx-auto opacity-30" />
                  <p className="text-sm font-serif">You have no saved pieces.</p>
                  <Link
                    href="/shop"
                    className="inline-block mt-2 text-xs uppercase tracking-luxury text-brand-accent underline"
                  >
                    Browse Collections
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="border border-brand-border rounded-lg p-3 bg-brand-card/50 flex flex-col justify-between"
                    >
                      <div className="relative aspect-[3/4] w-full rounded overflow-hidden">
                        <Image
                          src={p.primaryImage}
                          alt={p.name}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                      </div>
                      <div className="mt-3">
                        <Link
                          href={`/products/${p.slug}`}
                          className="font-serif text-sm font-medium text-brand-text hover:text-brand-accent line-clamp-1"
                        >
                          {p.name}
                        </Link>
                        <p className="font-mono text-xs font-semibold text-brand-text mt-1">
                          ${p.basePrice.toFixed(2)}
                        </p>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="mt-3 text-[10px] font-mono uppercase text-red-600 hover:underline"
                        >
                          Remove from wishlist
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-medium text-brand-text pb-4 border-b border-brand-border">
                Saved Addresses
              </h2>

              <div className="border border-brand-border rounded-lg p-4 bg-brand-card/30 max-w-md space-y-1 text-xs">
                <span className="text-[10px] font-mono uppercase bg-brand-text text-white px-2 py-0.5 rounded font-bold">
                  DEFAULT DISPATCH ADDRESS
                </span>
                <p className="font-serif font-semibold text-sm pt-2 text-brand-text">
                  Marcus Vance
                </p>
                <p className="text-brand-muted">742 Evergreen Terrace, Penthouse B</p>
                <p className="text-brand-muted">New York, NY 10001, United States</p>
                <p className="text-brand-muted font-mono pt-1">+1 (555) 392-1840</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

