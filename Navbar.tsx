import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Menu,
  X,
  Sun,
  Moon,
  LogIn
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-navy/90 backdrop-blur-lg border-b border-gray-200 dark:border-navy-light/20">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/"
            className="flex items-center space-x-2 group"
          >
            <Shield className="w-8 h-8 text-green-500 dark:text-green-400 transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
              Spam Detection
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-2 py-1 hover:text-green-500 dark:hover:text-green-400 transition-colors ${
                    location.pathname === item.path ? 'text-green-500 dark:text-green-400' : ''
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 dark:bg-green-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-light transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>

              {user ? (
                <div className="flex items-center space-x-2">
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full ring-2 ring-green-500 dark:ring-green-400"
                  />
                  <span className="font-medium">{user.email?.split('@')[0]}</span>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center space-x-2 bg-green-500 dark:bg-green-400 text-white dark:text-navy px-4 py-2 rounded-lg hover:bg-green-400 dark:hover:bg-green-300 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden py-4"
            >
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`hover:text-green-500 dark:hover:text-green-400 transition-colors ${
                      location.pathname === item.path ? 'text-green-500 dark:text-green-400' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {!user && (
                  <Link
                    to="/auth"
                    className="flex items-center justify-center space-x-2 bg-green-500 dark:bg-green-400 text-white dark:text-navy px-4 py-2 rounded-lg hover:bg-green-400 dark:hover:bg-green-300 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Navbar;