import React from 'react';
import { Wallet } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { Button } from './Button';
import { SuiIcon, GoogleIcon } from './icons/Icons';

const WalletIconGeneric: React.FC<{ name: string }> = ({ name }) => (
    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-text-primary font-bold">
        {name.charAt(0)}
    </div>
);

const MOCK_WALLETS: Omit<Wallet, 'status'>[] = [
    { name: 'Suiet', icon: <SuiIcon className="w-10 h-10" />, recommended: true, address: '0x34...eFgh', balance: 4.56 },
    { name: 'Ethos', icon: <WalletIconGeneric name="E"/>, popular: true, address: '0x56...iJkl', balance: 7.89 },
    { name: 'Martian', icon: <WalletIconGeneric name="M"/>, address: '0x78...mNop', balance: 0.12 },
    { name: 'Glass', icon: <WalletIconGeneric name="G"/>, address: '0x90...qRst', balance: 3.45 },
];

export const ConnectWalletModal: React.FC = () => {
    const { isWalletModalOpen, closeWalletModal, connectWallet, wallet: connectedWallet } = useAppContext();
    
    if (!isWalletModalOpen) return null;

    const handleZkLogin = () => {
        // Simulate zkLogin flow
        const zkWallet: Wallet = {
            name: 'Google zkLogin',
            address: '0xzk...Ggl',
            balance: 0.0,
            icon: <GoogleIcon className="w-6 h-6" />,
            status: 'Connected',
        };
        connectWallet(zkWallet, true);
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300"
            onClick={closeWalletModal}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-surface rounded-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'fadeInScale 0.3s forwards' }}
            >
                <h2 className="text-2xl font-bold text-center text-text-primary">Connect Wallet</h2>
                <p className="text-text-secondary text-center mt-2 mb-6">Choose your preferred wallet or sign in to continue.</p>
                
                <div className="space-y-3">
                    <Button
                        variant="secondary"
                        className="w-full !justify-center flex items-center gap-3 py-3"
                        onClick={handleZkLogin}
                    >
                        <GoogleIcon className="w-5 h-5" />
                        Sign in with Google
                    </Button>

                    <div className="flex items-center text-xs text-text-secondary my-4">
                        <div className="flex-grow border-t border-secondary"></div>
                        <span className="flex-shrink mx-4">OR CONNECT WITH A WALLET</span>
                        <div className="flex-grow border-t border-secondary"></div>
                    </div>

                    {MOCK_WALLETS.map((w) => {
                        const isConnected = connectedWallet?.address === w.address;
                        return (
                            <div 
                                key={w.name} 
                                className={`flex items-center p-4 rounded-lg transition-colors ${isConnected ? 'bg-primary/20 border border-primary' : 'bg-secondary/50 dark:bg-secondary/50 hover:bg-secondary'}`}
                            >
                                {w.icon}
                                <div className="ml-4 flex-grow">
                                    <h3 className="font-semibold text-text-primary">{w.name}</h3>
                                    {isConnected ? (
                                        <>
                                            <p className="text-sm text-text-secondary">{w.address}</p>
                                            <p className="text-sm text-text-secondary">{w.balance} SUI</p>
                                        </>
                                    ) : (
                                       <div className="flex items-center space-x-2">
                                            {w.recommended && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Recommended</span>}
                                            {w.popular && <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">Popular</span>}
                                       </div>
                                    )}
                                </div>
                                {isConnected ? (
                                    <div className="flex items-center text-green-400">
                                        <span className="w-2.5 h-2.5 bg-green-400 rounded-full mr-2"></span>
                                        Connected
                                    </div>
                                ) : (
                                    <Button onClick={() => connectWallet({ ...w, status: 'Connected' })}>Connect</Button>
                                )}
                            </div>
                        );
                    })}
                </div>
                
                <button className="text-sm text-primary w-full text-center mt-6">Show more options</button>
            </div>
            <style>{`
                @keyframes fadeInScale {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale {
                    animation: fadeInScale 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
};
