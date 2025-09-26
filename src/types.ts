export interface Asset {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  price?: number;
  owner?: string;
  creator: string;
  category: 'Collectibles' | 'Art' | 'Photography' | 'Music' | 'Video' | 'Other';
  collection?: string;
  tokenId?: string;
  contractAddress?: string;
  blockchain?: string;
  rarity?: string;
  attributes?: { trait_type: string; value: string }[];
  totalShares?: number;
  availableShares?: number;
  sharePrice?: number;
  createdAt?: string;
  lastSale?: number;
  views?: number;
  likes?: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  bannerUrl?: string;
  creator: string;
  floorPrice?: number;
  totalVolume?: number;
  itemCount?: number;
  ownerCount?: number;
  verified?: boolean;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  bannerUrl?: string;
  email: string;
  walletAddress: string;
  isVerifiedArtist: boolean;
  joinedDate?: string;
  totalItems?: number;
  totalCollections?: number;
  followers?: number;
  following?: number;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
}

export interface Wallet {
  name: string;
  address: string;
  balance: number;
  icon: JSX.Element;
  status: 'Connected' | 'Not Connected';
  recommended?: boolean;
  popular?: boolean;
}

export interface Transaction {
  id: string;
  type: 'Minted' | 'Bought' | 'Sold' | 'Transferred' | 'Listed';
  asset: Asset;
  from?: string;
  to?: string;
  price?: number;
  shares?: number;
  date: string;
  txHash?: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  bannerUrl?: string;
  memberCount: number;
  members: { id: string; name: string; avatarUrl: string; role?: string }[];
  featuredAssets: Asset[];
  category?: string;
  isPrivate?: boolean;
  createdAt?: string;
  rules?: string[];
}

export interface Message {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  timestamp: string;
  clubId: string;
  replyTo?: string;
}

export interface FractionalOwnership {
  assetId: string;
  totalShares: number;
  availableShares: number;
  sharePrice: number;
  owners: {
    userId: string;
    username: string;
    shares: number;
    percentage: number;
  }[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SearchFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  sortBy?: 'price_low_to_high' | 'price_high_to_low' | 'recently_listed' | 'most_liked';
  status?: 'buy_now' | 'on_auction' | 'has_offers';
  collection?: string;
}