import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiGithub, FiTwitter, FiLinkedin, FiMail, FiHeart } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">ModernBlog</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              A modern platform for sharing thoughts, ideas, and stories. 
              Join our community of writers and readers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <SafeIcon icon={FiTwitter} className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <SafeIcon icon={FiGithub} className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <SafeIcon icon={FiLinkedin} className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <SafeIcon icon={FiMail} className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Technology</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Design</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Lifestyle</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Travel</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 ModernBlog. All rights reserved.
          </p>
          <p className="text-gray-300 text-sm flex items-center mt-4 md:mt-0">
            Made with <SafeIcon icon={FiHeart} className="text-red-500 mx-1" /> by ModernBlog Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;