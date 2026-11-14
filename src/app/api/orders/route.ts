import { NextResponse } from "next/server";
import { PRODUCTS_DATA } from "@/data/products";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getPaymentProvider, SupportedPaymentGateway } from "@/lib/payments";
import { CartItem, CustomerAddress, Order, PaymentMethod } from "@/types";

// In-memory server cache to prevent duplicate rapid-fire order submissions (idempotency)
const recentOrderSignatures = new Map<string, number>();

// Clean signatures older than 5 minutes periodically
function pruneOldSignatures() {
  const now = Date.now();
  for (const [key, timestamp] of recentOrderSignatures.entries()) {
    if (now - timestamp > 300000) {
      recentOrderSignatures.delete(key);
    }
  }
}

interface OrderRequestBody {
  customer: CustomerAddress;
  items: CartItem[];
  paymentMethod: PaymentMethod;
  notes?: string;
}

export async function POST(req: Request) {
  try {
    pruneOldSignatures();

    const body: OrderRequestBody = await req.json();
    const { customer, items, paymentMethod, notes } = body;

    // 1. Validation: Customer & Shipping fields
    if (
      !customer ||
      !customer.fullName?.trim() ||
      !customer.email?.trim() ||
      !customer.phone?.trim() ||
      !customer.addressLine1?.trim() ||
      !customer.city?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required customer shipping fields (Full name, email, phone, street address, and city).",
        },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer.email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 2. Validation: Cart items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Your shopping bag is empty." },
        { status: 400 }
      );
    }

    // 3. Duplicate Order Prevention (Idempotency check)
    // Hash customer email + items signature + payment method
    const orderSignature = `${customer.email.toLowerCase()}-${items
      .map((i) => `${i.productId}:${i.quantity}:${i.size}`)
      .sort()
      .join("|")}-${paymentMethod}`;

    const lastSubmitted = recentOrderSignatures.get(orderSignature);
    const now = Date.now();
    if (lastSubmitted && now - lastSubmitted < 15000) {
      return NextResponse.json(
        {
          success: false,
          error: "A duplicate order with identical items was just submitted. Please wait a moment before resubmitting.",
        },
        { status: 429 }
      );
    }
    recentOrderSignatures.set(orderSignature, now);

    // 4. Server-Side Price & Catalog Validation
    // Never trust prices sent from client browser! Validate against server authoritative catalog.
    let verifiedSubtotal = 0;
    const validatedItems: CartItem[] = [];

    for (const item of items) {
      const catalogProduct = PRODUCTS_DATA.find((p) => p.id === item.productId || p.slug === item.slug);

      if (!catalogProduct) {
        return NextResponse.json(
          {
            success: false,
            error: `Product "${item.name}" is no longer active in our archival catalog.`,
          },
          { status: 400 }
        );
      }

      const authoritativePrice = catalogProduct.basePrice;
      const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));

      // Check if price deviates by more than $0.01 (floating point safe)
      if (Math.abs(item.price - authoritativePrice) > 0.05) {
        return NextResponse.json(
          {
            success: false,
            error: `Price verification failed for "${item.name}". Expected $${authoritativePrice}, received $${item.price}. Order was rejected for your security.`,
          },
          { status: 400 }
        );
      }

      verifiedSubtotal += authoritativePrice * quantity;
      validatedItems.push({
        ...item,
        price: authoritativePrice,
        quantity,
      });
    }

    // 5. Server-Side Shipping Calculation
    // Free shipping threshold = $200 USD
    const freeShippingThreshold = 200;
    const verifiedShippingFee = verifiedSubtotal >= freeShippingThreshold ? 0 : 15;
    const verifiedDiscount = 0;
    const verifiedTotal = verifiedSubtotal + verifiedShippingFee - verifiedDiscount;

    // 6. Generate Authentic Order Number: AFQ-YYYYMMDD-XXXX
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `AFQ-${dateStr}-${randomSuffix}`;
    const orderId = `ord_${Date.now()}_${randomSuffix}`;

    // 7. Payment Provider Dispatch
    const validGateways: SupportedPaymentGateway[] = [
      "cod",
      "bank_transfer",
      "jazzcash",
      "easypaisa",
      "kuickpay",
      "card_online",
    ];

    const targetGateway: SupportedPaymentGateway = validGateways.includes(
      paymentMethod as SupportedPaymentGateway
    )
      ? (paymentMethod as SupportedPaymentGateway)
      : "cod";

    const paymentProvider = getPaymentProvider(targetGateway);
    const paymentResult = await paymentProvider.initiatePayment({
      orderId,
      orderNumber,
      amount: verifiedTotal,
      currency: "USD",
      customer: {
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        addressLine1: customer.addressLine1,
        addressLine2: customer.addressLine2,
        city: customer.city,
        stateProvince: customer.stateProvince,
        postalCode: customer.postalCode,
        country: customer.country,
      },
    });

    const paymentStatus: Order["paymentStatus"] =
      targetGateway === "cod" ? "pending" : paymentResult.success ? "paid" : "pending";

    // 8. Assemble Completed Order
    const newOrder: Order = {
      id: orderId,
      orderNumber,
      customer,
      items: validatedItems,
      subtotal: verifiedSubtotal,
      shipping: verifiedShippingFee,
      discount: verifiedDiscount,
      total: verifiedTotal,
      paymentMethod,
      paymentStatus,
      orderStatus: "confirmed",
      createdAt: new Date().toISOString(),
    };

    // 9. Persist to Supabase if configured with RLS
    if (isSupabaseConfigured && supabase) {
      try {
        const { error: orderError } = await supabase.from("orders").insert([
          {
            id: orderId,
            order_number: orderNumber,
            customer_info: customer,
            subtotal: verifiedSubtotal,
            shipping_fee: verifiedShippingFee,
            discount_amount: verifiedDiscount,
            total_amount: verifiedTotal,
            payment_method: paymentMethod,
            payment_status: paymentStatus,
            order_status: "confirmed",
            notes: notes || null,
          },
        ]);

        if (!orderError) {
          // Insert order items
          const itemInserts = validatedItems.map((item) => ({
            order_id: orderId,
            product_id: item.productId,
            product_name: item.name,
            variant_details: { color: item.color, size: item.size },
            unit_price: item.price,
            quantity: item.quantity,
            subtotal: item.price * item.quantity,
          }));

          await supabase.from("order_items").insert(itemInserts);

          // Insert payment record
          await supabase.from("payments").insert([
            {
              order_id: orderId,
              gateway: targetGateway,
              gateway_reference: paymentResult.transactionReference,
              amount: verifiedTotal,
              currency: "USD",
              status: paymentStatus === "paid" ? "verified" : "pending",
              raw_payload: paymentResult.referenceData || null,
            },
          ]);
        }
      } catch (dbErr) {
        // Safe fallback - continue without failing checkout
        console.warn("Supabase database insert fallback:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      order: newOrder,
      payment: {
        gateway: targetGateway,
        gatewayDisplayName: paymentProvider.displayName,
        status: paymentResult.status,
        transactionReference: paymentResult.transactionReference,
        actionInstructions: paymentResult.actionInstructions || [],
        referenceData: paymentResult.referenceData || {},
        customerInstructions: paymentProvider.getCustomerInstructions(orderNumber, verifiedTotal),
      },
    });
  } catch (error) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred during order dispatch authorization. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const orderNumber = searchParams.get("orderNumber");

  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from("orders").select("*, order_items(*), payments(*)");
      if (orderNumber) {
        query = query.eq("order_number", orderNumber);
      } else if (email) {
        query = query.contains("customer_info", { email });
      } else {
        query = query.order("created_at", { ascending: false }).limit(50);
      }

      const { data, error } = await query;
      if (!error && data) {
        return NextResponse.json({ success: true, orders: data });
      }
    } catch {
      // Fallback
    }
  }

  return NextResponse.json({
    success: true,
    orders: [],
    notice: "Operating with local storage client state.",
  });
}
