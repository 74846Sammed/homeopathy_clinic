import React, { useState } from 'react';
import Header from '../../SharedComponents/Header/Header';
import Footer from '../../SharedComponents/Footer/Footer';
import './ContactUs.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

function ContactUs() {
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    setFormValues({ ...formValues, [field]: event.target.value });
  };

  const validate = () => {
    const nextErrors = {};
    if (!formValues.name.trim()) nextErrors.name = 'Name is required';
    if (!/^\+?[0-9\s-]{7,15}$/.test(formValues.phone.trim())) nextErrors.phone = 'Valid phone is required';
    if (!/^\S+@\S+\.\S+$/.test(formValues.email.trim())) nextErrors.email = 'Valid email is required';
    if (!formValues.subject.trim()) nextErrors.subject = 'Subject is required';
    if (formValues.message.trim().length < 10) nextErrors.message = 'Message must be at least 10 characters';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    alert('Thank you! We will contact you shortly.');
    setFormValues({ name: '', phone: '', email: '', subject: '', message: '' });
    setErrors({});
  };
  return (
    <div>
      <Header />

      <div className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="container contact-hero-content">
          <div className="contact-hero-title">Get In Touch</div>
          <div className="contact-hero-subtitle">Compassionate homeopathic care tailored to you</div>
        </div>
      </div>

      <div className="container contact-wrapper">
        <div className="row g-4">
          <div className="col-lg-7 col-md-12">
            <div className="card contact-card">
              <div className="contact-card-title">Send us a message</div>
              <form className="row g-3" onSubmit={handleSubmit} noValidate>
                <div className="col-md-6">
                  <TextField fullWidth label="Full Name" variant="outlined" size="medium" className="contact-input" value={formValues.name} onChange={handleChange('name')} error={Boolean(errors.name)} helperText={errors.name}
                  />
                </div>
                <div className="col-md-6">
                  <TextField fullWidth label="Phone Number" variant="outlined" size="medium" className="contact-input" value={formValues.phone} onChange={handleChange('phone')} error={Boolean(errors.phone)} helperText={errors.phone}
                  />
                </div>
                <div className="col-md-12">
                  <TextField fullWidth label="Email" type="email" variant="outlined" size="medium" className="contact-input" value={formValues.email} onChange={handleChange('email')} error={Boolean(errors.email)} helperText={errors.email}
                  />
                </div>
                <div className="col-md-12">
                  <TextField fullWidth label="Subject" variant="outlined" size="medium" className="contact-input" value={formValues.subject} onChange={handleChange('subject')} error={Boolean(errors.subject)} helperText={errors.subject}
                  />
                </div>
                <div className="col-md-12">
                  <TextField fullWidth label="Your Message" multiline minRows={4} variant="outlined" size="medium" className="contact-input" value={formValues.message} onChange={handleChange('message')} error={Boolean(errors.message)} helperText={errors.message}
                  />
                </div>
                <div className="col-12 d-flex gap-2 flex-wrap">
                  <Button type="submit" variant="contained" className="primary-btn">Send Message</Button>
                  <Button variant="outlined" className="outline-btn">Book An Appointment</Button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-5 col-md-12">
            <div className="card contact-info-card">
              <div className="contact-card-title">Contact Information</div>

              <div className="contact-info-item">
                <div className="contact-icon"><FaPhoneAlt /></div>
                <div>
                  <div className="contact-info-label">Call Us</div>
                  <div className="contact-info-value">+91 12345 67890</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon"><FaEnvelope /></div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">care@markhomeopathy.in</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon"><FaMapMarkerAlt /></div>
                <div>
                  <div className="contact-info-label">Clinic Address</div>
                  <div className="contact-info-value">Mark Homeopathy, 2nd Floor, Wellness Plaza, MG Road, Pune, MH 411001</div>
                </div>
              </div>

              <a className="whatsapp-cta" href="https://wa.me/911234567890" target="_blank" rel="noreferrer">
                <FaWhatsapp /> Chat on WhatsApp
              </a>

              <div className="map-container mt-3">
                <iframe title="Clinic Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.829826971393!2d73.856743!3d18.536177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06c2dcb1f1b%3A0x6a1d0cbf9e2b2e2f!2sMG%20Road!5e0!3m2!1sen!2sin!4v1700000000000" width="100%" height="230" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactUs;
