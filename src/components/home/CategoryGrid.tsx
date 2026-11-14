import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CategoryGrid() {
  const categories = [
    {
      name: "MEN'S ATELIER",
      subtitle: "Tailored Streetwear & Heavyweight Fleeces",
      href: "/shop?category=men",
      image: "/images/models/model_02.jpg",
      span: "md:col-span-1",
    },
    {
      name: "ARCHIVAL SNEAKERS",
      subtitle: "Court Classics & High-Mileage Runners",
      href: "/shop?category=sneakers",
      image: "/images/products/sneakers/sneaker_lifestyle_02.jpg",
      span: "md:col-span-2",
    },
    {
      name: "WOMEN'S STUDIO",
      subtitle: "Architectural Outerwear & Relaxed Silhouettes",
      href: "/shop?category=women",
      image: "/images/models/model_01.jpg",
      span: "md:col-span-2",
    },
    {
      name: "LEATHER OBJECTS",
      subtitle: "Tuscan Leather Holdalls & Cardholders",
      href: "/shop?category=accessories",
      image: "/images/products/accessories/accessory_04.jpg",
      span: "md:col-span-1",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F8F7F4] border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="mb-12">
          <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent font-semibold block">
            DEPARTMENTS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal tracking-tight mt-1">
            EXPLORE BY CATEGORY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`group relative h-96 rounded-xl overflow-hidden shadow-luxury ${cat.span}`}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-wide">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-sans mt-1">
                    {cat.subtitle}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all shrink-0 ml-4">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

