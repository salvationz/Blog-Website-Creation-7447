import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiClock, FiUser, FiArrowRight } = FiIcons;

const BlogCard = ({ post }) => {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
          <Link to={`/post/${post.id}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiUser} className="text-sm" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiClock} className="text-sm" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <span>{post.date}</span>
        </div>

        <Link
          to={`/post/${post.id}`}
          className="inline-flex items-center space-x-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
        >
          <span>Read More</span>
          <SafeIcon icon={FiArrowRight} className="text-sm" />
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogCard;