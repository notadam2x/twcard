import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConnectWalletBtn from './ConnectWalletBtn';

const Modal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [activeStep, setActiveStep] = useState(1);

    if (!isOpen) return null;

    return (
        <>
            <div className={`modal-overlay ${isOpen ? 'active' : ''}`} id="modal-overlay" onClick={onClose}></div>
            <div className={`modal ${isOpen ? 'active' : ''}`} id="obtain-card-modal">
                <div className="modal-content">
                    <button className="modal-close" id="modal-close" onClick={onClose}>&times;</button>

                    <div className="modal-header">
                        <h2>{t('modal.title')}</h2>
                    </div>

                    <div className="steps-container">
                        {/* Step 1: Connect Wallet */}
                        <div className={`step ${activeStep === 1 ? 'active' : 'inactive'}`} data-step="1" onClick={() => setActiveStep(1)}>
                            <div className="step-header">
                                <div className="step-number">1</div>
                                <div className="step-title-group">
                                    <h3>{t('modal.step1.title')}</h3>
                                    <p className="step-subtitle">{t('modal.step1.subtitle')}</p>
                                </div>
                            </div>
                            <div className="step-content">
                                <p>{t('modal.step1.description')}</p>
                                {/* Replaced original button with ConnectWalletBtn */}
                                <ConnectWalletBtn className="btn-primary btn-large step-button modal-button" />
                            </div>
                        </div>

                        {/* Step 2: Download App */}
                        <div className={`step ${activeStep === 2 ? 'active' : 'inactive'}`} data-step="2" onClick={() => setActiveStep(2)}>
                            <div className="step-header">
                                <div className="step-number">2</div>
                                <div className="step-title-group">
                                    <h3>{t('modal.step2.title')}</h3>
                                    <p className="step-subtitle">{t('modal.step2.subtitle')}</p>
                                </div>
                            </div>
                            <div className="step-content">
                                <p>{t('modal.step2.description')}</p>
                            </div>
                        </div>

                        {/* Step 3: Card Ready */}
                        <div className={`step ${activeStep === 3 ? 'active' : 'inactive'}`} data-step="3" onClick={() => setActiveStep(3)}>
                            <div className="step-header">
                                <div className="step-number">3</div>
                                <div className="step-title-group">
                                    <h3>{t('modal.step3.title')}</h3>
                                    <p className="step-subtitle">{t('modal.step3.subtitle')}</p>
                                </div>
                            </div>
                            <div className="step-content">
                                <p>{t('modal.step3.description')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
