import type { FC, PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { WalletProvider as TronWalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui';
import { adapters } from '../config/wallet.config';
import { useTronProviderDetector } from '../hooks/useTronProviderDetector';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';

export const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
    const { isTronLinkAvailable } = useTronProviderDetector();

    // Auto-connect ONLY if TronLink (or In-App provider) is detected to prevent infinite loops on mobile
    // and ensure seamless connection in Trust Wallet In-App Browser.
    const autoConnect = useMemo(() => {
        return isTronLinkAvailable;
    }, [isTronLinkAvailable]);

    const onError = (e: any) => {
        console.error('Wallet error:', e);
        // You can add distinct error UI handling here (e.g. toast)
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
