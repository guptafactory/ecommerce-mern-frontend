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
  status: string;
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
};
