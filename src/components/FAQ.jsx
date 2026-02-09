import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqsData = t('faq.items', { returnObjects: true });
    const faqs = Array.isArray(faqsData) ? faqsData : [];

    return (
        <section id="faq" className="faq">
            <div className="container">
                <h2>{t('faq.title')}</h2>
                <p className="subtitle">{t('faq.subtitle')}</p>

                <div className="faq-content">
                    <div className="faq-left faq-full">
                        {faqs.map((item, index) => (
                            <div className="faq-item" key={index}>
                                <button className={`faq-question ${activeIndex === index ? 'active' : ''}`} onClick={() => toggleFaq(index)}>
                                    <span>{item.q}</span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                                <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`} id={`faq-${index}`}>
                                    <p>{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
