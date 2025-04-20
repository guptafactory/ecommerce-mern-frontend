import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BarChartResponse,
  LineChartResponse,
  PieChartResponse,
  StatsResponse,
} from "../../types/api/dashboard";

const server = import.meta.env.VITE_SERVER;

export const dashboardAPI = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/dashboard/`,
  }),
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    stats: builder.query<StatsResponse, string>({
      query: (id) => `stats?id=${id}`,
      providesTags: ["Dashboard"],
    }),
    barChart: builder.query<BarChartResponse, string>({
      query: (id) => `bar?id=${id}`,
      providesTags: ["Dashboard"],
    }),
    pieChart: builder.query<PieChartResponse, string>({
      query: (id) => `pie?id=${id}`,
      providesTags: ["Dashboard"],
    }),
    lineChart: builder.query<LineChartResponse, string>({
      query: (id) => `line?id=${id}`,
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useStatsQuery,
  useBarChartQuery,
  usePieChartQuery,
  useLineChartQuery,
} = dashboardAPI;
