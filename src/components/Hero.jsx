import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowRight, FiTrendingUp } = FiIcons;

const Hero = () => {
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
              Share Your
              <span className="text-blue-600 block">Stories</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover amazing stories, connect with fellow writers, and share your thoughts 
              with a community that values authentic storytelling and meaningful conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <span>Start Reading</span>
                <SafeIcon icon={FiArrowRight} className="text-lg" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;