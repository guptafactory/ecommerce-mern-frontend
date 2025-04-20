import { NavigateFunction } from "react-router-dom";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";

import { MessageResponse } from "../types/api-types";
import { GetMonthsOptions } from "../types/types";

type ResType =
  | {
      data: MessageResponse;
      error?: undefined;
    }
  | {
      data?: undefined;
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if (res.data) {
    if (res.data.success) {
      toast.success(res.data.message);
      if (navigate) navigate(url);
    } else toast.error(res.data.message);
  }
};

export function getLastMonths({
  count,
  format = "long",
  locale = "en-US",
  reverse = false,
}: GetMonthsOptions): string[] {
  const now = new Date();
  const months: string[] = [];

  for (let i = 0; i < count; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = date.toLocaleString(locale, { month: format });
    months.push(monthName);
  }

  return reverse ? months.reverse() : months;
}
