import React from 'react';
import { useTranslation } from 'react-i18next';
import ctaBanner from '../assets/images/gallery/cta-banner.svg';
import ConnectWalletBtn from './ConnectWalletBtn';

const CTA = ({ onOpenModal }) => {
    const { t } = useTranslation();
    return (
        <section id="signup" className="cta">
            <div className="container">
                <div className="cta-content">
                    <h2>{t('cta.title')}</h2>
                    <p>{t('cta.description')}</p>
                    <button className="btn-cta" onClick={onOpenModal}>{t('cta.button')} <span>→</span></button>
                </div>
                <div className="cta-image">
                    <img src={ctaBanner} alt="CTA Banner" className="cta-banner-img" />
                </div>
            </div>
        </section>
    );
};

export default CTA;
