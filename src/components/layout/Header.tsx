"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

interface MegaMenuColumn {
  title: string;
  links: { name: string; href: string }[];
}

interface MegaMenuData {
  name: string;
  href: string;
  tag?: string;
  columns?: MegaMenuColumn[];
  featuredCard?: {
    title: string;
    subtitle: string;
    image: string;
    href: string;
  };
}

const NAV_ITEMS: MegaMenuData[] = [
  {
    name: "NEW ARRIVALS",
    href: "/collections/new-arrivals",
    tag: "SS26",
    columns: [
      {
        title: "EDITORIAL RELEASES",
        links: [
          { name: "Runway Capsule SS26", href: "/collections/new-arrivals" },
          { name: "Heavyweight Fleeces", href: "/collections/hoodies" },
          { name: "Court Footwear Drop", href: "/collections/sneakers" },
          { name: "Structured Outerwear", href: "/collections/jackets" },
        ],
      },
      {
        title: "SEASON HIGHLIGHTS",
        links: [
          { name: "Flagship Luka 5 Retro", href: "/products/afaq-luka-5-high" },
          { name: "Archival Washed Charcoal", href: "/collections/hoodies" },
          { name: "Raw Indigo Selvedge", href: "/collections/men" },
          { name: "Full-Grain Leather Goods", href: "/collections/accessories" },
        ],
      },
    ],
    featuredCard: {
      title: "SPRING / SUMMER 2026",
      subtitle: "Discover the new architectural silhouette drop",
      image: "/images/banners/banner_01.jpg",
      href: "/collections/new-arrivals",
    },
  },
  {
    name: "MEN",
    href: "/collections/men",
    columns: [
      {
        title: "TOPS & FLEECE",
        links: [
          { name: "500 GSM Heavyweight Hoodies", href: "/collections/hoodies" },
          { name: "Combed Streetwear Tees", href: "/collections/t-shirts" },
          { name: "Ribbed Merino Knitwear", href: "/collections/men" },
          { name: "Chore & Twill Overshirts", href: "/collections/jackets" },
        ],
      },
      {
        title: "BOTTOMS & DENIM",
        links: [
          { name: "Relaxed Vintage Indigo Jeans", href: "/collections/men" },
          { name: "Pleated Atelier Chinos", href: "/collections/men" },
          { name: "Wide-Leg Fatigue Trousers", href: "/collections/men" },
          { name: "All Men's Silhouettes", href: "/collections/men" },
        ],
      },
      {
        title: "OUTERWEAR",
        links: [
          { name: "Wool Melton Chore Coat", href: "/collections/jackets" },
          { name: "MA-1 Technical Bomber", href: "/collections/jackets" },
          { name: "Minimal Utility Overcoats", href: "/collections/jackets" },
        ],
      },
    ],
    featuredCard: {
      title: "MEN'S ATELIER",
      subtitle: "Boxy proportions and heavyweight Portuguese craftsmanship",
      image: "/images/models/model_04.jpg",
      href: "/collections/men",
    },
  },
  {
    name: "WOMEN",
    href: "/collections/women",
    columns: [
      {
        title: "STUDIO TOPS",
        links: [
          { name: "Extra-Fine Merino Sweaters", href: "/collections/women" },
          { name: "Oversized Studio Poplin Shirts", href: "/collections/women" },
          { name: "Relaxed French Terry Pullovers", href: "/collections/hoodies" },
          { name: "Minimalist Layering Tees", href: "/collections/t-shirts" },
        ],
      },
      {
        title: "TAILORING & PANTS",
        links: [
          { name: "Fluid Wide-Leg Trousers", href: "/collections/women" },
          { name: "Pleated Wool-Blend Chinos", href: "/collections/women" },
          { name: "Relaxed Mid-Rise Studio Denim", href: "/collections/women" },
        ],
      },
      {
        title: "COATS & JACKETS",
        links: [
          { name: "Double-Faced Wool Cocoon Coat", href: "/collections/jackets" },
          { name: "Minimal Structured Chore Jacket", href: "/collections/jackets" },
          { name: "All Women's Studio", href: "/collections/women" },
        ],
      },
    ],
    featuredCard: {
      title: "WOMEN'S STUDIO",
      subtitle: "Effortless sculptural draping in noble natural yarns",
      image: "/images/models/model_07.jpg",
      href: "/collections/women",
    },
  },
  {
    name: "SNEAKERS",
    href: "/collections/sneakers",
    columns: [
      {
        title: "FLAGSHIP SILHOUETTES",
        links: [
          { name: "AFAQ Luka 5 High-Top Retro", href: "/products/afaq-luka-5-high" },
          { name: "Retro Court Trainer Sand", href: "/collections/sneakers" },
          { name: "Minimalist Low Court White", href: "/collections/sneakers" },
          { name: "Shadow Technical Runner", href: "/collections/sneakers" },
        ],
      },
      {
        title: "ARCHIVAL EDITIONS",
        links: [
          { name: "Triple Black Phantom", href: "/collections/sneakers" },
          { name: "Royal Cobalt High", href: "/collections/sneakers" },
          { name: "Vintage Olive Suede", href: "/collections/sneakers" },
          { name: "Tangerine Accent Runner", href: "/collections/sneakers" },
        ],
      },
    ],
    featuredCard: {
      title: "ARCHIVAL FOOTWEAR",
      subtitle: "Calfskin leather with cushioned herringbone traction",
      image: "/images/products/sneakers/sneaker_lifestyle_01.jpg",
      href: "/collections/sneakers",
    },
  },
  {
    name: "ACCESSORIES",
    href: "/collections/accessories",
    columns: [
      {
        title: "LEATHER GOODS",
        links: [
          { name: "Full-Grain Weekender Duffle", href: "/collections/accessories" },
          { name: "Hand-Burnished Cardholder", href: "/collections/accessories" },
          { name: "Atelier Crossbody Sling", href: "/collections/accessories" },
          { name: "Minimalist Leather Folio", href: "/collections/accessories" },
        ],
      },
      {
        title: "TIMEPIECES & OBJECTS",
        links: [
          { name: "Sapphire Minimalist Chronograph", href: "/collections/accessories" },
          { name: "Heavyweight Cotton Cap", href: "/collections/accessories" },
          { name: "Archival Wool Scarf", href: "/collections/accessories" },
        ],
      },
    ],
    featuredCard: {
      title: "LEATHER & OBJECTS",
      subtitle: "Hand-burnished Italian leather designed to patina gracefully",
      image: "/images/products/accessories/accessory_01.jpg",
      href: "/collections/accessories",
    },
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { openDrawer, openSearch, getItemCount, wishlistIds } = useCartStore();
  const itemCount = mounted ? getItemCount() : 0;
  const wishlistCount = mounted ? wishlistIds.length : 0;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
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

  const handleMouseEnter = (name: string) => {
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    setActiveMegaMenu(name);
  };

  const handleMouseLeave = () => {
    navTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 180);
  };

  const activeItemData = NAV_ITEMS.find((item) => item.name === activeMegaMenu);

  return (
    <header
      onMouseLeave={handleMouseLeave}
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#F8F7F4]/95 backdrop-blur-md border-b border-brand-border py-3 shadow-sm"
          : "bg-[#F8F7F4] py-4 sm:py-4.5 border-b border-brand-border/40"
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
              <span className="font-serif text-2xl sm:text-[26px] tracking-wide font-medium text-brand-text group-hover:opacity-85 transition-opacity">
                AFAQ SUPPLY
              </span>
              <span className="font-sans text-[8px] tracking-[0.32em] uppercase text-brand-muted font-medium mt-0.5">
                The Art of Everyday Style
              </span>
            </Link>
          </div>

          {/* Desktop Center Navigation with Mega Menu Triggers */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {NAV_ITEMS.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
              const isHovered = activeMegaMenu === link.name;

              return (
                <div
                  key={link.name}
                  className="relative py-2"
                  onMouseEnter={() => handleMouseEnter(link.name)}
                >
                  <Link
                    href={link.href}
                    className={`inline-flex items-center space-x-1 text-[12px] font-sans tracking-[0.16em] uppercase font-medium transition-colors hover:text-brand-accent ${
                      isActive || isHovered ? "text-brand-accent font-semibold" : "text-brand-text"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.tag && (
                      <span className="px-1 py-0.5 text-[8px] bg-brand-accent/10 text-brand-accent rounded font-mono font-bold">
                        {link.tag}
                      </span>
                    )}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isHovered ? "rotate-180 text-brand-accent" : "text-brand-muted/70"
                      }`}
                    />
                  </Link>

                  {/* Active Link Bottom Bar Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 inset-x-0 h-0.5 bg-brand-accent rounded-full"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3.5">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="text-brand-text hover:text-brand-accent transition-colors p-2 rounded-full hover:bg-neutral-200/40"
              aria-label="Search catalogue"
              title="Search catalogue"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative text-brand-text hover:text-brand-accent transition-colors p-2 rounded-full hover:bg-neutral-200/40"
              aria-label={`Wishlist with ${wishlistCount} items`}
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-brand-accent text-white text-[9px] font-mono rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account Profile Link */}
            <Link
              href="/account"
              className="text-brand-text hover:text-brand-accent transition-colors p-2 rounded-full hover:bg-neutral-200/40 hidden xs:block"
              aria-label="Customer account portal"
              title="Customer Account"
            >
              <User className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </Link>

            {/* Cart Bag Drawer Trigger */}
            <button
              onClick={openDrawer}
              className="relative flex items-center space-x-1.5 bg-brand-text hover:bg-brand-dark text-white px-3 sm:px-3.5 py-1.5 rounded-full transition-all shadow-sm hover:shadow active:scale-95"
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

      {/* Desktop Luxury Mega Menu Dropdown */}
      <AnimatePresence>
        {activeMegaMenu && activeItemData && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => handleMouseEnter(activeMegaMenu)}
            onMouseLeave={handleMouseLeave}
            className="hidden md:block absolute top-full inset-x-0 bg-[#F8F7F4]/98 backdrop-blur-xl border-b border-brand-border shadow-xl z-50 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
              <div className="grid grid-cols-12 gap-8 items-start">
                {/* Mega Menu Category Link Columns */}
                <div
                  className={`grid ${
                    activeItemData.columns?.length === 3 ? "grid-cols-3" : "grid-cols-2"
                  } gap-8 col-span-8`}
                >
                  {activeItemData.columns?.map((col) => (
                    <div key={col.title} className="space-y-3.5">
                      <p className="text-[11px] font-mono uppercase tracking-widest text-brand-accent font-semibold flex items-center space-x-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>{col.title}</span>
                      </p>
                      <ul className="space-y-2.5">
                        {col.links.map((link) => (
                          <li key={link.name}>
                            <Link
                              href={link.href}
                              onClick={() => setActiveMegaMenu(null)}
                              className="text-xs text-brand-text hover:text-brand-accent transition-colors font-sans block"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Featured Category Visual Card */}
                {activeItemData.featuredCard && (
                  <div className="col-span-4 pl-6 border-l border-brand-border/70">
                    <Link
                      href={activeItemData.featuredCard.href}
                      onClick={() => setActiveMegaMenu(null)}
                      className="group block relative rounded-lg overflow-hidden bg-brand-card border border-brand-border/80 shadow-sm"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={activeItemData.featuredCard.image}
                          alt={activeItemData.featuredCard.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 1024px) 300px, 400px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block mb-1">
                          FEATURED CAPSULE
                        </span>
                        <h4 className="font-serif text-base font-normal tracking-wide text-white group-hover:text-brand-accent transition-colors">
                          {activeItemData.featuredCard.title}
                        </h4>
                        <p className="text-[11px] text-neutral-300 line-clamp-1 mt-0.5">
                          {activeItemData.featuredCard.subtitle}
                        </p>
                        <div className="mt-2 inline-flex items-center space-x-1 text-[10px] font-mono uppercase tracking-widest text-white group-hover:underline">
                          <span>Explore Story</span>
                          <ArrowRight className="w-3 h-3 text-brand-accent" />
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            />

            {/* Content Drawer */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { y: -20, opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.05 : 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[#F8F7F4] border-b border-brand-border px-6 py-6 shadow-2xl max-h-[calc(100vh-70px)] overflow-y-auto space-y-6"
            >
              {/* Main Primary Links */}
              <div className="flex flex-col space-y-1">
                {NAV_ITEMS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-base font-serif font-medium text-brand-text py-3 border-b border-brand-border/60 hover:text-brand-accent transition-colors"
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
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 p-3 bg-white border border-brand-border rounded-lg text-brand-text"
                >
                  <Heart className="w-4 h-4 text-brand-accent" />
                  <span>Wishlist ({wishlistCount})</span>
                </Link>
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
                  className="flex items-center space-x-2 p-3 bg-white border border-brand-border rounded-lg text-brand-text col-span-2"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-accent" />
                  <span>Track My Orders</span>
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
