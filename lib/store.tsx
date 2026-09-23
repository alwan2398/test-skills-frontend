"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// 1. Definisi Tipe Data (Sesuai Kebutuhan Soal)
export interface Product {
  id: string;
  name: string;
  image: string;
  type: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  // CRUD Actions
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  // Cart Actions
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  checkout: () => void;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({
  children,
  initialProducts,
}: {
  children: ReactNode;
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);

  // --- LOGIKA CRUD PRODUK ---
  const addProduct = (p: Product) =>
    setProducts([{ ...p, id: Date.now().toString() }, ...products]);
  const updateProduct = (p: Product) =>
    setProducts(products.map((x) => (x.id === p.id ? p : x)));
  const deleteProduct = (id: string) =>
    setProducts(products.filter((x) => x.id !== id));

  // --- LOGIKA CART & CHECKOUT ---
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) =>
    setCart(cart.filter((x) => x.id !== id));

  const checkout = () => {
    if (cart.length === 0) return alert("Cart masih kosong!");
    alert(
      "Checkout Berhasil! Total belanja: Rp " +
        cartTotal.toLocaleString("id-ID"),
    );
    setCart([]); // Kosongkan cart setelah checkout
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        removeFromCart,
        checkout,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// Custom Hook agar mudah dipanggil di komponen
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
