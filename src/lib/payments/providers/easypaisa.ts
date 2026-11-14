import crypto from "crypto";
import {
  IPaymentGatewayProvider,
  PaymentInitiationRequest,
  PaymentInitiationResult,
  PaymentVerificationRequest,
  PaymentVerificationResult,
  SupportedPaymentGateway,
} from "../types";

export interface EasyPaisaConfig {
  storeId: string;
  hashKey: string;
  postBackUrl: string;
  checkoutUrl: string;
}

export class EasyPaisaProvider implements IPaymentGatewayProvider {
  readonly gateway: SupportedPaymentGateway = "easypaisa";
  readonly displayName: string = "EasyPaisa Mobile Account & OTC";

  private config: EasyPaisaConfig;

  constructor() {
    this.config = {
      storeId: process.env.EASYPAISA_STORE_ID || "",
      hashKey: process.env.EASYPAISA_HASH_KEY || "",
      postBackUrl: process.env.EASYPAISA_POSTBACK_URL || "https://afaqsupply.com/api/payments/easypaisa/callback",
      checkoutUrl:
        process.env.EASYPAISA_ENVIRONMENT === "production"
          ? "https://easypay.easypaisa.com.pk/easypay/Index.jsf"
          : "https://easypaystg.easypaisa.com.pk/easypay/Index.jsf",
    };
  }

  get isConfigured(): boolean {
    return Boolean(
      this.config.storeId &&
      this.config.hashKey &&
      !this.config.storeId.includes("SAMPLE")
    );
  }

  public generateHash(queryString: string): string {
    return crypto
      .createHmac("sha256", this.config.hashKey)
      .update(queryString)
      .digest("hex");
  }

  async initiatePayment(request: PaymentInitiationRequest): Promise<PaymentInitiationResult> {
    const txRef = `EP-${request.orderNumber}-${Date.now().toString().slice(-4)}`;
    const amountInPKR = request.currency === "USD"
      ? Math.round(request.amount * 278)
      : Math.round(request.amount);

    if (!this.isConfigured) {
      return {
        success: false,
        gateway: this.gateway,
        status: "PENDING_CUSTOMER_ACTION",
        transactionReference: txRef,
        actionInstructions: [
          "EasyPaisa Merchant API credentials (EASYPAISA_STORE_ID, EASYPAISA_HASH_KEY) are awaiting live merchant onboarding in environment settings.",
          "Payment instructions have been generated for direct mobile remittance.",
          `Please transfer PKR ${amountInPKR.toLocaleString()} to EasyPaisa Business Account #0300-8849201 (AFAQ SUPPLY ATELIER) referencing Order #${request.orderNumber}.`,
        ],
        referenceData: {
          accountNumber: "0300-8849201",
          accountTitle: "AFAQ SUPPLY ATELIER",
          convertedPKR: amountInPKR,
          mode: "MANUAL_REMITTANCE_REQUIRED",
        },
        errorMessage: "EasyPaisa API gateway is in production setup mode. Manual transfer instructions provided.",
      };
    }

    const payload: Record<string, string> = {
      storeId: this.config.storeId,
      orderId: request.orderNumber,
      transactionAmount: amountInPKR.toFixed(2),
      mobileNum: request.customer.phone.replace(/[^0-9]/g, ""),
      emailAddress: request.customer.email,
      transactionType: "MA",
      postBackURL: request.callbackUrl || this.config.postBackUrl,
    };

    const hashString = `${this.config.hashKey}${payload.orderId}${payload.storeId}${payload.transactionAmount}`;
    payload.merchantHashedReq = this.generateHash(hashString);

    return {
      success: true,
      gateway: this.gateway,
      status: "PENDING_CUSTOMER_ACTION",
      transactionReference: txRef,
      requiresRedirect: true,
      redirectUrl: this.config.checkoutUrl,
      actionInstructions: [
        "Customer redirected to EasyPaisa secure authorization flow.",
        "Authorize the payment via incoming EasyPaisa Mobile App prompt or OTP.",
      ],
      referenceData: payload,
    };
  }

  async verifyPayment(request: PaymentVerificationRequest): Promise<PaymentVerificationResult> {
    const payload = (request.rawPayload || {}) as Record<string, string>;

    if (payload.status === "0000" || payload.responseCode === "0000") {
      return {
        verified: true,
        status: "SETTLED",
        orderNumber: request.orderNumber,
        settledAmount: payload.amount ? Number(payload.amount) : undefined,
        settledCurrency: "PKR",
        gatewayReference: payload.transactionId || request.transactionReference,
        message: payload.desc || "Transaction successfully captured by EasyPaisa.",
        rawResponse: payload,
      };
    }

    return {
      verified: false,
      status: "FAILED",
      orderNumber: request.orderNumber,
      gatewayReference: payload.transactionId,
      message: payload.desc || "EasyPaisa authorization failed or expired.",
      rawResponse: payload,
    };
  }

  getCustomerInstructions(orderNumber: string, amount: number): string[] {
    const pkr = Math.round(amount * 278);
    return [
      `Order ${orderNumber} - Due: PKR ${pkr.toLocaleString()} ($${amount.toFixed(2)} USD).`,
      "1. Open EasyPaisa App on your smartphone.",
      "2. Select 'Send Money' -> 'EasyPaisa Account'.",
      "3. Receiver Mobile: 0300-8849201 (AFAQ SUPPLY ATELIER).",
      `4. Add Order Reference in remarks: ${orderNumber}.`,
      "5. Atelier dispatch will be initiated upon payment broadcast.",
    ];
  }
}
