import {
  IPaymentGatewayProvider,
  PaymentInitiationRequest,
  PaymentInitiationResult,
  PaymentVerificationRequest,
  PaymentVerificationResult,
  SupportedPaymentGateway,
} from "../types";

export interface BankAccountDetails {
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
  swiftBic: string;
  branch: string;
  currency: string;
}

export const ATELIER_BANK_ACCOUNTS: BankAccountDetails[] = [
  {
    bankName: "Meezan Bank Ltd (Islamic Banking)",
    accountTitle: "AFAQ SUPPLY ATELIER (PVT) LTD",
    accountNumber: "0289 0105 8892 11",
    iban: "PK72 MEZN 0002 8901 0588 9211",
    swiftBic: "MEZNPKKA",
    branch: "Gulberg III Premium Corporate Branch, Lahore, Pakistan",
    currency: "PKR",
  },
  {
    bankName: "Standard Chartered Bank (Pakistan)",
    accountTitle: "AFAQ SUPPLY ATELIER",
    accountNumber: "0182 4492 8810 01",
    iban: "PK44 SCBL 0000 0182 4492 8810",
    swiftBic: "SCBLPKKXXXX",
    branch: "Main Boulevard Corporate, Lahore, Pakistan",
    currency: "PKR / USD",
  },
  {
    bankName: "JPMorgan Chase Bank, N.A.",
    accountTitle: "AFAQ SUPPLY ATELIER LLC",
    accountNumber: "9820 4410 8821",
    iban: "US48 CHPO 0001 2345 6789 01",
    swiftBic: "CHASUS33",
    branch: "Park Avenue Commercial, New York, NY, USA",
    currency: "USD",
  },
];

export class BankTransferProvider implements IPaymentGatewayProvider {
  readonly gateway: SupportedPaymentGateway = "bank_transfer";
  readonly displayName: string = "Direct Manual Bank Remittance (IBAN / Wire)";
  readonly isConfigured: boolean = true;

  async initiatePayment(request: PaymentInitiationRequest): Promise<PaymentInitiationResult> {
    const wireRef = `WIRE-${request.orderNumber}`;
    const amountInPKR = Math.round(request.amount * 278);

    return {
      success: true,
      gateway: this.gateway,
      status: "AWAITING_REMITTANCE",
      transactionReference: wireRef,
      actionInstructions: [
        `Order Reference: ${request.orderNumber}`,
        `USD Amount: $${request.amount.toFixed(2)} | PKR Equivalent: PKR ${amountInPKR.toLocaleString()}`,
        "1. Transfer the exact invoice total to one of our corporate bank accounts below.",
        "2. Include your Order Number in the wire payment description or reference field.",
        "3. Email transfer receipt/proof to: concierge@afaqsupply.com or WhatsApp: +92 300 8849201.",
        "4. Atelier dispatches are verified and released within 4 hours of credit reflection.",
      ],
      referenceData: {
        wireReference: wireRef,
        accounts: JSON.stringify(ATELIER_BANK_ACCOUNTS),
      },
    };
  }

  async verifyPayment(request: PaymentVerificationRequest): Promise<PaymentVerificationResult> {
    const payload = request.rawPayload || {};
    const isManuallyApproved = payload.adminApproved === true;

    if (isManuallyApproved) {
      return {
        verified: true,
        status: "SETTLED",
        orderNumber: request.orderNumber,
        gatewayReference: request.transactionReference,
        message: "Bank transfer manually reconciled and approved by atelier finance officer.",
      };
    }

    return {
      verified: false,
      status: "AWAITING_REMITTANCE",
      orderNumber: request.orderNumber,
      message: "Pending manual bank remittance reconciliation.",
    };
  }

  getCustomerInstructions(orderNumber: string, amount: number): string[] {
    const pkr = Math.round(amount * 278);
    return [
      `Order: ${orderNumber} | Amount: $${amount.toFixed(2)} (PKR ${pkr.toLocaleString()})`,
      "Meezan Bank IBAN: PK72 MEZN 0002 8901 0588 9211",
      "Account Title: AFAQ SUPPLY ATELIER",
      "Send payment screenshot to concierge@afaqsupply.com",
    ];
  }
}
