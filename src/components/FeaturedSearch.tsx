import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setSearchQuery, setSelectedCategory } from '../store/slices/blogSlice';

const { FiTrendingUp, FiClock, FiHeart, FiBookmark } = FiIcons;

const FeaturedSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.blog);

  const trendingTopics = [
    { term: 'React', count: posts.filter(p => p.content.toLowerCase().includes('react')).length },
    { term: 'Design', count: posts.filter(p => p.category.toLowerCase() === 'design').length },
    { term: 'JavaScript', count: posts.filter(p => p.content.toLowerCase().includes('javascript')).length },
    { term: 'Remote Work', count: posts.filter(p => p.content.toLowerCase().includes('remote')).length },
  ].filter(topic => topic.count > 0).sort((a, b) => b.count - a.count);

  const recentPosts = posts.slice(0, 3);

  const handleTrendingSearch = (term: string): void => {
    dispatch(setSearchQuery(term));
    dispatch(setSelectedCategory(null));
    // Scroll to blog grid
    const blogSection = document.getElementById('blog-grid');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <SafeIcon icon={FiTrendingUp} className="text-2xl text-orange-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Trending Topics</h3>
            </div>
            
            <div className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <motion.button
                  key={topic.term}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTrendingSearch(topic.term)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-all duration-200"
                >
                  <span className="font-medium text-gray-900">{topic.term}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{topic.count} articles</span>
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Quick Access */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <SafeIcon icon={FiClock} className="text-2xl text-blue-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Recent Articles</h3>
            </div>
            
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => {
                    const blogSection = document.getElementById('blog-grid');
                    if (blogSection) {
                      blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 line-clamp-2 mb-1">
                      {post.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                      {post.likes && (
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiHeart} className="text-xs" />
                          <span>{post.likes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const blogSection = document.getElementById('blog-grid');
                if (blogSection) {
                  blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Articles
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSearch;