import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setSearchQuery, setSelectedCategory } from '../store/slices/blogSlice';
import { toggleSearch, closeSearch } from '../store/slices/uiSlice';

const { FiSearch, FiX, FiFilter } = FiIcons;

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, categories } = useAppSelector((state) => state.blog);
  const { isSearchOpen } = useAppSelector((state) => state.ui);
  const [localQuery, setLocalQuery] = useState<string>(searchQuery);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(setSearchQuery(localQuery));
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localQuery, dispatch]);

  const handleSearchToggle = (): void => {
    dispatch(toggleSearch());
    if (!isSearchOpen) {
      setLocalQuery('');
      dispatch(setSearchQuery(''));
    }
  };

  const handleCategorySelect = (categorySlug: string | null): void => {
    dispatch(setSelectedCategory(categorySlug));
    setShowFilters(false);
  };

  const handleSearchSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(setSearchQuery(localQuery));
    dispatch(closeSearch());
  };

  const clearSearch = (): void => {
    setLocalQuery('');
    dispatch(setSearchQuery(''));
    dispatch(setSelectedCategory(null));
  };

  return (
    <div className="relative">
      {/* Search Toggle Button */}
      <button
        onClick={handleSearchToggle}
        className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
        aria-label="Toggle search"
      >
        <SafeIcon icon={isSearchOpen ? FiX : FiSearch} className="text-xl" />
      </button>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => dispatch(closeSearch())}
          />
        )}
      </AnimatePresence>

      {/* Search Panel */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 bg-white shadow-lg border-b z-50"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <div className="relative">
                  <SafeIcon
                    icon={FiSearch}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-12 pr-12 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {localQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <SafeIcon icon={FiX} className="text-xl" />
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <SafeIcon icon={FiFilter} />
                    <span>Filters</span>
                  </button>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* Category Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t pt-4"
                    >
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleCategorySelect(null)}
                          className="px-3 py-1 text-sm rounded-full border transition-colors hover:bg-gray-50"
                        >
                          All Categories
                        </button>
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => handleCategorySelect(category.slug)}
                            className="px-3 py-1 text-sm rounded-full border transition-colors hover:bg-gray-50"
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;