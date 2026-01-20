import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX, FiFilter } from 'react-icons/fi';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * SearchBar component - Product search with suggestions
 */
const SearchBar = ({ placeholder = 'Search products...', className = '' }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Mock search suggestions
  const mockSuggestions = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics' },
    { id: 2, name: 'Smart Watch', category: 'Electronics' },
    { id: 3, name: 'Running Shoes', category: 'Sports' },
    { id: 4, name: 'Laptop Stand', category: 'Electronics' },
    { id: 5, name: 'USB Cable', category: 'Electronics' },
    { id: 6, name: 'Book Set', category: 'Books' },
    { id: 7, name: 'Coffee Maker', category: 'Home' },
    { id: 8, name: 'Yoga Mat', category: 'Sports' }
  ];

  useEffect(() => {
    const initialQuery = searchParams.get('search') || '';
    setQuery(initialQuery);
  }, [searchParams]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = mockSuggestions.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (query.trim()) {
      setShowSuggestions(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    navigate(`/products?search=${encodeURIComponent(suggestion.name)}`);
    setShowSuggestions(false);
    setIsFocused(false);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    searchRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setIsFocused(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`
              block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg
              text-gray-900 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              focus:placeholder-gray-400
              transition-colors duration-200
            `}
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          title="Advanced search"
        >
          <FiFilter className="h-5 w-5" />
        </button>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="py-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion.id}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                    <FiSearch className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {suggestion.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      in {suggestion.category}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-400 group-hover:text-gray-600">
                  Press Enter
                </div>
              </button>
            ))}
          </div>
          
          {suggestions.length === 0 && query.trim() && (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              No products found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
