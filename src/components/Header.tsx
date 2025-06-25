import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SearchBar from './SearchBar';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleMobileMenu, closeMobileMenu } from '../store/slices/uiSlice';

const { FiMenu, FiX, FiPenTool } = FiIcons;

interface NavItem {
  name: string;
  path: string;
}

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isMobileMenuOpen } = useAppSelector((state) => state.ui);
  const location = useLocation();

  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string): boolean => location.pathname === path;

  const handleMobileMenuToggle = (): void => {
    dispatch(toggleMobileMenu());
  };

  const handleNavClick = (): void => {
    dispatch(closeMobileMenu());
    // Scroll to top when navigating
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLogoClick = (): void => {
    dispatch(closeMobileMenu());
    // Scroll to top when clicking logo
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center space-x-2"
          >
            <SafeIcon icon={FiPenTool} className="text-2xl text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ModernBlog</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={handleNavClick}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <SafeIcon
                  icon={isMobileMenuOpen ? FiX : FiMenu}
                  className="text-2xl"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            {/* Mobile Search */}
            <div className="mb-4">
              <SearchBar />
            </div>

            {/* Mobile Navigation Links */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={handleNavClick}
                className={`block py-2 text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;