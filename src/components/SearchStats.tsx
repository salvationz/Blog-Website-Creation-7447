import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppSelector } from '../hooks/redux';

const { FiSearch, FiFileText, FiUsers, FiTrendingUp } = FiIcons;

const SearchStats: React.FC = () => {
  const { posts, searchQuery } = useAppSelector((state) => state.blog);

  const stats = [
    {
      icon: FiFileText,
      label: 'Total Articles',
      value: `${posts.length}+`,
      color: 'blue'
    },
    {
      icon: FiUsers,
      label: 'Authors',
      value: `${new Set(posts.map(post => post.author)).size}+`,
      color: 'green'
    },
    {
      icon: FiTrendingUp,
      label: 'Categories',
      value: `${new Set(posts.map(post => post.category)).size}+`,
      color: 'purple'
    },
    {
      icon: FiSearch,
      label: 'Searchable',
      value: '100%',
      color: 'orange'
    }
  ];

  if (searchQuery) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Explore Our Content Library
          </h3>
          <p className="text-gray-600">
            Discover thousands of articles across various topics and categories
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${stat.color}-100 mb-4`}>
                <SafeIcon icon={stat.icon} className={`text-2xl text-${stat.color}-600`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SearchStats;