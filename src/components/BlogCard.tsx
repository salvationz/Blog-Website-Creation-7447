import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { BlogPost } from '../types';
import { useAppDispatch } from '../hooks/redux';
import { toggleBookmark, likePost } from '../store/slices/blogSlice';

const { FiClock, FiUser, FiArrowRight, FiHeart, FiBookmark } = FiIcons;

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  const handleLike = (e: React.MouseEvent): void => {
    e.preventDefault();
    dispatch(likePost(post.id));
  };

  const handleBookmark = (e: React.MouseEvent): void => {
    e.preventDefault();
    dispatch(toggleBookmark(post.id));
  };

  const handleCardClick = (): void => {
    // Scroll to top when navigating to blog post
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleLike}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            aria-label="Like post"
          >
            <SafeIcon
              icon={FiHeart}
              className={`text-sm ${post.likes ? 'text-red-500' : 'text-gray-600'}`}
            />
          </button>
          <button
            onClick={handleBookmark}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            aria-label="Bookmark post"
          >
            <SafeIcon
              icon={FiBookmark}
              className={`text-sm ${post.bookmarked ? 'text-blue-500' : 'text-gray-600'}`}
            />
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
          <Link to={`/post/${post.id}`} onClick={handleCardClick}>
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

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

        <div className="flex items-center justify-between">
          <Link
            to={`/post/${post.id}`}
            onClick={handleCardClick}
            className="inline-flex items-center space-x-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            <span>Read More</span>
            <SafeIcon icon={FiArrowRight} className="text-sm" />
          </Link>
          {post.likes && (
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <SafeIcon icon={FiHeart} className="text-sm" />
              <span>{post.likes}</span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;