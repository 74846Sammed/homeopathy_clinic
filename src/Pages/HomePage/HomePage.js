import React from 'react';
import Header from '../../SharedComponents/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import slide1 from '../../Assets/Images/carousel1.jpg';
import slide2 from '../../Assets/Images/carousel4.jpg';
import slide3 from '../../Assets/Images/carousel3.jpg';
import docImg from '../../Assets/Images/doctor_img.jpg';
import '../HomePage/HomePage.css';
import Button from '@mui/material/Button';
import { FaArrowRight } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import Faq from '../Faq/Faq';
import Services from '../Services/Services';
import FeedBack from '../Feedback/FeedBack';
import Footer from '../../SharedComponents/Footer/Footer';

function HomePage() {
    return (
        <div>
            <div>
                <Header />
            </div>
            
            {/* Hero Carousel Section */}
            <div style={{ marginTop: '70px' }}>
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner carousel-inner-imgSlider">
                        <div className="carousel-item active">
                            <img src={slide1} className="d-block w-100 carousel-image" alt="Slide 1" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5 className="slide-title animate-slide-up">Expert Homeopathic Care</h5>
                                <p className="slide-description animate-slide-up-delay">Discover natural healing with our experienced doctors and personalized treatment plans.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={slide2} className="d-block w-100 carousel-image" alt="Slide 2" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5 className="slide-title animate-slide-up">Holistic Wellness</h5>
                                <p className="slide-description animate-slide-up-delay">Treating the whole person - mind, body, and spirit for complete healing.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={slide3} className="d-block w-100 carousel-image" alt="Slide 3" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5 className="slide-title animate-slide-up">Trusted Healthcare</h5>
                                <p className="slide-description animate-slide-up-delay">Over 15 years of experience with 40,000+ satisfied patients worldwide.</p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            {/* Info Cards Section */}
            <div className='card-container container mt-4'>
                <div className='row g-3 w-100'>
                    <div className='col-lg-4 col-md-12'>
                        <div className='card first-card d-flex flex-row p-3 animate-card-hover'>
                            <div className='col-3 d-flex justify-content-center align-items-center'>
                                <div className="icon-container">
                                    <img width="64" height="64" src="https://img.icons8.com/plasticine/100/phone.png" alt="phone" className="card-icon" />
                                </div>
                            </div>
                            <div className='col-9 d-flex flex-column justify-content-center'>
                                <div className='first-title'>Emergency Cases</div>
                                <div className='content mt-2'>
                                    <div className='content-lines'>Please feel free to contact our friendly reception staff with any general or medical enquiry.</div>
                                </div>
                                <div className='phoneNo mt-2'>+91 1234567890</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-12'>
                        <div className='card second-card d-flex flex-row p-3 animate-card-hover'>
                            <div className='col-3 d-flex justify-content-center align-items-center'>
                                <div className="icon-container">
                                    <img width="64" height="64" src="https://img.icons8.com/3d-fluency/94/paste.png" alt="paste" className="card-icon" />
                                </div>
                            </div>
                            <div className='col-9 d-flex flex-column justify-content-center'>
                                <div className='first-title'>Doctors Timetable</div>
                                <div className='content mt-2'>
                                    <div className='content-lines'>Qualified doctors available six days a week, view our timetable to make an appointment.</div>
                                </div>
                                <div className='btn-div mt-2'>
                                    <Button className='timetable-btn animated-btn' variant='contained'>
                                        View Timetable<FaArrowRight style={{ marginLeft: '5px' }} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-12'>
                        <div className='card third-card d-flex flex-row p-3 animate-card-hover'>
                            <div className='col-3 d-flex justify-content-center align-items-center'>
                                <div className="icon-container">
                                    <img width="64" height="64" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-hospital-nursing-flaticons-flat-flat-icons-2.png" alt="external-hospital-nursing-flaticons-flat-flat-icons-2" className="card-icon" />
                                </div>
                            </div>
                            <div className='col-9 d-flex flex-column justify-content-center'>
                                <div className='first-title'>Opening Hours</div>
                                <div className='content mt-2'>
                                    <div className='content-lines'>Monday - Friday 8.00am - 7:00 pm</div>
                                    <div className='content-lines'>Saturday 9.00am - 10:00 pm</div>
                                    <div className='content-lines'>Sunday weekly off</div>
                                </div>
                                <div className='btn-div mt-2'>
                                    <Button className='book-appo-btn animated-btn' variant='contained'>
                                        Book Appointment<FaArrowRight style={{ marginLeft: '5px' }} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Us Section */}
            <div className='about-us-container container my-5'>
                <div className='row align-items-center g-4'>
                    <div className='col-lg-6 col-md-12 about-us-desc animate-fade-in-left'>
                        <div className='mark-hospital-title mb-3'>
                            Mark Hospital – India's Trusted Homeopathy Hospital
                        </div>
                        <div className='hospital-description'>
                            Mark Hospital is one of India's leading homeopathic hospitals, renowned for offering safe, gentle, and result-oriented treatments through classical homeopathy. With a team of expert doctors and a commitment to personalized care, we aim to heal not just the disease, but the person as a whole mind, body, and spirit.
                            <br /><br />
                            Our mission is to provide accessible, affordable, and effective homeopathic care to people across India and beyond. Over the years, we've helped thousands overcome chronic, lifestyle, and emotional health challenges naturally and without side effects.
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 why-choose-us animate-fade-in-right'>
                        <div className='card why-choose-us-card'>
                            <div className='title mb-3'>Why Choose Us?</div>
                            <div className='choose-us-points mb-2'>
                                <div className='col-1'>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className='col-11'>
                                    Blending classical techniques with modern diagnostic tools for precise treatment.
                                </div>
                            </div>
                            <div className='choose-us-points mb-2'>
                                <div className='col-1'>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className='col-11'>
                                    We use the highest quality medicines sourced from trusted international homeopathic labs.
                                </div>
                            </div>
                            <div className='choose-us-points mb-2'>
                                <div className='col-1'>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className='col-11'>
                                    Proven success in treating chronic, recurring, and lifestyle disorders.
                                </div>
                            </div>
                            <div className='choose-us-points mb-2'>
                                <div className='col-1'>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className='col-11'>
                                    Helping many couples conceive naturally through specialized homeopathic care.
                                </div>
                            </div>
                            <div className='choose-us-points'>
                                <div className='col-1'>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className='col-11'>
                                    Drug-free healing that supports the body's natural recovery system.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Doctors Section */}
            <div className='doctors-info'>
                <div className='doc-info-title mb-4'>
                    <div className='meet-doc-text animate-fade-in'>Meet Our Doctors</div>
                </div>
                <div className='container'>
                    <div className='row justify-content-center g-4'>
                        <div className='col-lg-4 col-md-6 col-sm-8'>
                            <div className='card doctor-card animate-doctor-card'>
                                <div className='doc-img-container'>
                                    <img className='doc-img' src={docImg} alt="Dr. Mark Smith" />
                                </div>
                                <div className='doc-specialization'>
                                    <div className='doc-name'>Dr. Mark Smith</div>
                                    <div className='doc-education'>MBBS, DOMS, FCPS (MUMBAI)</div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-8'>
                            <div className='card doctor-card animate-doctor-card'>
                                <div className='doc-img-container'>
                                    <img className='doc-img' src={docImg} alt="Dr. Sarah Johnson" />
                                </div>
                                <div className='doc-specialization'>
                                    <div className='doc-name'>Dr. Sarah Johnson</div>
                                    <div className='doc-education'>BHMS, MD (HOM), PhD</div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-8'>
                            <div className='card doctor-card animate-doctor-card'>
                                <div className='doc-img-container'>
                                    <img className='doc-img' src={docImg} alt="Dr. Robert Wilson" />
                                </div>
                                <div className='doc-specialization'>
                                    <div className='doc-name'>Dr. Robert Wilson</div>
                                    <div className='doc-education'>DHMS, FCAH, CCH</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className='services-container py-5'>
                <div className='title animate-fade-in'>Services and Specialties</div>
                <div className='services-cards'>
                    <Services />
                </div>
            </div>

            {/* Success Numbers Section */}
            <div className='success-numbers'>
                <div className='success-overlay'></div>
                <div className='container'>
                    <div className='row justify-content-center g-4'>
                        <div className='col-lg-3 col-md-6 col-sm-6'>
                            <div className='card success-card animate-counter'>
                                <div className='no counter-number' data-target="15">15+</div>
                                <div className='title'>Years of Legacy</div>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-6'>
                            <div className='card success-card animate-counter'>
                                <div className='no counter-number' data-target="40000">40000+</div>
                                <div className='title'>Satisfied Patients</div>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-6'>
                            <div className='card success-card animate-counter'>
                                <div className='no counter-number' data-target="10000">10000</div>
                                <div className='title'>Cured Without Surgery</div>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-6'>
                            <div className='card success-card animate-counter'>
                                <div className='no counter-number' data-target="15000">15000</div>
                                <div className='title'>Allergy Relieved Patients</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Section */}
            <div className='feedback-container py-5'>
                <FeedBack />
            </div>

            {/* FAQ Section */}
            <div className='faq-container-fluid py-5'>
                <div className='faq-title mb-4 animate-fade-in'>Frequently Asked Questions</div>
                <div className='container'>
                    <Faq />
                </div>
            </div>

            {/* Footer */}
            <div className='footer-homepage'>
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;