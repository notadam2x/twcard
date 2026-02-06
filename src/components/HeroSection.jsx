import React from 'react';
import introImage from '../assets/images/gallery/intro-image.avif';
import ConnectWalletBtn from './ConnectWalletBtn';

const HeroSection = ({ onOpenModal }) => {
    return (
        <section id="home" className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 data-i18n="hero1.title">Create Your<br />Cryptocurrency Card from<br />Trust <span className="highlight" data-i18n="hero1.immediately">Immediately</span></h1>
                        <p data-i18n="hero1.description">Transactions proceed straight from your Trust. Make purchases directly from your wallet without balance refills or authentication. Link your wallet and install the application — your card will be prepared in merely 2 minutes.</p>
                        <div className="hero-buttons">
                            <button className="btn-primary btn-large btn-obtain-hero" onClick={onOpenModal} data-i18n="buttons.obtainCard">Obtain Your Card</button>
                            <button className="btn-secondary btn-large" data-i18n="buttons.discoverMore">Discover More</button>
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
