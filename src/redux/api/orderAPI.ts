import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../../types/api-types";
import {
  AllOrdersResponse,
  NewOrderRequest,
  OrderDetailsResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from "../../types/api/order";

const server = import.meta.env.VITE_SERVER;

export const orderAPI = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/order/`,
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    myOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => `my?id=${id}`,
      providesTags: ["Orders"],
    }),

    allOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["Orders"],
    }),

    orderDetails: builder.query<OrderDetailsResponse, string>({
      query: (id) => id,
      providesTags: ["Orders"],
    }),

    createOrder: builder.mutation<MessageResponse, NewOrderRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),

    updateOrder: builder.mutation<UpdateOrderResponse, UpdateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Orders"],
    }),

    deleteOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,

  useOrderDetailsQuery,
  useMyOrdersQuery,
  useAllOrdersQuery,
} = orderAPI;
