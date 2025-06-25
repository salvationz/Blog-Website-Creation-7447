import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppDispatch } from '../hooks/redux';
import { setSearchQuery, setSelectedCategory } from '../store/slices/blogSlice';

const { FiArrowRight, FiTrendingUp, FiSearch } = FiIcons;

const Hero: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState<string>('');

  const popularSearches = [
    'React',
    'Web Development', 
    'Design',
    'JavaScript',
    'UI/UX',
    'Remote Work'
  ];

  const handleSearchSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(setSearchQuery(searchInput.trim()));
      dispatch(setSelectedCategory(null));
      // Scroll to blog grid section
      const blogSection = document.getElementById('blog-grid');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePopularSearch = (term: string): void => {
    dispatch(setSearchQuery(term));
    dispatch(setSelectedCategory(null));
    setSearchInput(term);
    // Scroll to blog grid section
    const blogSection = document.getElementById('blog-grid');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToBlogGrid = (): void => {
    const blogSection = document.getElementById('blog-grid');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Share Your{' '}
              <span className="text-blue-600 block">Stories</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover amazing stories, connect with fellow writers, and share your thoughts with a community that values authentic storytelling and meaningful conversations.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <SafeIcon
                    icon={FiSearch}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                  />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search articles, topics, authors..."
                    className="w-full pl-12 pr-32 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <span className="hidden sm:inline">Search</span>
                    <SafeIcon icon={FiSearch} className="text-lg" />
                  </motion.button>
                </div>
              </form>

              {/* Popular Searches */}
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term, index) => (
                    <motion.button
                      key={term}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePopularSearch(term)}
                      className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                    >
                      {term}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToBlogGrid}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <span>Start Reading</span>
                <SafeIcon icon={FiArrowRight} className="text-lg" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToBlogGrid}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Explore Categories
              </motion.button>
            </div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 mb-4">
                <SafeIcon icon={FiTrendingUp} className="text-white text-4xl mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">Trending Stories</h3>
                <p className="text-blue-100">Discover what's popular in our community</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>

            {/* Floating Search Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <SafeIcon icon={FiSearch} className="text-green-600 text-lg" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">1,200+ Articles</p>
                  <p className="text-xs text-gray-500">Ready to discover</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;