import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";

const Cart = () => {
  const { items, loading, increase, decrease, remove } = useCart();

  const totalPrice = items.reduce((total, item) => total + item.price * item.qty, 0);

  if (loading) return <p className="p-6 text-center">Loading cart...</p>;

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-gray-900 shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">🛒 Your Cart</h2>

        {items.length === 0 ? (
          <p className="text-gray-100">Your cart is empty</p>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center gap-6 border-b pb-4">
                  <img src={item.imgSrc} alt={item.title} className="w-24 h-24 object-cover rounded" />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600">₹{item.price}</p>

                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => decrease(item.productId)} className="p-2 bg-gray-200 rounded">
                        <FaMinus />
                      </button>

                      <span className="font-medium">{item.qty}</span>

                      <button onClick={() => increase(item.productId, item)} className="p-2 bg-gray-200 rounded">
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  <button onClick={() => remove(item.productId)} className="text-white hover:text-pink-700">
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Total: ₹{totalPrice}</h3>

              <button className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
