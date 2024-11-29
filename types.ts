export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  size: string;
  color: string;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
  timestamp: number;
}

export interface Order {
  items: CartItem[];
  timestamp: number;
  price: number;
  quantity: number;
  name: string;
  family: string;
  status: string;
}

export interface User {
  name: string;
 
  avatar: string;
  
  
  email: string;
  password: string;
  orders: Order[];
}

export type RegisterUser = {
  name: string;
  email: string;
  avatar: string,
  password: string;
};
