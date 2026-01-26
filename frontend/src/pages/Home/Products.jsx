import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useCart } from "../../contexts/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await API.get("/products");
        if (mounted) {
          setProducts(res.data.products || []);
        }
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load products");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const [addingIds, setAddingIds] = useState([]);
  const { addItem } = useCart();

  const handleAddToCart = async (product) => {
    const id = product._id || product.id;
    try {
      setAddingIds((s) => [...s, id]);
      await addItem(product, 1);
      alert("Added to cart");
    } catch (err) {
      alert(err?.message || "Failed to add to cart");
    } finally {
      setAddingIds((s) => s.filter((i) => i !== id));
    }
  };

  return (
    <div className="bg-black min-h-screen text-white px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Watch Collection
      </h1>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id || product.id}
              className="bg-[#111827] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
            >
              <img
                src={product.imgSrc}
                alt={product.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>

                <p className="text-gray-400 text-sm mb-3">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-blue-400 font-bold">₹{String(product.price).replace(/\B(?=(\d{3})+(?!\d))/g,",")}</span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={addingIds.includes(product._id || product.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg disabled:opacity-50"
                  >
                    {addingIds.includes(product._id || product.id) ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
