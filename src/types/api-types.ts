export type MessageResponse = {
  success: boolean;
  message: string;
};

export type CreatePaymentResponse = MessageResponse & {
  // order: RazorpayOrder;
};

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};
