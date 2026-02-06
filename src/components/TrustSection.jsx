import React from 'react';

const TrustSection = () => {
    return (
        <section className="trust-section">
            <div className="container">
                <div className="trust-grid">
                    <div className="trust-item">
                        <div className="trust-label">Trusted by</div>
                        <div className="trust-value">200M<span className="trust-unit"> people</span></div>
                    </div>
                    <div className="trust-item">
                        <div className="trust-label">Founded in</div>
                        <div className="trust-value">2017</div>
                    </div>
                    <div className="trust-item">
                        <div className="trust-label">Independently</div>
                        <div className="trust-value">Audited</div>
                    </div>
                    <div className="trust-item">
                        <div className="trust-label">ISO</div>
                        <div className="trust-value">Certified</div>
                    </div>
                    <div className="trust-item">
                        <div className="trust-label">Top reviews</div>
                        <div className="trust-value trust-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="star-svg" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
