import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { removeNotification } from '../store/slices/uiSlice';

const { FiX, FiCheckCircle, FiAlertCircle, FiInfo } = FiIcons;

const NotificationContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.ui);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return FiCheckCircle;
      case 'error':
        return FiAlertCircle;
      case 'info':
      default:
        return FiInfo;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`p-4 rounded-lg border shadow-lg max-w-sm ${getColors(notification.type)}`}
          >
            <div className="flex items-start space-x-3">
              <SafeIcon 
                icon={getIcon(notification.type)} 
                className="text-lg mt-0.5 flex-shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <button
                onClick={() => dispatch(removeNotification(notification.id))}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
              >
                <SafeIcon icon={FiX} className="text-sm" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;