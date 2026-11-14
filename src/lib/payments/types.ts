/**
 * AFAQ SUPPLY — Payment Gateway Architecture
 * Extensible, Type-Safe Specifications for International and Pakistani Payment Infrastructure.
 */

export type SupportedPaymentGateway =
  | "cod"
  | "bank_transfer"
  | "jazzcash"
  | "easypaisa"
  | "kuickpay"
  | "card_online";

export type PaymentTransactionStatus =
  | "INITIATED"
  | "PENDING_CUSTOMER_ACTION"
  | "AWAITING_REMITTANCE"
  | "AUTHORIZED"
  | "SETTLED"
  | "FAILED"
  | "CANCELLED";

export interface Money {
  amount: number;
  currency: "PKR" | "USD" | "EUR" | "GBP";
}

export interface CustomerBillingDetails {
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

export interface PaymentInitiationRequest {
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: "USD" | "PKR";
  customer: CustomerBillingDetails;
  returnUrl?: string;
  callbackUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentInitiationResult {
  success: boolean;
  gateway: SupportedPaymentGateway;
  status: PaymentTransactionStatus;
  transactionReference: string;
  requiresRedirect?: boolean;
  redirectUrl?: string;
  actionInstructions?: string[];
  referenceData?: Record<string, string | number | boolean>;
  errorMessage?: string;
}

export interface PaymentVerificationRequest {
  orderNumber: string;
  transactionReference: string;
  rawPayload?: Record<string, unknown>;
}

export interface PaymentVerificationResult {
  verified: boolean;
  status: PaymentTransactionStatus;
  orderNumber: string;
  settledAmount?: number;
  settledCurrency?: string;
  gatewayReference?: string;
  message: string;
  rawResponse?: Record<string, unknown>;
}

export interface IPaymentGatewayProvider {
  readonly gateway: SupportedPaymentGateway;
  readonly displayName: string;
  readonly isConfigured: boolean;

  /**
   * Prepares or initiates a transaction.
   * If credentials are not present or gateway is in production-safe mode, returns explicit configuration notice.
   */
  initiatePayment(request: PaymentInitiationRequest): Promise<PaymentInitiationResult>;

  /**
   * Verifies an incoming webhook, IPN, or customer return payload.
   */
  verifyPayment(request: PaymentVerificationRequest): Promise<PaymentVerificationResult>;

  /**
   * Returns human-readable customer instructions for completing payment.
   */
  getCustomerInstructions(orderNumber: string, amount: number): string[];
}
