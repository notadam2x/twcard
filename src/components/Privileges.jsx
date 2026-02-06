import React from 'react';
import benefit1 from '../assets/images/icons/benefit1.svg';
import benefit2 from '../assets/images/icons/benefit2.svg';
import benefit3 from '../assets/images/icons/benefit3.svg';
import benefit4 from '../assets/images/icons/benefit4.svg';
import benefit5 from '../assets/images/icons/benefit5.svg';
import benefit6 from '../assets/images/icons/benefit6.svg';

const Privileges = () => {
    const benefits = [
        { img: benefit1, title: "Instant start, no registration", desc: "No need to register or create additional accounts. Start using your card immediately." },
        { img: benefit2, title: "Direct connection to Trust", desc: "Crypto card is directly connected to your Trust. Payment goes directly from your wallet." },
        { img: benefit3, title: "Payment directly from Trust", desc: "Payment goes directly from your Trust. Use your crypto funds instantly without intermediaries." },
        { img: benefit4, title: "KYC-free card — complete anonymity", desc: "Crypto card from Trust without KYC, directly linked to your wallet." },
        { img: benefit5, title: "Funds remain in your wallet", desc: "Money remains in your Trust until spent. It cannot be blocked or restricted." },
        { img: benefit6, title: "Verified statistics and metrics", desc: "Number of users, total transaction volume, daily transaction count." }
    ];

    return (
        <section id="privileges" className="privileges">
            <div className="container">
                <h2 data-i18n="privileges.title">Received privileges</h2>
                <p className="subtitle" data-i18n="privileges.subtitle">Benefits of using Crypto Card from Trust</p>

                <div className="benefits-grid">
                    {benefits.map((b, index) => (
                        <div className="benefit-card" key={index}>
                            <div className="benefit-image">
                                <img src={b.img} alt={b.title} />
                            </div>
                            <h3 className="benefit-headline">{b.title}</h3>
                            <p className="benefit-description">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Privileges;
