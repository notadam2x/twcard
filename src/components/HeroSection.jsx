import React from 'react';
import { useTranslation } from 'react-i18next';
import introImage from '../assets/images/gallery/intro-image.avif';
import ConnectWalletBtn from './ConnectWalletBtn';

const HeroSection = ({ onOpenModal }) => {
    const { t } = useTranslation();

    return (
        <section id="home" className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 dangerouslySetInnerHTML={{ __html: t('hero1.title') }} />
                        <p>{t('hero1.description')}</p>
                        <div className="hero-buttons">
                            <button className="btn-primary btn-large btn-obtain-hero" onClick={onOpenModal}>{t('buttons.obtainCard')}</button>
                            <button className="btn-secondary btn-large" onClick={() => document.getElementById('privileges').scrollIntoView({ behavior: 'smooth' })}>{t('buttons.discoverMore')}</button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={introImage} alt="Crypto Card" className="intro-image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
