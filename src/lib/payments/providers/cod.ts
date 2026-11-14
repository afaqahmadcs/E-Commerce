import {
  IPaymentGatewayProvider,
  PaymentInitiationRequest,
  PaymentInitiationResult,
  PaymentVerificationRequest,
  PaymentVerificationResult,
  SupportedPaymentGateway,
} from "../types";

export class CashOnDeliveryProvider implements IPaymentGatewayProvider {
  readonly gateway: SupportedPaymentGateway = "cod";
  readonly displayName: string = "Cash on Delivery (White-Glove Courier)";
  readonly isConfigured: boolean = true;

  // Maximum allowed order limit for COD (e.g. $1,000 USD / PKR 280,000)
  readonly maxOrderLimitUSD: number = 1000;

  async initiatePayment(request: PaymentInitiationRequest): Promise<PaymentInitiationResult> {
    const codRef = `COD-${request.orderNumber}`;

    if (request.amount > this.maxOrderLimitUSD) {
      return {
        success: false,
        gateway: this.gateway,
        status: "FAILED",
        transactionReference: codRef,
        errorMessage: `Orders over $${this.maxOrderLimitUSD} USD require prepaid bank wire or digital gateway authorization for security.`,
      };
    }

    const amountInPKR = Math.round(request.amount * 278);

    return {
      success: true,
      gateway: this.gateway,
      status: "PENDING_CUSTOMER_ACTION",
      transactionReference: codRef,
      actionInstructions: [
        `Order ${request.orderNumber} is authorized for Cash on Delivery dispatch.`,
        `Amount Due Upon Delivery: $${request.amount.toFixed(2)} USD (approx. PKR ${amountInPKR.toLocaleString()}).`,
        "Please ensure exact cash or courier-supported digital QR payment is ready upon courier arrival.",
        "A verification dispatch agent will contact your mobile phone before shipping.",
      ],
      referenceData: {
        codReference: codRef,
        amountDueUSD: request.amount,
        estimatedPKR: amountInPKR,
      },
    };
  }

  async verifyPayment(request: PaymentVerificationRequest): Promise<PaymentVerificationResult> {
    const payload = request.rawPayload || {};
    const courierDelivered = payload.courierDelivered === true;

    if (courierDelivered) {
      return {
        verified: true,
        status: "SETTLED",
        orderNumber: request.orderNumber,
        gatewayReference: request.transactionReference,
        message: "Cash collected and verified by delivery courier partner.",
      };
    }

    return {
      verified: false,
      status: "PENDING_CUSTOMER_ACTION",
      orderNumber: request.orderNumber,
      message: "Order dispatched under Cash on Delivery. Awaiting physical courier settlement.",
    };
  }

  getCustomerInstructions(orderNumber: string, amount: number): string[] {
    const pkr = Math.round(amount * 278);
    return [
      `Order ${orderNumber} - Amount Due: $${amount.toFixed(2)} (PKR ${pkr.toLocaleString()})`,
      "Payable in cash upon package delivery by authorized courier partner.",
      "Delivery agent will verify recipient identity and package seal.",
    ];
  }
}
