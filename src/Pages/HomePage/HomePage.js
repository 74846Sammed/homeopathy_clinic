import React, { useEffect, useRef, useState } from 'react';
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
import { FaCheckCircle, FaLeaf, FaHeart, FaShieldAlt, FaStar, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Faq from '../Faq/Faq';
import Services from '../Services/Services';
import FeedBack from '../Feedback/FeedBack';
import Footer from '../../SharedComponents/Footer/Footer';
import BookAppointment from '../BookAppointmentModel/BookAppointmentModel';

/* ─────────────────────────────────────────────
   LOCAL BUSINESS SCHEMA — Core SEO Power
───────────────────────────────────────────── */
const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "LocalBusiness"],
  "name": "Mark Hospital – Best Homeopathy Hospital in Ichalkaranji, Kolhapur",
  "alternateName": "Mark Homeopathic Hospital Ichalkaranji",
  "description": "Mark Hospital is the most trusted and best homeopathy hospital in Ichalkaranji and Kolhapur district. Offering expert classical homeopathy treatment for chronic diseases, skin disorders, allergies, thyroid, PCOS, and more with 15+ years of proven results.",
  "url": "https://www.markhospital.in",
  "logo": "https://www.markhospital.in/logo.png",
  "image": "https://www.markhospital.in/hospital-front.jpg",
  "telephone": "+91-1234567890",
  "priceRange": "₹₹",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, UPI, Card",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "YOUR STREET ADDRESS HERE",
    "addressLocality": "Ichalkaranji",
    "addressRegion": "Maharashtra",
    "postalCode": "416115",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "16.6930",
    "longitude": "74.4601"
  },
  "areaServed": [
    { "@type": "City", "name": "Ichalkaranji" },
    { "@type": "City", "name": "Kolhapur" },
    { "@type": "AdministrativeArea", "name": "Kolhapur District" },
    { "@type": "City", "name": "Hatkanangale" },
    { "@type": "City", "name": "Jaysingpur" }
  ],
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "19:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "22:00" }
  ],
  "medicalSpecialty": "Homeopathy",
  "hasMap": "https://maps.google.com/?q=Mark+Hospital+Ichalkaranji",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1240",
    "bestRating": "5"
  },
  "sameAs": [
    "https://www.facebook.com/markhospital",
    "https://www.instagram.com/markhospital",
    "https://g.page/markhospital"
  ]
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which is the best homeopathy hospital in Ichalkaranji?",
      "acceptedAnswer": { "@type": "Answer", "text": "Mark Hospital is widely recognized as the best homeopathy hospital in Ichalkaranji, serving patients from Kolhapur, Hatkanangale, Jaysingpur, and surrounding areas for over 15 years." }
    },
    {
      "@type": "Question",
      "name": "Does Mark Hospital treat chronic diseases with homeopathy?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Mark Hospital specializes in treating chronic diseases including thyroid disorders, PCOS, allergies, skin conditions, asthma, arthritis, and digestive problems through classical homeopathy without side effects." }
    },
    {
      "@type": "Question",
      "name": "Is homeopathy treatment available in Kolhapur district?",
      "acceptedAnswer": { "@type": "Answer", "text": "Mark Hospital in Ichalkaranji is the leading homeopathy center serving the entire Kolhapur district with expert doctors and personalized treatment plans." }
    }
  ]
};

/* ─── Animated Counter Hook ─── */
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Animated Counter Card ─── */
function StatCard({ target, suffix = '+', label, delay = 0, inView }) {
  const count = useCounter(target, 2200, inView);
  return (
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="success-card" style={{ animationDelay: `${delay}s` }}>
        <div className="stat-glow"></div>
        <div className='no counter-number'>{count.toLocaleString('en-IN')}{suffix}</div>
        <div className='stat-title'>{label}</div>
      </div>
    </div>
  );
}

