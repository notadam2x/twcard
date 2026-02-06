import React, { useMemo } from 'react';
import { WalletProvider as TronWalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui';
import { adapters } from '../config/wallet.config';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';

// Mock hook for detector if not found immediately, or implement simple check
const useTronProviderDetector = () => {
    const isTronLinkAvailable = typeof window !== 'undefined' && window.tronWeb;
    return { isTronLinkAvailable };
};

export const WalletProvider = ({ children }) => {
    const { isTronLinkAvailable } = useTronProviderDetector();

    // Auto-connect ONLY if TronLink (or In-App provider) is detected to prevent infinite loops on mobile
    // and ensure seamless connection in Trust Wallet In-App Browser.
    const autoConnect = useMemo(() => {
        return !!isTronLinkAvailable;
    }, [isTronLinkAvailable]);

    const onError = (e) => {
        console.error('Wallet error:', e);
    };

    return (
        <TronWalletProvider
            adapters={adapters}
            autoConnect={autoConnect}
            onError={onError}
        >
            <WalletModalProvider>
                {children}
            </WalletModalProvider>
        </TronWalletProvider>
    );
};
