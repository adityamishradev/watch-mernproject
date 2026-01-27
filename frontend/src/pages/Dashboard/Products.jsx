import API from "../../services/api";
import { getImageUrl, getPlaceholderImage } from "../../utils/imageUtils";
import { FaPlus } from "react-icons/fa";

const Products = ({ products, setProducts, fetchProducts, loading, setActive }) => {
  const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await API.delete(`/products/deleteproduct/${id}`);
      if (res.data.success) {
        setProducts(products.filter((p) => p._id !== id));
        alert('Product deleted successfully');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete product');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Products</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setActive('add')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
          >
            <FaPlus />
            Add Product
          </button>
          <button 
            onClick={fetchProducts}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-300">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-300">No products available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3 text-gray-300">Image</th>
                <th className="text-left p-3 text-gray-300">Name</th>
                <th className="text-left p-3 text-gray-300">Category</th>
                <th className="text-left p-3 text-gray-300">Price</th>
                <th className="text-left p-3 text-gray-300">Quantity</th>
                <th className="text-center p-3 text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-3">
                    {(() => {
                      const imageUrl = getImageUrl(product.imgSrc);
                      
                      return imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.title}
                          className="w-14 h-14 object-cover rounded"
                          onError={(e) => {
                            e.target.src = getPlaceholderImage(56, 56, 'Error');
                          }}
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gray-600 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-400">No Image</span>
                        </div>
                      );
                    })()}
                  </td>
                  <td className="p-3 text-white">{product.title}</td>
                  <td className="p-3 text-gray-300">{product.category}</td>
                  <td className="p-3 text-white">₹{product.price}</td>
                  <td className="p-3 text-gray-300">{product.qty}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
