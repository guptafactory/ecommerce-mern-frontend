import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { MessageResponse, UserResponse } from "../../types/api-types";
import { User } from "../../types/types";
import { AllUsersResponse, DeleteUserRequest } from "../../types/api/user";

const server = import.meta.env.VITE_SERVER;

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/user/`,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    allUsers: builder.query<AllUsersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["Users"],
    }),

    login: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
      query: ({ userId, adminId }) => ({
        url: `${userId}?id=${adminId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const getUser = async (id: string) => {
  const { data }: { data: UserResponse } = await axios.get(
    `${server}/api/v1/user/${id}`
  );
  return data;
};

export const { useAllUsersQuery, useLoginMutation, useDeleteUserMutation } =
  userAPI;
