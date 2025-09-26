import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BackButton } from '../components/BackButton';
import { Button } from '../components/Button';
import { AssetCard } from '../components/AssetCard';
import { VerifiedIcon } from '../components/icons/Icons';
import { useApi, useAsyncAction } from '../hooks/useApi';
import { usersApi } from '../services/api';
import { useAppContext } from '../contexts/AppContext';

const TabButton: React.FC<{ 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
  count?: number;
}> = ({ active, onClick, children, count }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
      active 
        ? 'border-primary text-primary' 
        : 'border-transparent text-text-secondary hover:text-text-primary'
    }`}
  >
    {children}
    {count !== undefined && (
      <span className="bg-secondary text-text-secondary px-2 py-1 rounded-full text-xs">
        {count}
      </span>
    )}
  </button>
);

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-text-primary">{value}</div>
    <div className="text-sm text-text-secondary">{label}</div>
  </div>
);

export const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser, isAuthenticated } = useAppContext();
  const [activeTab, setActiveTab] = useState<'owned' | 'created' | 'collections' | 'activity'>('owned');
  const [following, setFollowing] = useState(false);

  const { data: user, loading: userLoading } = useApi(
    () => usersApi.getProfile(id!),
    [id]
  );

  const { data: ownedAssets, loading: ownedLoading } = useApi(
    () => usersApi.getAssets(id!),
    [id, activeTab === 'owned']
  );

  const { data: collections, loading: collectionsLoading } = useApi(
    () => usersApi.getCollections(id!),
    [id, activeTab === 'collections']
  );

  const { execute: followUser, loading: followLoading } = useAsyncAction();

  const isOwnProfile = currentUser?.id === id;

  const handleFollow = async () => {
    if (!isAuthenticated) return;
    
    const result = await followUser(
      (params) => usersApi.follow(params.userId),
      { userId: id! }
    );

    if (result) {
      setFollowing(result.following);
    }
  };

  if (userLoading) {
    return (
      <div className="pt-24 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          <BackButton className="mb-6" />
          <div className="animate-pulse">
            <div className="h-48 bg-surface rounded-2xl mb-8" />
            <div className="flex items-center gap-6 mb-8">
              <div className="w-32 h-32 bg-surface rounded-full" />
              <div className="space-y-4 flex-1">
                <div className="h-8 bg-surface rounded w-1/3" />
                <div className="h-4 bg-surface rounded w-1/2" />
                <div className="h-4 bg-surface rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Profile not found</h2>
          <p className="text-text-secondary mb-4">The user you're looking for doesn't exist.</p>
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <BackButton className="mb-6" />

        {/* Banner */}
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary/20 to-primary-hover/20 rounded-2xl mb-8 overflow-hidden">
          {user.bannerUrl && (
            <img 
              src={user.bannerUrl} 
              alt="Profile banner" 
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8 -mt-16 relative z-10">
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={user.avatarUrl} 
            alt={user.displayName} 
            className="w-32 h-32 rounded-full border-4 border-background bg-surface"
          />
          
          <div className="flex-1 bg-surface/95 backdrop-blur-sm rounded-2xl p-6 border border-secondary">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-text-primary">{user.displayName}</h1>
                  {user.isVerifiedArtist && (
                    <VerifiedIcon className="w-6 h-6 text-primary" />
                  )}
                </div>
                <p className="text-text-secondary">@{user.username}</p>
                {user.bio && (
                  <p className="text-text-secondary mt-2 max-w-2xl">{user.bio}</p>
                )}
              </div>
              
              {!isOwnProfile && isAuthenticated && (
                <Button 
                  onClick={handleFollow}
                  disabled={followLoading}
                  variant={following ? 'secondary' : 'primary'}
                  className="whitespace-nowrap"
                >
                  {following ? 'Following' : 'Follow'}
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard label="Items" value={user.totalItems || 0} />
              <StatCard label="Collections" value={user.totalCollections || 0} />
              <StatCard label="Followers" value={user.followers || 0} />
              <StatCard label="Following" value={user.following || 0} />
            </div>

            {/* Social Links */}
            {user.socialLinks && (
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-secondary">
                {user.socialLinks.website && (
                  <a 
                    href={user.socialLinks.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    🌐 Website
                  </a>
                )}
                {user.socialLinks.twitter && (
                  <a 
                    href={user.socialLinks.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    🐦 Twitter
                  </a>
                )}
                {user.socialLinks.instagram && (
                  <a 
                    href={user.socialLinks.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    📷 Instagram
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-secondary mb-8">
          <div className="flex overflow-x-auto">
            <TabButton 
              active={activeTab === 'owned'} 
              onClick={() => setActiveTab('owned')}
              count={user.totalItems}
            >
              Owned
            </TabButton>
            <TabButton 
              active={activeTab === 'created'} 
              onClick={() => setActiveTab('created')}
            >
              Created
            </TabButton>
            <TabButton 
              active={activeTab === 'collections'} 
              onClick={() => setActiveTab('collections')}
              count={user.totalCollections}
            >
              Collections
            </TabButton>
            <TabButton 
              active={activeTab === 'activity'} 
              onClick={() => setActiveTab('activity')}
            >
              Activity
            </TabButton>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {activeTab === 'owned' && (
            <div>
              {ownedLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="bg-surface rounded-xl overflow-hidden animate-pulse">
                      <div className="aspect-square bg-secondary" />
                      <div className="p-4">
                        <div className="h-4 bg-secondary rounded mb-2" />
                        <div className="h-3 bg-secondary rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : ownedAssets && ownedAssets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {ownedAssets.map(asset => (
                    <AssetCard key={asset.id} asset={asset} showOwner={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🖼️</div>
                  <h3 className="text-xl font-semibold mb-2">No items owned</h3>
                  <p className="text-text-secondary">
                    {isOwnProfile ? "You don't own any NFTs yet" : `${user.displayName} doesn't own any NFTs yet`}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'created' && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">No items created</h3>
              <p className="text-text-secondary">
                {isOwnProfile ? "You haven't created any NFTs yet" : `${user.displayName} hasn't created any NFTs yet`}
              </p>
            </div>
          )}

          {activeTab === 'collections' && (
            <div>
              {collectionsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-surface rounded-xl overflow-hidden animate-pulse">
                      <div className="aspect-video bg-secondary" />
                      <div className="p-4">
                        <div className="h-4 bg-secondary rounded mb-2" />
                        <div className="h-3 bg-secondary rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : collections && collections.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collections.map(collection => (
                    <div key={collection.id} className="bg-surface rounded-xl overflow-hidden border border-secondary hover:border-primary/50 transition-all">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={collection.imageUrl} 
                          alt={collection.name} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-text-primary mb-1">{collection.name}</h3>
                        <p className="text-sm text-text-secondary line-clamp-2">{collection.description}</p>
                        <div className="flex justify-between items-center mt-3 text-sm">
                          <span className="text-text-secondary">{collection.itemCount || 0} items</span>
                          <span className="font-semibold text-primary">{collection.floorPrice || 0} SUI</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold mb-2">No collections</h3>
                  <p className="text-text-secondary">
                    {isOwnProfile ? "You haven't created any collections yet" : `${user.displayName} hasn't created any collections yet`}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">No activity</h3>
              <p className="text-text-secondary">Activity feed will be displayed here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};