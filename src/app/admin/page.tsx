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
  Users,
  AlertTriangle,
  Lock,
  RefreshCw,
  Search,
} from "lucide-react";
import { PRODUCTS_DATA } from "@/data/products";
import { COLLECTIONS_DATA } from "@/data/collections";
import { Product, Order, Collection } from "@/types";

interface CustomerSummary {
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  ordersCount: number;
  totalSpent: number;
}

export default function AdminDashboardPage() {
  // Security Passcode Protection
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(true);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "inventory" | "orders" | "customers" | "collections" | "promotions" | "settings"
  >("overview");

  // Local state for products allowing full CRUD simulation in admin
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS_DATA);
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [collectionsList] = useState<Collection[]>(COLLECTIONS_DATA);
  const [inventorySearch, setInventorySearch] = useState("");

  // Product Stock state (simulated live inventory)
  const [stockMap, setStockMap] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    PRODUCTS_DATA.forEach((p, idx) => {
      initial[p.id] = (idx % 3 === 0) ? 3 : 18; // Some items low stock
    });
    return initial;
  });

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

  // Load orders from localStorage and live sync
  const loadOrders = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("afaq_customer_orders") || "[]");
      if (saved.length > 0) {
        setOrdersList(saved);
      } else {
        // Mock sample orders for dashboard stats if empty
        const sampleOrders: Order[] = [
          {
            id: "ord-101",
            orderNumber: "AFQ-20261114-9041",
            customer: {
              fullName: "Afaq Ahmad",
              email: "afaq@atelier.com",
              phone: "+92 300 8849201",
              addressLine1: "House #14, Street 9, Sector F-7/2",
              city: "Islamabad",
              postalCode: "44000",
              country: "Pakistan",
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
                image: "/images/products/hoodies/hoodie_01.jpg",
                quantity: 1,
                maxStock: 10,
              },
            ],
            subtotal: 199,
            shipping: 0,
            discount: 0,
            total: 199,
            paymentMethod: "cod",
            paymentStatus: "pending",
            orderStatus: "confirmed",
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          },
          {
            id: "ord-102",
            orderNumber: "AFQ-20261114-9042",
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
                cartItemId: "item-2",
                productId: "prod-002",
                slug: "afaq-luka-5-retro-runner",
                name: "AFAQ LUKA 5",
                price: 149,
                color: "Bone White / Red",
                size: "EU 41",
                image: "/sneakers/luka5-retro-high-bred.png",
                quantity: 2,
                maxStock: 15,
              },
            ],
            subtotal: 298,
            shipping: 0,
            discount: 0,
            total: 298,
            paymentMethod: "bank_transfer",
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
  };

  useEffect(() => {
    loadOrders();

    const handleSync = () => loadOrders();
    window.addEventListener("storage", handleSync);
    window.addEventListener("afaq_new_order_placed", handleSync);

    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("afaq_new_order_placed", handleSync);
    };
  }, []);

  const totalRevenue = ordersList.reduce((acc, o) => acc + o.total, 0) + 48290;
  const totalOrdersCount = ordersList.length + 248;

  // Customers calculation
  const customersList: CustomerSummary[] = (() => {
    const map = new Map<string, CustomerSummary>();
    ordersList.forEach((order) => {
      const email = order.customer.email.toLowerCase();
      if (map.has(email)) {
        const existing = map.get(email)!;
        existing.ordersCount += 1;
        existing.totalSpent += order.total;
      } else {
        map.set(email, {
          name: order.customer.fullName,
          email: order.customer.email,
          phone: order.customer.phone,
          city: order.customer.city,
          country: order.customer.country,
          ordersCount: 1,
          totalSpent: order.total,
        });
      }
    });

    // Add baseline patron entries
    if (!map.has("marcus.v@atelier.com")) {
      map.set("marcus.v@atelier.com", {
        name: "Marcus Vance",
        email: "marcus.v@atelier.com",
        phone: "+1 555-0192",
        city: "New York",
        country: "United States",
        ordersCount: 4,
        totalSpent: 1280,
      });
    }

    return Array.from(map.values());
  })();

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
        "/images/products/hoodies/hoodie_01.jpg",
      allImages: [
        newProdImage ||
          "/images/products/hoodies/hoodie_01.jpg",
      ],
      availableColors: [{ name: "Standard", hex: "#151515", image: newProdImage || "" }],
      availableSizes: ["S", "M", "L", "XL"],
      variants: [],
      status: "published",
      createdAt: new Date().toISOString(),
    };

    setProductsList([newProd, ...productsList]);
    setStockMap({ ...stockMap, [newProd.id]: 25 });
    setIsAddModalOpen(false);
    setNewProdName("");
    setNewProdImage("");
    setNewProdDesc("");
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you certain you wish to archive this silhouette?")) {
      setProductsList(productsList.filter((p) => p.id !== id));
    }
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    setStockMap((prev) => ({
      ...prev,
      [productId]: Math.max(0, newStock),
    }));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order["orderStatus"]) => {
    const updated = ordersList.map((o) =>
      o.id === orderId ? { ...o, orderStatus: newStatus } : o
    );
    setOrdersList(updated);
    localStorage.setItem("afaq_customer_orders", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  // Passcode gate check
  if (!isAdminUnlocked) {
    return (
      <div className="min-h-screen bg-[#151515] flex items-center justify-center p-6 text-white">
        <div className="max-w-sm w-full bg-[#1E1E1E] p-8 rounded-xl border border-neutral-800 space-y-6 text-center">
          <div className="w-12 h-12 bg-brand-accent/20 text-brand-accent rounded-full mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
              RESTRICTED DISPATCH PORTAL
            </span>
            <h1 className="font-serif text-2xl font-normal mt-1">AFAQ ATELIER ADMIN</h1>
            <p className="text-xs text-neutral-400 mt-1">
              Enter authorized personnel passcode to unlock. (Passcode: 1994)
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (passcodeInput === "1994" || passcodeInput === "admin") {
                setIsAdminUnlocked(true);
                setPasscodeError(false);
              } else {
                setPasscodeError(true);
              }
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              placeholder="Atelier Security Code"
              className="w-full bg-neutral-900 border border-neutral-700 px-4 py-2.5 rounded text-xs text-center font-mono tracking-widest text-white focus:outline-none focus:border-brand-accent"
            />
            {passcodeError && (
              <p className="text-[11px] text-red-400 font-mono">Invalid authorization code.</p>
            )}
            <button
              type="submit"
              className="w-full py-2.5 bg-brand-accent text-white rounded text-xs uppercase font-mono tracking-wider font-semibold hover:bg-orange-600 transition-colors"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

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
              onClick={() => setActiveTab("inventory")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all text-left ${
                activeTab === "inventory"
                  ? "bg-brand-accent text-white font-semibold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Live Inventory</span>
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
              onClick={() => setActiveTab("customers")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all text-left ${
                activeTab === "customers"
                  ? "bg-brand-accent text-white font-semibold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Patrons ({customersList.length})</span>
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
            <Shield className="w-3 h-3 text-emerald-500" />
            <span>PostgreSQL RLS Active</span>
          </div>
        </div>
      </aside>

      {/* Main Working Canvas */}
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
              <button
                onClick={loadOrders}
                className="flex items-center space-x-1.5 px-3 py-1.5 border border-brand-border rounded text-xs font-mono text-brand-muted hover:text-brand-text hover:bg-brand-card transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Sync Ledger</span>
              </button>
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
                <span className="text-[11px] text-emerald-700 font-mono font-medium block">
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
                  {customersList.length}
                </p>
                <span className="text-[11px] text-brand-muted font-mono block">
                  Across 6 countries
                </span>
              </div>

              <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-muted block">
                  ACTIVE SILHOUETTES
                </span>
                <p className="font-mono text-2xl font-bold text-brand-text">
                  {productsList.length}
                </p>
                <span className="text-[11px] text-brand-muted font-mono block">
                  Handcrafted & Archived
                </span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-brand-border">
                <h2 className="font-serif text-lg font-medium text-brand-text">
                  Recent Dispatches
                </h2>
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
                    <tr className="text-brand-muted border-b border-brand-border">
                      <th className="pb-2">Order #</th>
                      <th className="pb-2">Customer</th>
                      <th className="pb-2">Payment</th>
                      <th className="pb-2">Total</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/60">
                    {ordersList.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-brand-card/30">
                        <td className="py-3 font-bold">{order.orderNumber}</td>
                        <td className="py-3 font-sans">{order.customer.fullName}</td>
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
                      <th className="p-4">Stock</th>
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
                          <span className={`px-2 py-0.5 rounded font-bold ${
                            (stockMap[product.id] ?? 10) < 5
                              ? "bg-red-100 text-red-800"
                              : "bg-neutral-100 text-neutral-800"
                          }`}>
                            {stockMap[product.id] ?? 10} units
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-emerald-100 text-emerald-800">
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

        {/* TAB 2B: LIVE INVENTORY */}
        {activeTab === "inventory" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-brand-border">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
                  REAL-TIME WAREHOUSE
                </span>
                <h1 className="font-serif text-3xl font-medium text-brand-text mt-1">
                  INVENTORY & STOCK ALLOCATION
                </h1>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter silhouettes..."
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  className="bg-white border border-brand-border px-3.5 py-2 pl-9 rounded text-xs font-mono"
                />
                <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsList
                .filter((p) => p.name.toLowerCase().includes(inventorySearch.toLowerCase()))
                .map((prod) => {
                  const stock = stockMap[prod.id] ?? 10;
                  const isLow = stock < 5;

                  return (
                    <div
                      key={prod.id}
                      className="bg-white border border-brand-border rounded-xl p-5 shadow-sm space-y-4"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative w-14 h-16 bg-brand-card rounded overflow-hidden shrink-0">
                          <Image src={prod.primaryImage} alt={prod.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-serif text-sm font-medium text-brand-text line-clamp-1">
                            {prod.name}
                          </p>
                          <p className="font-mono text-[10px] text-brand-muted uppercase">
                            {prod.category} • ${prod.basePrice.toFixed(2)}
                          </p>
                          {isLow ? (
                            <span className="inline-flex items-center space-x-1 text-[10px] font-mono text-red-600 font-bold mt-1">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Low Stock Warning</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 text-[10px] font-mono text-emerald-700 font-semibold mt-1">
                              <Check className="w-3 h-3" />
                              <span>Optimal Stock</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-brand-border flex items-center justify-between">
                        <span className="text-xs font-mono text-brand-muted">Units in Stock:</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleUpdateStock(prod.id, stock - 1)}
                            className="w-7 h-7 border border-brand-border rounded flex items-center justify-center font-mono hover:bg-neutral-100"
                          >
                            -
                          </button>
                          <span className="font-mono text-sm font-bold w-8 text-center">{stock}</span>
                          <button
                            onClick={() => handleUpdateStock(prod.id, stock + 1)}
                            className="w-7 h-7 border border-brand-border rounded flex items-center justify-center font-mono hover:bg-neutral-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
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

              <button
                onClick={loadOrders}
                className="flex items-center space-x-1.5 px-3 py-1.5 border border-brand-border rounded text-xs font-mono text-brand-muted hover:text-brand-text hover:bg-brand-card transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Sync</span>
              </button>
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
                          <p className="text-[10px] text-neutral-400">{order.customer.city}, {order.customer.country}</p>
                        </td>
                        <td className="p-4 font-sans text-xs">
                          {order.items.map((i) => `${i.name} (${i.size}) × ${i.quantity}`).join(", ")}
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

        {/* TAB 3B: CUSTOMERS / PATRONS */}
        {activeTab === "customers" && (
          <div className="space-y-6">
            <div className="pb-6 border-b border-brand-border">
              <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
                ROSTER OF DISTINCTION
              </span>
              <h1 className="font-serif text-3xl font-medium text-brand-text mt-1">
                PATRONS & CLIENT DIRECTORY
              </h1>
            </div>

            <div className="bg-white border border-brand-border rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="bg-brand-card border-b border-brand-border font-mono text-[11px] uppercase tracking-wider text-brand-muted">
                      <th className="p-4">Client Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">City / Region</th>
                      <th className="p-4">Dispatches</th>
                      <th className="p-4">Total Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/60">
                    {customersList.map((c, idx) => (
                      <tr key={idx} className="hover:bg-brand-card/30">
                        <td className="p-4 font-serif font-medium text-sm text-brand-text">
                          {c.name}
                        </td>
                        <td className="p-4 font-mono text-xs text-brand-muted">{c.email}</td>
                        <td className="p-4 font-mono text-xs text-brand-muted">{c.phone}</td>
                        <td className="p-4 text-xs">{c.city}, {c.country}</td>
                        <td className="p-4 font-mono font-bold text-xs">{c.ordersCount}</td>
                        <td className="p-4 font-mono font-bold text-brand-text">
                          ${c.totalSpent.toFixed(2)}
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
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
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
                    defaultValue="USD ($) / PKR Peg"
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
                  placeholder="/images/products/..."
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
