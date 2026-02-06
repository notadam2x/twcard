import React from 'react';
import trustFull from '../assets/images/logo/trust-full.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <img src={trustFull} alt="Trust" className="footer-logo-img" />
                    </div>
                    <p>&copy; 2026 Trust. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
