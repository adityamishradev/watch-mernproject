import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { getImageUrl, getPlaceholderImage } from '../utils/imageUtils';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const imageUrl = getImageUrl(product.imgSrc);
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { success, error } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isWishlisted = isInWishlist(product._id || product.id);

  const handleAddToCart = async () => {
    console.log("=== ADD TO CART CLICKED ===");
    console.log("User:", user);
    console.log("User authenticated:", user?.isAuthenticated);
    
    // Check if user is logged in
    if (!user || !user.isAuthenticated) {
      console.log("User not authenticated, showing error");
      error('Please login first to add products to cart');
      navigate('/login');
      return;
    }

    console.log("User authenticated, proceeding with add to cart");
    console.log("Product:", product);

    try {
      await addItem(product, 1);
      success(`${product.title} added to cart!`);
    } catch (err) {
      console.error('Error adding to cart:', err);
      error('Failed to add product to cart');
    }
  };

  const handleWishlistToggle = async () => {
    console.log("=== WISHLIST TOGGLE CLICKED ===");
    console.log("User:", user);
    console.log("User authenticated:", user?.isAuthenticated);
    
    // Check if user is logged in
    if (!user || !user.isAuthenticated) {
      console.log("User not authenticated, showing error");
      error('Please login first to add products to wishlist');
      navigate('/login');
      return;
    }

    console.log("User authenticated, proceeding with wishlist toggle");
    console.log("Is wishlisted:", isWishlisted);
    console.log("Product:", product);

    try {
      if (isWishlisted) {
        console.log("Removing from wishlist");
        await removeFromWishlist(product._id || product.id);
        success(`${product.title} removed from wishlist!`);
      } else {
        console.log("Adding to wishlist");
        await addToWishlist(product);
        success(`${product.title} added to wishlist!`);
      }
    } catch (err) {
      console.error('Error updating wishlist:', err);
      if (err.response?.data?.message === "Item already in wishlist") {
        error('Product is already in your wishlist');
      } else {
        error('Failed to update wishlist');
      }
    }
  };

  return (
    <div className="bg-[#111827] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
      {/* Image */}
      <div className="relative h-56 bg-gray-800">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = getPlaceholderImage(300, 224, 'No Image');
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Wishlist Icon */}
        <div className="absolute top-3 right-3">
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full transition-colors ${
              isWishlisted 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            {isWishlisted ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-white">
          {product.title}
        </h2>

        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-blue-400 font-bold text-lg">
            ₹{product.price.toLocaleString()}
          </span>
          
          {product.qty > 0 ? (
            <span className="text-green-400 text-sm">
              In Stock ({product.qty})
            </span>
          ) : (
            <span className="text-red-400 text-sm">
              Out of Stock
            </span>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          disabled={product.qty === 0}
          className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition ${
            product.qty > 0
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {product.qty > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;