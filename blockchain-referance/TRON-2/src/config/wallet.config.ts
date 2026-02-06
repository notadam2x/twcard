import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink';
import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect';
import { NETWORK_CONFIG } from './network.config';

// Placeholder Project ID - User must replace this
const PROJECT_ID = '88fb11877bf254cbeabef383f84aa87f';

export const tronLinkAdapter = new TronLinkAdapter();

export const walletConnectAdapter = new WalletConnectAdapter({
    network: NETWORK_CONFIG.adapterNetwork as any, // 'Mainnet' | 'Nile'
    options: {
        projectId: PROJECT_ID,
        metadata: {
            name: 'Tron dApp Mainnet',
            description: 'Production Grade Tron dApp',
            url: window.location.origin, // Ensures ngrok/localhost compatibility
            icons: ['https://raw.githubusercontent.com/tronprotocol/tron-wallet-adapter/main/logo.png'],
        },
    },
    web3ModalConfig: {
        themeMode: 'dark',
        themeVariables: {
            '--wcm-z-index': '1000',
        },
        // We ONLY keep the IDs. We DELIBERATELY removed 'mobileWallets' and 'desktopLinks'.
        // Reown AppKit will automatically fetch the correct Universal Links for these IDs.
        explorerRecommendedWalletIds: [
            '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
            '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369', // TronLink
        ],
    },
});

export const adapters = [tronLinkAdapter, walletConnectAdapter];
