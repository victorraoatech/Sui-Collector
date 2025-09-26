import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BackButton } from '../components/BackButton';
import { Button } from '../components/Button';
import { ClubIcon } from '../components/icons/Icons';
import { useApi } from '../hooks/useApi';
import { clubsApi } from '../services/api';
import { Club } from '../types';

const ClubCard: React.FC<{ club: Club }> = ({ club }) => (
  <Link to={`/club/${club.id}`}>
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-surface rounded-xl overflow-hidden border border-secondary hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={club.imageUrl} 
          alt={club.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {club.isPrivate && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Private
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
            {club.name}
          </h3>
          <span className="text-xs bg-secondary text-text-secondary px-2 py-1 rounded-full whitespace-nowrap">
            {club.category || 'General'}
          </span>
        </div>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {club.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <ClubIcon className="w-4 h-4" />
            <span>{club.memberCount.toLocaleString()} members</span>
          </div>
          
          <div className="flex -space-x-2">
            {club.members.slice(0, 3).map((member, index) => (
              <img
                key={member.id}
                src={member.avatarUrl}
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-background"
                style={{ zIndex: 3 - index }}
              />
            ))}
            {club.members.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs text-text-secondary">
                +{club.members.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
);

export const ClubsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all');
  
  const { data: clubs, loading } = useApi(
    () => clubsApi.getAll(),
    []
  );

  const filteredClubs = clubs?.filter(club => {
    if (filter === 'public') return !club.isPrivate;
    if (filter === 'private') return club.isPrivate;
    return true;
  }) || [];

  const categories = ['Art', 'Gaming', 'Music', 'Photography', 'Collectibles', 'General'];

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-4xl font-bold">Clubs & Communities</h1>
              <p className="text-text-secondary mt-1">
                Connect with like-minded collectors and creators
              </p>
            </div>
          </div>
          
          <Button>Create Club</Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-text-secondary hover:text-text-primary'
              }`}
            >
              All Clubs
            </button>
            <button
              onClick={() => setFilter('public')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'public' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-text-secondary hover:text-text-primary'
              }`}
            >
              Public
            </button>
            <button
              onClick={() => setFilter('private')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'private' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-text-secondary hover:text-text-primary'
              }`}
            >
              Private
            </button>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                className="px-3 py-1 rounded-full text-xs font-medium bg-surface text-text-secondary hover:text-text-primary hover:bg-secondary transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-text-secondary">
            {loading ? 'Loading...' : `${filteredClubs.length} club${filteredClubs.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {/* Clubs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-surface rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-secondary" />
                <div className="p-6">
                  <div className="h-6 bg-secondary rounded mb-3" />
                  <div className="h-4 bg-secondary rounded mb-2" />
                  <div className="h-4 bg-secondary rounded w-3/4 mb-4" />
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-secondary rounded w-1/3" />
                    <div className="flex -space-x-2">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div key={j} className="w-8 h-8 bg-secondary rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="text-xl font-semibold mb-2">No clubs found</h3>
            <p className="text-text-secondary mb-6">
              Try adjusting your filters or create a new club to get started
            </p>
            <Button>Create Your First Club</Button>
          </div>
        )}
      </div>
    </div>
  );
};