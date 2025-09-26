import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext';
import { Button } from './Button';
import { LogoIcon, SearchIcon, BellIcon } from './icons/Icons';

export const Header: React.FC = () => {
  const { isAuthenticated, user, openWalletModal } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-lg z-50 border-b border-secondary">
      <div className="max-w-screen-2xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <LogoIcon className="w-8 h-8"/>
            <span className="text-xl font-bold text-text-primary">SuiCollect</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/explore"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/explore') 
                  ? 'bg-primary text-white' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              Explore
            </Link>
            <Link
              to="/collections"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/collections') 
                  ? 'bg-primary text-white' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              Collections
            </Link>
            <Link
              to="/clubs"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/clubs') 
                  ? 'bg-primary text-white' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              Clubs
            </Link>
            {isAuthenticated && (
              <Link
                to="/create"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/create') 
                    ? 'bg-primary text-white' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                Create
              </Link>
            )}
          </nav>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg mx-8 hidden lg:block">
          <form onSubmit={handleSearch} className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search items, collections, and accounts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-secondary rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all"
            />
          </form>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-surface text-text-secondary hover:text-text-primary transition-colors relative"
              >
                <BellIcon className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </motion.button>
              
              <Link to={`/profile/${user.id}`} className="flex items-center gap-3 hover:bg-surface rounded-lg p-2 transition-colors">
                <img 
                  src={user.avatarUrl} 
                  alt={user.displayName} 
                  className="w-8 h-8 rounded-full border-2 border-secondary" 
                />
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-text-primary">{user.displayName}</div>
                  <div className="text-xs text-text-secondary">@{user.username}</div>
                </div>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={openWalletModal} className="hidden sm:block">
                Sign In
              </Button>
              <Button onClick={openWalletModal}>
                Connect Wallet
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden px-6 pb-4">
        <form onSubmit={handleSearch} className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search items, collections, and accounts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-secondary rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          />
        </form>
      </div>
    </header>
  );
};