import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { User, Wallet } from '../types';
import { authApi } from '../services/api';

interface AppContextType {
  isAuthenticated: boolean;
  user: User | null;
  wallet: Wallet | null;
  isWalletModalOpen: boolean;
  openWalletModal: () => void;
  closeWalletModal: () => void;
  connectWallet: (wallet: Wallet, isZkLogin?: boolean) => void;
  disconnectWallet: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as 'light' | 'dark';
      return storedTheme || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    // Check for saved session
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const response = await authApi.getProfile();
          if (response.success) {
            setUser(response.data);
            setIsAuthenticated(true);
            
            // Mock wallet data for authenticated user
            const mockWallet: Wallet = {
              name: 'Connected Wallet',
              address: '0x' + Math.random().toString(16).substr(2, 8) + '...',
              balance: Math.random() * 10,
              icon: <div className="w-6 h-6 bg-primary rounded-full" />,
              status: 'Connected',
            };
            setWallet(mockWallet);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('auth_token');
      }
    };

    checkAuth();

    // Apply theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const openWalletModal = useCallback(() => setWalletModalOpen(true), []);
  const closeWalletModal = useCallback(() => setWalletModalOpen(false), []);

  const connectWallet = useCallback(async (walletToConnect: Wallet, isZkLogin: boolean = false) => {
    try {
      // Simulate zkLogin or wallet connection
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      if (isZkLogin) {
        const response = await authApi.zkLogin(mockToken);
        if (response.success) {
          setUser(response.data.user);
          localStorage.setItem('auth_token', response.data.token);
        }
      } else {
        // Mock user data for wallet connection
        const mockUser: User = {
          id: 'user_' + Date.now(),
          username: 'user' + Math.floor(Math.random() * 1000),
          displayName: 'NFT Collector',
          bio: 'Digital art enthusiast and collector',
          avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`,
          email: 'user@example.com',
          walletAddress: walletToConnect.address,
          isVerifiedArtist: Math.random() > 0.7,
          joinedDate: new Date().toISOString(),
          totalItems: Math.floor(Math.random() * 50),
          totalCollections: Math.floor(Math.random() * 10),
          followers: Math.floor(Math.random() * 1000),
          following: Math.floor(Math.random() * 500),
        };
        
        setUser(mockUser);
        localStorage.setItem('auth_token', mockToken);
      }
      
      setIsAuthenticated(true);
      setWallet({ ...walletToConnect, status: 'Connected' });
      closeWalletModal();
    } catch (error) {
      console.error('Connection failed:', error);
    }
  }, [closeWalletModal]);

  const disconnectWallet = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      setWallet(null);
      localStorage.removeItem('auth_token');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        wallet,
        isWalletModalOpen,
        openWalletModal,
        closeWalletModal,
        connectWallet,
        disconnectWallet,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};