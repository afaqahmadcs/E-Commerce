import { notFound } from "next/navigation";
import { PRODUCTS_DATA } from "@/data/products";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS_DATA.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found — AFAQ SUPPLY" };

  return {
    title: `${product.name} — AFAQ SUPPLY`,
    description: product.description,
    openGraph: {
      title: `${product.name} — AFAQ SUPPLY`,
      description: product.description,
      images: [{ url: product.primaryImage }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS_DATA.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or complementary
  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}

