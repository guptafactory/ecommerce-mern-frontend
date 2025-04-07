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

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};
