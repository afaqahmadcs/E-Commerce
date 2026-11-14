"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const { openDrawer, openSearch, getItemCount, wishlistIds } = useCartStore();
  const itemCount = getItemCount();
  const wishlistCount = wishlistIds.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "NEW ARRIVALS", href: "/shop?filter=new", tag: "SS26" },
    { name: "MEN", href: "/shop?category=men" },
    { name: "WOMEN", href: "/shop?category=women" },
    { name: "SNEAKERS", href: "/shop?category=sneakers" },
    { name: "COLLECTIONS", href: "/collections/streetwear-essentials" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#F8F7F4]/92 backdrop-blur-md border-b border-brand-border py-3.5 shadow-sm"
          : "bg-[#F8F7F4] py-4 sm:py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile hamburger button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-text p-2 -ml-2 rounded-lg hover:bg-neutral-200/50 transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Brand Wordmark Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="group flex flex-col items-start leading-none tracking-tightest select-none"
            >
              <span className="font-serif text-2xl sm:text-[26px] tracking-wide font-medium text-brand-text group-hover:opacity-80 transition-opacity">
                AFAQ SUPPLY
              </span>
              <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-brand-muted font-medium mt-0.5">
                The Art of Everyday Style
              </span>
            </Link>
          </div>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.name} className="relative py-1">
                  <Link
                    href={link.href}
                    className={`text-[12px] font-sans tracking-[0.16em] uppercase font-medium transition-colors hover:text-brand-accent ${
                      isActive ? "text-brand-accent font-semibold" : "text-brand-text"
                    }`}
                  >
                    {link.name}
                    {link.tag && (
                      <span className="ml-1.5 px-1 py-0.5 text-[8px] bg-brand-accent/10 text-brand-accent rounded font-mono font-bold">
                        {link.tag}
                      </span>
                    )}
                  </Link>

                  {/* Active Link Subtle Bottom Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 inset-x-0 h-0.5 bg-brand-accent rounded-full"
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="text-brand-text hover:text-brand-accent transition-colors p-2 rounded-full hover:bg-neutral-200/40"
              aria-label="Search catalog"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Wishlist */}
            <Link
              href="/account"
              className="relative text-brand-text hover:text-brand-accent transition-colors p-2 rounded-full hover:bg-neutral-200/40 hidden sm:block"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-brand-accent text-white text-[9px] font-mono rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account Profile */}
            <Link
              href="/account"
              className="text-brand-text hover:text-brand-accent transition-colors p-2 rounded-full hover:bg-neutral-200/40 hidden xs:block"
              aria-label="Customer account portal"
            >
              <User className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </Link>

            {/* Cart Bag Drawer Trigger */}
            <button
              onClick={openDrawer}
              className="relative flex items-center space-x-1.5 bg-brand-text hover:bg-brand-dark text-white px-3 sm:px-3.5 py-1.5 rounded-full transition-all shadow-sm hover:shadow"
              aria-label={`Shopping bag with ${itemCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-bg" />
              <span className="text-[11px] font-sans font-medium tracking-wider">
                BAG
              </span>
              <span className="w-4 h-4 bg-brand-accent text-white rounded-full text-[9px] font-mono flex items-center justify-center font-bold ml-1">
                {itemCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Luxury Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[65px] z-50 flex flex-col">
            {/* Dimmed backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.05 : 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Content Drawer */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { y: -20, opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.05 : 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[#F8F7F4] border-b border-brand-border px-6 py-8 shadow-2xl max-h-[calc(100vh-70px)] overflow-y-auto space-y-6"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-base font-serif font-medium text-brand-text py-3.5 border-b border-brand-border/60 hover:text-brand-accent transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{link.name}</span>
                      {link.tag && (
                        <span className="px-1.5 py-0.5 text-[9px] bg-brand-accent/10 text-brand-accent rounded font-mono font-bold">
                          {link.tag}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-muted" />
                  </Link>
                ))}
              </div>

              {/* Mobile Quick Client Links */}
              <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-mono uppercase tracking-wider">
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 p-3 bg-white border border-brand-border rounded-lg text-brand-text"
                >
                  <User className="w-4 h-4 text-brand-accent" />
                  <span>Client Account</span>
                </Link>
                <Link
                  href="/account/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 p-3 bg-white border border-brand-border rounded-lg text-brand-text"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-accent" />
                  <span>My Orders</span>
                </Link>
              </div>

              {/* Secondary Editorial Links */}
              <div className="pt-4 border-t border-brand-border/70 flex items-center justify-between text-xs text-brand-muted font-sans">
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-brand-text transition-colors"
                >
                  Manifesto & Mills
                </Link>
                <span>•</span>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-brand-text transition-colors"
                >
                  Concierge
                </Link>
                <span>•</span>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-1 hover:text-brand-text transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Admin</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
