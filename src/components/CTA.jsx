import React from 'react';
import ctaBanner from '../assets/images/gallery/cta-banner.svg';
import ConnectWalletBtn from './ConnectWalletBtn';

const CTA = ({ onOpenModal }) => {
    return (
        <section id="signup" className="cta">
            <div className="container">
                <div className="cta-content">
                    <h2 data-i18n="cta.title">Join us today</h2>
                    <p data-i18n="cta.description">Crypto Card from Trust. Payment goes directly from your Trust. Secure, fast and convenient.</p>
                    <button className="btn-cta" onClick={onOpenModal} data-i18n="cta.button">Get Your Card <span>→</span></button>
                </div>
                <div className="cta-image">
                    <img src={ctaBanner} alt="CTA Banner" className="cta-banner-img" />
                </div>
            </div>
        </section>
    );
};

export default CTA;
