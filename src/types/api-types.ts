import { Product, User } from "./types";

export type MessageResponse = {
  sucess: boolean;
  message: string;
};

export type UserResponse = MessageResponse & {
  user: User;
};

export type LatestProductsResponse = MessageResponse & {
  products: Product[];
};

export type AllProductsResponse = MessageResponse & {
  products: Product[];
};

export type CategoriesResponse = MessageResponse & {
  categories: string[];
};

export type SearchProductsResponse = AllProductsResponse & {
  totalPages: number;
};

export type SearchProductsRequest = {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};
