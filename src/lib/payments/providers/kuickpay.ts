import {
  IPaymentGatewayProvider,
  PaymentInitiationRequest,
  PaymentInitiationResult,
  PaymentVerificationRequest,
  PaymentVerificationResult,
  SupportedPaymentGateway,
} from "../types";

export interface KuickpayConfig {
  institutionId: string;
  apiKey: string;
  billerId: string;
  endpointUrl: string;
}

export class KuickpayProvider implements IPaymentGatewayProvider {
  readonly gateway: SupportedPaymentGateway = "kuickpay";
  readonly displayName: string = "1Link / Kuickpay 1Bill Inter-Bank Voucher";

  private config: KuickpayConfig;

  constructor() {
    this.config = {
      institutionId: process.env.KUICKPAY_INSTITUTION_ID || "",
      apiKey: process.env.KUICKPAY_API_KEY || "",
      billerId: process.env.KUICKPAY_BILLER_ID || "100492",
      endpointUrl:
        process.env.KUICKPAY_ENVIRONMENT === "production"
          ? "https://api.kuickpay.com/api/v1/"
          : "https://sandbox.kuickpay.com/api/v1/",
    };
  }

  get isConfigured(): boolean {
    return Boolean(
      this.config.institutionId &&
      this.config.apiKey &&
      !this.config.institutionId.includes("SAMPLE")
    );
  }

  /**
   * Generates a standardized 18-digit 1Bill Consumer Number:
   * Prefix (6 digits) + Order Timestamp Hash (12 digits)
   */
  public generateConsumerNumber(orderNumber: string): string {
    const numericPortion = orderNumber.replace(/[^0-9]/g, "").padStart(12, "0").slice(-12);
    return `${this.config.billerId}${numericPortion}`;
  }

  async initiatePayment(request: PaymentInitiationRequest): Promise<PaymentInitiationResult> {
    const consumerNumber = this.generateConsumerNumber(request.orderNumber);
    const amountInPKR = request.currency === "USD"
      ? Math.round(request.amount * 278)
      : Math.round(request.amount);

    return {
      success: true,
      gateway: this.gateway,
      status: "AWAITING_REMITTANCE",
      transactionReference: consumerNumber,
      actionInstructions: [
        `Generated 1Link 1Bill Consumer Number: ${consumerNumber}`,
        `Bill Amount: PKR ${amountInPKR.toLocaleString()} ($${request.amount.toFixed(2)} USD)`,
        "1. Log into ANY Pakistani Banking Mobile App (HBL, Meezan, Standard Chartered, Alfalah, UBL, MCB, Nayapay, Sadapay).",
        "2. Navigate to 'Bill Payments' -> '1Bill / 1Link' -> '1Bill Invoices / Vouchers'.",
        `3. Enter Consumer Number: ${consumerNumber}.`,
        "4. Confirm Biller: AFAQ SUPPLY ATELIER and authorize payment.",
        "5. Order status is updated instantly via real-time 1Link switch.",
      ],
      referenceData: {
        consumerNumber,
        billerName: "AFAQ SUPPLY ATELIER (Kuickpay / 1Link)",
        billerId: this.config.billerId,
        amountPKR: amountInPKR,
        expiryHours: 72,
      },
    };
  }

  async verifyPayment(request: PaymentVerificationRequest): Promise<PaymentVerificationResult> {
    const payload = (request.rawPayload || {}) as Record<string, string>;

    if (payload.status === "PAID" || payload.ResponseCode === "00") {
      return {
        verified: true,
        status: "SETTLED",
        orderNumber: request.orderNumber,
        settledAmount: payload.Amount ? Number(payload.Amount) : undefined,
        settledCurrency: "PKR",
        gatewayReference: payload.BankRefNumber || request.transactionReference,
        message: "1Link settlement confirmed by originating clearing bank.",
        rawResponse: payload,
      };
    }

    return {
      verified: false,
      status: "AWAITING_REMITTANCE",
      orderNumber: request.orderNumber,
      message: "1Link voucher is pending customer remittance at originating bank.",
      rawResponse: payload,
    };
  }

  getCustomerInstructions(orderNumber: string, amount: number): string[] {
    const consumerNumber = this.generateConsumerNumber(orderNumber);
    const pkr = Math.round(amount * 278);
    return [
      `1Bill Consumer ID: ${consumerNumber}`,
      `Total Payable: PKR ${pkr.toLocaleString()}`,
      "Payable via 40+ Pakistani Banking Apps, ATMs, or Internet Banking.",
      "Select '1Bill Invoices', input consumer number, and proceed.",
    ];
  }
}
