import React, { useEffect, useRef, useState } from 'react';
import Header from '../../SharedComponents/Header/Header';
import Footer from '../../SharedComponents/Footer/Footer';
import BookAppointment from '../BookAppointmentModel/BookAppointmentModel';
import './AboutUs.css';

import healing from '../../Assets/Images/study-time.png';
import safe from '../../Assets/Images/mortar.png';
import care from '../../Assets/Images/healthcare.png';
import approach from '../../Assets/Images/patients.png';
import experience from '../../Assets/Images/customer-review.png';
import wellness from '../../Assets/Images/yoga.png';
import practice from '../../Assets/Images/magnification-lens.png';
import supportive from '../../Assets/Images/handshake.png';

const features = [
  {
    id: 'personalized-healing',
    icon: healing,
    title: 'Personalized Healing Plans',
    description: 'Every patient receives treatment tailored to their unique health needs, not a one-size-fits-all approach.',
    alt: 'Personalized healing plans icon',
    accent: '#21cdc0',
  },
  {
    id: 'holistic-care',
    icon: care,
    title: 'Holistic Care',
    description: 'We treat the root cause, not just the symptoms, focusing on mind, body, and overall well-being.',
    alt: 'Holistic care icon',
    accent: '#a78bfa',
  },
  {
    id: 'safe-remedies',
    icon: safe,
    title: 'Safe & Natural Remedies',
    description: 'Our medicines are gentle, natural, and free from harmful side effects.',
    alt: 'Safe and natural remedies icon',
    accent: '#34d399',
  },
  {
    id: 'patient-centered',
    icon: approach,
    title: 'Patient-Centered Approach',
    description: 'We listen carefully, spend time understanding your concerns, and support you throughout your healing journey.',
    alt: 'Patient-centered approach icon',
    accent: '#f59e0b',
  },
  {
    id: 'experience-expertise',
    icon: experience,
    title: 'Experience & Expertise',
    description: 'Backed by qualified practitioners with deep knowledge and years of practice in classical homeopathy.',
    alt: 'Experience and expertise icon',
    accent: '#60a5fa',
  },
  {
    id: 'long-term-wellness',
    icon: wellness,
    title: 'Focus on Long-Term Wellness',
    description: 'Our goal is not temporary relief but lasting health improvements.',
    alt: 'Long-term wellness focus icon',
    accent: '#fb7185',
  },
  {
    id: 'evidence-based',
    icon: practice,
    title: 'Evidence-Based Practice',
    description: 'We combine traditional wisdom with modern insights to provide effective, reliable care.',
    alt: 'Evidence-based practice icon',
    accent: '#c084fc',
  },
  {
    id: 'supportive-environment',
    icon: supportive,
    title: 'Supportive Care Environment',
    description: 'A compassionate, friendly atmosphere where patients feel heard and cared for.',
    alt: 'Supportive care environment icon',
    accent: '#2dd4bf',
  },
];

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView(0.3);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Feature Card ─── */
const FeatureCard = ({ feature, index }) => {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const delay = (index % 4) * 100;

  return (
    <article
      ref={ref}
      className={`feature-card ${visible ? 'feature-card--visible' : ''}`}
      style={{ '--delay': `${delay}ms`, '--accent': feature.accent }}
      aria-labelledby={`${feature.id}-title`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="feature-card__glow" />
      <div className={`feature-card__icon-wrap ${hovered ? 'feature-card__icon-wrap--hovered' : ''}`}>
        <div className="feature-card__icon-ring" />
        <img
          className="feature-card__icon"
          src={feature.icon}
          alt={feature.alt}
          loading="lazy"
          width="64"
          height="64"
        />
      </div>
      <h3 id={`${feature.id}-title`} className="feature-card__title">
        {feature.title}
      </h3>
      <p className="feature-card__description">{feature.description}</p>
      <div className="feature-card__line" />
    </article>
  );
};

/* ─── Stats Strip ─── */
const StatsStrip = () => {
  const [ref, visible] = useInView(0.2);
  const stats = [
    { label: 'Years of Experience', value: 15, suffix: '+' },
    { label: 'Patients Treated',    value: 10000, suffix: '+' },
    { label: 'Success Rate',        value: 95, suffix: '%' },
    { label: 'Conditions Treated',  value: 200, suffix: '+' },
  ];

  return (
    <section ref={ref} className={`stats-strip ${visible ? 'stats-strip--visible' : ''}`} aria-label="Key statistics">
      <div className="stats-strip__inner">
        {stats.map((s, i) => (
          <div key={s.label} className="stats-strip__item" style={{ '--delay': `${i * 120}ms` }}>
            <span className="stats-strip__number">
              {visible ? <AnimatedCounter target={s.value} suffix={s.suffix} /> : `0${s.suffix}`}
            </span>
            <span className="stats-strip__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── Vision Mission ─── */
const VisionMission = () => {
  const [ref, visible] = useInView(0.15);

  return (
    <section ref={ref} className={`vm-section ${visible ? 'vm-section--visible' : ''}`} aria-labelledby="vm-heading">
      <div className="vm-section__bg-blob" aria-hidden="true" />
      <div className="vm-section__container">
        <div className="vm-card vm-card--vision" style={{ '--delay': '0ms' }}>
          <div className="vm-card__icon-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </div>
          <h2 className="vm-card__title">Our Vision</h2>
          <p className="vm-card__description">
            To be a global leader in holistic healthcare, revolutionizing lives through
            innovative, patient-centered homeopathic solutions that promote lasting
            wellness and harmony.
          </p>
          <div className="vm-card__accent-bar" />
        </div>

        <div className="vm-card vm-card--mission" style={{ '--delay': '150ms' }}>
          <div className="vm-card__icon-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h2 className="vm-card__title">Our Mission</h2>
          <p className="vm-card__description">
            To provide exceptional, patient-focused homeopathic care at Dr. Basil's
            Homeo Hospital that empowers individuals through holistic healing and
            innovative, evidence-based solutions.
          </p>
          <div className="vm-card__accent-bar" />
        </div>
      </div>
    </section>
  );
};

/* ─── Hero Banner ─── */
const HeroBanner = ({ onBookAppointment }) => {
  const [ref, visible] = useInView(0.1);
  return (
    <section ref={ref} className={`hero-banner ${visible ? 'hero-banner--visible' : ''}`} aria-label="About us hero">
      <div className="hero-banner__particles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="particle" style={{ '--i': i }} />
        ))}
      </div>
      <div className="hero-banner__content">
        <p className="hero-banner__eyebrow">Trusted Homeopathic Care</p>
        <h1 className="hero-banner__title">
          Healing That Starts <br />
          <span className="hero-banner__title-highlight">From Within</span>
        </h1>
        <p className="hero-banner__subtitle">
          Where ancient wisdom meets modern science to restore balance, vitality, and true wellness.
        </p>
        {/* ── CTA button in hero ── */}
        <button className="hero-banner__cta" onClick={onBookAppointment}>
          Book an Appointment
        </button>
      </div>
      <div className="hero-banner__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--page-bg)" />
        </svg>
      </div>
    </section>
  );
};

/* ─── Page ─── */
const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal  = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* ── Modal ── */}
      <BookAppointment isOpen={isModalOpen} onClose={closeModal} />

      <Header onBookAppointment={openModal} />

      <main className="about-us-main" role="main">
        <HeroBanner onBookAppointment={openModal} />

        <section className="features-section" aria-labelledby="features-heading">
          <div className="features-section__container">
            <div className="section-header">
              <span className="section-header__tag">Why Choose Us</span>
              <h2 id="features-heading" className="section-header__title">
                What Makes Us Unique
              </h2>
              <p className="section-header__sub">
                Eight pillars of care that set Dr. Basil's Homeo Hospital apart.
              </p>
            </div>
            <div className="features-grid" role="list" aria-label="Our unique features">
              {features.map((f, i) => (
                <FeatureCard key={f.id} feature={f} index={i} />
              ))}
            </div>
          </div>
        </section>

        <StatsStrip />
        <VisionMission />
      </main>

      <Footer onBookAppointment={openModal} />
    </>
  );
};

export default AboutUs;