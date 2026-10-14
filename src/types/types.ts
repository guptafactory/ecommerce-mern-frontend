export type User = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  gender: string;
  dob: string;
};

export type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  photo: string;
};

export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type Order = {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
};

// Dashboard types

type FixedLengthArray<
  T,
  L extends number,
  R extends unknown[] = [],
> = R["length"] extends L ? R : FixedLengthArray<T, L, [T, ...R]>;

export type Stats = {
  categoryCount: Array<Record<string, number>>;
  changePercent: {
    revenue: number;
    product: number;
    user: number;
    order: number;
  };
  count: {
    totalRevenue: number;
    product: number;
    user: number;
    order: number;
  };
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransactions: Array<{
    _id: string;
    discount: number;
    amount: number;
    quantity: number;
    status: "Processing" | "Shipped" | "Delivered";
  }>;
};

export type BarChart = {
  users: FixedLengthArray<number, 6>;
  products: FixedLengthArray<number, 6>;
  orders: FixedLengthArray<number, 12>;
};

export type PieChart = {
  orderFulfillment: {
    processing: number;
    shipped: number;
    delivered: number;
  };
  productCategories: Array<Record<string, number>>;
  stockAvailability: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: {
    productionCost: number;
    marketingCost: number;
    discount: number;
    burn: number;
    netMargin: number;
  };
  adminCustomer: {
    admin: number;
    customer: number;
  };
  usersAgeGroup: {
    teen: number;
    adult: number;
    old: number;
  };
};

export type LineChart = {
  users: FixedLengthArray<number, 12>;
  products: FixedLengthArray<number, 12>;
  discounts: FixedLengthArray<number, 12>;
  revenues: FixedLengthArray<number, 12>;
};

export type MonthFormat = "long" | "short" | "narrow";

export interface GetMonthsOptions {
  count: number; // e.g., 6 or 12
  format?: MonthFormat;
  locale?: string;
  reverse?: boolean; // Oldest to newest if true
}
