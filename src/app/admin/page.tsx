"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Plus,
  Trash2,
  Check,
  Settings,
  Megaphone,
  Layers,
  ArrowUpRight,
  Shield,
  Eye,
} from "lucide-react";
import { PRODUCTS_DATA } from "@/data/products";
import { COLLECTIONS_DATA } from "@/data/collections";
import { Product, Order, Collection } from "@/types";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "orders" | "collections" | "promotions" | "settings"
  >("overview");

  // Local state for products allowing full CRUD simulation in admin
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS_DATA);
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [collectionsList] = useState<Collection[]>(COLLECTIONS_DATA);

  // New Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState<"men" | "women" | "sneakers" | "accessories">("men");
  const [newProdPrice, setNewProdPrice] = useState(180);
  const [newProdImage, setNewProdImage] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");

  // Store Settings State
  const [announcementText, setAnnouncementText] = useState(
    "COMPLIMENTARY SHIPPING ON SELECT ORDERS OVER $200"
  );
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(200);
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  // Load orders from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("afaq_customer_orders") || "[]");
      if (saved.length > 0) {
        setOrdersList(saved);
      } else {
        // Mock sample orders for dashboard stats
        const sampleOrders: Order[] = [
          {
            id: "ord-101",
            orderNumber: "AFQ-2026-904121",
            customer: {
              fullName: "Marcus Vance",
              email: "marcus.v@atelier.com",
              phone: "+1 555-0192",
              addressLine1: "742 Evergreen Terrace",
              city: "New York",
              postalCode: "10001",
              country: "United States",
            },
            items: [
              {
                cartItemId: "item-1",
                productId: "prod-001",
                slug: "afaq-signature-statement-hoodie-grey",
                name: "AFAQ Signature Archival Hoodie",
                price: 199,
                color: "Heather Melange",
                size: "L",
                image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80",
                quantity: 1,
                maxStock: 10,
              },
            ],
            subtotal: 199,
            shipping: 0,
            discount: 0,
            total: 199,
            paymentMethod: "cod",
            paymentStatus: "paid",
            orderStatus: "delivered",
            createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          },
          {
            id: "ord-102",
            orderNumber: "AFQ-2026-904122",
            customer: {
              fullName: "Elena Rostova",
              email: "elena@studio.fr",
              phone: "+33 6 12 34 56 78",
              addressLine1: "14 Rue Saint-Honoré",
              city: "Paris",
              postalCode: "75001",
              country: "France",
            },
            items: [
              {
                cartItemId: "item-2",
                productId: "prod-002",
                slug: "afaq-luka-5-retro-runner",
                name: "AFAQ LUKA 5",
                price: 149,
                color: "Bone White / Red",
                size: "EU 41",
                image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=300&q=80",
                quantity: 2,
                maxStock: 15,
              },
            ],
            subtotal: 298,
            shipping: 0,
            discount: 0,
            total: 298,
            paymentMethod: "card_online",
            paymentStatus: "paid",
            orderStatus: "processing",
            createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
          },
        ];
        setOrdersList(sampleOrders);
      }
    } catch {
      setOrdersList([]);
    }
  }, []);

  const totalRevenue = ordersList.reduce((acc, o) => acc + o.total, 0) + 48290;
  const totalOrdersCount = ordersList.length + 248;

  // Handle Product CRUD
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;

    const newProd: Product = {
      id: `prod-custom-${Date.now()}`,
      slug: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: newProdName,
      tagline: "New Seasonal Silhouette",
      description: newProdDesc || "Engineered with architectural precision.",
      details: ["Custom-milled heavyweight fabric", "Handcrafted in Portugal"],
      materialsCare: ["100% Organic Cotton", "Dry flat"],
      category: newProdCategory,
      subcategory: "Special Drop",
      basePrice: Number(newProdPrice),
      isNewArrival: true,
      primaryImage:
        newProdImage ||
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=85",
      allImages: [
        newProdImage ||
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=85",
      ],
      availableColors: [{ name: "Standard", hex: "#151515", image: newProdImage || "" }],
      availableSizes: ["S", "M", "L", "XL"],
      variants: [],
      status: "published",
      createdAt: new Date().toISOString(),
    };

    setProductsList([newProd, ...productsList]);
    setIsAddModalOpen(false);
    setNewProdName("");
    setNewProdImage("");
    setNewProdDesc("");
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you certain you wish to archive/delete this silhouette?")) {
      setProductsList(productsList.filter((p) => p.id !== id));
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order["orderStatus"]) => {
    const updated = ordersList.map((o) =>
      o.id === orderId ? { ...o, orderStatus: newStatus } : o
    );
    setOrdersList(updated);
    localStorage.setItem("afaq_customer_orders", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#F0EFEB] text-brand-text flex flex-col md:flex-row">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-brand-dark text-white p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-xl tracking-wider text-white">
                AFAQ SUPPLY
              </span>
              <span className="text-[9px] font-mono bg-brand-accent text-white px-1.5 py-0.5 rounded font-bold uppercase">
                ADMIN
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 mt-1">
              Atelier Management Portal
            </p>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all text-left ${
                activeTab === "overview"
                  ? "bg-brand-accent text-white font-semibold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all text-left ${
                activeTab === "products"
                  ? "bg-brand-accent text-white font-semibold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products ({productsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all text-left ${
                activeTab === "orders"
                  ? "bg-brand-accent text-white font-semibold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders ({ordersList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("collections")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all text-left ${
                activeTab === "collections"
                  ? "bg-brand-accent text-white font-semibold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Collections</span>
            </button>

            <button
              onClick={() => setActiveTab("promotions")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all text-left ${
                activeTab === "promotions"
                  ? "bg-brand-accent text-white font-semibold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span>Announcements</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all text-left ${
                activeTab === "settings"
                  ? "bg-brand-accent text-white font-semibold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Store Settings</span>
            </button>
          </nav>
        </div>

        <div className="pt-8 border-t border-neutral-800 space-y-3">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <span>View Public Storefront</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-500 font-mono">
            <Shield className="w-3 h-3 text-green-500" />
            <span>Supabase RLS Active</span>
          </div>
        </div>
      </aside>

      {/* Main Admin Working Canvas */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-6 border-b border-brand-border">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
                  ATELIER PERFORMANCE
                </span>
                <h1 className="font-serif text-3xl font-medium text-brand-text mt-1">
                  STORE OVERVIEW
                </h1>
              </div>
              <span className="text-xs font-mono text-brand-muted">
                Updated in real-time
              </span>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-muted block">
                  TOTAL REVENUE
                </span>
                <p className="font-mono text-2xl font-bold text-brand-text">
                  ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
                <span className="text-[11px] text-green-700 font-mono font-medium block">
                  ↑ +18.4% vs last cycle
                </span>
              </div>

              <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-muted block">
                  TOTAL DISPATCHES
                </span>
                <p className="font-mono text-2xl font-bold text-brand-text">
                  {totalOrdersCount}
                </p>
                <span className="text-[11px] text-brand-muted font-mono block">
                  98.6% on-time fulfillment
                </span>
              </div>

              <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-muted block">
                  ACTIVE PATRONS
                </span>
                <p className="font-mono text-2xl font-bold text-brand-text">
                  1,482
                </p>
                <span className="text-[11px] text-green-700 font-mono font-medium block">
                  ↑ +94 new this week
                </span>
              </div>

              <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-muted block">
                  ACTIVE SILHOUETTES
                </span>
                <p className="font-mono text-2xl font-bold text-brand-text">
                  {productsList.length}
                </p>
                <span className="text-[11px] text-brand-accent font-mono block">
                  All in stock
                </span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-brand-border">
                <h3 className="font-serif text-lg font-medium text-brand-text">
                  Recent Dispatches
                </h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs font-mono text-brand-accent hover:underline uppercase"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-brand-border text-brand-muted">
                      <th className="py-2.5">ORDER #</th>
                      <th className="py-2.5">CLIENT</th>
                      <th className="py-2.5">PAYMENT</th>
                      <th className="py-2.5">TOTAL</th>
                      <th className="py-2.5">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/60">
                    {ordersList.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-brand-card/30">
                        <td className="py-3 font-bold text-brand-text">{order.orderNumber}</td>
                        <td className="py-3 font-sans font-medium">{order.customer.fullName}</td>
                        <td className="py-3 uppercase text-brand-muted">{order.paymentMethod}</td>
                        <td className="py-3 font-bold">${order.total.toFixed(2)}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-neutral-100 font-semibold uppercase">
                            {order.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-brand-border">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
                  INVENTORY CONTROL
                </span>
                <h1 className="font-serif text-3xl font-medium text-brand-text mt-1">
                  PRODUCT CATALOGUE
                </h1>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center space-x-2 px-5 py-2.5 bg-brand-text text-white rounded text-xs uppercase tracking-luxury font-medium hover:bg-brand-dark transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Silhouette</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white border border-brand-border rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="bg-brand-card border-b border-brand-border font-mono text-[11px] uppercase tracking-wider text-brand-muted">
                      <th className="p-4">Silhouette</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Sizes</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/60">
                    {productsList.map((product) => (
                      <tr key={product.id} className="hover:bg-brand-card/30 transition-colors">
                        <td className="p-4 flex items-center space-x-3">
                          <div className="relative w-12 h-14 rounded overflow-hidden bg-brand-card shrink-0">
                            <Image
                              src={product.primaryImage}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <p className="font-serif font-medium text-sm text-brand-text">
                              {product.name}
                            </p>
                            <p className="text-[10px] font-mono text-brand-muted">
                              SKU: {product.slug.toUpperCase().slice(0, 14)}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 uppercase font-mono text-[11px] text-brand-muted">
                          {product.category}
                        </td>
                        <td className="p-4 font-mono font-semibold">
                          ${product.basePrice.toFixed(2)}
                        </td>
                        <td className="p-4 font-mono text-[11px]">
                          {product.availableSizes.join(", ")}
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-green-100 text-green-800">
                            {product.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <Link
                            href={`/products/${product.slug}`}
                            target="_blank"
                            className="p-1.5 text-brand-muted hover:text-brand-text inline-block"
                            title="Preview product"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-1.5 text-brand-muted hover:text-red-600 inline-block"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-6 border-b border-brand-border">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
                  FULFILLMENT PIPELINE
                </span>
                <h1 className="font-serif text-3xl font-medium text-brand-text mt-1">
                  ORDERS & DISPATCHES
                </h1>
              </div>
            </div>

            <div className="bg-white border border-brand-border rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-brand-card border-b border-brand-border text-[11px] uppercase tracking-wider text-brand-muted">
                      <th className="p-4">Order #</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status & Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/60">
                    {ordersList.map((order) => (
                      <tr key={order.id} className="hover:bg-brand-card/30">
                        <td className="p-4 font-bold text-brand-text">{order.orderNumber}</td>
                        <td className="p-4 font-sans">
                          <p className="font-medium text-brand-text">{order.customer.fullName}</p>
                          <p className="text-[10px] text-brand-muted">{order.customer.email}</p>
                        </td>
                        <td className="p-4 font-sans text-xs">
                          {order.items.length} item(s)
                        </td>
                        <td className="p-4 font-bold text-brand-text">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="p-4 uppercase text-brand-muted">
                          {order.paymentMethod}
                        </td>
                        <td className="p-4">
                          <select
                            value={order.orderStatus}
                            onChange={(e) =>
                              handleUpdateOrderStatus(
                                order.id,
                                e.target.value as Order["orderStatus"]
                              )
                            }
                            className="bg-brand-card border border-brand-border px-2.5 py-1.5 rounded text-xs font-mono uppercase focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COLLECTIONS */}
        {activeTab === "collections" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-6 border-b border-brand-border">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
                  CURATED DROPS
                </span>
                <h1 className="font-serif text-3xl font-medium text-brand-text mt-1">
                  COLLECTIONS MANAGEMENT
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collectionsList.map((coll) => (
                <div
                  key={coll.slug}
                  className="bg-white border border-brand-border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative h-48 w-full bg-brand-card">
                    <Image
                      src={coll.coverImage}
                      alt={coll.name}
                      fill
                      className="object-cover"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-4 text-white">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent">
                          {coll.subtitle}
                        </span>
                        <h3 className="font-serif text-xl font-medium">{coll.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {coll.description}
                    </p>
                    <div className="flex justify-between items-center pt-2 border-t border-brand-border">
                      <span className="text-xs font-mono text-brand-text font-semibold">
                        {coll.productCount} Associated Silhouettes
                      </span>
                      <Link
                        href={`/collections/${coll.slug}`}
                        target="_blank"
                        className="text-xs uppercase tracking-luxury text-brand-accent hover:underline"
                      >
                        Preview Live →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PROMOTIONS & ANNOUNCEMENT BAR */}
        {activeTab === "promotions" && (
          <div className="space-y-6 max-w-3xl">
            <div className="pb-6 border-b border-brand-border">
              <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
                STORE TICKER & CAMPAIGNS
              </span>
              <h1 className="font-serif text-3xl font-medium text-brand-text mt-1">
                ANNOUNCEMENT BAR & OFFERS
              </h1>
            </div>

            <div className="bg-white border border-brand-border rounded-xl p-8 space-y-6 shadow-sm">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-brand-text font-semibold">
                  Announcement Bar Strip Content
                </label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full bg-[#F8F7F4] border border-brand-border px-4 py-3 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text font-mono"
                />
                <p className="text-[11px] text-brand-muted">
                  Displays live at the topmost global banner across all desktop and mobile pages.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-brand-text font-semibold">
                  Complimentary Shipping Threshold ($)
                </label>
                <input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                  className="w-full bg-[#F8F7F4] border border-brand-border px-4 py-3 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text font-mono"
                />
              </div>

              {savedSettingsNotice && (
                <div className="bg-green-50 border border-green-200 text-green-800 text-xs p-3 rounded flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Promotional parameters saved successfully.</span>
                </div>
              )}

              <button
                onClick={() => {
                  setSavedSettingsNotice(true);
                  setTimeout(() => setSavedSettingsNotice(false), 3000);
                }}
                className="px-6 py-3 bg-brand-text hover:bg-brand-dark text-white rounded text-xs uppercase tracking-luxury font-medium transition-all shadow-md"
              >
                Save Promotional Settings
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-3xl">
            <div className="pb-6 border-b border-brand-border">
              <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
                SYSTEM CONFIGURATION
              </span>
              <h1 className="font-serif text-3xl font-medium text-brand-text mt-1">
                STORE SETTINGS
              </h1>
            </div>

            <div className="bg-white border border-brand-border rounded-xl p-8 space-y-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-brand-text font-semibold mb-1">
                    Store Brand Name
                  </label>
                  <input
                    type="text"
                    defaultValue="AFAQ SUPPLY"
                    className="w-full bg-[#F8F7F4] border border-brand-border px-3.5 py-2.5 rounded text-xs font-serif"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-brand-text font-semibold mb-1">
                    Brand Tagline
                  </label>
                  <input
                    type="text"
                    defaultValue="THE ART OF EVERYDAY STYLE."
                    className="w-full bg-[#F8F7F4] border border-brand-border px-3.5 py-2.5 rounded text-xs font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-brand-text font-semibold mb-1">
                    Concierge Support Email
                  </label>
                  <input
                    type="email"
                    defaultValue="concierge@afaqsupply.com"
                    className="w-full bg-[#F8F7F4] border border-brand-border px-3.5 py-2.5 rounded text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-brand-text font-semibold mb-1">
                    Base Currency
                  </label>
                  <input
                    type="text"
                    defaultValue="USD ($)"
                    disabled
                    className="w-full bg-neutral-100 border border-brand-border px-3.5 py-2.5 rounded text-xs font-mono text-neutral-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border">
                <button
                  onClick={() => alert("Store settings persisted.")}
                  className="px-6 py-3 bg-brand-text hover:bg-brand-dark text-white rounded text-xs uppercase tracking-luxury font-medium transition-all shadow-md"
                >
                  Save Store Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Create Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative bg-[#F8F7F4] p-8 rounded-xl max-w-lg w-full border border-brand-border shadow-2xl z-10 space-y-4">
            <h3 className="font-serif text-2xl font-medium text-brand-text">
              Create New Silhouette
            </h3>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-brand-text font-semibold mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Heavyweight Cashmere Zip Cardigan"
                  className="w-full bg-white border border-brand-border p-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono uppercase text-brand-text font-semibold mb-1">
                    Category *
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) =>
                      setNewProdCategory(
                        e.target.value as "men" | "women" | "sneakers" | "accessories"
                      )
                    }
                    className="w-full bg-white border border-brand-border p-2.5 rounded focus:outline-none"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="sneakers">Sneakers</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono uppercase text-brand-text font-semibold mb-1">
                    Base Price ($) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-white border border-brand-border p-2.5 rounded focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-brand-text font-semibold mb-1">
                  Primary Image URL
                </label>
                <input
                  type="url"
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-white border border-brand-border p-2.5 rounded focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-brand-text font-semibold mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Describe material, cut, and weight..."
                  className="w-full bg-white border border-brand-border p-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-brand-border">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-brand-border rounded text-brand-text"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-text text-white rounded font-medium uppercase tracking-wider font-mono hover:bg-brand-dark"
                >
                  Publish Silhouette
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

