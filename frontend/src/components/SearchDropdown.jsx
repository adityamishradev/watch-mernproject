import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { getImageUrl, getPlaceholderImage } from '../utils/imageUtils';

const SearchDropdown = ({ query, onClose }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const searchSuggestions = async () => {
      if (!query.trim() || query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        setLoading(true);
        const response = await API.get(`/products/search?q=${encodeURIComponent(query)}`);
        
        if (response.data.success) {
          // Limit to 5 suggestions
          setSuggestions(response.data.products.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSuggestionClick = (product) => {
    navigate(`/search?q=${encodeURIComponent(product.title)}`);
    onClose();
  };

  const handleViewAllResults = () => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    onClose();
  };

  if (!query.trim() || query.length < 2) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
    >
      {loading ? (
        <div className="p-4 text-center text-gray-500">
          Searching...
        </div>
      ) : suggestions.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No products found for "{query}"
        </div>
      ) : (
        <>
          <div className="p-2">
            {suggestions.map((product) => {
              const imageUrl = getImageUrl(product.imgSrc);
              return (
                <button
                  key={product._id}
                  onClick={() => handleSuggestionClick(product)}
                  className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded text-left"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className="w-10 h-10 object-cover rounded"
                      onError={(e) => {
                        e.target.src = getPlaceholderImage(40, 40, 'No Image');
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-400">No Image</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {product.category} • ₹{product.price.toLocaleString()}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          
          {suggestions.length > 0 && (
            <div className="border-t border-gray-200 p-2">
              <button
                onClick={handleViewAllResults}
                className="w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-2"
              >
                View all results for "{query}"
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchDropdown;