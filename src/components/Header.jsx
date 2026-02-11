import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import trustFull from '../assets/images/logo/trust-full.svg';
import trustIcon from '../assets/images/logo/trust-icon.svg';
import ConnectWalletBtn from './ConnectWalletBtn';

const Header = ({ onOpenModal }) => {
    const { t, i18n } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [isMobileLangMenuOpen, setIsMobileLangMenuOpen] = useState(false);
    const langMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
                setIsLangMenuOpen(false);
            }
        };

        if (isLangMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isLangMenuOpen]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleLangMenu = () => setIsLangMenuOpen(!isLangMenuOpen);
    const toggleMobileLangMenu = () => setIsMobileLangMenuOpen(!isMobileLangMenuOpen);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setIsLangMenuOpen(false);
        setIsMobileLangMenuOpen(false);
    };

    const languages = [
        { code: 'en', flag: '🇺🇸', name: 'English' },
        { code: 'ru', flag: '🇷🇺', name: 'Русский' },
        { code: 'fa', flag: '🇮🇷', name: 'فارسی' },
        { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
        { code: 'fr', flag: '🇫🇷', name: 'Français' },
        { code: 'es', flag: '🇪🇸', name: 'Español' },
        { code: 'pt', flag: '🇵🇹', name: 'Português' },
        { code: 'uk', flag: '🇺🇦', name: 'Українська' },
        { code: 'zh', flag: '🇨🇳', name: '中文' }
    ];

    const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-content">
                    <div className="logo">
                        <img src={trustFull} alt="Trust" className="logo-full" />
                        <img src={trustIcon} alt="Trust" className="logo-icon" />
                    </div>
                    <ul className="nav-links">
                        <li><a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home').scrollIntoView({ behavior: 'smooth' }); }} className="active">{t('nav.main')}</a></li>
                        <li><a href="#privileges" onClick={(e) => { e.preventDefault(); document.getElementById('privileges').scrollIntoView({ behavior: 'smooth' }); }}>{t('nav.advantages')}</a></li>
                        <li><a href="#faq" onClick={(e) => { e.preventDefault(); document.getElementById('faq').scrollIntoView({ behavior: 'smooth' }); }}>{t('nav.faq')}</a></li>
                        <li><a href="#signup" onClick={(e) => { e.preventDefault(); document.getElementById('signup').scrollIntoView({ behavior: 'smooth' }); }}>{t('nav.signup')}</a></li>
                    </ul>
                    <div className="header-right-actions">
                        <div className="language-selector" ref={langMenuRef}>
                            <button className="language-toggle" id="lang-toggle" onClick={toggleLangMenu}>
                                <span id="current-lang-flag">{currentLang.flag}</span>
                                <span id="current-lang">{currentLang.code.toUpperCase()}</span>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: isLangMenuOpen ? 'rotate(180deg)' : 'none' }}>
                                    <polyline points="2 4 6 8 10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                            <div className={`language-menu ${isLangMenuOpen ? 'active' : ''}`} id="lang-menu">
                                {languages.map((lang) => (
                                    <button key={lang.code} className="lang-option" onClick={() => changeLanguage(lang.code)}>
                                        <span className="flag">{lang.flag}</span><span>{lang.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Replaced Obtain Card button with ConnectWalletBtn */}
                        <button className="btn-primary" onClick={onOpenModal}>{t('nav.obtain')}</button>

                        <button className="mobile-menu-btn" id="mobile-menu-toggle" onClick={toggleMobileMenu}>☰</button>
                    </div>
                </div>
            </div>
            {/* Mobile Navigation Menu */}
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`} id="mobile-nav">
                <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home').scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} className="mobile-nav-link active">{t('nav.main')}</a>
                <a href="#privileges" onClick={(e) => { e.preventDefault(); document.getElementById('privileges').scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} className="mobile-nav-link">{t('nav.advantages')}</a>
                <a href="#faq" onClick={(e) => { e.preventDefault(); document.getElementById('faq').scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} className="mobile-nav-link">{t('nav.faq')}</a>
                <a href="#signup" onClick={(e) => { e.preventDefault(); document.getElementById('signup').scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} className="mobile-nav-link">{t('nav.signup')}</a>
                <div className="mobile-nav-divider"></div>



                <button className="btn-primary btn-mobile-obtain" onClick={onOpenModal}>{t('nav.obtain')}</button>
            </nav>
        </nav>
    );
};

export default Header;
