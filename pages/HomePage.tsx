import React from 'react';
import { useInView } from "react-intersection-observer";
import { Asset, Collection } from '../types';
import { MOCK_COLLECTIONS, MOCK_TRENDING_ASSETS } from '../constants';
import { Button } from '../components/Button';
import { useAppContext } from '../contexts/AppContext';
import { Page } from '../types';
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import image from "../asset/hero-bg.jpg";
const StatCard: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,  
    threshold: 0.3,     
  });

  return (
    <div ref={ref} className="bg-gray-800 p-6 rounded-lg">
      <p className="text-3xl font-bold text-text-primary">
        {inView ? (
          <CountUp start={0} end={value} duration={2} separator="," />
        ) : (
          "0"
        )}
      </p>
      <p className="text-text-secondary mt-1">{label}</p>
    </div>
  );
};

const CollectionCard: React.FC<{ collection: Collection }> = ({ collection }) => (
    <div className="rounded-xl overflow-hidden group cursor-pointer">
        <div className="aspect-[4/3] overflow-hidden">
            <img src={collection.imageUrl} alt={collection.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        </div>
        <div className="p-4 bg-surface">
            <h3 className="font-semibold text-text-primary">{collection.name}</h3>
            <p className="text-sm text-text-secondary mt-1">{collection.description}</p>
        </div>
    </div>
);

const TrendingAssetCard: React.FC<{ asset: Asset }> = ({ asset }) => (
    <div className="rounded-xl overflow-hidden group cursor-pointer">
        <div className="aspect-square overflow-hidden">
            <img src={asset.imageUrl} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        </div>
        <div className="p-3 bg-surface">
            <h4 className="font-semibold text-sm text-text-primary truncate">{asset.name}</h4>
            <p className="text-xs text-text-secondary truncate">{asset.category === 'Art' ? 'Digital art piece' : 'Collectible Item'}</p>
        </div>
    </div>
);

export const HomePage: React.FC = () => {
    const { setCurrentPage, openWalletModal, isAuthenticated } = useAppContext();

    const handleExplore = () => {
        if(isAuthenticated) {
            setCurrentPage(Page.Marketplace)
        } else {
            openWalletModal();
        }
    }

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center text-center text-white px-4">
                <div className="absolute inset-0 bg-background/60 dark:bg-background/60"></div>
                <img src={image} alt="Background" className="absolute inset-0 w-full h-full object-fill -z-10"/>
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">Mint, Trade, Track Digital Assets on Sui</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
                        Discover, collect, and trade unique digital assets on the Sui blockchain. Join a vibrant community of creators and collectors.
                    </p>
                    <Button onClick={handleExplore} className="mt-8 px-8 py-3 text-lg">Explore Assets</Button>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="max-w-screen-xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Quick Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard value={1200000} label="Total Assets" />
<StatCard value={500000} label="Active Users" />
<StatCard value={2500000} label="Transactions" />
                </div>
            </section>

            {/* Featured Collections */}
            <section className="max-w-screen-xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-bold mb-8">Featured Collections</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {MOCK_COLLECTIONS.map(collection => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))}
                </div>
            </section>
            
            {/* Trending Assets */}
            <section className="max-w-screen-xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-bold mb-8">Trending Assets</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                    {MOCK_TRENDING_ASSETS.map(asset => (
                        <TrendingAssetCard key={asset.id} asset={asset} />
                    ))}
                </div>
            </section>
        </div>
    );
};
