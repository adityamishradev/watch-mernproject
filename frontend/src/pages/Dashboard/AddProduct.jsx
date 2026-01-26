import { useState } from "react";
import API from "../../services/api";

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

    try {
      setLoading(true);
      
      // Convert image file to object URL for preview/storage
      const imgSrc = form.image ? URL.createObjectURL(form.image) : "";

      const payload = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        qty: Number(form.qty),
        imgSrc: imgSrc,
      };

      const res = await API.post("/products/addproduct", payload);
      
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
        
        // Refresh products list
        fetchProducts();
        
        // Switch to products view
        setActive("products");
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow max-w-md">
      <h2 className="text-xl font-bold mb-4 text-white">Add Product</h2>

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
        />

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-700 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
