import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import ProductCard from '../../components/ProductCard';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search products
  const searchProducts = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await API.get(`/products/search?q=${encodeURIComponent(searchQuery)}`);
      
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        setError('Failed to search products');
      }
    } catch (err) {
      console.error('Error searching products:', err);
      setError('Failed to search products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchProducts(query);
  }, [query]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white px-6 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Searching products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen text-white px-6 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white px-6 py-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        
        {query && (
          <div className="mb-6">
            <p className="text-gray-400">
              Search results for: <span className="text-white font-semibold">"{query}"</span>
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Found {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Search Again */}
        <div className="mb-8">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newQuery = formData.get('search');
              if (newQuery.trim()) {
                navigate(`/search?q=${encodeURIComponent(newQuery)}`);
              }
            }}
            className="flex gap-2 max-w-md"
          >
            <input
              name="search"
              type="text"
              placeholder="Search products..."
              defaultValue={query}
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto">
        {!query ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Enter a search term to find products</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">
              No products found for "{query}"
            </p>
            <p className="text-gray-500 mb-6">
              Try searching with different keywords or browse our collections
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Browse All Products
              </button>
              <button 
                onClick={() => navigate('/collections')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
              >
                View Collections
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;