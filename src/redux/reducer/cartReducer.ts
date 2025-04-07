import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem } from "../../types/types";

const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  shippingCharges: 0,
  tax: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (index !== -1) state.cartItems[index] = action.payload;
      else state.cartItems.push(action.payload);

      state.loading = false;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      state.loading = false;
    },

    clearCart: (state) => {
      state.loading = true;
      state.cartItems = [];
      state.subtotal = 0;
      state.shippingCharges = 0;
      state.tax = 0;
      state.discount = 0;
      state.total = 0;
      state.loading = false;
    },

    calculatePrice: (state) => {
      state.loading = true;

      state.subtotal = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      if (state.cartItems.length)
        state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
      else state.shippingCharges = 0;
      // assume free shipping for orders above 1000
      state.tax = Math.round(state.subtotal * 0.18); // assume 18% tax
      state.discount = Math.round(state.subtotal * 0.1); // assume 10% discount

      state.total =
        state.subtotal + state.shippingCharges + state.tax - state.discount;
      state.loading = false;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, calculatePrice } =
  cartReducer.actions;
