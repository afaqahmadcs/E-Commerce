"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { openDrawer, openSearch, getItemCount, wishlistIds } = useCartStore();
  const itemCount = getItemCount();
  const wishlistCount = wishlistIds.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
          ? "bg-[#F8F7F4]/90 backdrop-blur-md border-b border-brand-border py-3.5 shadow-sm"
          : "bg-[#F8F7F4] py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile hamburger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-text p-1.5 focus:outline-none"
              aria-label="Toggle navigation menu"
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
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative py-1"
              >
                <Link
                  href={link.href}
                  className={`text-[12px] font-sans tracking-[0.16em] uppercase font-medium transition-colors hover:text-brand-accent ${
                    pathname === link.href ? "text-brand-accent" : "text-brand-text"
                  }`}
                >
                  {link.name}
                  {link.tag && (
                    <span className="ml-1.5 px-1 py-0.5 text-[8px] bg-brand-accent/10 text-brand-accent rounded font-mono">
                      {link.tag}
                    </span>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="text-brand-text hover:text-brand-accent transition-colors p-1"
              aria-label="Search catalog"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/account"
              className="relative text-brand-text hover:text-brand-accent transition-colors p-1 hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-accent text-white text-[9px] font-mono rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account Profile */}
            <Link
              href="/account"
              className="text-brand-text hover:text-brand-accent transition-colors p-1"
              aria-label="Customer account"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-[#F8F7F4] border-b border-brand-border px-6 py-6 shadow-xl space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center justify-between text-sm tracking-luxury uppercase font-medium text-brand-text py-2 border-b border-brand-border/60"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-brand-muted" />
              </Link>
            ))}
            <Link
              href="/about"
              className="text-xs uppercase tracking-luxury text-brand-muted pt-2"
            >
              Brand Story
            </Link>
            <Link
              href="/admin"
              className="text-xs uppercase tracking-luxury text-brand-muted"
            >
              Staff Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

