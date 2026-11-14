import { PRODUCTS_DATA } from "@/data/products";
import { Product, ProductCategory } from "@/types";

export class ProductService {
  /**
   * Get all catalog products
   */
  static getAllProducts(): Product[] {
    return PRODUCTS_DATA;
  }

  /**
   * Find product by URL slug
   */
  static getProductBySlug(slug: string): Product | undefined {
    return PRODUCTS_DATA.find((p) => p.slug === slug);
  }

  /**
   * Get products by category
   */
  static getProductsByCategory(category: ProductCategory | "all"): Product[] {
    if (category === "all") return PRODUCTS_DATA;
    return PRODUCTS_DATA.filter((p) => p.category === category);
  }

  /**
   * Get new drop releases
   */
  static getNewArrivals(): Product[] {
    return PRODUCTS_DATA.filter((p) => p.isNewArrival);
  }

  /**
   * Get related products
   */
  static getRelatedProducts(currentId: string, category: ProductCategory, limit: number = 4): Product[] {
    return PRODUCTS_DATA.filter((p) => p.id !== currentId && p.category === category).slice(0, limit);
  }

  /**
   * Search products by keywords
   */
  static searchProducts(query: string): Product[] {
    if (!query.trim()) return PRODUCTS_DATA;
    const term = query.toLowerCase();
    return PRODUCTS_DATA.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.subcategory.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }
}
