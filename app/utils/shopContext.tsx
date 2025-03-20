import React, { createContext, useContext, useReducer } from "react";
import { SHIPPING_COST } from "./constants";
import { CartContextType, CartState, CartAction, CartItem } from "./models";

// Initialize Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Load cart from localStorage
const loadCartFromStorage = (): CartState => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("shoppingCart");
    return storedCart ? { cart: JSON.parse(storedCart) } : { cart: [] };
  }
  return { cart: [] };
};

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id,
      );
      const updatedCart = existingItem
        ? state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...state.cart, { ...action.payload, quantity: 1 }];

      localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }

    case "REMOVE_FROM_CART": {
      const updatedCart = state.cart
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }

    case "CLEAR_CART": {
      localStorage.removeItem("shoppingCart");
      return { cart: [] };
    }

    default:
      return state;
  }
};

// Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    loadCartFromStorage,
  );

  const addToCart = (item: CartItem) =>
    dispatch({ type: "ADD_TO_CART", payload: item });
  const removeFromCart = (id: number) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const getNumberProducts = () => {
    return state.cart.length;
  };

  //needs to be string in order to thansform 20 to 20.00 for example...
  const formatTwoDecimals = (number: number): string => {
    return Math.max(0, number).toFixed(2);
  };

  // Calculate subtotal
  const calcSubTotal = (): string =>
    formatTwoDecimals(
      state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    );

  // Calculate total with shipping cost
  const calcTotal = (): string =>
    formatTwoDecimals(Number(calcSubTotal()) + SHIPPING_COST);

  const getShipping = () => {
    return formatTwoDecimals(SHIPPING_COST);
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        clearCart,
        calcSubTotal,
        calcTotal,
        getShipping,
        getNumberProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

//Hook for using the cart
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
