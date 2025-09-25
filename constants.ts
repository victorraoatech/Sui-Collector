import { Asset, Collection, Transaction, Provenance, User, Club, ActivityFeedItem } from './types';

export const MOCK_ASSETS: Asset[] = [
  { id: '1', name: 'Digital Art #123', imageUrl: 'https://picsum.photos/seed/da123/500/500', category: 'Art', creator: 'alex_turner' },
  { id: '2', name: 'Abstract Expression #456', imageUrl: 'https://picsum.photos/seed/ae456/500/500', category: 'Art', creator: 'artist_two' },
  { id: '3', name: 'Cyberpunk Portrait #789', imageUrl: 'https://picsum.photos/seed/cp789/500/500', category: 'Collectibles', creator: 'artist_three' },
  { id: '4', name: 'Geometric Design #012', imageUrl: 'https://picsum.photos/seed/gd012/500/500', category: 'Art', creator: 'artist_four' },
  { id: '5', name: 'Surreal Landscape #345', imageUrl: 'https://picsum.photos/seed/sl345/500/500', category: 'Art', creator: 'alex_turner' },
  { id: '6', name: 'Minimalist Sculpture #678', imageUrl: 'https://picsum.photos/seed/ms678/500/500', category: 'Other', creator: 'artist_five' },
];

export const MOCK_CREATED_ASSETS: Asset[] = [
    { id: 'c1', name: 'Genesis Block', imageUrl: 'https://picsum.photos/seed/gb1/500/500', category: 'Art', creator: 'alex_turner', price: 1.5, owner: 'alex_turner' },
    { id: 'c2', name: 'Sui Wave', imageUrl: 'https://picsum.photos/seed/sw2/500/500', category: 'Art', creator: 'alex_turner', price: 2.1, owner: 'some_collector' },
];

export const MOCK_MARKETPLACE_ASSETS: Asset[] = [
    { id: 'm1', name: 'Mystic Bloom', imageUrl: 'https://picsum.photos/seed/mb1/500/500', price: 0.5, owner: 'Ava Harper', category: 'Art', creator: 'artist_one' },
    { id: 'm2', name: 'Cyberpunk Cityscape', imageUrl: 'https://picsum.photos/seed/cc2/500/500', price: 0.7, owner: 'Ethan Blake', category: 'Collectibles', creator: 'artist_two' },
    { id: 'm3', name: 'Enchanted Forest', imageUrl: 'https://picsum.photos/seed/ef3/500/500', price: 0.3, owner: 'Olivia Reed', category: 'Art', creator: 'artist_three' },
    { id: 'm4', name: 'Stellar Dreamscape', imageUrl: 'https://picsum.photos/seed/sd4/500/500', price: 0.9, owner: 'Noah Hayes', category: 'Art', creator: 'artist_four' },
    { id: 'm5', name: 'Neon Genesis', imageUrl: 'https://picsum.photos/seed/ng5/500/500', price: 0.6, owner: 'Isabella Carter', category: 'Other', creator: 'artist_five' },
    { id: 'm6', name: 'Digital Horizon', imageUrl: 'https://picsum.photos/seed/dh6/500/500', price: 0.4, owner: 'Liam Foster', category: 'Art', creator: 'artist_six' },
    { id: 'm7', name: 'Quantum Realm', imageUrl: 'https://picsum.photos/seed/qr7/500/500', price: 0.8, owner: 'Mia Bennett', category: 'Collectibles', creator: 'artist_seven' },
    { id: 'm8', name: 'Pixelated Paradise', imageUrl: 'https://picsum.photos/seed/pp8/500/500', price: 0.2, owner: 'Jackson Cole', category: 'Other', creator: 'artist_eight' },
];

export const MOCK_COLLECTIONS: Collection[] = [
  { id: 'c1', name: 'Collection Alpha', description: 'Explore the latest digital art pieces', imageUrl: 'https://picsum.photos/seed/ca1/600/400' },
  { id: 'c2', name: 'Collection Beta', description: 'Discover unique digital collectibles', imageUrl: 'https://picsum.photos/seed/cb2/600/400' },
  { id: 'c3', name: 'Collection Gamma', description: 'Find rare and exclusive digital assets', imageUrl: 'https://picsum.photos/seed/cg3/600/400' },
];

