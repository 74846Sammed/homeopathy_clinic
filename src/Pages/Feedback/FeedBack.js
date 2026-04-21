import React from 'react';
import '../Feedback/Feedback.css';
import patientlogo from '../../Assets/Images/patientlogo.png';
import quotLogoLeft from '../../Assets/Images/icons8-quote-100.png';
import quotLogoRight from '../../Assets/Images/icons8-get-quote-100.png';

function FeedBack() {
    const testimonials = [
        {
            id: 1,
            message: "After struggling for years with migraines, homeopathy gave me lasting relief—without side effects. I feel like myself again!",
            name: "Aiden Wells",
            rating: 5
        },
        {
            id: 2,
            message: "Gentle, effective, and natural—homeopathy helped my child recover from asthma where all else failed. Thank you!",
            name: "Calen James",
            rating: 5
        },
        {
            id: 3,
            message: "I was skeptical at first, but after months of digestive issues, this treatment worked like magic. Forever grateful!",
            name: "Jasper Hale",
            rating: 5
        },
        {
            id: 4,
            message: "Homeopathy didn't just treat my skin allergy—it treated me as a whole person. I feel balanced and healthy again.",
            name: "Ron Weasley",
            rating: 5
        }
    ];

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span 
                key={index} 
                className={`star ${index < rating ? 'filled' : ''}`}
            >
                ★
            </span>
        ));
    };

    return (
        <div className='feedback-section'>
            <div className='container'>
                <div className='feedback-title-section text-center mb-5'>
                    <h2 className='feedback-main-title animate-fade-in'>What Our Patients Say</h2>
                    <p className='feedback-subtitle animate-fade-in-delay'>Real stories from real people who found healing through homeopathy</p>
                </div>
                
                <div className='feedback-card-container'>
                    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                        <div className="carousel-indicators carousel-indi-feedback">
                            {testimonials.map((_, index) => (
                                <button 
                                    key={index}
                                    type="button" 
                                    data-bs-target="#carouselExample" 
                                    data-bs-slide-to={index} 
                                    className={index === 0 ? "active" : ""} 
                                    aria-current={index === 0 ? "true" : "false"}
                                    aria-label={`Slide ${index + 1}`}
                                ></button>
                            ))}
                        </div>
                        
                        <div className="carousel-inner carousel-inner-feedback">
                            {testimonials.map((testimonial, index) => (
                                <div key={testimonial.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <div className='feedback-card card animate-testimonial-card'>
                                        <div className='row h-100 align-items-center'>
                                            <div className='col-md-2 col-12 text-center mb-3 mb-md-0'>
                                                <div className='feedback-img-container'>
                                                    <img className='patient-logo animate-avatar' src={patientlogo} alt="Patient Avatar" />
                                                </div>
                                            </div>
                                            <div className='col-md-10 col-12 feedback-message-container'>
                                                <div className='row align-items-center h-100'>
                                                    <div className='col-1 d-none d-md-flex left-quote-container'>
                                                        <img className='quotlogo-left animate-quote' src={quotLogoLeft} alt="Quote" />
                                                    </div>
                                                    <div className='col-md-10 col-12 message-box'>
                                                        <div className='star-rating mb-2 d-flex justify-content-center justify-content-md-start'>
                                                            {renderStars(testimonial.rating)}
                                                        </div>
                                                        <div className='message mb-3'>
                                                            "{testimonial.message}"
                                                        </div>
                                                        <div className='patient-name text-center text-md-end'>
                                                            - {testimonial.name}
                                                        </div>
                                                    </div>
                                                    <div className='col-1 d-none d-md-flex right-quote-container'>
                                                        <img className='quotlogo-right animate-quote-delay' src={quotLogoRight} alt="Quote" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button className="carousel-control-prev feedback-control" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next feedback-control" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedBack;