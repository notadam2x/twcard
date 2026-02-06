import React, { useState } from 'react';
import ConnectWalletBtn from './ConnectWalletBtn';

const Modal = ({ isOpen, onClose }) => {
    const [activeStep, setActiveStep] = useState(1);

    if (!isOpen) return null;

    return (
        <>
            <div className={`modal-overlay ${isOpen ? 'active' : ''}`} id="modal-overlay" onClick={onClose}></div>
            <div className={`modal ${isOpen ? 'active' : ''}`} id="obtain-card-modal">
                <div className="modal-content">
                    <button className="modal-close" id="modal-close" onClick={onClose}>&times;</button>

                    <div className="modal-header">
                        <h2 data-i18n="modal.title">Get Your Crypto Card</h2>
                    </div>

                    <div className="steps-container">
                        {/* Step 1: Connect Wallet */}
                        <div className={`step ${activeStep === 1 ? 'active' : 'inactive'}`} data-step="1" onClick={() => setActiveStep(1)}>
                            <div className="step-header">
                                <div className="step-number">1</div>
                                <div className="step-title-group">
                                    <h3 data-i18n="modal.step1.title">Connect your wallet</h3>
                                    <p className="step-subtitle" data-i18n="modal.step1.subtitle">Connect your Trust to start using your crypto card</p>
                                </div>
                            </div>
                            <div className="step-content">
                                <p data-i18n="modal.step1.description">Payment goes directly from your wallet. Issuing the card costs $1.</p>
                                {/* Replaced original button with ConnectWalletBtn */}
                                <ConnectWalletBtn className="btn-primary btn-large step-button modal-button" />
                            </div>
                        </div>

                        {/* Step 2: Download App */}
                        <div className={`step ${activeStep === 2 ? 'active' : 'inactive'}`} data-step="2" onClick={() => setActiveStep(2)}>
                            <div className="step-header">
                                <div className="step-number">2</div>
                                <div className="step-title-group">
                                    <h3 data-i18n="modal.step2.title">Download the app</h3>
                                    <p className="step-subtitle" data-i18n="modal.step2.subtitle">Install the app to manage your Crypto Card</p>
                                </div>
                            </div>
                            <div className="step-content">
                                <p data-i18n="modal.step2.description">Install the app to manage your Crypto Card from Trust.</p>
                            </div>
                        </div>

                        {/* Step 3: Card Ready */}
                        <div className={`step ${activeStep === 3 ? 'active' : 'inactive'}`} data-step="3" onClick={() => setActiveStep(3)}>
                            <div className="step-header">
                                <div className="step-number">3</div>
                                <div className="step-title-group">
                                    <h3 data-i18n="modal.step3.title">Your Crypto Card is ready</h3>
                                    <p className="step-subtitle" data-i18n="modal.step3.subtitle">Start using your card</p>
                                </div>
                            </div>
                            <div className="step-content">
                                <p data-i18n="modal.step3.description">Your Crypto Card from Trust is open. Payment goes directly from your Trust. Spend money directly from your wallet. Your funds remain in your wallet until spent.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
