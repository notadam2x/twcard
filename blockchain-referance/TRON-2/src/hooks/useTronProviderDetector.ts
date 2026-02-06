import { useState, useEffect } from 'react';

export function useTronProviderDetector() {
    const [isTronLinkAvailable, setIsTronLinkAvailable] = useState(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        const checkProvider = () => {
            // Check for window.tronWeb or window.tronLink
            if (typeof window !== 'undefined' && (window as any).tronWeb && (window as any).tronWeb.ready) {
                setIsTronLinkAvailable(true);
                return true; // Found
            }
            return false;
        };

        // Immediate check
        if (checkProvider()) return;

        // Polling for 3 seconds
        const startTime = Date.now();
        intervalId = setInterval(() => {
            if (checkProvider()) {
                clearInterval(intervalId);
            }
            if (Date.now() - startTime > 3000) {
                clearInterval(intervalId);
            }
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    return { isTronLinkAvailable };
}
