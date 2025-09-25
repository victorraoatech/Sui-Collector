import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Page, User, Wallet, Theme } from '../types';
import { MOCK_USER } from '../constants';

type ProfileTab = 'owned' | 'created' | 'activity' | 'portfolio';

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isAuthenticated: boolean;
  user: User | null;
  wallet: Wallet | null;
  isWalletModalOpen: boolean;
  openWalletModal: () => void;
  closeWalletModal: () => void;
  connectWallet: (wallet: Wallet, isZkLogin?: boolean) => void;
  disconnectWallet: () => void;
  theme: Theme;
  toggleTheme: () => void;
  currentProfileTab: ProfileTab;
  setCurrentProfileTab: (tab: ProfileTab) => void;
  clubId: string | null;
  setClubId: (id: string | null) => void;
  assetId: string | null;
  setAssetId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, _setCurrentPage] = useState<Page>(Page.Home);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [currentProfileTab, setCurrentProfileTab] = useState<ProfileTab>('owned');
  const [clubId, setClubId] = useState<string | null>(null);
  const [assetId, setAssetId] = useState<string | null>(null);


  useEffect(() => {
    // Check for saved session
    try {
      const savedSession = localStorage.getItem('sui-collect-session');
      if (savedSession) {
        const { user, wallet } = JSON.parse(savedSession);
        setUser(user);
        setWallet(wallet);
        setIsAuthenticated(true);
        // Redirect to dashboard if logged in
        _setCurrentPage(Page.Profile);
      }
    } catch (error) {
        console.error("Could not parse session from localStorage", error)
        localStorage.removeItem('sui-collect-session');
    }

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const openWalletModal = useCallback(() => setWalletModalOpen(true), []);
  const closeWalletModal = useCallback(() => setWalletModalOpen(false), []);

  const connectWallet = useCallback((walletToConnect: Wallet, isZkLogin: boolean = false) => {
    const sessionUser = { ...MOCK_USER, displayName: isZkLogin ? 'Google User' : MOCK_USER.displayName };
    const sessionWallet = { ...walletToConnect, status: 'Connected' as const };
    
    setIsAuthenticated(true);
    setUser(sessionUser);
    setWallet(sessionWallet);
    
    // Persist session
    localStorage.setItem('sui-collect-session', JSON.stringify({ user: sessionUser, wallet: sessionWallet }));
    
    closeWalletModal();
    _setCurrentPage(Page.Profile);
    setCurrentProfileTab('owned');
  }, [closeWalletModal]);

  const disconnectWallet = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    setWallet(null);
    localStorage.removeItem('sui-collect-session');
    _setCurrentPage(Page.Home);
  }, []);

  const navigateTo = (page: Page) => {
    if (!isAuthenticated && ![Page.Home, Page.Marketplace, Page.Clubs, Page.ClubDetail, Page.AssetDetail].includes(page)) {
        openWalletModal();
    } else {
        if(page !== Page.ClubDetail) {
            setClubId(null);
        }
        if(page !== Page.AssetDetail) {
            setAssetId(null);
        }
        _setCurrentPage(page);
    }
  }
  
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
        const newTheme = prevTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        return newTheme;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage: navigateTo,
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
        currentProfileTab, 
        setCurrentProfileTab,
        clubId,
        setClubId,
        assetId,
        setAssetId,
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