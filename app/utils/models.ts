export interface Product {
  id: number;
  title: string;
  price: number;
  images: Array<string>[];
  category?: string;
}
export interface Category {
  name: string;
  slug?: string;
  url?: string;
}
export interface ProductResponse {
  productsDetails: {
    products: Product[]; // Array of products,
    total: number;
  };
  categoriesList: Category[]; // Array of category names
  currPageCounter: number;
}

// Define for Cart
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartState {
  cart: CartItem[];
}

export type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "CLEAR_CART" };

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  calcSubTotal: () => string;
  calcTotal: () => string;
  getShipping: () => string;
  getNumberProducts: () => number;
}
