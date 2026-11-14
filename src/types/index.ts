export type ProductCategory = "men" | "women" | "sneakers" | "accessories";

export interface ProductVariant {
  id: string;
  sku: string;
  colorName: string;
  colorHex: string;
  size: string;
  price: number;
  compareAtPrice?: number;
  inventoryQuantity: number;
  images: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  details: string[];
  materialsCare: string[];
  category: ProductCategory;
  subcategory: string;
  basePrice: number;
  compareAtPrice?: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  primaryImage: string;
  secondaryImage?: string;
  allImages: string[];
  availableColors: { name: string; hex: string; image: string }[];
  availableSizes: string[];
  variants: ProductVariant[];
  status: "published" | "draft" | "archived";
  createdAt: string;
}

export interface OutfitItem {
  id: string;
  productSlug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  hotspot: {
    x: number; // percentage 0 - 100
    y: number; // percentage 0 - 100
    label: string;
  };
}

export interface LookOutfit {
  id: string;
  lookNumber: string; // e.g. "01", "04"
  title: string;      // e.g. "Studio Day", "Monochrome Minimalist"
  modelImage: string; // full body isolated fashion model
  modelHeight: string;
  modelWearing: string;
  discountPercentage: number; // e.g. 10 for 10% off full look
  items: OutfitItem[];
}

export interface HangingGarment {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  priceTag: string;
  color: string;
  imageFront: string;
  imageBack?: string;
  availableSizes: string[];
  description: string;
  tagline: string;
  hangerIndex: number;
}

export interface SneakerModel {
  id: string;
  slug: string;
  modelName: string;
  subtitle: string;
  price: number;
  image: string;
  colorway: string;
  colorwayHex: string;
  availableEuSizes: number[];
  thumbnails: { colorway: string; image: string }[];
  description: string;
}

export interface CartItem {
  cartItemId: string; // unique item id combining productId + color + size
  productId: string;
  slug: string;
  name: string;
  price: number;
  color: string;
  size: string;
  image: string;
  quantity: number;
  maxStock: number;
}

export interface CustomerAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateProvince?: string;
  postalCode: string;
  country: string;
}

export type PaymentMethod = "cod" | "bank_transfer" | "card_online";

export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerAddress;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

export interface Collection {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  coverImage: string;
  productCount: number;
  featured: boolean;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  announcementBarText: string;
  announcementBarActive: boolean;
  freeShippingThreshold: number;
  standardShippingFee: number;
  currencySymbol: string;
  currencyCode: string;
  contactEmail: string;
  contactPhone: string;
  instagramHandle: string;
}

