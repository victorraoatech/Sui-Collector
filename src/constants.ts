import { Asset, Collection, User, Club } from './types';

// Mock data with enhanced OpenSea-style structure
export const MOCK_ASSETS: Asset[] = [
  {
    id: '1',
    name: 'Cosmic Wanderer #1234',
    description: 'A mesmerizing journey through the cosmos, featuring vibrant nebulae and distant galaxies.',
    imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=500&fit=crop',
    category: 'Art',
    creator: 'cosmic_artist',
    owner: 'collector_one',
    price: 2.5,
    collection: 'Cosmic Wanderers',
    tokenId: '1234',
    contractAddress: '0x1234...abcd',
    blockchain: 'Sui',
    rarity: 'Rare',
    attributes: [
      { trait_type: 'Background', value: 'Nebula' },
      { trait_type: 'Color Scheme', value: 'Purple' },
      { trait_type: 'Rarity', value: 'Rare' }
    ],
    totalShares: 100,
    availableShares: 75,
    sharePrice: 0.025,
    createdAt: '2024-01-15T10:30:00Z',
    lastSale: 2.2,
    views: 1250,
    likes: 89
  },
  {
    id: '2',
    name: 'Digital Dreams #0567',
    description: 'An abstract representation of digital consciousness and virtual reality.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=500&fit=crop',
    category: 'Art',
    creator: 'dream_weaver',
    owner: 'art_lover',
    price: 1.8,
    collection: 'Digital Dreams',
    tokenId: '567',
    rarity: 'Common',
    attributes: [
      { trait_type: 'Style', value: 'Abstract' },
      { trait_type: 'Mood', value: 'Ethereal' }
    ],
    createdAt: '2024-01-20T14:15:00Z',
    views: 890,
    likes: 45
  },
  {
    id: '3',
    name: 'Fractional Masterpiece',
    description: 'A groundbreaking piece available for fractional ownership.',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop',
    category: 'Art',
    creator: 'master_artist',
    price: 10.0,
    totalShares: 1000,
    availableShares: 650,
    sharePrice: 0.01,
    collection: 'Fractional Art',
    rarity: 'Legendary',
    attributes: [
      { trait_type: 'Type', value: 'Fractional' },
      { trait_type: 'Investment Grade', value: 'Premium' }
    ],
    createdAt: '2024-01-10T09:00:00Z',
    lastSale: 9.5,
    views: 3420,
    likes: 234
  }
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'col1',
    name: 'Cosmic Wanderers',
    description: 'A collection of 10,000 unique cosmic entities exploring the universe.',
    imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=400&fit=crop',
    creator: 'cosmic_artist',
    floorPrice: 1.2,
    totalVolume: 15420,
    itemCount: 10000,
    ownerCount: 3456,
    verified: true
  },
  {
    id: 'col2',
    name: 'Digital Dreams',
    description: 'Abstract digital art representing the intersection of technology and consciousness.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
    creator: 'dream_weaver',
    floorPrice: 0.8,
    totalVolume: 8930,
    itemCount: 5000,
    ownerCount: 1890,
    verified: false
  }
];

export const MOCK_CLUBS: Club[] = [
  {
    id: 'club1',
    name: 'Digital Art Collective',
    description: 'A community for creators and enthusiasts of digital art, sharing techniques and inspiration.',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=400&fit=crop',
    memberCount: 2340,
    members: [
      { id: '1', name: 'Alex Turner', avatarUrl: 'https://i.pravatar.cc/150?u=alex', role: 'Admin' },
      { id: '2', name: 'Sarah Chen', avatarUrl: 'https://i.pravatar.cc/150?u=sarah', role: 'Moderator' },
      { id: '3', name: 'Mike Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=mike' }
    ],
    featuredAssets: MOCK_ASSETS.slice(0, 4),
    category: 'Art',
    isPrivate: false,
    createdAt: '2023-12-01T00:00:00Z',
    rules: [
      'Be respectful to all members',
      'No spam or self-promotion without permission',
      'Share constructive feedback only'
    ]
  },
  {
    id: 'club2',
    name: 'Fractional Investors',
    description: 'A private club for serious investors in fractional NFT ownership.',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop',
    memberCount: 156,
    members: [
      { id: '4', name: 'Investment Pro', avatarUrl: 'https://i.pravatar.cc/150?u=investor' },
      { id: '5', name: 'Crypto Whale', avatarUrl: 'https://i.pravatar.cc/150?u=whale' }
    ],
    featuredAssets: [MOCK_ASSETS[2]],
    category: 'Investment',
    isPrivate: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'user1',
    username: 'cosmic_artist',
    displayName: 'Cosmic Artist',
    bio: 'Creating digital art inspired by the cosmos and beyond. Exploring the intersection of technology and creativity.',
    avatarUrl: 'https://i.pravatar.cc/150?u=cosmic',
    bannerUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=400&fit=crop',
    email: 'cosmic@example.com',
    walletAddress: '0x1234...abcd',
    isVerifiedArtist: true,
    joinedDate: '2023-06-15T00:00:00Z',
    totalItems: 45,
    totalCollections: 3,
    followers: 2340,
    following: 156,
    socialLinks: {
      twitter: 'https://twitter.com/cosmic_artist',
      instagram: 'https://instagram.com/cosmic_artist',
      website: 'https://cosmicart.io'
    }
  }
];