export const MOCK_TRENDING_ASSETS: Asset[] = [
    { id: 't1', name: 'Asset 1', imageUrl: 'https://picsum.photos/seed/ta1/300/300', category: 'Art', creator: 'artist_one' },
    { id: 't2', name: 'Asset 2', imageUrl: 'https://picsum.photos/seed/ta2/300/300', category: 'Collectibles', creator: 'artist_two' },
    { id: 't3', name: 'Asset 3', imageUrl: 'https://picsum.photos/seed/ta3/300/300', category: 'Art', creator: 'artist_three' },
    { id: 't4', name: 'Asset 4', imageUrl: 'https://picsum.photos/seed/ta4/300/300', category: 'Art', creator: 'artist_four' },
    { id: 't5', name: 'Asset 5', imageUrl: 'https://picsum.photos/seed/ta5/300/300', category: 'Other', creator: 'artist_five' },
];

export const MOCK_PORTFOLIO_CHART_DATA = [
  { name: 'Jan', value: 18000 },
  { name: 'Feb', value: 20000 },
  { name: 'Mar', value: 19000 },
  { name: 'Apr', value: 22000 },
  { name: 'May', value: 17000 },
  { name: 'Jun', value: 24000 },
  { name: 'Jul', value: 25500 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { type: 'Minted', asset: 'Digital Art #123', date: '2023-07-15', value: 500 },
  { type: 'Bought', asset: 'Collectible Card #456', date: '2023-07-10', value: 200 },
  { type: 'Sold', asset: 'Virtual Land #789', date: '2023-07-05', value: 1000 },
  { type: 'Minted', asset: 'Digital Art #012', date: '2023-06-20', value: 300 },
  { type: 'Bought', asset: 'Collectible Card #345', date: '2023-06-16', value: 150 },
];

export const MOCK_PROVENANCE: Provenance[] = [
    { assetName: 'Digital Art #123', assetId: '1', currentOwner: 'Sophia Carter', previousOwners: ['Liam Harper', 'Ava Bennett'] },
    { assetName: 'Collectible Card #456', assetId: '2', currentOwner: 'Ethan Walker', previousOwners: [] },
    { assetName: 'Virtual Land #789', assetId: '3', currentOwner: 'Isabella Reed', previousOwners: ['Jackson Cole', 'Mia Powell'] },
];

export const MOCK_USER: User = {
    username: 'alex_turner',
    displayName: 'Alex Turner',
    bio: 'Digital artist and collector exploring the frontiers of creativity on the blockchain.',
    avatarUrl: 'https://i.pravatar.cc/150?u=alexturner',
    email: 'alex.turner@example.com',
    isVerifiedArtist: true,
};

export const MOCK_ACTIVITY_FEED: ActivityFeedItem[] = [
    { id: 'act1', user: { name: 'CryptoPioneer', avatarUrl: 'https://i.pravatar.cc/150?u=pioneer' }, action: 'purchased', asset: { name: 'Stellar Dreamscape', imageUrl: 'https://picsum.photos/seed/sd4/100/100' }, price: 0.9, timestamp: '2 hours ago' },
    { id: 'act2', user: { name: 'ArtCollector_88', avatarUrl: 'https://i.pravatar.cc/150?u=collector88' }, action: 'listed', asset: { name: 'Quantum Realm', imageUrl: 'https://picsum.photos/seed/qr7/100/100' }, price: 0.8, timestamp: '5 hours ago' },
    { id: 'act3', user: { name: 'alex_turner', avatarUrl: 'https://i.pravatar.cc/150?u=alexturner' }, action: 'minted', asset: { name: 'Sui Wave', imageUrl: 'https://picsum.photos/seed/sw2/100/100' }, timestamp: '1 day ago' },
];

export const MOCK_CLUBS: Club[] = [
    {
        id: 'club1',
        name: 'Digital Art Collective',
        description: 'A community for creators and enthusiasts of digital art.',
        imageUrl: 'https://picsum.photos/seed/club1/600/400',
        memberCount: 1250,
        members: [
            { name: 'Alex Turner', avatarUrl: 'https://i.pravatar.cc/150?u=alexturner' },
            { name: 'Olivia Reed', avatarUrl: 'https://i.pravatar.cc/150?u=olivia' },
        ],
        featuredAssets: MOCK_MARKETPLACE_ASSETS.slice(0, 4)
    },
    {
        id: 'club2',
        name: 'Pixel Pushers',
        description: 'Celebrating the art of pixelated and generative creations.',
        imageUrl: 'https://picsum.photos/seed/club2/600/400',
        memberCount: 840,
        members: [
            { name: 'Jackson Cole', avatarUrl: 'https://i.pravatar.cc/150?u=jackson' },
            { name: 'Mia Bennett', avatarUrl: 'https://i.pravatar.cc/150?u=mia' },
        ],
        featuredAssets: MOCK_MARKETPLACE_ASSETS.slice(4, 8)
    },
];
