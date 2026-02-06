import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useTronProviderDetector } from '../hooks/useTronProviderDetector';
import { useState } from 'react';
import type { AdapterName } from '@tronweb3/tronwallet-abstract-adapter';

export const ConnectButton = () => {
    const { connect, select, connected, address, disconnect } = useWallet();
    const { isTronLinkAvailable } = useTronProviderDetector();
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = async () => {
        setIsConnecting(true);
        try {
            if (isTronLinkAvailable) {
                // Senaryo B: Trust Wallet (In-App) veya Masaüstü TronLink
                await select('TronLink' as AdapterName);
            } else {
                // Senaryo A: Mobil Tarayıcı (Reown Modal)
                await select('WalletConnect' as AdapterName);
                await connect();
            }
        } catch (e: any) {
            console.error("Bağlantı Hatası:", e);
            alert("Bağlantı Başarısız: " + e.message);
        } finally {
            setIsConnecting(false);
        }
    };

    if (connected && address) {
        return (
            <div className="flex flex-col items-center gap-3">
                <div className="px-6 py-3 bg-green-900/30 border border-green-700/50 rounded-lg text-green-400 font-mono text-lg">
                    {address}
                </div>
                <button
                    onClick={() => disconnect()}
                    className="px-4 py-2 bg-red-900/20 text-red-400 rounded hover:bg-red-900/40 text-sm border border-red-900/30 transition-colors"
                >
                    Bağlantıyı Kes
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleConnect}
            disabled={isConnecting}
            className={`
                px-8 py-4 rounded-lg font-bold text-xl
                ${isConnecting
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-700 hover:bg-blue-600 text-white'
                }
            `}
        >
            {isConnecting ? 'Bağlanıyor...' : 'Cüzdan Bağla'}
        </button>
    );
};
