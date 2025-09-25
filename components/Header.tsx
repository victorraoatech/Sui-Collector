import React from 'react';
import { Page } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { Button } from './Button';
import { LogoIcon, SearchIcon, BellIcon } from './icons/Icons';

const NavLink: React.FC<{ page: Page; children: React.ReactNode; }> = ({ page, children }) => {
    const { currentPage, setCurrentPage } = useAppContext();
    const isActive = currentPage === page;
    return (
        <button 
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
        >
            {children}
        </button>
    );
};

export const Header: React.FC = () => {
    const { isAuthenticated, openWalletModal, user, setCurrentPage } = useAppContext();

    const handleNav = (page: Page) => {
        setCurrentPage(page);
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-lg z-40">
            <div className="max-w-screen-2xl mx-auto px-6 h-20 flex items-center justify-between border-b border-secondary">
                <div className="flex items-center gap-8">
                    <button onClick={() => handleNav(Page.Home)} className="flex items-center gap-2">
                        <LogoIcon className="w-8 h-8"/>
                        <span className="text-xl font-bold text-text-primary">SuiCollect</span>
                    </button>
                     <nav className="hidden md:flex items-center gap-2">
                       <NavLink page={Page.Marketplace}>Explore</NavLink>
                       <NavLink page={Page.MintNewAsset}>Create</NavLink>
                       <NavLink page={Page.Clubs}>Clubs</NavLink>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Search assets..."
                            className="bg-surface border border-secondary rounded-lg pl-10 pr-4 py-2 w-64 text-sm focus:ring-primary focus:border-primary focus:outline-none"
                        />
                    </div>

                    {isAuthenticated && user ? (
                        <div className="flex items-center gap-4">
                            <button className="p-2 rounded-full hover:bg-surface text-text-secondary hover:text-text-primary transition-colors">
                                <BellIcon className="w-6 h-6" />
                            </button>
                            <button onClick={() => handleNav(Page.Profile)} className="flex items-center gap-2">
                                <img src={user.avatarUrl} alt="User" className="w-10 h-10 rounded-full" />
                            </button>
                        </div>
                    ) : (
                       <div className="flex items-center gap-4">
                            <nav className="hidden md:flex items-center gap-2">
                               <button onClick={openWalletModal} className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Activity</button>
                               <button onClick={openWalletModal} className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Docs</button>
                            </nav>
                           <Button onClick={openWalletModal}>Connect Wallet</Button>
                       </div>
                    )}
                </div>
            </div>
        </header>
    );
};
