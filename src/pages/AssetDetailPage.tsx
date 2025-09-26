import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { BackButton } from '../components/BackButton';
import { Button } from '../components/Button';
import { FractionalOwnership } from '../components/FractionalOwnership';
import { VerifiedIcon } from '../components/icons/Icons';
import { useApi, useAsyncAction } from '../hooks/useApi';
import { assetsApi, usersApi } from '../services/api';
import { useAppContext } from '../contexts/AppContext';

const AttributeCard: React.FC<{ trait: string; value: string }> = ({ trait, value }) => (
  <div className="bg-surface p-4 rounded-lg border border-secondary text-center">
    <div className="text-sm text-text-secondary mb-1">{trait}</div>
    <div className="font-semibold text-text-primary">{value}</div>
  </div>
);

const TabButton: React.FC<{ 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
      active 
        ? 'border-primary text-primary' 
        : 'border-transparent text-text-secondary hover:text-text-primary'
    }`}
  >
    {children}
  </button>
);

export const AssetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, openWalletModal } = useAppContext();
  const [activeTab, setActiveTab] = useState<'details' | 'history' | 'offers'>('details');
  const [showBuyModal, setShowBuyModal] = useState(false);

  const { data: asset, loading, error } = useApi(
    () => assetsApi.getById(id!),
    [id]
  );

  const { data: creator } = useApi(
    () => asset ? usersApi.getProfile(asset.creator) : Promise.reject(),
    [asset?.creator]
  );

  const { execute: buyShares, loading: buyLoading } = useAsyncAction();

  // Mock fractional ownership data
  const mockOwnership = asset?.totalShares ? {
    assetId: asset.id,
    totalShares: asset.totalShares,
    availableShares: asset.availableShares || 0,
    sharePrice: asset.sharePrice || 0,
    owners: [
      { userId: '1', username: 'collector1', shares: 25, percentage: 25 },
      { userId: '2', username: 'investor2', shares: 15, percentage: 15 },
    ]
  } : null;

  const handleBuyShares = async (shares: number) => {
    if (!isAuthenticated) {
      openWalletModal();
      return;
    }

    const result = await buyShares(
      (params) => assetsApi.buyShares(params.assetId, params.shares),
      { assetId: id!, shares }
    );

    if (result) {
      toast.success(`Successfully purchased ${shares} share${shares > 1 ? 's' : ''}!`);
      setShowBuyModal(false);
    } else {
      toast.error('Failed to purchase shares. Please try again.');
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      openWalletModal();
      return;
    }
    
    if (asset?.totalShares) {
      setShowBuyModal(true);
    } else {
      // Handle regular NFT purchase
      toast.success('Purchase functionality coming soon!');
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-6 py-8">
          <BackButton className="mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-surface rounded-2xl animate-pulse" />
            <div className="space-y-6">
              <div className="h-8 bg-surface rounded animate-pulse" />
              <div className="h-12 bg-surface rounded animate-pulse" />
              <div className="h-32 bg-surface rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !asset) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Asset not found</h2>
          <p className="text-text-secondary mb-4">The asset you're looking for doesn't exist or has been removed.</p>
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-6 py-8">
        <BackButton className="mb-6" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Asset Image */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-square bg-surface rounded-2xl overflow-hidden border border-secondary"
            >
              <img 
                src={asset.imageUrl} 
                alt={asset.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Attributes */}
            {asset.attributes && asset.attributes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Attributes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {asset.attributes.map((attr, index) => (
                    <AttributeCard 
                      key={index} 
                      trait={attr.trait_type} 
                      value={attr.value} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Asset Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                <span>{asset.collection || 'Individual Item'}</span>
                {asset.tokenId && (
                  <>
                    <span>•</span>
                    <span>#{asset.tokenId}</span>
                  </>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-4">{asset.name}</h1>
              
              {/* Creator Info */}
              {creator && (
                <div className="flex items-center gap-3 mb-6">
                  <img 
                    src={creator.avatarUrl} 
                    alt={creator.displayName} 
                    className="w-12 h-12 rounded-full border-2 border-secondary" 
                  />
                  <div>
                    <p className="text-sm text-text-secondary">Created by</p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-text-primary">{creator.displayName}</span>
                      {creator.isVerifiedArtist && (
                        <VerifiedIcon className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Price and Purchase */}
            <div className="bg-surface rounded-xl p-6 border border-secondary">
              {asset.price ? (
                <div>
                  <p className="text-sm text-text-secondary mb-2">
                    {asset.totalShares ? 'Price per share' : 'Current price'}
                  </p>
                  <p className="text-3xl font-bold text-primary mb-4">
                    {asset.totalShares ? asset.sharePrice : asset.price} SUI
                  </p>
                  
                  {asset.lastSale && (
                    <p className="text-sm text-text-secondary mb-4">
                      Last sale: {asset.lastSale} SUI
                    </p>
                  )}
                  
                  <Button 
                    onClick={handleBuyNow}
                    className="w-full py-3 text-lg"
                    disabled={buyLoading}
                  >
                    {asset.totalShares ? 'Buy Shares' : 'Buy Now'}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-text-secondary">This item is not currently for sale</p>
                </div>
              )}
            </div>

            {/* Fractional Ownership */}
            {mockOwnership && (
              <FractionalOwnership
                asset={asset}
                ownership={mockOwnership}
                onBuyShares={handleBuyShares}
                loading={buyLoading}
              />
            )}

            {/* Tabs */}
            <div>
              <div className="flex border-b border-secondary mb-6">
                <TabButton 
                  active={activeTab === 'details'} 
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </TabButton>
                <TabButton 
                  active={activeTab === 'history'} 
                  onClick={() => setActiveTab('history')}
                >
                  History
                </TabButton>
                <TabButton 
                  active={activeTab === 'offers'} 
                  onClick={() => setActiveTab('offers')}
                >
                  Offers
                </TabButton>
              </div>

              {activeTab === 'details' && (
                <div className="space-y-4">
                  {asset.description && (
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-text-secondary leading-relaxed">{asset.description}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-text-secondary">Contract Address</span>
                      <p className="font-mono text-xs break-all">{asset.contractAddress || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Token ID</span>
                      <p className="font-mono">{asset.tokenId || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Blockchain</span>
                      <p>{asset.blockchain || 'Sui'}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Category</span>
                      <p>{asset.category}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="text-center py-8 text-text-secondary">
                  Transaction history will be displayed here
                </div>
              )}

              {activeTab === 'offers' && (
                <div className="text-center py-8 text-text-secondary">
                  Current offers will be displayed here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};