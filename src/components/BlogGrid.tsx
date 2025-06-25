import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchPosts, setSearchQuery, setSelectedCategory } from '../store/slices/blogSlice';

const BlogGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error, searchQuery, selectedCategory, categories } = useAppSelector(
    (state) => state.blog
  );

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === null ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const clearFilters = (): void => {
    dispatch(setSearchQuery(''));
    dispatch(setSelectedCategory(null));
  };

  const handleCategoryFilter = (categorySlug: string): void => {
    dispatch(setSelectedCategory(categorySlug));
    dispatch(setSearchQuery(''));
  };

  if (loading) {
    return (
      <section id="blog-grid" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog-grid" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error: {error}</p>
            <button
              onClick={() => dispatch(fetchPosts())}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog-grid" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {searchQuery || selectedCategory ? 'Search Results' : 'Latest Stories'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {searchQuery || selectedCategory
              ? `${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} found`
              : 'Discover our latest articles covering technology, design, lifestyle, and more'}
          </p>
        </motion.div>

        {/* Category Quick Filters */}
        {!searchQuery && !selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Browse by Category</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryFilter(category.slug)}
                    className={`px-6 py-3 rounded-full font-medium transition-colors border-2
                      border-${category.color}-200 text-${category.color}-600 
                      hover:bg-${category.color}-50 hover:border-${category.color}-300`}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Filters Display */}
        {(searchQuery || selectedCategory) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-wrap gap-2 justify-center"
          >
            {searchQuery && (
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200">
                <span className="mr-2">🔍</span>
                Search: "{searchQuery}"
                <button
                  onClick={() => dispatch(setSearchQuery(''))}
                  className="ml-2 hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-green-100 text-green-800 border border-green-200">
                <span className="mr-2">📂</span>
                Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                <button
                  onClick={() => dispatch(setSelectedCategory(null))}
                  className="ml-2 hover:text-green-900"
                >
                  ×
                </button>
              </span>
            )}
            {(searchQuery || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </motion.div>
        )}

        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No articles found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? `No articles match "${searchQuery}". Try different keywords or browse by category.`
                  : "No articles found in this category. Try exploring other categories."
                }
              </p>
              <div className="space-y-3">
                {searchQuery && (
                  <button
                    onClick={() => dispatch(setSearchQuery(''))}
                    className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Clear Search
                  </button>
                )}
                <button
                  onClick={clearFilters}
                  className="block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Browse All Articles
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>

            {filteredPosts.length >= 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center mt-12"
              >
                <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Load More Articles
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;