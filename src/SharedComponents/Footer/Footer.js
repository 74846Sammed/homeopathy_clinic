import React from 'react';
import './Footer.css';
import logo from '../../Assets/Images/logo 2.png';
import Button from '@mui/material/Button';
import { FaArrowRight, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

function Footer() {
    const specializations = [
        'Piles', 'Allergy', 'Asthma', 'PCOD', 
        'Infertility', 'Gynecology', 'Migraine', 'Hair Loss'
    ];

    const quickLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact Us', href: '/contact' }
    ];

    const handleAppointmentClick = () => {
        // Add your appointment booking logic here
        console.log('Book appointment clicked');
    };

    const handleLinkClick = (href) => {
        // Add your navigation logic here
        console.log(`Navigate to: ${href}`);
    };

    return (
        <footer className="footer-container">
            <div className="footer-content">
                {/* Hospital Info Section */}
                <div className="footer-section footer-info">
                    <div className="footer-brand">
                        <div className="footer-logo-container">
                            <img 
                                className="footer-logo" 
                                src={logo} 
                                alt="Mark's Hospital Logo"
                                loading="lazy"
                            />
                        </div>
                        <h2 className="footer-hospital-name">Mark's Hospital</h2>
                    </div>
                    
                    <p className="footer-description">
                        Our goal is to deliver quality of care in a courteous, respectful, 
                        and compassionate manner. We hope you will allow us to care for you 
                        and strive to be the first and best choice for your family healthcare.
                    </p>
                    
                    <div className="footer-cta">
                        <Button 
                            className="appointment-btn" 
                            variant="contained"
                            onClick={handleAppointmentClick}
                            aria-label="Book an appointment"
                        >
                            Book Appointment
                            <FaArrowRight className="btn-icon" />
                        </Button>
                    </div>
                </div>

                {/* Specializations Section */}
                <div className="footer-section footer-specializations">
                    <h3 className="footer-section-title">Specializations</h3>
                    <ul className="footer-list" role="list">
                        {specializations.map((specialization, index) => (
                            <li 
                                key={index} 
                                className="footer-list-item"
                                role="listitem"
                            >
                                {specialization}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quick Links Section */}
                <div className="footer-section footer-links">
                    <h3 className="footer-section-title">Quick Links</h3>
                    <ul className="footer-list" role="list">
                        {quickLinks.map((link, index) => (
                            <li 
                                key={index} 
                                className="footer-list-item"
                                role="listitem"
                            >
                                <button
                                    className="footer-link-btn"
                                    onClick={() => handleLinkClick(link.href)}
                                    aria-label={`Navigate to ${link.name}`}
                                >
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact & Map Section */}
                <div className="footer-section footer-contact">
                    <h3 className="footer-section-title">Find Us</h3>
                    
                    {/* Contact Info */}
                    <div className="contact-info">
                        <div className="contact-item">
                            <FaMapMarkerAlt className="contact-icon" />
                            <span>Centre For Scientific Homoeopathy</span>
                        </div>
                        <div className="contact-item">
                            <FaPhone className="contact-icon" />
                            <span>+91 XXX XXX XXXX</span>
                        </div>
                        <div className="contact-item">
                            <FaEnvelope className="contact-icon" />
                            <span>info@markshospital.com</span>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238.86999644622867!2d74.47002053260803!3d16.68088910985564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc0e328f8f1d05f%3A0x64a0a996a17eb395!2sCentre%20For%20Scientific%20Homoeopathy!5e0!3m2!1sen!2sin!4v1754651068147!5m2!1sen!2sin"
                            width="100%"
                            height="200"
                            style={{ border: 0, borderRadius: '8px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mark's Hospital Location"
                            aria-label="Google Maps showing Mark's Hospital location"
                        />
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p className="copyright">
                        © {new Date().getFullYear()} Mark's Hospital. All rights reserved.
                    </p>
                    <div className="footer-bottom-links">
                        <button className="footer-bottom-link">Privacy Policy</button>
                        <button className="footer-bottom-link">Terms of Service</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;