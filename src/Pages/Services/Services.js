import React from 'react';
import asthmaImg from '../../Assets/Images/asthmaImg.avif';
import backPainImg from '../../Assets/Images/backpainImg.jpg';
import allergyImg from '../../Assets/Images/allergyImg.jpg';
import hailfallImg from '../../Assets/Images/hairlossImg.jpg';
import infertility from '../../Assets/Images/Infertility.jpg';
import gynecology from '../../Assets/Images/Gynecology.jpeg';
import migraine from '../../Assets/Images/Migraine.jpg';
import pcod from '../../Assets/Images/pcod2.jpg';
import '../Services/Services.css';

const servicesList = [
    { img: asthmaImg,   name: 'Asthma',      alt: 'Asthma treatment homeopathy' },
    { img: allergyImg,  name: 'Allergy',     alt: 'Allergy relief homeopathy' },
    { img: backPainImg, name: 'Back Pain',   alt: 'Back pain treatment homeopathy' },
    { img: hailfallImg, name: 'Hair Fall',   alt: 'Hair fall treatment homeopathy' },
    { img: migraine,    name: 'Migraine',    alt: 'Migraine treatment homeopathy' },
    { img: gynecology,  name: 'Gynecology',  alt: 'Gynecology homeopathy clinic' },
    { img: infertility, name: 'Infertility', alt: 'Infertility treatment homeopathy' },
    { img: pcod,        name: 'PCOD',        alt: 'PCOD treatment homeopathy' },
];

function Services() {
    return (
        <section className="services-section" aria-label="Our Services">
            <div className="services-grid">
                {servicesList.map((service, index) => (
                    <article
                        className="service-card"
                        key={service.name}
                        style={{ animationDelay: `${index * 0.08}s` }}
                    >
                        <div className="service-card__img-wrap">
                            <img
                                className="service-card__img"
                                src={service.img}
                                alt={service.alt}
                                loading="lazy"
                            />
                            <div className="service-card__overlay" />
                        </div>
                        <div className="service-card__name">{service.name}</div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Services;