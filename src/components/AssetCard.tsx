import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Asset } from '../types';
import { assetsApi } from '../services/api';

interface AssetCardProps {
  asset: Asset;
  showOwner?: boolean;
  className?: string;
}

export const AssetCard: React.FC<AssetCardProps> = ({ 
  asset, 
  showOwner = true, 
  className = '' 
}) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(asset.likes || 0);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await assetsApi.like(asset.id);
      if (response.success) {
        setLiked(response.data.liked);
        setLikeCount(prev => response.data.liked ? prev + 1 : prev - 1);
      }
    } catch (error) {
      console.error('Failed to like asset:', error);
    }
  };

  const handleClick = () => {
    navigate(`/asset/${asset.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-surface rounded-xl overflow-hidden border border-secondary hover:border-primary/50 transition-all duration-300 cursor-pointer group ${className}`}
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={asset.imageUrl} 
          alt={asset.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Overlay with like button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-3 right-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                liked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <svg className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.button>
          </div>
          
          {likeCount > 0 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {likeCount}
            </div>
          )}
        </div>

        {/* Fractional ownership indicator */}
        {asset.totalShares && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded-full">
            Fractional
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-text-primary truncate flex-1 mr-2">
            {asset.name}
          </h3>
          {asset.rarity && (
            <span className="text-xs bg-secondary text-text-secondary px-2 py-1 rounded-full whitespace-nowrap">
              {asset.rarity}
            </span>
          )}
        </div>

        {showOwner && asset.owner && (
          <p className="text-sm text-text-secondary mb-2">
            Owned by <span className="font-medium text-text-primary">{asset.owner}</span>
          </p>
        )}

        <div className="flex items-center justify-between">
          <div>
            {asset.price ? (
              <div>
                <div className="text-lg font-bold text-primary">
                  {asset.totalShares ? `${asset.sharePrice} SUI/share` : `${asset.price} SUI`}
                </div>
                {asset.totalShares && (
                  <div className="text-xs text-text-secondary">
                    {asset.availableShares}/{asset.totalShares} shares available
                  </div>
                )}
              </div>
            ) : (
              <span className="text-sm text-text-secondary">Not for sale</span>
            )}
          </div>
          
          {asset.lastSale && (
            <div className="text-right">
              <div className="text-xs text-text-secondary">Last sale</div>
              <div className="text-sm font-medium">{asset.lastSale} SUI</div>
            </div>
          )}
        </div>

        {asset.collection && (
          <div className="mt-2 pt-2 border-t border-secondary">
            <span className="text-xs text-text-secondary">
              From <span className="font-medium text-text-primary">{asset.collection}</span>
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};