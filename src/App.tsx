import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppContextProvider } from './contexts/AppContext';
import { Header } from './components/Header';
import { ConnectWalletModal } from './components/ConnectWalletModal';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { AssetDetailPage } from './pages/AssetDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { ClubsPage } from './pages/ClubsPage';
import { CreateItemPage } from './pages/CreateItemPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <AppContextProvider>
      <Router>
        <div className="min-h-screen bg-background text-text-primary">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/asset/:id" element={<AssetDetailPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/clubs" element={<ClubsPage />} />
              <Route path="/create" element={<CreateItemPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
          <ConnectWalletModal />
          <Toaster 
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--color-surface)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-secondary)',
              },
            }}
          />
        </div>
      </Router>
    </AppContextProvider>
  );
}

export default App;