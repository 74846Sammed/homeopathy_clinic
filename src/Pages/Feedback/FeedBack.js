import React, { useState, useEffect, useCallback } from 'react';
import '../Feedback/Feedback.css';
import patientlogo from '../../Assets/Images/patientlogo.png';

const testimonials = [
    {
        id: 1,
        message: "After struggling for years with migraines, homeopathy gave me lasting relief—without side effects. I feel like myself again!",
        name: "Aiden Wells",
        location: "Mumbai, India",
        rating: 5,
        initial: "A"
    },
    {
        id: 2,
        message: "Gentle, effective, and natural—homeopathy helped my child recover from asthma where all else failed. Thank you!",
        name: "Calen James",
        location: "Pune, India",
        rating: 5,
        initial: "C"
    },
    {
        id: 3,
        message: "I was skeptical at first, but after months of digestive issues, this treatment worked like magic. Forever grateful!",
        name: "Jasper Hale",
        location: "Delhi, India",
        rating: 5,
        initial: "J"
    },
    {
        id: 4,
        message: "Homeopathy didn't just treat my skin allergy—it treated me as a whole person. I feel balanced and healthy again.",
        name: "Ron Weasley",
        location: "Bangalore, India",
        rating: 5,
        initial: "R"
    }
];

function StarRating({ rating }) {
    return (
        <div className="fb-stars" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={`fb-star ${i < rating ? 'fb-star--filled' : ''}`} aria-hidden="true">★</span>
            ))}
        </div>
    );
}

function FeedBack() {
    const [active, setActive] = useState(0);
    const [animating, setAnimating] = useState(false);
    const total = testimonials.length;

    const goTo = useCallback((index) => {
        if (animating) return;
        setAnimating(true);
        setTimeout(() => {
            setActive((index + total) % total);
            setAnimating(false);
        }, 320);
    }, [animating, total]);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => goTo(active + 1), 5000);
        return () => clearInterval(timer);
    }, [active, goTo]);

    const t = testimonials[active];

    return (
        <section className="fb-section" aria-label="Patient Testimonials">
            {/* Decorative blobs */}
            <div className="fb-blob fb-blob--tl" aria-hidden="true" />
            <div className="fb-blob fb-blob--br" aria-hidden="true" />

            <div className="fb-inner">
                {/* Heading */}
                <header className="fb-header">
                    <span className="fb-eyebrow">Testimonials</span>
                    <h2 className="fb-title">What Our Patients Say</h2>
                    <p className="fb-subtitle">
                        Real stories from real people who found healing through homeopathy
                    </p>
                </header>

                {/* Card area */}
                <div className="fb-stage">
                    {/* Dot nav — left side on desktop, top on mobile */}
                    <nav className="fb-dots" aria-label="Testimonial navigation">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                className={`fb-dot ${i === active ? 'fb-dot--active' : ''}`}
                                onClick={() => goTo(i)}
                                aria-label={`Go to testimonial ${i + 1}`}
                                aria-current={i === active}
                            />
                        ))}
                    </nav>

                    {/* Testimonial card */}
                    <article
                        className={`fb-card ${animating ? 'fb-card--exit' : 'fb-card--enter'}`}
                        key={active}
                        aria-live="polite"
                    >
                        {/* Big decorative quote mark */}
                        <span className="fb-bigquote" aria-hidden="true">"</span>

                        <StarRating rating={t.rating} />

                        <blockquote className="fb-message">
                            {t.message}
                        </blockquote>

                        <div className="fb-author">
                            <div className="fb-avatar" aria-hidden="true">
                                <img src={patientlogo} alt="" className="fb-avatar__img" />
                                <span className="fb-avatar__initial">{t.initial}</span>
                            </div>
                            <div className="fb-author__info">
                                <strong className="fb-author__name">{t.name}</strong>
                                <span className="fb-author__location">{t.location}</span>
                            </div>
                        </div>
                    </article>

                    {/* Prev / Next */}
                    <div className="fb-arrows">
                        <button
                            className="fb-arrow fb-arrow--prev"
                            onClick={() => goTo(active - 1)}
                            aria-label="Previous testimonial"
                        >
                            ‹
                        </button>
                        <button
                            className="fb-arrow fb-arrow--next"
                            onClick={() => goTo(active + 1)}
                            aria-label="Next testimonial"
                        >
                            ›
                        </button>
                    </div>
                </div>

                {/* Thumbnail strip */}
                <div className="fb-strip" role="list">
                    {testimonials.map((item, i) => (
                        <button
                            key={item.id}
                            className={`fb-strip__item ${i === active ? 'fb-strip__item--active' : ''}`}
                            onClick={() => goTo(i)}
                            role="listitem"
                            aria-label={`View testimonial from ${item.name}`}
                        >
                            <span className="fb-strip__initial">{item.initial}</span>
                            <span className="fb-strip__name">{item.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeedBack;