import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AssetCard } from '../components/AssetCard';
import { BackButton } from '../components/BackButton';
import { SearchFilters, Asset } from '../types';
import { useApi } from '../hooks/useApi';
import { assetsApi } from '../services/api';

const FilterButton: React.FC<{ 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      active 
        ? 'bg-primary text-white' 
        : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-secondary'
    }`}
  >
    {children}
  </button>
);

const PriceRangeFilter: React.FC<{
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}> = ({ min, max, onChange }) => {
  const [localMin, setLocalMin] = useState(min);
  const [localMax, setLocalMax] = useState(max);

  const handleApply = () => {
    onChange(localMin, localMax);
  };

  return (
    <div className="bg-surface p-4 rounded-lg border border-secondary">
      <h3 className="font-semibold mb-3">Price Range (SUI)</h3>
      <div className="flex gap-2 mb-3">
        <input
          type="number"
          placeholder="Min"
          value={localMin || ''}
          onChange={(e) => setLocalMin(Number(e.target.value))}
          className="flex-1 px-3 py-2 bg-background border border-secondary rounded-lg text-sm"
        />
        <input
          type="number"
          placeholder="Max"
          value={localMax || ''}
          onChange={(e) => setLocalMax(Number(e.target.value))}
          className="flex-1 px-3 py-2 bg-background border border-secondary rounded-lg text-sm"
        />
      </div>
      <button
        onClick={handleApply}
        className="w-full px-3 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-hover transition-colors"
      >
        Apply
      </button>
    </div>
  );
};

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchFilters>({
    category: searchParams.get('category') || undefined,
    sortBy: (searchParams.get('sortBy') as SearchFilters['sortBy']) || 'recently_listed',
    status: searchParams.get('status') as SearchFilters['status'] || undefined,
  });
  const [showFilters, setShowFilters] = useState(false);

  const { data: assets, loading, refetch } = useApi(
    () => assetsApi.getAll(filters),
    [filters]
  );

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const categories = ['Art', 'Photography', 'Music', 'Video', 'Collectibles', 'Other'];
  const sortOptions = [
    { value: 'recently_listed', label: 'Recently Listed' },
    { value: 'price_low_to_high', label: 'Price: Low to High' },
    { value: 'price_high_to_low', label: 'Price: High to Low' },
    { value: 'most_liked', label: 'Most Liked' },
  ];

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-4xl font-bold">Explore NFTs</h1>
              <p className="text-text-secondary mt-1">
                Discover unique digital assets from creators worldwide
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden px-4 py-2 bg-surface border border-secondary rounded-lg text-sm font-medium"
          >
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <motion.aside 
            initial={false}
            animate={{ 
              width: showFilters || window.innerWidth >= 1024 ? 280 : 0,
              opacity: showFilters || window.innerWidth >= 1024 ? 1 : 0
            }}
            className="overflow-hidden"
          >
            <div className="w-70 space-y-6">
              {/* Status Filter */}
              <div>
                <h3 className="font-semibold mb-3">Status</h3>
                <div className="space-y-2">
                  {[
                    { value: undefined, label: 'All Items' },
                    { value: 'buy_now', label: 'Buy Now' },
                    { value: 'on_auction', label: 'On Auction' },
                    { value: 'has_offers', label: 'Has Offers' },
                  ].map(option => (
                    <FilterButton
                      key={option.label}
                      active={filters.status === option.value}
                      onClick={() => updateFilter('status', option.value)}
                    >
                      {option.label}
                    </FilterButton>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  <FilterButton
                    active={!filters.category}
                    onClick={() => updateFilter('category', undefined)}
                  >
                    All Categories
                  </FilterButton>
                  {categories.map(category => (
                    <FilterButton
                      key={category}
                      active={filters.category === category}
                      onClick={() => updateFilter('category', category)}
                    >
                      {category}
                    </FilterButton>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <PriceRangeFilter
                min={filters.priceMin || 0}
                max={filters.priceMax || 0}
                onChange={(min, max) => {
                  updateFilter('priceMin', min || undefined);
                  updateFilter('priceMax', max || undefined);
                }}
              />
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-text-secondary">
                {loading ? 'Loading...' : `${assets?.length || 0} items`}
              </p>
              
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value)}
                className="px-4 py-2 bg-surface border border-secondary rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Assets Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="bg-surface rounded-xl overflow-hidden animate-pulse">
                    <div className="aspect-square bg-secondary" />
                    <div className="p-4">
                      <div className="h-4 bg-secondary rounded mb-2" />
                      <div className="h-3 bg-secondary rounded w-2/3 mb-2" />
                      <div className="h-4 bg-secondary rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : assets && assets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {assets.map(asset => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No items found</h3>
                <p className="text-text-secondary">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};