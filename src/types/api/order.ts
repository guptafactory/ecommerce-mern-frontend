import { MessageResponse } from "../api-types";
import { CartItem, Order, ShippingInfo } from "../types";

export type AllOrdersResponse = MessageResponse & {
  orders: Order[];
};

export type OrderDetailsResponse = MessageResponse & {
  order: Order;
};

export type NewOrderRequest = {
  shippingInfo: ShippingInfo[];
  user: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  orderItems: CartItem[];
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

export type UpdateOrderResponse = MessageResponse & {
  status: string;
};
