import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/search/SearchModal";
import { PageTransition } from "@/components/animations/PageTransition";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AFAQ SUPPLY — THE ART OF EVERYDAY STYLE",
  description: "Independent luxury streetwear, archival footwear, and architectural ready-to-wear crafted with European and Japanese craftsmanship.",
  keywords: ["AFAQ SUPPLY", "Luxury Streetwear", "Archival Footwear", "Minimalist Fashion", "Japanese Selvedge Denim", "Heavyweight Hoodie"],
  openGraph: {
    title: "AFAQ SUPPLY — THE ART OF EVERYDAY STYLE",
    description: "Architectural streetwear, artisanal knitwear, and archival footwear.",
    url: "https://afaqsupply.com",
    siteName: "AFAQ SUPPLY",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="antialiased min-h-screen flex flex-col bg-[#F8F7F4] text-[#151515]">
        {/* Global Announcement Strip */}
        <AnnouncementBar />

        {/* Global Luxury Navigation */}
        <Header />

        {/* Page Content with Refined Route Transitions */}
        <PageTransition>{children}</PageTransition>

        {/* Global Editorial Footer */}
        <Footer />

        {/* Global Cart Slide-in Drawer */}
        <CartDrawer />

        {/* Global Search Overlay */}
        <SearchModal />
      </body>
    </html>
  );
}
