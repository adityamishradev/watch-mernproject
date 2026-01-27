import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "./AuthContext";
import { getImageUrl } from "../utils/imageUtils";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load wishlist only for authenticated users
  useEffect(() => {
    let mounted = true;

    async function init() {
      // Only try to load wishlist if user is authenticated
      if (!user || !user.isAuthenticated) {
        if (mounted) {
          setItems([]);
          setLoading(false);
        }
        return;
      }

      try {
        console.log("Loading wishlist for authenticated user");
        const res = await API.get("/wishlist");
        if (!mounted) return;
        setItems(res.data.items || []);
      } catch (err) {
        if (!mounted) return;
        console.log("Failed to load wishlist:", err.response?.status);
        setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    init();
    return () => (mounted = false);
  }, [user]); // Depend on user state

  // helper to update state
  const updateState = (nextItems) => {
    setItems(nextItems);
  };

  const addItem = async (product) => {
    const productId = product._id || product.id;
    console.log("=== WISHLIST ADD ITEM ===");
    console.log("Product ID:", productId);
    console.log("Product:", product);
    console.log("User authenticated:", user?.isAuthenticated);
    
    if (!user || !user.isAuthenticated) {
      throw new Error("User not authenticated");
    }
    
    // Fix: Extract string URL from imgSrc object using imageUtils
    const imageUrl = getImageUrl(product.imgSrc || product.image);
    console.log("Processed image URL:", imageUrl);
    
    try {
      const response = await API.post("/wishlist/add", {
        productId,
        title: product.title || product.name,
        price: product.price,
        imgSrc: imageUrl || '', // Send string URL instead of object
        category: product.category,
        description: product.description
      });
      
      console.log("Wishlist add response:", response.data);
      
      // Refresh from backend after successful add
      const res = await API.get("/wishlist");
      updateState(res.data.items || []);
      console.log("Wishlist refreshed successfully");
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      throw err; // Re-throw to handle in component
    }
  };

  const removeItem = async (productId) => {
    try {
      await API.delete(`/wishlist/remove/${productId}`);
      const res = await API.get("/wishlist");
      updateState(res.data.items || []);
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
      throw err;
    }
  };

  const isInWishlist = (productId) => {
    return items.some(item => String(item.productId) === String(productId));
  };

  const clear = async () => {
    try {
      await API.delete("/wishlist/clear");
      updateState([]);
    } catch (err) {
      console.error("Failed to clear wishlist:", err);
      throw err;
    }
  };

  return (
    <WishlistContext.Provider
      value={{ items, loading, addItem, removeItem, isInWishlist, clear }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}

export default WishlistContext;