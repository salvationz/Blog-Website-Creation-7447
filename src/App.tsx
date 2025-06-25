import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { motion } from 'framer-motion';
import { store } from './store';
import Header from './components/Header';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import NotificationContainer from './components/NotificationContainer';
import ScrollToTop from './components/ScrollToTop';
import useScrollToTop from './hooks/useScrollToTop';

const AppContent: React.FC = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.main>
      <Footer />
      <NotificationContainer />
      <ScrollToTop />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;