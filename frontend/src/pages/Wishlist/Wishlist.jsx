import React from 'react';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Link } from 'react-router-dom';
import { getImageUrl, getPlaceholderImage } from '../../utils/imageUtils';

const Wishlist = () => {
  const { items, loading, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { user } = useAuth();
  const { success, error } = useToast();

  if (loading) return <p className="p-6 text-center text-white">Loading wishlist...</p>;

  // Show login message if user is not authenticated
  if (!user || !user.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-white">❤️ Your Wishlist</h2>
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg mb-4">Please login to view your wishlist</p>
            <Link 
              to="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-block"
            >
              Login Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleRemoveFromWishlist = async (productId, title) => {
    try {
      await removeItem(productId);
      success(`${title} removed from wishlist!`);
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      error('Failed to remove from wishlist');
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product, 1);
      success(`${product.title} added to cart!`);
    } catch (err) {
      console.error('Error adding to cart:', err);
      error('Failed to add to cart');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-white">❤️ Your Wishlist</h2>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg mb-4">Your wishlist is empty</p>
            <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              const imageUrl = getImageUrl(item.imgSrc);
              return (
                <div key={item.productId} className="bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                  {/* Image */}
                  <div className="relative h-48 bg-gray-600">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = getPlaceholderImage(300, 192, 'No Image');
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-white line-clamp-2">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-blue-400 font-bold text-lg">
                        ₹{item.price.toLocaleString()}
                      </span>
                      
                      {item.category && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                      >
                        <FaShoppingCart />
                        Add to Cart
                      </button>
                      
                      <button
                        onClick={() => handleRemoveFromWishlist(item.productId, item.title)}
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;