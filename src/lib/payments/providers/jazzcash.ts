import crypto from "crypto";
import {
  IPaymentGatewayProvider,
  PaymentInitiationRequest,
  PaymentInitiationResult,
  PaymentVerificationRequest,
  PaymentVerificationResult,
  SupportedPaymentGateway,
} from "../types";

export interface JazzCashConfig {
  merchantId: string;
  password: string;
  integritySalt: string;
  returnUrl: string;
  endpointUrl: string;
}

export class JazzCashProvider implements IPaymentGatewayProvider {
  readonly gateway: SupportedPaymentGateway = "jazzcash";
  readonly displayName: string = "JazzCash Mobile Wallet & 3D-Secure";

  private config: JazzCashConfig;

  constructor() {
    this.config = {
      merchantId: process.env.JAZZCASH_MERCHANT_ID || "",
      password: process.env.JAZZCASH_PASSWORD || "",
      integritySalt: process.env.JAZZCASH_INTEGRITY_SALT || "",
      returnUrl: process.env.JAZZCASH_RETURN_URL || "https://afaqsupply.com/api/payments/jazzcash/callback",
      endpointUrl:
        process.env.JAZZCASH_ENVIRONMENT === "production"
          ? "https://payments.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/"
          : "https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/",
    };
  }

  get isConfigured(): boolean {
    return Boolean(
      this.config.merchantId &&
      this.config.password &&
      this.config.integritySalt &&
      !this.config.merchantId.includes("SAMPLE")
    );
  }

  /**
   * Generates JazzCash HMAC-SHA256 secure hash for parameter payload.
   * JazzCash rules: Sort all non-empty parameters alphabetically by key (excluding pp_SecureHash),
   * prepend integrity salt, join with '&', and compute SHA-256 HMAC.
   */
  public generateSecureHash(params: Record<string, string>): string {
    const sortedKeys = Object.keys(params)
      .filter((k) => k !== "pp_SecureHash" && params[k] !== undefined && params[k] !== null && params[k] !== "")
      .sort();

    const hashString = [
      this.config.integritySalt,
      ...sortedKeys.map((k) => params[k]),
    ].join("&");

    return crypto
      .createHmac("sha256", this.config.integritySalt)
      .update(hashString)
      .digest("hex")
      .toUpperCase();
  }

  async initiatePayment(request: PaymentInitiationRequest): Promise<PaymentInitiationResult> {
    const txRef = `JC-${request.orderNumber}-${Date.now().toString().slice(-4)}`;

    // Exchange conversion for estimation if in USD (1 USD ~ 278 PKR standard luxury peg)
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
          "JazzCash Merchant Credentials (JAZZCASH_MERCHANT_ID, JAZZCASH_PASSWORD, JAZZCASH_INTEGRITY_SALT) are currently awaiting live production activation in environment settings.",
          "Payment instructions have been generated for direct manual transfer to the AFAQ SUPPLY JazzCash Corporate Merchant account.",
          `Please transfer PKR ${amountInPKR.toLocaleString()} to JazzCash Till #982104 (AFAQ SUPPLY ATELIER) referencing ${request.orderNumber}.`,
        ],
        referenceData: {
          tillId: "982104",
          accountTitle: "AFAQ SUPPLY ATELIER",
          convertedPKR: amountInPKR,
          mode: "MANUAL_REMITTANCE_REQUIRED",
        },
        errorMessage: "JazzCash API gateway is awaiting live merchant credentials. Please use the corporate Till ID remittance.",
      };
    }

    // Build authentic JazzCash payload
    const now = new Date();
    const pp_TxnDateTime = now.toISOString().replace(/[-:T]/g, "").slice(0, 14);
    const pp_TxnExpiryDateTime = new Date(now.getTime() + 3600000 * 2)
      .toISOString()
      .replace(/[-:T]/g, "")
      .slice(0, 14);

    const postParams: Record<string, string> = {
      pp_Version: "1.1",
      pp_TxnType: "MWALLET",
      pp_Language: "EN",
      pp_MerchantID: this.config.merchantId,
      pp_Password: this.config.password,
      pp_TxnRefNo: txRef,
      pp_Amount: (amountInPKR * 100).toString(), // Paisas
      pp_TxnCurrency: "PKR",
      pp_TxnDateTime,
      pp_BillReference: request.orderNumber,
      pp_Description: `AFAQ SUPPLY Atelier Order #${request.orderNumber}`,
      pp_TxnExpiryDateTime,
      pp_ReturnURL: request.returnUrl || this.config.returnUrl,
      pp_CustomerMobile: request.customer.phone.replace(/[^0-9]/g, ""),
      pp_CustomerEmail: request.customer.email,
    };

    postParams.pp_SecureHash = this.generateSecureHash(postParams);

    return {
      success: true,
      gateway: this.gateway,
      status: "PENDING_CUSTOMER_ACTION",
      transactionReference: txRef,
      requiresRedirect: true,
      redirectUrl: this.config.endpointUrl,
      actionInstructions: [
        "Customer will be redirected to the secure JazzCash payment gateway.",
        "Authorize the payment via your JazzCash Mobile App MPIN prompt or 3D-Secure Card.",
      ],
      referenceData: postParams,
    };
  }

  async verifyPayment(request: PaymentVerificationRequest): Promise<PaymentVerificationResult> {
    const payload = (request.rawPayload || {}) as Record<string, string>;

    if (!payload.pp_ResponseCode) {
      return {
        verified: false,
        status: "FAILED",
        orderNumber: request.orderNumber,
        message: "Missing JazzCash response payload or status code.",
        rawResponse: payload,
      };
    }

    // Response code 000 indicates successful transaction
    if (payload.pp_ResponseCode === "000") {
      return {
        verified: true,
        status: "SETTLED",
        orderNumber: request.orderNumber,
        settledAmount: payload.pp_Amount ? Number(payload.pp_Amount) / 100 : undefined,
        settledCurrency: "PKR",
        gatewayReference: payload.pp_TxnRefNo || request.transactionReference,
        message: payload.pp_ResponseMessage || "Transaction authorized successfully by JazzCash.",
        rawResponse: payload,
      };
    }

    return {
      verified: false,
      status: "FAILED",
      orderNumber: request.orderNumber,
      gatewayReference: payload.pp_TxnRefNo,
      message: payload.pp_ResponseMessage || `JazzCash returned error code: ${payload.pp_ResponseCode}`,
      rawResponse: payload,
    };
  }

  getCustomerInstructions(orderNumber: string, amount: number): string[] {
    const pkr = Math.round(amount * 278);
    return [
      `Order ${orderNumber} - Amount: PKR ${pkr.toLocaleString()} ($${amount.toFixed(2)} USD).`,
      "1. Open JazzCash Mobile App on your device.",
      "2. Select 'Till Payment' or 'Send Money'.",
      "3. Enter Merchant Till: 982104 (AFAQ SUPPLY ATELIER).",
      `4. Enter Reference: ${orderNumber}.`,
      "5. Dispatch will be cleared instantly upon confirmation SMS.",
    ];
  }
}
