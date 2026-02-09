import React from 'react';
import { useTranslation } from 'react-i18next';

const TrustSection = () => {
    const { t } = useTranslation();
    return (
        <section className="trust-section">
            <div className="container">
                <div className="trust-grid">
                    <div className="trust-item">
                        <div className="trust-label">{t('trust.label1')}</div>
                        <div className="trust-value">{t('trust.value1')}<span className="trust-unit"> {t('trust.people')}</span></div>
                    </div>
                    <div className="trust-item">
                        <div className="trust-label">{t('trust.label2')}</div>
                        <div className="trust-value">{t('trust.value2')}</div>
                    </div>
                    <div className="trust-item">
                        <div className="trust-label">{t('trust.label3')}</div>
                        <div className="trust-value">{t('trust.value3')}</div>
                    </div>
                    <div className="trust-item">
                        <div className="trust-label">{t('trust.label4')}</div>
                        <div className="trust-value">{t('trust.value4')}</div>
                    </div>
                    <div className="trust-item">
                        <div className="trust-label">{t('trust.label5')}</div>
                        <div className="trust-value trust-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="star-svg" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
