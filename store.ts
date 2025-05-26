import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./sanity.types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  deleteItem: (productId: string) => void;
  getTotalPrice: () => number;
  getSubtotal: () => number;
  getItemCount: (productId: string) => number;
  getGetCartItems: () => CartItem[];

  // favorite
  favoriteItems: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  getFavoriteItems: () => Product[];
  clearFavorites: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      favoriteItems: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              cart: [...state.cart, { product, quantity: 1 }],
            };
          }
        }),
    }),
    {
      name: "cart-storage",
    }
  )
);
