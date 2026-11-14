import {
  IPaymentGatewayProvider,
  SupportedPaymentGateway,
} from "./types";
import { CashOnDeliveryProvider } from "./providers/cod";
import { BankTransferProvider } from "./providers/bank-transfer";
import { JazzCashProvider } from "./providers/jazzcash";
import { EasyPaisaProvider } from "./providers/easypaisa";
import { KuickpayProvider } from "./providers/kuickpay";

export * from "./types";
export * from "./providers/cod";
export * from "./providers/bank-transfer";
export * from "./providers/jazzcash";
export * from "./providers/easypaisa";
export * from "./providers/kuickpay";

const registry: Record<SupportedPaymentGateway, () => IPaymentGatewayProvider> = {
  cod: () => new CashOnDeliveryProvider(),
  bank_transfer: () => new BankTransferProvider(),
  jazzcash: () => new JazzCashProvider(),
  easypaisa: () => new EasyPaisaProvider(),
  kuickpay: () => new KuickpayProvider(),
  card_online: () => new BankTransferProvider(), // Fallback / gateway wrapper
};

export function getPaymentProvider(gateway: SupportedPaymentGateway): IPaymentGatewayProvider {
  const factory = registry[gateway];
  if (!factory) {
    throw new Error(`Unsupported payment gateway requested: ${gateway}`);
  }
  return factory();
}

export function getAllSupportedGateways(): {
  id: SupportedPaymentGateway;
  name: string;
  isAvailable: boolean;
  isPakistani: boolean;
}[] {
  return [
    { id: "cod", name: "Cash on Delivery", isAvailable: true, isPakistani: true },
    { id: "bank_transfer", name: "Direct Bank Wire (Meezan / SCB / Chase)", isAvailable: true, isPakistani: true },
    { id: "jazzcash", name: "JazzCash Mobile Wallet & Portal", isAvailable: true, isPakistani: true },
    { id: "easypaisa", name: "EasyPaisa Mobile Account & OTC", isAvailable: true, isPakistani: true },
    { id: "kuickpay", name: "1Link 1Bill Inter-Bank Voucher", isAvailable: true, isPakistani: true },
  ];
}
