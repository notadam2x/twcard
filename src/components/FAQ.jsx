import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            q: "What is Crypto Card from Trust?",
            a: "Crypto Card from Trust is a card for users who want to use cryptocurrencies in their daily life. Payment goes directly from your Trust. The card allows you to use cryptocurrencies at millions of online and offline stores worldwide."
        },
        {
            q: "How does Crypto Card from Trust work?",
            a: "The crypto card connects directly to your Trust and allows you to spend your cryptocurrency funds instantly at any merchant that accepts the card. Transactions are processed securely and quickly."
        },
        {
            q: "Do I need Trust to get or use a crypto card?",
            a: "Yes, you need Trust to use the crypto card. The card is directly integrated with Trust for seamless transactions and fund management."
        },
        {
            q: "What can I do with Crypto Card from Trust?",
            a: "You can use your crypto card to make online and offline purchases at millions of retailers worldwide. You can also withdraw cash from ATMs in most countries."
        },
        {
            q: "What are the prerequisites for ordering Crypto Card?",
            a: "You need to have a Trust account with verified identity. Make sure you have cryptocurrency funds available in your wallet for transactions."
        }
    ];

    return (
        <section id="faq" className="faq">
            <div className="container">
                <h2 data-i18n="faq.title">FAQ</h2>
                <p className="subtitle" data-i18n="faq.subtitle">Find answers to some of the most common questions</p>

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
