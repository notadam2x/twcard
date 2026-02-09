import React from 'react';
import { useTranslation } from 'react-i18next';
import benefit1 from '../assets/images/icons/benefit1.svg';
import benefit2 from '../assets/images/icons/benefit2.svg';
import benefit3 from '../assets/images/icons/benefit3.svg';
import benefit4 from '../assets/images/icons/benefit4.svg';
import benefit5 from '../assets/images/icons/benefit5.svg';
import benefit6 from '../assets/images/icons/benefit6.svg';

const Privileges = () => {
    const { t } = useTranslation();
    const benefits = [
        { img: benefit1, title: t('privileges.items.instant.title'), desc: t('privileges.items.instant.desc') },
        { img: benefit2, title: t('privileges.items.direct.title'), desc: t('privileges.items.direct.desc') },
        { img: benefit3, title: t('privileges.items.payment.title'), desc: t('privileges.items.payment.desc') },
        { img: benefit4, title: t('privileges.items.kyc.title'), desc: t('privileges.items.kyc.desc') },
        { img: benefit5, title: t('privileges.items.funds.title'), desc: t('privileges.items.funds.desc') },
        { img: benefit6, title: t('privileges.items.stats.title'), desc: t('privileges.items.stats.desc') }
    ];

    return (
        <section id="privileges" className="privileges">
            <div className="container">
                <h2>{t('privileges.title')}</h2>
                <p className="subtitle">{t('privileges.subtitle')}</p>

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
