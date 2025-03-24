export interface User {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  gender: string;
  dob: string;
}

export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  photo: string;
}
