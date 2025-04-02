import { Product, User } from "./types";

export type MessageResponse = {
  success: boolean;
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

export type SearchProductsRequest = {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export type SearchProductsResponse = AllProductsResponse & {
  totalPages: number;
};

export type CreateProductRequest = {
  id: string;
  formData: FormData;
};

export type CreateProductResponse = MessageResponse & {
  name: string;
  category: string;
  price: number;
  stock: number;
};

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};
