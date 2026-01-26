import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const CartContext = createContext();

const LOCAL_KEY = "guest_cart";

function saveLocal(items) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  } catch (e) {}
}

function loadLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Try load from backend; if fails (not authenticated), fallback to localStorage
  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const res = await API.get("/cart/getcart");
        if (!mounted) return;
        setItems(res.data.items || []);
      } catch (err) {
        if (!mounted) return;
        setItems(loadLocal());
      } finally {
        if (mounted) setLoading(false);
      }
    }

    init();
    return () => (mounted = false);
  }, []);

  // helper to update state and local storage
  const updateLocal = (nextItems) => {
    setItems(nextItems);
    saveLocal(nextItems);
  };

  const addItem = async (product, qty = 1) => {
    const productId = product._id || product.id;
    // optimistic local update
    const existing = items.find((i) => String(i.productId) === String(productId));
    let next;
    if (existing) {
      next = items.map((i) =>
        String(i.productId) === String(productId) ? { ...i, qty: i.qty + qty } : i
      );
    } else {
      const newItem = {
        productId,
        title: product.title || product.name,
        price: product.price || product.price,
        qty,
        imgSrc: product.imgSrc || product.image,
      };
      next = [...items, newItem];
    }

    updateLocal(next);

    try {
      await API.post("/cart/add", {
        productId,
        title: product.title || product.name,
        price: product.price || product.price,
        qty,
        imgSrc: product.imgSrc || product.image,
      });
      // refresh from backend to keep canonical
      const res = await API.get("/cart");
      updateLocal(res.data.items || []);
    } catch (err) {
      // silent: keep local guest cart if backend failed
    }
  };

  const increase = async (productId, item) => {
    // reuse addItem for increment
    await addItem({ _id: productId, title: item.title, price: item.price, imgSrc: item.imgSrc }, 1);
  };

  const decrease = async (productId) => {
    // optimistic update
    const next = items
      .map((i) => (String(i.productId) === String(productId) ? { ...i, qty: i.qty - 1 } : i))
      .filter((i) => i.qty > 0);
    updateLocal(next);

    try {
      await API.patch("/cart/decrease", { productId });
      const res = await API.get("/cart");
      updateLocal(res.data.items || []);
    } catch (err) {
      // if backend fails, keep local state
    }
  };

  const remove = async (productId) => {
    const next = items.filter((i) => String(i.productId) !== String(productId));
    updateLocal(next);

    try {
      await API.delete(`/cart/remove/${productId}`);
      const res = await API.get("/cart");
      updateLocal(res.data.items || []);
    } catch (err) {
      // ignore
    }
  };

  const clear = async () => {
    updateLocal([]);
    try {
      await API.delete("/cart/clear");
    } catch (err) {}
  };

  return (
    <CartContext.Provider
      value={{ items, loading, addItem, increase, decrease, remove, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartContext;
