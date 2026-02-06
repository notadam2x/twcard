import React, { useState } from 'react';
import trustFull from '../assets/images/logo/trust-full.svg';
import trustIcon from '../assets/images/logo/trust-icon.svg';
import ConnectWalletBtn from './ConnectWalletBtn';

const Header = ({ onOpenModal }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [isMobileLangMenuOpen, setIsMobileLangMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleLangMenu = () => setIsLangMenuOpen(!isLangMenuOpen);
    const toggleMobileLangMenu = () => setIsMobileLangMenuOpen(!isMobileLangMenuOpen);

    return (
        <nav class="navbar">
            <div class="container">
                <div class="nav-content">
                    <div class="logo">
                        <img src={trustFull} alt="Trust" class="logo-full" />
                        <img src={trustIcon} alt="Trust" class="logo-icon" />
                    </div>
                    <ul class="nav-links">
                        <li><a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home').scrollIntoView({ behavior: 'smooth' }); }} class="active" data-i18n="nav.main">Main</a></li>
                        <li><a href="#privileges" onClick={(e) => { e.preventDefault(); document.getElementById('privileges').scrollIntoView({ behavior: 'smooth' }); }} data-i18n="nav.advantages">Advantages</a></li>
                        <li><a href="#faq" onClick={(e) => { e.preventDefault(); document.getElementById('faq').scrollIntoView({ behavior: 'smooth' }); }} data-i18n="nav.faq">FAQ</a></li>
                        <li><a href="#signup" onClick={(e) => { e.preventDefault(); document.getElementById('signup').scrollIntoView({ behavior: 'smooth' }); }} data-i18n="nav.signup">Sign Up</a></li>
                    </ul>
                    <div class="language-selector">
                        <button class="language-toggle" id="lang-toggle" onClick={toggleLangMenu}>
                            <span id="current-lang-flag">🇺🇸</span>
                            <span id="current-lang">EN</span>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: isLangMenuOpen ? 'rotate(180deg)' : 'none' }}>
                                <polyline points="2 4 6 8 10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </button>
                        <div class={`language-menu ${isLangMenuOpen ? 'active' : ''}`} id="lang-menu">
                            <button class="lang-option" data-lang="en"><span class="flag">🇺🇸</span><span>English</span></button>
                            <button class="lang-option" data-lang="ru"><span class="flag">🇷🇺</span><span>Русский</span></button>
                            <button class="lang-option" data-lang="de"><span class="flag">🇩🇪</span><span>Deutsch</span></button>
                            <button class="lang-option" data-lang="fr"><span class="flag">🇫🇷</span><span>Français</span></button>
                            <button class="lang-option" data-lang="es"><span class="flag">🇪🇸</span><span>Español</span></button>
                            <button class="lang-option" data-lang="pt"><span class="flag">🇵🇹</span><span>Português</span></button>
                            <button class="lang-option" data-lang="uk"><span class="flag">🇺🇦</span><span>Українська</span></button>
                            <button class="lang-option" data-lang="zh"><span class="flag">🇨🇳</span><span>中文</span></button>
                        </div>
                    </div>
                    {/* Replaced Obtain Card button with ConnectWalletBtn */}
                    <button className="btn-primary" onClick={onOpenModal} data-i18n="nav.obtain">Obtain Card</button>

                    <button class="mobile-menu-btn" id="mobile-menu-toggle" onClick={toggleMobileMenu}>☰</button>
                </div>
            </div>
            {/* Mobile Navigation Menu */}
            <nav class={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`} id="mobile-nav">
                <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home').scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} class="mobile-nav-link active" data-i18n="nav.main">Main</a>
                <a href="#privileges" onClick={(e) => { e.preventDefault(); document.getElementById('privileges').scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} class="mobile-nav-link" data-i18n="nav.advantages">Advantages</a>
                <a href="#faq" onClick={(e) => { e.preventDefault(); document.getElementById('faq').scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} class="mobile-nav-link" data-i18n="nav.faq">FAQ</a>
                <a href="#signup" onClick={(e) => { e.preventDefault(); document.getElementById('signup').scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} class="mobile-nav-link" data-i18n="nav.signup">Sign Up</a>
                <div class="mobile-nav-divider"></div>

                <div class="mobile-language-section">
                    <button class="mobile-language-toggle" id="mobile-lang-toggle" onClick={toggleMobileLangMenu}>
                        <span id="mobile-current-lang-flag">🇺🇸</span>
                        <span id="mobile-current-lang">EN</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: isMobileLangMenuOpen ? 'rotate(180deg)' : 'none' }}>
                            <polyline points="2 4 6 8 10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                    </button>
                    <div class={`mobile-language-menu ${isMobileLangMenuOpen ? 'active' : ''}`} id="mobile-lang-menu">
                        <button class="mobile-lang-option" data-lang="en"><span class="flag">🇺🇸</span><span>English</span></button>
                        <button class="mobile-lang-option" data-lang="ru"><span class="flag">🇷🇺</span><span>Русский</span></button>
                        <button class="mobile-lang-option" data-lang="de"><span class="flag">🇩🇪</span><span>Deutsch</span></button>
                        <button class="mobile-lang-option" data-lang="fr"><span class="flag">🇫🇷</span><span>Français</span></button>
                        <button class="mobile-lang-option" data-lang="es"><span class="flag">🇪🇸</span><span>Español</span></button>
                        <button class="mobile-lang-option" data-lang="pt"><span class="flag">🇵🇹</span><span>Português</span></button>
                        <button class="mobile-lang-option" data-lang="uk"><span class="flag">🇺🇦</span><span>Українська</span></button>
                        <button class="mobile-lang-option" data-lang="zh"><span class="flag">🇨🇳</span><span>中文</span></button>
                    </div>
                </div>

                <button className="btn-primary btn-mobile-obtain" onClick={onOpenModal} data-i18n="nav.obtain">Obtain Card</button>
            </nav>
        </nav>
    );
};

export default Header;
