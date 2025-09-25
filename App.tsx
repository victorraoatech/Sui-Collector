import React, { useEffect } from 'react';
import { AppContextProvider, useAppContext } from './contexts/AppContext';
import { Page } from './types';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { ConnectWalletModal } from './components/ConnectWalletModal';
import { MarketplacePage } from './pages/MarketplacePage';
import { CreateItemPage } from './pages/CreateItemPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { ClubsListPage } from './pages/ClubsListPage';
import { ClubDetailPage } from './pages/ClubDetailPage';
import { AssetDetailPage } from './pages/AssetDetailPage';

const PageRenderer: React.FC = () => {
    const { currentPage, isAuthenticated, setCurrentPage, clubId } = useAppContext();

    useEffect(() => {
        // Redirect to profile page if authenticated user lands on home
        if (isAuthenticated && currentPage === Page.Home) {
            setCurrentPage(Page.Profile);
        }
    }, [isAuthenticated, currentPage, setCurrentPage]);

    switch (currentPage) {
        case Page.Home:
            return <HomePage />;
        case Page.Profile:
             return <ProfilePage />;
        case Page.Marketplace:
            return <MarketplacePage />;
        case Page.MintNewAsset:
            return <CreateItemPage />;
        case Page.Settings:
            return <SettingsPage />;
        case Page.Clubs:
            return <ClubsListPage />;
        case Page.ClubDetail:
            return clubId ? <ClubDetailPage clubId={clubId} /> : <ClubsListPage />;
        case Page.AssetDetail:
            return <AssetDetailPage />;
        default:
            return isAuthenticated ? <ProfilePage /> : <HomePage />;
    }
}

function App() {
  return (
    <AppContextProvider>
        <Header />
        <PageRenderer />
        <ConnectWalletModal />
    </AppContextProvider>
  );
}

export default App;