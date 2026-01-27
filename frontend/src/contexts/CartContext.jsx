import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "./AuthContext";
import { getImageUrl } from "../utils/imageUtils";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load cart only for authenticated users
  useEffect(() => {
    let mounted = true;

    async function init() {
      // Only try to load cart if user is authenticated
      if (!user || !user.isAuthenticated) {
        if (mounted) {
          setItems([]);
          setLoading(false);
        }
        return;
      }

      try {
        console.log("Loading cart for authenticated user");
        const res = await API.get("/cart/getcart");
        if (!mounted) return;
        console.log("Loaded cart from backend:", res.data.items);
        setItems(res.data.items || []);
      } catch (err) {
        if (!mounted) return;
        console.log("Failed to load cart:", err.response?.status);
        setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    init();
    return () => (mounted = false);
  }, [user]); // Depend on user state

  // helper to update state (no localStorage for authenticated-only cart)
  const updateState = (nextItems) => {
    setItems(nextItems);
  };

  const addItem = async (product, qty = 1) => {
    const productId = product._id || product.id;
    console.log("=== CART ADD ITEM ===");
    console.log("Product ID:", productId);
    console.log("Product:", product);
    console.log("Quantity:", qty);
    
    // Fix: Extract string URL from imgSrc object using imageUtils
    const imageUrl = getImageUrl(product.imgSrc || product.image);
    console.log("Processed image URL:", imageUrl);
    
    try {
      const response = await API.post("/cart/add", {
        productId,
        title: product.title || product.name,
        price: product.price || product.price,
        qty,
        imgSrc: imageUrl || '', // Send string URL instead of object
      });
      
      console.log("Cart add response:", response.data);
      
      // Refresh from backend after successful add
      const res = await API.get("/cart");
      updateState(res.data.items || []);
      console.log("Cart refreshed successfully");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      throw err; // Re-throw to handle in component
    }
  };

  const increase = async (productId, item) => {
    try {
      await addItem({ _id: productId, title: item.title, price: item.price, imgSrc: item.imgSrc }, 1);
    } catch (err) {
      console.error("Failed to increase quantity:", err);
      throw err;
    }
  };

  const decrease = async (productId) => {
    try {
      await API.patch("/cart/decrease", { productId });
      const res = await API.get("/cart");
      updateState(res.data.items || []);
    } catch (err) {
      console.error("Failed to decrease quantity:", err);
      throw err;
    }
  };

  const remove = async (productId) => {
    try {
      await API.delete(`/cart/remove/${productId}`);
      const res = await API.get("/cart");
      updateState(res.data.items || []);
    } catch (err) {
      console.error("Failed to remove item:", err);
      throw err;
    }
  };

  const clear = async () => {
    try {
      await API.delete("/cart/clear");
      updateState([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
      throw err;
    }
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
