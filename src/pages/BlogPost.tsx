import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchPostById, likePost, toggleBookmark } from '../store/slices/blogSlice';
import { addNotification } from '../store/slices/uiSlice';

const { FiArrowLeft, FiClock, FiUser, FiCalendar, FiShare2, FiHeart, FiBookmark } = FiIcons;

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { posts, currentPost, loading, error } = useAppSelector((state) => state.blog);

  const postId = parseInt(id || '0', 10);
  const post = currentPost || posts.find(p => p.id === postId);

  useEffect(() => {
    if (id && !post) {
      dispatch(fetchPostById(postId));
    }
  }, [dispatch, id, post, postId]);

  const handleLike = (): void => {
    if (post) {
      dispatch(likePost(post.id));
      dispatch(addNotification({
        type: 'success',
        message: 'Post liked!'
      }));
    }
  };

  const handleBookmark = (): void => {
    if (post) {
      dispatch(toggleBookmark(post.id));
      dispatch(addNotification({
        type: 'success',
        message: post.bookmarked ? 'Bookmark removed' : 'Post bookmarked!'
      }));
    }
  };

  const handleShare = (): void => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      dispatch(addNotification({
        type: 'success',
        message: 'Link copied to clipboard!'
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {error || 'Post Not Found'}
          </h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = posts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <SafeIcon icon={FiArrowLeft} />
            <span>Back to Articles</span>
          </Link>

          <div className="mb-6">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiUser} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiCalendar} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiClock} />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <SafeIcon icon={FiHeart} />
              <span>{post.likes || 0}</span>
            </button>
            <button 
              onClick={handleBookmark}
              className={`flex items-center space-x-2 transition-colors ${
                post.bookmarked ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <SafeIcon icon={FiBookmark} />
              <span>Save</span>
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <SafeIcon icon={FiShare2} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 lg:h-[500px] object-cover rounded-xl shadow-2xl"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Author Bio */}
        <div className="mt-16 p-8 bg-gray-50 rounded-xl">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiUser} className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">About {post.author}</h3>
              <p className="text-gray-600 mb-4">
                A passionate writer and developer sharing insights about technology, design, and the future of digital experiences.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-700">Follow</a>
                <a href="#" className="text-blue-600 hover:text-blue-700">More Articles</a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/post/${relatedPost.id}`}
                  className="group block"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {relatedPost.excerpt.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default BlogPost;