/* ─── Floating Particle ─── */
function FloatingParticles() {
  const particles = Array.from({ length: 18 });
  return (
    <div className="particles-wrapper" aria-hidden="true">
      {particles.map((_, i) => (
        <span key={i} className={`particle particle-${i + 1}`} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
function HomePage() {
  const [statsRef, statsInView] = useInView(0.3);
  const [aboutRef, aboutInView] = useInView(0.2);
  const [docsRef, docsInView]   = useInView(0.2);

  // ── Modal state ──────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal  = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // ─────────────────────────────────────────────────────────

  /* Inject JSON-LD Schema scripts into <head> */
  useEffect(() => {
    const injectSchema = (data, id) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };
    injectSchema(LOCAL_BUSINESS_SCHEMA, 'schema-local-business');
    injectSchema(FAQ_SCHEMA, 'schema-faq');

    /* Dynamic meta tags for SEO */
    const metas = [
      { name: 'description', content: 'Mark Hospital – Best Homeopathy Hospital in Ichalkaranji & Kolhapur District. 15+ years, 40,000+ cured patients. Expert doctors, classical homeopathy, no side effects. Book appointment today.' },
      { name: 'keywords', content: 'best homeopathy hospital ichalkaranji, homeopathic doctor kolhapur, homeopathy clinic ichalkaranji, mark hospital ichalkaranji, best homeopathic treatment kolhapur district, homeopathy hospital near ichalkaranji, chronic disease treatment ichalkaranji, skin treatment homeopathy kolhapur, thyroid homeopathy ichalkaranji, PCOS homeopathy kolhapur' },
      { name: 'geo.region', content: 'IN-MH' },
      { name: 'geo.placename', content: 'Ichalkaranji, Kolhapur, Maharashtra' },
      { name: 'geo.position', content: '16.6930;74.4601' },
      { name: 'ICBM', content: '16.6930, 74.4601' },
      { property: 'og:title', content: 'Mark Hospital – #1 Homeopathy Hospital in Ichalkaranji | Kolhapur District' },
      { property: 'og:description', content: 'Trusted homeopathic care for 15+ years. 40,000+ patients cured naturally. Serving Ichalkaranji, Kolhapur, Hatkanangale & nearby areas.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://www.markhospital.in' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large' },
      { name: 'author', content: 'Mark Hospital Ichalkaranji' },
    ];
    metas.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let el = document.querySelector(selector);
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      if (name) el.setAttribute('name', name);
      if (property) el.setAttribute('property', property);
      el.setAttribute('content', content);
    });

    /* Canonical + Title */
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = 'https://www.markhospital.in';
    document.title = 'Mark Hospital – Best Homeopathy Hospital in Ichalkaranji | Kolhapur District';
  }, []);

  return (
    <>
      {/* ── Hidden SEO Text ── */}
      <div className="seo-hidden" aria-hidden="false">
        <span>Best Homeopathy Hospital in Ichalkaranji</span>
        <span>Top Homeopathic Doctor Kolhapur District</span>
        <span>Homeopathy Clinic Near Ichalkaranji</span>
        <span>Classical Homeopathy Treatment Maharashtra</span>
      </div>

      {/* ── Book Appointment Modal ── */}
      <BookAppointment isOpen={isModalOpen} onClose={closeModal} />

      <main itemScope itemType="https://schema.org/MedicalBusiness">
        <meta itemProp="name" content="Mark Hospital" />
        <meta itemProp="medicalSpecialty" content="Homeopathy" />

        {/* ── HEADER ── */}
        <Header onBookAppointment={openModal} />

        {/* ═══ HERO SECTION ═══ */}
        <section className="hero-section" aria-label="Hero Banner">
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="4500"
          >
            <div className="carousel-indicators">
              {[0, 1, 2].map(i => (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to={i}
                  className={i === 0 ? 'active' : ''}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="carousel-inner carousel-inner-imgSlider">
              {[
                { img: slide1, badge: '🏆 #1 in Ichalkaranji',  title: 'Best Homeopathy Hospital',   sub: 'Serving Ichalkaranji & Kolhapur District for 15+ Years',           cta: 'Book Free Consultation' },
                { img: slide2, badge: '🌿 Natural Healing',      title: 'Holistic Wellness',           sub: 'Mind, Body & Spirit — Treating the Root Cause, Not Just Symptoms', cta: 'View Our Services' },
                { img: slide3, badge: '✅ 40,000+ Cured',        title: 'Trusted Homeopathic Care',    sub: "Ichalkaranji's Most Trusted Name in Classical Homeopathy",          cta: 'Meet Our Doctors' },
              ].map(({ img, badge, title, sub, cta }, i) => (
                <div key={i} className={`carousel-item${i === 0 ? ' active' : ''}`}>
                  <img
                    src={img}
                    className="d-block w-100 carousel-image"
                    alt={`Mark Hospital Homeopathy ${title}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="carousel-overlay" />
                  <div className="carousel-caption d-block">
                    <span className="slide-badge">{badge}</span>
                    <h1 className="slide-title">{title}</h1>
                    <p className="slide-description">{sub}</p>
                    {/* ── Opens modal ── */}
                    <button className="slide-cta-btn" onClick={openModal}>
                      {cta} <FaArrowRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/* Floating quick-info bar */}
          <div className="hero-quick-bar">
            <div className="container">
              <div className="quick-bar-inner">
                <div className="quick-item">
                  <FaPhone className="qb-icon" />
                  <div><span className="qb-label">Emergency</span><span className="qb-value">+91 1234567890</span></div>
                </div>
                <div className="quick-divider" />
                <div className="quick-item">
                  <FaMapMarkerAlt className="qb-icon" />
                  <div><span className="qb-label">Location</span><span className="qb-value">Ichalkaranji, Kolhapur Dist.</span></div>
                </div>
                <div className="quick-divider" />
                <div className="quick-item">
                  <FaClock className="qb-icon" />
                  <div><span className="qb-label">Open Today</span><span className="qb-value">Mon–Fri 8am–7pm</span></div>
                </div>
                <div className="quick-divider" />
                <div className="quick-item">
                  <FaStar className="qb-icon star" />
                  <div><span className="qb-label">Google Rating</span><span className="qb-value">4.9 / 5 ⭐ (1240 Reviews)</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ INFO CARDS ═══ */}
        <section className="info-cards-section" aria-label="Quick Info">
          <div className="container">
            <div className='row g-4'>
              {[
                {
                  icon: 'https://img.icons8.com/plasticine/100/phone.png',
                  alt: 'emergency phone',
                  cls: 'first-card',
                  title: 'Emergency Cases',
                  body: 'Our reception is available 6 days a week for general and medical enquiries.',
                  extra: <div className='phoneNo mt-2' itemProp="telephone">+91 1234567890</div>
                },
                {
                  icon: 'https://img.icons8.com/3d-fluency/94/paste.png',
                  alt: 'timetable',
                  cls: 'second-card',
                  title: 'Doctors Timetable',
                  body: 'Qualified doctors available six days a week — view our schedule.',
                  extra: (
                    <Button className='timetable-btn animated-btn mt-2' variant='contained'>
                      View Timetable<FaArrowRight className="ms-2" />
                    </Button>
                  )
                },
                {
                  icon: 'https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-hospital-nursing-flaticons-flat-flat-icons-2.png',
                  alt: 'hospital hours',
                  cls: 'third-card',
                  title: 'Opening Hours',
                  body: null,
                  extra: (
                    <>
                      <div className='content-lines mt-2'>Mon–Fri: 8:00 am – 7:00 pm</div>
                      <div className='content-lines'>Saturday: 9:00 am – 10:00 pm</div>
                      <div className='content-lines'>Sunday: Weekly Off</div>
                      {/* ── Opens modal ── */}
                      <Button
                        className='book-appo-btn animated-btn mt-2'
                        variant='contained'
                        onClick={openModal}
                      >
                        Book Appointment<FaArrowRight className="ms-2" />
                      </Button>
                    </>
                  )
                },
              ].map(({ icon, alt, cls, title, body, extra }, i) => (
                <div key={i} className='col-lg-4 col-md-12'>
                  <div className={`card info-card ${cls} d-flex flex-row p-3`}>
                    <div className="card-shine" />
                    <div className='col-3 d-flex justify-content-center align-items-center'>
                      <div className="icon-container">
                        <img width="64" height="64" src={icon} alt={alt} className="card-icon" />
                      </div>
                    </div>
                    <div className='col-9 d-flex flex-column justify-content-center'>
                      <div className='first-title'>{title}</div>
                      {body && <div className='content-lines mt-2'>{body}</div>}
                      {extra}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ABOUT US ═══ */}
        <section
          ref={aboutRef}
          className={`about-section ${aboutInView ? 'in-view' : ''}`}
          aria-label="About Mark Hospital"
          itemScope itemType="https://schema.org/AboutPage"
        >
          <FloatingParticles />
          <div className="container">
            <div className='row align-items-center g-5'>
              <div className='col-lg-6 about-left'>
                <div className="about-tag"><FaLeaf /> Ichalkaranji's #1 Choice</div>
                <h2 className='mark-hospital-title'>
                  Mark Hospital –<br />
                  <span className="title-accent">India's Trusted</span><br />
                  Homeopathy Hospital
                </h2>
                <p className='hospital-description' itemProp="description">
                  Mark Hospital is the most trusted homeopathy hospital in <strong>Ichalkaranji, Kolhapur district</strong>, renowned for offering safe, gentle, and result-oriented treatments through classical homeopathy. Our team of expert doctors is committed to personalized care — healing not just the disease, but the whole person: mind, body, and spirit.
                </p>
                <p className='hospital-description'>
                  We've helped thousands of patients across <strong>Kolhapur, Hatkanangale, Jaysingpur</strong> and all of Maharashtra overcome chronic, lifestyle, and emotional health challenges — naturally and without side effects.
                </p>
                <div className="about-badges">
                  <span className="ab-badge"><MdVerified /> ISO Certified</span>
                  <span className="ab-badge"><FaShieldAlt /> 15+ Years Trust</span>
                  <span className="ab-badge"><FaHeart /> 40K+ Cured</span>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='card why-choose-us-card'>
                  <div className='why-title'>Why Choose Us?</div>
                  {[
                    'Classical techniques combined with modern diagnostics for precise, effective treatment.',
                    'Highest quality medicines sourced from internationally accredited homeopathic labs.',
                    'Proven success in treating chronic, recurring, and lifestyle disorders including thyroid & PCOS.',
                    'Specialized care for fertility — helping couples in Ichalkaranji & Kolhapur conceive naturally.',
                    "Completely drug-free healing that supports the body's own natural recovery system.",
                  ].map((point, i) => (
                    <div key={i} className='choose-us-points mb-3'>
                      <FaCheckCircle className="check-icon" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ DOCTORS ═══ */}
        <section
          ref={docsRef}
          className={`doctors-section ${docsInView ? 'in-view' : ''}`}
          aria-label="Our Doctors"
          itemScope itemType="https://schema.org/MedicalOrganization"
        >
          <div className="section-header">
            <div className="section-eyebrow">Expert Care Team</div>
            <h2 className='section-heading'>Meet Our Doctors</h2>
            <p className="section-sub">Our board-certified homeopathic physicians serving Ichalkaranji &amp; Kolhapur</p>
          </div>
          <div className='container'>
            <div className='row justify-content-center g-4'>
              {[
                { name: 'Dr. Mark Smith',    edu: 'MBBS, DOMS, FCPS (Mumbai)', exp: '18 Yrs Exp', spec: 'Chronic Disorders' },
                { name: 'Dr. Sarah Johnson', edu: 'BHMS, MD (Hom), PhD',        exp: '12 Yrs Exp', spec: 'Skin & Allergy' },
                { name: 'Dr. Robert Wilson', edu: 'DHMS, FCAH, CCH',            exp: '10 Yrs Exp', spec: 'Child & Women Health' },
              ].map(({ name, edu, exp, spec }, i) => (
                <div key={i} className='col-lg-4 col-md-6' style={{ animationDelay: `${i * 0.15}s` }}>
                  <article className='card doctor-card' itemScope itemType="https://schema.org/Physician">
                    <div className="doc-badge">{exp}</div>
                    <div className='doc-img-container'>
                      <img className='doc-img' src={docImg} alt={`${name} – Homeopathy Doctor Ichalkaranji`} loading="lazy" itemProp="image" />
                      <div className="doc-overlay">
                        {/* ── Opens modal ── */}
                        <button className="doc-appt-btn" onClick={openModal}>
                          Book Appointment
                        </button>
                      </div>
                    </div>
                    <div className='doc-specialization'>
                      <div className="doc-spec-tag">{spec}</div>
                      <div className='doc-name' itemProp="name">{name}</div>
                      <div className='doc-education' itemProp="hasCredential">{edu}</div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SERVICES ═══ */}
        <section className='services-container py-5' aria-label="Homeopathy Services">
          <div className="section-header">
            <div className="section-eyebrow">What We Treat</div>
            <h2 className='section-heading'>Services &amp; Specialties</h2>
            <p className="section-sub">Comprehensive homeopathic care for all age groups in Ichalkaranji &amp; Kolhapur</p>
          </div>
          <div className='services-cards'><Services /></div>
        </section>

        {/* ═══ STATS ═══ */}
        <section ref={statsRef} className='success-numbers' aria-label="Our Achievements">
          <div className='success-overlay' />
          <div className="stats-bg-text" aria-hidden="true">RESULTS</div>
          <div className='container'>
            <div className="section-header light">
              <div className="section-eyebrow light">Our Milestones</div>
              <h2 className="section-heading light">Numbers That Speak</h2>
            </div>
            <div className='row justify-content-center g-4'>
              <StatCard target={15}    suffix="+" label="Years of Legacy"       delay={0}    inView={statsInView} />
              <StatCard target={40000} suffix="+" label="Satisfied Patients"    delay={0.15} inView={statsInView} />
              <StatCard target={10000} suffix="+" label="Cured Without Surgery" delay={0.3}  inView={statsInView} />
              <StatCard target={15000} suffix="+" label="Allergy Relieved"      delay={0.45} inView={statsInView} />
            </div>
          </div>
        </section>

        {/* ═══ LOCAL SEO CONTENT BLOCK ═══ */}
        <section className="local-seo-section" aria-label="About Ichalkaranji Homeopathy">
          <div className="container">
            <div className="row g-4 align-items-center">
              <div className="col-lg-7">
                <h2 className="local-seo-title">
                  Homeopathy Hospital in Ichalkaranji –<br />
                  <span>Kolhapur District's Most Trusted Clinic</span>
                </h2>
                <p className="local-seo-text">
                  Looking for the <strong>best homeopathy hospital in Ichalkaranji</strong>? Mark Hospital has been the most trusted name in classical homeopathy across <strong>Kolhapur district</strong> for over 15 years. We specialize in treating thyroid disorders, PCOS, skin diseases, allergies, asthma, arthritis, digestive issues, and much more — completely naturally.
                </p>
                <p className="local-seo-text">
                  Patients from <strong>Kolhapur, Hatkanangale, Jaysingpur, Kagal, Shirol</strong> and nearby talukas regularly visit Mark Hospital for homeopathic consultation. Our experienced doctors create personalized treatment plans with zero side effects.
                </p>
                <div className="local-features">
                  {['Walk-in & Online Consultation Available', 'Homeopathy for Children, Women & Seniors', 'Emergency Helpline Active 6 Days/Week', 'Affordable Treatment Plans'].map((f, i) => (
                    <div key={i} className="lf-item"><FaCheckCircle className="lf-icon" />{f}</div>
                  ))}
                </div>
              </div>
              <div className="col-lg-5">
                <div className="map-embed-card">
                  <div className="map-placeholder" itemProp="hasMap">
                    <FaMapMarkerAlt className="map-pin" />
                    <div className="map-text">
                      <strong>Mark Hospital</strong>
                      <span>Ichalkaranji, Kolhapur – 416115</span>
                      <a href="https://maps.google.com/?q=Mark+Hospital+Ichalkaranji" target="_blank" rel="noopener noreferrer" className="map-btn">
                        Get Directions <FaArrowRight />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FEEDBACK ═══ */}
        <div className='feedback-container py-5'><FeedBack /></div>

        {/* ═══ FAQ ═══ */}
        <section className='faq-section' aria-label="Frequently Asked Questions">
          <div className="section-header">
            <div className="section-eyebrow">Got Questions?</div>
            <h2 className='faq-title'>Frequently Asked Questions</h2>
          </div>
          <div className='container'><Faq /></div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className='footer-homepage'><Footer onBookAppointment={openModal} /></footer>
      </main>
    </>
  );
}

export default HomePage;