import { CartItem, ShippingInfo, User } from "./types";

export type UserReducerInitialState = {
  user: User | null;
  loading: boolean;
};

export type CartReducerInitialState = {
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  loading: boolean;
  shippingInfo: ShippingInfo;
};
