import React from 'react';
import Header from '../../SharedComponents/Header/Header';
import Footer from '../../SharedComponents/Footer/Footer';
import './AboutUs.css';

// Import images
import healing from '../../Assets/Images/study-time.png';
import safe from '../../Assets/Images/mortar.png';
import care from '../../Assets/Images/healthcare.png';
import approach from '../../Assets/Images/patients.png';
import experience from '../../Assets/Images/customer-review.png';
import wellness from '../../Assets/Images/yoga.png';
import practice from '../../Assets/Images/magnification-lens.png';
import supportive from '../../Assets/Images/handshake.png';

// Feature data for better maintainability
const features = [
  {
    id: 'personalized-healing',
    icon: healing,
    title: 'Personalized Healing Plans',
    description: 'Every patient receives treatment tailored to their unique health needs, not a one-size-fits-all approach.',
    alt: 'Personalized healing plans icon'
  },
  {
    id: 'holistic-care',
    icon: care,
    title: 'Holistic Care',
    description: 'We treat the root cause, not just the symptoms, focusing on mind, body, and overall well-being.',
    alt: 'Holistic care icon'
  },
  {
    id: 'safe-remedies',
    icon: safe,
    title: 'Safe & Natural Remedies',
    description: 'Our medicines are gentle, natural, and free from harmful side effects.',
    alt: 'Safe and natural remedies icon'
  },
  {
    id: 'patient-centered',
    icon: approach,
    title: 'Patient-Centered Approach',
    description: 'We listen carefully, spend time understanding your concerns, and support you throughout your healing journey.',
    alt: 'Patient-centered approach icon'
  },
  {
    id: 'experience-expertise',
    icon: experience,
    title: 'Experience & Expertise',
    description: 'Backed by qualified practitioners with deep knowledge and years of practice in classical homeopathy.',
    alt: 'Experience and expertise icon'
  },
  {
    id: 'long-term-wellness',
    icon: wellness,
    title: 'Focus on Long-Term Wellness',
    description: 'Our goal is not temporary relief but lasting health improvements.',
    alt: 'Long-term wellness focus icon'
  },
  {
    id: 'evidence-based',
    icon: practice,
    title: 'Evidence-Based Practice',
    description: 'We combine traditional wisdom with modern insights to provide effective, reliable care.',
    alt: 'Evidence-based practice icon'
  },
  {
    id: 'supportive-environment',
    icon: supportive,
    title: 'Supportive Care Environment',
    description: 'A compassionate, friendly atmosphere where patients feel heard and cared for.',
    alt: 'Supportive care environment icon'
  }
];

// Feature Card Component
const FeatureCard = ({ feature }) => (
  <article className="feature-card" role="article" aria-labelledby={`${feature.id}-title`}>
    <div className="feature-card__icon-container">
      <img 
        className="feature-card__icon" 
        src={feature.icon} 
        alt={feature.alt}
        loading="lazy"
        width="60"
        height="60"
      />
    </div>
    <div className="feature-card__content">
      <h3 
        id={`${feature.id}-title`}
        className="feature-card__title"
      >
        {feature.title}
      </h3>
      <p className="feature-card__description">
        {feature.description}
      </p>
    </div>
  </article>
);

// Vision Mission Component
const VisionMission = () => (
  <section className="vision-mission" aria-labelledby="vision-mission-heading">
    <div className="vision-mission__container">
      <article className="vision-mission__card" role="article" aria-labelledby="vision-title">
        <h2 id="vision-title" className="vision-mission__title">
          Our Vision
        </h2>
        <p className="vision-mission__description">
          To be a global leader in holistic healthcare, revolutionizing lives through 
          innovative, patient-centered homeopathic solutions that promote lasting 
          wellness and harmony.
        </p>
      </article>
      
      <article className="vision-mission__card" role="article" aria-labelledby="mission-title">
        <h2 id="mission-title" className="vision-mission__title">
          Our Mission
        </h2>
        <p className="vision-mission__description">
          To provide exceptional, patient-focused homeopathic care at Dr. Basil's 
          Homeo Hospital that empowers individuals through holistic healing and 
          innovative, evidence-based solutions.
        </p>
      </article>
    </div>
  </section>
);

const AboutUs = () => {
  return (
    <>
      <Header />
      
      <main className="about-us-main" role="main">
        {/* Features Section */}
        <section className="features-section" aria-labelledby="features-heading">
          <div className="features-section__container">
            <h1 id="features-heading" className="features-section__title mt-5">
              What Makes Us Unique
            </h1>
            
            <div className="features-grid" role="list" aria-label="Our unique features">
              {features.map((feature) => (
                <FeatureCard 
                  key={feature.id} 
                  feature={feature}
                />
              ))}
            </div>
          </div>
        </section>
        
        <VisionMission />
      </main>
      
      <Footer />
    </>
  );
};

export default AboutUs;