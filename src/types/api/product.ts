import { MessageResponse } from "../api-types";
import { Product } from "../types";

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

export type ProductDetailsResponse = MessageResponse & {
  product: Product;
};

export type CreateProductRequest = {
  id: string;
  formData: FormData;
};

export type CreateProductResponse = MessageResponse & Product;

// export type CreateProductResponse = MessageResponse & {
//   name: string;
//   category: string;
//   price: number;
//   stock: number;
// };

export type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};

export type UpdateProductResponse = MessageResponse & Product;

export type DeleteProductRequest = {
  userId: string;
  productId: string;
};

export type DeleteProductResponse = MessageResponse & Product;
