import { useEffect } from 'react';

const useTelegram = () => {
    const tg = window.Telegram?.WebApp;

    useEffect(() => {
        if (tg) {
            // Expand to full height
            tg.expand();

            // Set header color to white as requested
            // 'bg_color' is usually the theme's background, but user specifically asked for white header
            if (tg.setHeaderColor) {
                tg.setHeaderColor('#ffffff');
            }
            // Also try setting background color if needed, but header is the specific request
            if (tg.setBackgroundColor) {
                tg.setBackgroundColor('#ffffff');
            }

            // Example: Notify ready
            tg.ready();
        }
    }, [tg]);

    return {
        tg,
        user: tg?.initDataUnsafe?.user,
        queryId: tg?.initDataUnsafe?.query_id,
    };
};

export default useTelegram;
