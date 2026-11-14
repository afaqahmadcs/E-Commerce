import { Order } from "@/types";

export interface CreateOrderPayload {
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: {
    addressLine1: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentGatewayDetails?: Record<string, unknown>;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
  }>;
}

export class OrderService {
  /**
   * Submit an order to the server-side price-validation endpoint
   */
  static async submitOrder(payload: CreateOrderPayload): Promise<{ success: boolean; order?: Order; error?: string }> {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Order validation failed." };
      }

      return { success: true, order: data.order };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network communication failed.";
      return { success: false, error: message };
    }
  }
}
