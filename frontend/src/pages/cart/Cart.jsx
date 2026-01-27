import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { getImageUrl, getPlaceholderImage } from "../../utils/imageUtils";

const Cart = () => {
  const { items, loading, increase, decrease, remove } = useCart();
  const { user } = useAuth();

  const totalPrice = items.reduce((total, item) => total + item.price * item.qty, 0);

  if (loading) return <p className="p-6 text-center text-white">Loading cart...</p>;

  // Show login message if user is not authenticated
  if (!user || !user.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-white">🛒 Your Cart</h2>
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg mb-4">Please login to view your cart</p>
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

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-white">🛒 Your Cart</h2>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg mb-4">Your cart is empty</p>
            <a href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
              Continue Shopping
            </a>
          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="space-y-6">
              {items.map((item) => {
                const imageUrl = getImageUrl(item.imgSrc);
                return (
                  <div key={item.productId} className="flex items-center gap-6 border-b border-gray-700 pb-4">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={item.title} 
                        className="w-24 h-24 object-cover rounded"
                        onError={(e) => {
                          e.target.src = getPlaceholderImage(96, 96, 'No Image');
                        }}
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-600 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-gray-300">₹{item.price.toLocaleString()}</p>

                      <div className="flex items-center gap-3 mt-3">
                        <button 
                          onClick={() => decrease(item.productId)} 
                          className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded"
                        >
                          <FaMinus />
                        </button>

                        <span className="font-medium text-white px-3">{item.qty}</span>

                        <button 
                          onClick={() => increase(item.productId, item)} 
                          className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-white font-semibold">
                        ₹{(item.price * item.qty).toLocaleString()}
                      </p>
                      <button 
                        onClick={() => remove(item.productId)} 
                        className="text-red-400 hover:text-red-300 mt-2"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-between items-center border-t border-gray-700 pt-6">
              <h3 className="text-xl font-semibold text-white">
                Total: ₹{totalPrice.toLocaleString()}
              </h3>

              <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
