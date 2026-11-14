import { MetadataRoute } from "next";
import { PRODUCTS_DATA } from "@/data/products";
import { COLLECTIONS_DATA } from "@/data/collections";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://afaqsupply.com";

  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/faq",
    "/shipping-returns",
    "/privacy-policy",
    "/terms",
    "/cart",
    "/checkout",
    "/account",
    "/account/orders",
    "/admin",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productRoutes = PRODUCTS_DATA.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.createdAt),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const collectionRoutes = COLLECTIONS_DATA.map((coll) => ({
    url: `${baseUrl}/collections/${coll.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}

