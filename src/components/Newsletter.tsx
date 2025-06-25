import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { subscribeToNewsletter, clearMessage } from '../store/slices/newsletterSlice';

const { FiMail, FiSend } = FiIcons;

const Newsletter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { subscription, loading, error, message } = useAppSelector((state) => state.newsletter);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (email) {
      dispatch(subscribeToNewsletter(email));
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SafeIcon icon={FiMail} className="text-5xl text-blue-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest articles and insights delivered straight to your inbox. 
            Join thousands of readers who never miss a story.
          </p>

          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-600 text-white px-8 py-4 rounded-lg inline-flex items-center space-x-2 mb-6"
            >
              <span>{message}</span>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-600 text-white px-8 py-4 rounded-lg inline-flex items-center space-x-2 mb-6"
            >
              <span>{error}</span>
            </motion.div>
          )}

          {!subscription.subscribed && (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={loading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <SafeIcon icon={FiSend} className="text-lg" />
                      <span className="hidden sm:inline">Subscribe</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}

          <p className="text-gray-400 text-sm mt-4">
            No spam, unsubscribe at any time
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;