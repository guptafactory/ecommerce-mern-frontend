import { Product, User } from "./types";

export interface MessageResponse {
  sucess: boolean;
  message: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface LatestProductsResponse {
  success: boolean;
  message: string;
  products: Product[];
}

export interface AllProductsResponse {
  success: boolean;
  message: string;
  products: Product[];
}

export interface CustomError {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
}
