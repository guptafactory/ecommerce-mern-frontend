export {}; // Important to make this a module

declare global {
  interface Window {
    Razorpay: typeof Razorpay;
  }

  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id: string;
    callback_url?: string;
    handler: (response: RazorpayResponse) => void;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    notes?: Record<string, string>;
    theme?: {
      color?: string;
    };
  }

  interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  interface RazorpayOrder {
    id: string;
    entity: string;
    amount: number;
    currency: string;
    receipt?: string | null;
    status: "created" | "attempted" | "paid" | "failed";
    attempts: number;
    notes: Record<string, string | number | boolean>;
    created_at: number;
    offer_id?: string | null;
    amount_due: number;
    amount_paid: number;
    // internal_order_id: string;
  }

  class Razorpay {
    constructor(options: RazorpayOptions);
    open(): void;
    on(event: string, callback: () => void): void;
  }
}
