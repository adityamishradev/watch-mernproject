import { useState } from "react";
import API from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";

const AddProduct = ({ setProducts, setActive, fetchProducts }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    qty: 1,
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!form.title || !form.description || !form.price || !form.category) {
      alert('Please fill all required fields');
      return;
    }

    if (!form.image) {
      alert('Please select an image');
      return;
    }

    try {
      setLoading(true);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', Number(form.price));
      formData.append('category', form.category);
      formData.append('qty', Number(form.qty));
      formData.append('image', form.image); // File upload

      const res = await API.post("/products/addproduct", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (res.data.success) {
        alert('Product added successfully!');
        
        // Reset form
        setForm({
          title: "",
          description: "",
          price: "",
          category: "",
          qty: 1,
          image: null,
        });
        
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
        
        // Refresh products list
        fetchProducts();
        
        // Switch to products view
        setActive("products");
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert(err.response?.data?.message || err.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow max-w-md">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setActive('products')}
          className="text-gray-400 hover:text-white"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-bold text-white">Add Product</h2>
      </div>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Title *"
          className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mb-3"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Description *"
          className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mb-3"
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price *"
          className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mb-3"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Category *"
          className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mb-3"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Quantity"
          className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mb-3"
          value={form.qty}
          onChange={(e) => setForm({ ...form, qty: e.target.value })}
          min="1"
        />

        <input
          type="file"
          accept="image/*"
          className="w-full mb-3 text-gray-300"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          required
        />

        {form.image && (
          <div className="mb-3">
            <p className="text-sm text-gray-300">Selected: {form.image.name}</p>
          </div>
        )}

        <div className="flex gap-2">
          <button 
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
          
          <button 
            type="button"
            onClick={() => setActive('products')}
            disabled={loading}
            className="px-4 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
