import { useEffect } from 'react';

const useTelegram = () => {
    const tg = window.Telegram?.WebApp;

    useEffect(() => {
        if (tg) {
            // Expand to full height
            tg.expand();

            // Set header color to white as requested
            if (tg.setHeaderColor) {
                tg.setHeaderColor('#ffffff');
            }
            // Also try setting background color if needed
            if (tg.setBackgroundColor) {
                tg.setBackgroundColor('#ffffff');
            }

            // Notify ready
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
