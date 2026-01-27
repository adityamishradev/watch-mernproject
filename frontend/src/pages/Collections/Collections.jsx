import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import ProductCard from '../../components/ProductCard';

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('');

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.get('/products');
      
      if (response.data.success) {
        const productsData = response.data.products;
        setProducts(productsData);
        setFilteredProducts(productsData);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(productsData.map(p => p.category))];
        setCategories(uniqueCategories);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#0b1220] min-h-screen text-white px-6 py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading collections...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0b1220] min-h-screen text-white px-6 py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={fetchProducts}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b1220] min-h-screen text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Collections</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our curated collection of premium watches, organized by category and style
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          
          {/* Category Filter */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Filter by:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-[#101a2f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-[#101a2f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Default</option>
              <option value="newest">Newest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredProducts.length} of {products.length} products
            {selectedCategory && ` in "${selectedCategory}"`}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {products.length === 0 
                ? "No products available at the moment" 
                : "No products match your filter criteria"
              }
            </p>
            {selectedCategory && (
              <button 
                onClick={() => setSelectedCategory('')}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Show All Products
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product}
              />
            ))}
          </div>
        )}

        {/* Category Showcase */}
        {categories.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map(category => {
                const categoryProducts = products.filter(p => p.category === category);
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="bg-[#101a2f] p-6 rounded-lg hover:bg-[#1a2642] transition text-center"
                  >
                    <h3 className="font-semibold mb-2">{category}</h3>
                    <p className="text-gray-400 text-sm">
                      {categoryProducts.length} products
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Collections;