import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMessageSquare, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';
import { APP_NAME } from '../../utils/constants';

const Footer = () => {
    return (
        <footer className="bh-footer">
            {/* Stats Band */}
            <div className="bh-stats-band">
                <div className="bh-container bh-stats-grid">
                    {[
                        { value: '400+', label: 'Brands' },
                        { value: '30M+', label: 'Farmers Served' },
                        { value: '9K+', label: 'Products' },
                        { value: '95%+', label: 'Pincodes Served' },
                    ].map((s) => (
                        <div key={s.label} className="bh-stat-item">
                            <div className="bh-stat-value">{s.value}</div>
                            <div className="bh-stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Footer */}
            <div className="bh-footer-main">
                <div className="bh-container bh-footer-grid">
                    {/* Brand */}
                    <div className="bh-footer-brand">
                        <Link to="/" className="bh-logo" style={{ marginBottom: 12 }}>
                            <span className="bh-logo-leaf">🌱</span>
                            <span className="bh-logo-text" style={{ color: '#fff' }}>{APP_NAME}</span>
                        </Link>
                        <p className="bh-footer-about">
                            {APP_NAME} is one of the largest and innovative Indian full-stack AgriTech platforms dedicated to revolutionizing the agricultural industry in India.
                        </p>
                        <p className="bh-footer-download">Download Mobile App</p>
                        <div className="bh-social-links">
                            <a href="#" aria-label="Facebook"><FiFacebook /></a>
                            <a href="#" aria-label="Twitter"><FiTwitter /></a>
                            <a href="#" aria-label="Instagram"><FiInstagram /></a>
                            <a href="#" aria-label="YouTube"><FiYoutube /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="bh-footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            {['About Us', 'Reach Us', 'Media Links', 'Privacy Policy', 'Terms of Service', 'Grievance Redressal', 'Careers', 'Shipping/Delivery Policy', 'FAQ'].map((l) => (
                                <li key={l}><Link to="#">{l}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div className="bh-footer-col">
                        <h4>Customer Care</h4>
                        <ul>
                            {['Return & Refund Policy', 'Track Order', 'Payment Options', 'Contact Support'].map((l) => (
                                <li key={l}><Link to="#">{l}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="bh-footer-col">
                        <h4>Contact Us</h4>
                        <p className="bh-footer-contact-label">Missed Call To Order:</p>
                        <a href="tel:18003002434" className="bh-footer-phone">
                            <FiPhone size={14} /> 1800 3000 2434
                        </a>
                        <p className="bh-footer-contact-label" style={{ marginTop: 12 }}>WhatsApp:</p>
                        <a href="https://wa.me/918050797979" className="bh-footer-phone bh-footer-whatsapp">
                            <FiMessageSquare size={14} /> +91 8050797979
                        </a>
                        <div className="bh-footer-address">
                            <strong>Corporate Office:</strong>
                            <p>{APP_NAME} Pvt Ltd<br />Main Road, Nandyala,<br />Kurnool District, Andhra Pradesh,<br />Nandyala - 518501</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bh-footer-bottom">
                <div className="bh-container">
                    <p>© 2024 {APP_NAME} Pvt Ltd. All Rights Reserved.</p>
                    <div className="bh-footer-bottom-links">
                        <Link to="#">Privacy Policy</Link>
                        <Link to="#">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
