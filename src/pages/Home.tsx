import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FeaturedSearch from '../components/FeaturedSearch';
import BlogGrid from '../components/BlogGrid';
import SearchStats from '../components/SearchStats';
import Newsletter from '../components/Newsletter';

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Hero />
      <FeaturedSearch />
      <SearchStats />
      <BlogGrid />
      <Newsletter />
    </motion.div>
  );
};

export default Home;