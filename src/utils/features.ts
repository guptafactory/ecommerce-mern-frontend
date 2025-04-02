import { NavigateFunction } from "react-router-dom";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";

import { MessageResponse } from "../types/api-types";

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
