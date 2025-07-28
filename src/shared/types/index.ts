// Pizza Types
export interface Pizza {
  id: string;
  name: string;
  description: string;
  image: string;
  sizes: {
    S: number;
    M: number;
    L: number;
  };
}

export type PizzaSize = 'S' | 'M' | 'L';

export interface PizzaSizeOption {
  label: string;
  value: PizzaSize;
}

// Cart Types
export interface CartItem {
  pizza: Pizza;
  size: PizzaSize;
  price: number;
  quantity: number;
}

export type Cart = CartItem[];

// Order Types
export interface Order {
  cart: Cart;
}

export interface PastOrder {
  order_id: string;
  date: string;
  time: string;
}

export interface OrderItem {
  pizzaTypeId: string;
  name: string;
  image: string;
  size: PizzaSize;
  quantity: number;
  price: number;
  total: number;
}

export interface PastOrderDetails {
  orderItems: OrderItem[];
}

// Contact Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// API Types
export interface ApiResponse<T = any> {
  data?: T;
  success?: boolean;
  message?: string;
}

// Hook Types
export interface UsePizzaOfTheDayReturn {
  pizza: Pizza | null;
  loading: boolean;
  error: Error | null;
}

export interface UseOrderReturn {
  pizzaTypes: Pizza[];
  pizzaType: string;
  pizzaSize: PizzaSize;
  cart: Cart;
  loading: boolean;
  price: string;
  selectedPizza: Pizza;
  checkout: () => Promise<void>;
  handlePizzaTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePizzaSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

// Component Props
export interface PizzaProps {
  name: string;
  description: string;
  image?: string;
}

export interface CartProps {
  cart: Cart;
  checkout: () => void;
}

export interface ModalProps {
  children: React.ReactNode;
}

// Context Types
export type CartContextType = [Cart, React.Dispatch<React.SetStateAction<Cart>>];