import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Page, User } from '../types';
import { AssetsIcon, MintIcon, PortfolioIcon, SettingsIcon, LogoutIcon, VerifiedIcon, ActivityIcon } from './icons/Icons';
import { Button } from './Button';

type ProfileTab = 'owned' | 'created' | 'activity' | 'portfolio';

const ProfileSidebarLink: React.FC<{ tab: ProfileTab; icon: JSX.Element; children: React.ReactNode; }> = ({ tab, icon, children }) => {
    const { currentProfileTab, setCurrentProfileTab } = useAppContext();
    const isActive = currentProfileTab === tab;
    return (
        <button
            onClick={() => setCurrentProfileTab(tab)}
            className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface hover:text-text-primary'
            }`}
        >
            {React.cloneElement(icon, { className: 'w-5 h-5 mr-3' })}
            {children}
        </button>
    );
};

const UserProfileCard = ({ user, wallet }: {user: User, wallet: {address: string, balance: number}}) => (
    <div className="p-4 rounded-lg bg-surface text-center">
        <img src={user.avatarUrl} alt={user.displayName} className="w-24 h-24 rounded-full mx-auto border-4 border-secondary" />
        <div className="flex items-center justify-center mt-4">
            <h2 className="text-xl font-bold text-text-primary">{user.displayName}</h2>
            {user.isVerifiedArtist && <VerifiedIcon className="w-5 h-5 ml-2 text-primary" />}
        </div>
        <p className="text-sm text-text-secondary mt-1">@{user.username}</p>
        <p className="text-xs mt-4 bg-secondary/50 dark:bg-secondary/50 rounded-md p-2 font-mono break-all">{wallet.address}</p>
        <p className="mt-2 text-lg font-bold text-primary">{wallet.balance} SUI</p>
    </div>
);

export const ProfileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, wallet, disconnectWallet, setCurrentPage } = useAppContext();

    if (!user || !wallet) {
        return <div className="pt-20 flex items-center justify-center h-screen">Redirecting...</div>;
    }

    return (
        <div className="flex min-h-screen pt-20">
            <aside className="fixed top-0 left-0 w-72 h-full bg-background border-r border-secondary pt-20">
                <div className="p-6 h-full flex flex-col">
                    <UserProfileCard user={user} wallet={wallet} />
                    <nav className="flex-grow space-y-2 mt-6">
                        <ProfileSidebarLink tab="owned" icon={<AssetsIcon />}>Owned Assets</ProfileSidebarLink>
                        <ProfileSidebarLink tab="created" icon={<MintIcon />}>Created Assets</ProfileSidebarLink>
                        <ProfileSidebarLink tab="activity" icon={<ActivityIcon />}>Activity Feed</ProfileSidebarLink>
                        <ProfileSidebarLink tab="portfolio" icon={<PortfolioIcon />}>Portfolio</ProfileSidebarLink>
                    </nav>
                    <div className="mt-auto space-y-2">
                        <Button variant="ghost" className="w-full !justify-start" onClick={() => setCurrentPage(Page.Settings)}>
                            <SettingsIcon className="w-5 h-5 mr-3" />
                            Settings
                        </Button>
                        <Button variant="ghost" className="w-full !justify-start text-red-500/80 hover:!bg-red-500/10 hover:!text-red-500" onClick={disconnectWallet}>
                           <LogoutIcon className="w-5 h-5 mr-3" />
                           Disconnect
                        </Button>
                    </div>
                </div>
            </aside>
            <main className="ml-72 flex-1 p-8">
                {children}
            </main>
        </div>
    );
};