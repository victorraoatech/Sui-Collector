import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Asset, Collection } from '../types';
import { Button } from '../components/Button';
import { AssetCard } from '../components/AssetCard';
import { useAppContext } from '../contexts/AppContext';
import { useApi } from '../hooks/useApi';
import { assetsApi, collectionsApi } from '../services/api';

const StatCard: React.FC<{ value: number; label: string; suffix?: string }> = ({ value, label, suffix = '' }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,  
    threshold: 0.3,     
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-surface p-8 rounded-2xl border border-secondary text-center"
    >
      <p className="text-4xl font-bold text-primary mb-2">
        {inView ? (
          <CountUp start={0} end={value} duration={2.5} separator="," />
        ) : (
          "0"
        )}
        {suffix}
      </p>
      <p className="text-text-secondary font-medium">{label}</p>
    </motion.div>
  );
};

const CollectionCard: React.FC<{ collection: Collection }> = ({ collection }) => (
  <Link to={`/collection/${collection.id}`}>
    <motion.div 
      whileHover={{ y: -8 }}
      className="rounded-2xl overflow-hidden group cursor-pointer bg-surface border border-secondary hover:border-primary/50 transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={collection.imageUrl} 
          alt={collection.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {collection.verified && (
          <div className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.322 7.322a.75.75 0 00-1.06-1.06L10.5 11.94 8.72 10.16a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l3.872-3.873z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl text-text-primary mb-2">{collection.name}</h3>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">{collection.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-text-secondary">Floor Price</p>
            <p className="font-bold text-primary">{collection.floorPrice || 0} SUI</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-secondary">Items</p>
            <p className="font-bold">{collection.itemCount || 0}</p>
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
);

export const HomePage: React.FC = () => {
  const { isAuthenticated, openWalletModal } = useAppContext();
  
  const { data: trendingAssets, loading: trendingLoading } = useApi(
    () => assetsApi.getTrending(),
    []
  );
  
  const { data: featuredCollections, loading: collectionsLoading } = useApi(
    () => collectionsApi.getFeatured(),
    []
  );

  const handleGetStarted = () => {
    if (isAuthenticated) {
      window.location.href = '/explore';
    } else {
      openWalletModal();
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80')] bg-cover bg-center opacity-5" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
          >
            Discover, Collect, and Trade
            <span className="block text-primary">Extraordinary NFTs</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            The world's first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button onClick={handleGetStarted} className="px-8 py-4 text-lg">
              Get Started
            </Button>
            <Link to="/explore">
              <Button variant="secondary" className="px-8 py-4 text-lg">
                Explore Marketplace
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Join the Digital Revolution
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard value={2500000} label="Total Items" suffix="+" />
            <StatCard value={180000} label="Active Users" suffix="+" />
            <StatCard value={45} label="Total Volume" suffix="M SUI" />
            <StatCard value={12000} label="Collections" suffix="+" />
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-6 bg-surface/30">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Collections</h2>
              <p className="text-text-secondary text-lg">Curated collections from verified creators</p>
            </div>
            <Link to="/collections">
              <Button variant="ghost">View All Collections</Button>
            </Link>
          </div>
          
          {collectionsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-surface rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-secondary" />
                  <div className="p-6">
                    <div className="h-6 bg-secondary rounded mb-2" />
                    <div className="h-4 bg-secondary rounded w-3/4 mb-4" />
                    <div className="flex justify-between">
                      <div className="h-4 bg-secondary rounded w-1/4" />
                      <div className="h-4 bg-secondary rounded w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCollections?.slice(0, 3).map(collection => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trending Assets */}
      <section className="py-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Trending Now</h2>
              <p className="text-text-secondary text-lg">Discover the hottest NFTs in the marketplace</p>
            </div>
            <Link to="/explore">
              <Button variant="ghost">Explore All</Button>
            </Link>
          </div>
          
          {trendingLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-surface rounded-xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-secondary" />
                  <div className="p-4">
                    <div className="h-4 bg-secondary rounded mb-2" />
                    <div className="h-3 bg-secondary rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {trendingAssets?.slice(0, 5).map(asset => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-primary-hover">
        <div className="max-w-screen-xl mx-auto text-center text-white">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Start Your Collection?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
          >
            Join thousands of creators and collectors in the world's premier NFT marketplace
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              onClick={handleGetStarted}
              variant="secondary" 
              className="px-8 py-4 text-lg bg-white text-primary hover:bg-gray-100"
            >
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};