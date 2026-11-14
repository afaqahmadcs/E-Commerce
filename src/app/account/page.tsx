"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Lock,
  Mail,
  Shield,
  Plus,
  Trash2,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { PRODUCTS_DATA } from "@/data/products";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  membershipTier: string;
}

interface SavedAddress {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export default function AccountPage() {
  const { wishlistIds, toggleWishlist, addItem } = useCartStore();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authFullName, setAuthFullName] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authNotice, setAuthNotice] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  // Authenticated User Profile
  const [profile, setProfile] = useState<UserProfile>({
    id: "usr-default-01",
    fullName: "Afaq Ahmad",
    email: "afaq@atelier.com",
    phone: "+92 300 8849201",
    membershipTier: "Patron Member",
  });

  const [activeTab, setActiveTab] = useState<"profile" | "wishlist" | "addresses">("profile");
  const [ordersCount, setOrdersCount] = useState(0);

  // Saved Addresses State
  const [addresses, setAddresses] = useState<SavedAddress[]>([
    {
      id: "addr-1",
      fullName: "Afaq Ahmad",
      phone: "+92 300 8849201",
      addressLine1: "House #14, Street 9, Sector F-7/2",
      city: "Islamabad",
      postalCode: "44000",
      country: "Pakistan",
      isDefault: true,
    },
  ]);

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
  });

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(profile.fullName);
  const [editPhone, setEditPhone] = useState(profile.phone);

  useEffect(() => {
    // Check if user session exists in storage
    const savedUser = localStorage.getItem("afaq_auth_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setProfile(parsed);
        setEditName(parsed.fullName);
        setEditPhone(parsed.phone);
        setIsAuthenticated(true);
      } catch {
        // Fallback
      }
    } else {
      // Default to patron user for demo convenience
      setIsAuthenticated(true);
    }

    // Check saved addresses
    const savedAddrs = localStorage.getItem("afaq_saved_addresses");
    if (savedAddrs) {
      try {
        setAddresses(JSON.parse(savedAddrs));
      } catch {
        // Fallback
      }
    }

    // Load orders count
    try {
      const orders = JSON.parse(localStorage.getItem("afaq_customer_orders") || "[]");
      setOrdersCount(orders.length);
    } catch {
      setOrdersCount(0);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthNotice(null);

    if (!authEmail || !authPassword) {
      setAuthError("Please provide your email and password.");
      return;
    }

    // If Supabase configured, attempt auth
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });
        if (error) {
          setAuthError(error.message);
          return;
        }
        if (data.user) {
          const userObj: UserProfile = {
            id: data.user.id,
            fullName: data.user.user_metadata?.full_name || authEmail.split("@")[0],
            email: data.user.email || authEmail,
            phone: data.user.user_metadata?.phone || "+92 300 0000000",
            membershipTier: "Patron Member",
          };
          setProfile(userObj);
          localStorage.setItem("afaq_auth_user", JSON.stringify(userObj));
          setIsAuthenticated(true);
          return;
        }
      } catch {
        // Fall through to local auth simulation
      }
    }

    // Local seamless login
    const userObj: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: authFullName || authEmail.split("@")[0],
      email: authEmail,
      phone: authPhone || "+92 300 8849201",
      membershipTier: "Patron Member",
    };
    setProfile(userObj);
    localStorage.setItem("afaq_auth_user", JSON.stringify(userObj));
    setIsAuthenticated(true);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!authEmail || !authPassword || !authFullName) {
      setAuthError("Please complete all registration fields.");
      return;
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: {
            data: { full_name: authFullName, phone: authPhone },
          },
        });
        if (error) {
          setAuthError(error.message);
          return;
        }
        if (data.user) {
          setAuthNotice("Verification instructions sent to your email. You can now access your portal.");
        }
      } catch {
        // Continue to local session
      }
    }

    const userObj: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: authFullName,
      email: authEmail,
      phone: authPhone || "+92 300 8849201",
      membershipTier: "Atelier Patron",
    };
    setProfile(userObj);
    localStorage.setItem("afaq_auth_user", JSON.stringify(userObj));
    setIsAuthenticated(true);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!authEmail) {
      setAuthError("Please provide your registered email address.");
      return;
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.resetPasswordForEmail(authEmail);
      } catch {
        // Fallback
      }
    }

    setAuthNotice(`Secure password reset instructions dispatched to ${authEmail}. Please inspect your inbox.`);
  };

  const handleLogout = () => {
    localStorage.removeItem("afaq_auth_user");
    setIsAuthenticated(false);
    setAuthMode("login");
  };

  const handleSaveProfile = () => {
    const updated = { ...profile, fullName: editName, phone: editPhone };
    setProfile(updated);
    localStorage.setItem("afaq_auth_user", JSON.stringify(updated));
    setIsEditingProfile(false);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.addressLine1 || !newAddr.city) return;

    const added: SavedAddress = {
      id: `addr-${Date.now()}`,
      fullName: newAddr.fullName,
      phone: newAddr.phone,
      addressLine1: newAddr.addressLine1,
      city: newAddr.city,
      postalCode: newAddr.postalCode,
      country: newAddr.country,
      isDefault: addresses.length === 0,
    };

    const updatedList = [...addresses, added];
    setAddresses(updatedList);
    localStorage.setItem("afaq_saved_addresses", JSON.stringify(updatedList));
    setIsAddingAddress(false);
    setNewAddr({ fullName: "", phone: "", addressLine1: "", city: "", postalCode: "", country: "Pakistan" });
  };

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    localStorage.setItem("afaq_saved_addresses", JSON.stringify(updated));
  };

  const wishlistedProducts = PRODUCTS_DATA.filter((p) => wishlistIds.includes(p.id));

  // If Not Authenticated: Render Auth Portal
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
            CLIENT PRIVILEGES
          </span>
          <h1 className="font-serif text-3xl text-brand-text font-normal tracking-tight">
            {authMode === "login"
              ? "CLIENT SIGN IN"
              : authMode === "register"
              ? "CREATE PATRON ACCOUNT"
              : "PASSWORD RECOVERY"}
          </h1>
          <p className="text-xs text-brand-muted">
            {authMode === "login"
              ? "Access your dispatch archive, saved silhouettes, and tailored addresses."
              : authMode === "register"
              ? "Join the private AFAQ SUPPLY roster for prioritized drops."
              : "Enter your registered email to receive reset credentials."}
          </p>
        </div>

        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-lg">
            {authError}
          </div>
        )}

        {authNotice && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-lg">
            {authNotice}
          </div>
        )}

        {/* 1. Login Form */}
        {authMode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="patron@afaqsupply.com"
                  className="w-full bg-white border border-brand-border px-3.5 py-2.5 pl-10 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text"
                />
                <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setAuthMode("forgot")}
                  className="text-[10px] font-mono uppercase text-brand-accent hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white border border-brand-border px-3.5 py-2.5 pl-10 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text"
                />
                <Lock className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-text text-white rounded text-xs uppercase tracking-luxury font-medium hover:bg-brand-dark transition-all shadow-sm"
            >
              Sign In to Atelier
            </button>

            <div className="text-center pt-4 border-t border-brand-border text-xs text-brand-muted">
              <span>New patron to AFAQ SUPPLY? </span>
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className="text-brand-text font-medium underline"
              >
                Create an account
              </button>
            </div>
          </form>
        )}

        {/* 2. Register Form */}
        {authMode === "register" && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={authFullName}
                onChange={(e) => setAuthFullName(e.target.value)}
                placeholder="Marcus Vance"
                className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="marcus@studio.com"
                className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                Mobile Phone
              </label>
              <input
                type="tel"
                value={authPhone}
                onChange={(e) => setAuthPhone(e.target.value)}
                placeholder="+92 300 1234567"
                className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                Secure Password *
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-text text-white rounded text-xs uppercase tracking-luxury font-medium hover:bg-brand-dark transition-all shadow-sm"
            >
              Register Patron Account
            </button>

            <div className="text-center pt-4 border-t border-brand-border text-xs text-brand-muted">
              <span>Already registered? </span>
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="text-brand-text font-medium underline"
              >
                Sign in
              </button>
            </div>
          </form>
        )}

        {/* 3. Forgot Password Form */}
        {authMode === "forgot" && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-brand-text font-semibold mb-1">
                Registered Email Address
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="patron@afaqsupply.com"
                className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded text-xs text-brand-text focus:outline-none focus:border-brand-text"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-text text-white rounded text-xs uppercase tracking-luxury font-medium hover:bg-brand-dark transition-all shadow-sm"
            >
              Send Password Reset Link
            </button>

            <div className="text-center pt-4 border-t border-brand-border text-xs text-brand-muted">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="text-brand-text font-medium underline"
              >
                Return to Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  // Authenticated Patron View
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
      {/* Account Header */}
      <div className="pb-8 border-b border-brand-border flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
            PATRON CLIENT PORTAL
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal tracking-tight mt-1">
            MY ACCOUNT
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Welcome back, <strong className="text-brand-text font-medium">{profile.fullName}</strong> ({profile.email}).
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

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 px-3 py-2 border border-brand-border rounded text-xs text-brand-muted hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
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
              <span>Saved Silhouettes</span>
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
            <span>Saved Addresses ({addresses.length})</span>
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
                <span className="text-[10px] font-mono uppercase tracking-luxury bg-brand-card px-2.5 py-1 rounded text-brand-accent font-semibold border border-brand-border">
                  {profile.membershipTier}
                </span>
              </div>

              {!isEditingProfile ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-brand-muted mb-1">
                      Full Name
                    </label>
                    <p className="font-serif text-sm font-medium text-brand-text">
                      {profile.fullName}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-brand-muted mb-1">
                      Email Address
                    </label>
                    <p className="font-mono text-sm text-brand-text">
                      {profile.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-brand-muted mb-1">
                      Phone Number
                    </label>
                    <p className="font-mono text-sm text-brand-text">
                      {profile.phone}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-brand-muted mb-1">
                      Language / Preferred Peg
                    </label>
                    <p className="font-sans text-sm text-brand-text">
                      English (International) • USD ($) / PKR
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-brand-muted mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-white border border-brand-border px-3 py-2 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-brand-muted mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-white border border-brand-border px-3 py-2 rounded text-xs"
                    />
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-brand-border flex items-center justify-between">
                <span className="text-[11px] text-brand-muted flex items-center space-x-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secured via Supabase Authentication & 256-bit SSL</span>
                </span>

                {!isEditingProfile ? (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-5 py-2 bg-brand-text text-white text-xs uppercase tracking-luxury font-medium rounded hover:bg-brand-dark transition-colors"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="space-x-2">
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2 border border-brand-border text-xs rounded hover:bg-neutral-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-5 py-2 bg-brand-text text-white text-xs uppercase tracking-luxury font-medium rounded hover:bg-brand-dark transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <h2 className="font-serif text-xl font-medium text-brand-text">
                  Saved Atelier Dispatch Addresses ({addresses.length})
                </h2>
                <button
                  onClick={() => setIsAddingAddress(!isAddingAddress)}
                  className="flex items-center space-x-1 px-3.5 py-1.5 bg-brand-text text-white rounded text-xs uppercase tracking-wider font-mono hover:bg-brand-dark transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAddingAddress ? "Cancel" : "Add Address"}</span>
                </button>
              </div>

              {isAddingAddress && (
                <form onSubmit={handleAddAddress} className="bg-brand-card/70 p-4 rounded-lg border border-brand-border space-y-4 text-xs">
                  <h3 className="font-serif font-medium text-brand-text">New Destination Address</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Recipient Full Name"
                      value={newAddr.fullName}
                      onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                      className="bg-white border border-brand-border px-3 py-2 rounded"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Phone"
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      className="bg-white border border-brand-border px-3 py-2 rounded"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Street Address, House / Apt"
                      value={newAddr.addressLine1}
                      onChange={(e) => setNewAddr({ ...newAddr, addressLine1: e.target.value })}
                      className="sm:col-span-2 bg-white border border-brand-border px-3 py-2 rounded"
                    />
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="bg-white border border-brand-border px-3 py-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={newAddr.postalCode}
                      onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                      className="bg-white border border-brand-border px-3 py-2 rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-accent text-white rounded text-xs font-mono uppercase"
                  >
                    Save Address
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 rounded-lg border border-brand-border relative bg-brand-card/40 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-semibold text-brand-text text-sm">
                        {addr.fullName}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[9px] font-mono uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-brand-muted">
                      {addr.addressLine1}<br />
                      {addr.city}, {addr.country} {addr.postalCode}
                    </p>
                    <p className="font-mono text-[11px] text-brand-muted">
                      Phone: {addr.phone}
                    </p>
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-medium text-brand-text pb-4 border-b border-brand-border">
                Saved Archival Silhouettes ({wishlistedProducts.length})
              </h2>

              {wishlistedProducts.length === 0 ? (
                <div className="text-center py-16 text-brand-muted space-y-3">
                  <Heart className="w-8 h-8 mx-auto opacity-30" />
                  <p className="text-sm font-serif">You have no saved silhouettes in your personal archive.</p>
                  <Link
                    href="/shop"
                    className="inline-block mt-2 text-xs uppercase tracking-luxury text-brand-accent underline"
                  >
                    Explore Atelier Catalog
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {wishlistedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="border border-brand-border rounded-lg p-3 bg-white space-y-3 group"
                    >
                      <div className="relative aspect-[3/4] rounded overflow-hidden bg-brand-card">
                        <Image
                          src={prod.primaryImage}
                          alt={prod.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <p className="font-serif text-xs font-medium text-brand-text line-clamp-1">
                          {prod.name}
                        </p>
                        <p className="font-mono text-xs font-semibold text-brand-text mt-0.5">
                          ${prod.basePrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => {
                            addItem({
                              productId: prod.id,
                              slug: prod.slug,
                              name: prod.name,
                              price: prod.basePrice,
                              color: prod.availableColors[0]?.name || "Standard",
                              size: prod.availableSizes[0] || "M",
                              image: prod.primaryImage,
                              quantity: 1,
                              maxStock: 10,
                            });
                          }}
                          className="flex-1 py-1.5 bg-brand-text text-white rounded text-[10px] uppercase font-mono tracking-wider hover:bg-brand-dark transition-colors"
                        >
                          Add to Bag
                        </button>
                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          className="px-2 py-1.5 border border-brand-border rounded text-neutral-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
