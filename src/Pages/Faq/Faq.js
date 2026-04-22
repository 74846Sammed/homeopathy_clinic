import React, { useState } from 'react';
import './Faq.css';

const faqData = [
    {
        id: 'faq-1',
        number: '01',
        question: 'What is homeopathy and how does it work?',
        answer: 'Homeopathy is a natural system of medicine based on the principle of "like cures like." It uses highly diluted natural substances to stimulate the body\'s own healing process. This gentle approach works by triggering the body\'s natural defense mechanisms to restore balance and promote healing from within.',
        tag: 'Basics'
    },
    {
        id: 'faq-2',
        number: '02',
        question: 'Is homeopathy safe for children and elderly people?',
        answer: 'Yes, homeopathic remedies are completely safe, gentle, and free from side effects — making them ideal for all age groups, including infants and senior citizens. The natural ingredients and ultra-diluted preparations ensure no toxic effects or drug interactions, making it one of the safest medical systems available.',
        tag: 'Safety'
    },
    {
        id: 'faq-3',
        number: '03',
        question: 'Can homeopathy treat chronic diseases?',
        answer: 'Absolutely. Homeopathy has shown excellent results in managing and curing various chronic conditions such as asthma, arthritis, skin disorders, migraine, thyroid issues, diabetes, hypertension, and autoimmune disorders. Our holistic approach addresses the root cause rather than just suppressing symptoms.',
        tag: 'Treatment'
    },
    {
        id: 'faq-4',
        number: '04',
        question: 'How long does it take for homeopathy to show results?',
        answer: 'The response time varies depending on the condition and individual constitution. Acute issues may improve within hours to days, while chronic problems may take several weeks to months for complete healing. Homeopathy works on the root cause, so lasting results take time but are more permanent.',
        tag: 'Timeline'
    },
    {
        id: 'faq-5',
        number: '05',
        question: 'Can I take homeopathy along with other medications?',
        answer: 'Yes, homeopathy can safely be taken alongside conventional medicines without any interactions. However, it\'s always best to consult your homeopathic doctor for proper guidance and to plan a gradual transition if you wish to reduce dependency on conventional medications.',
        tag: 'Safety'
    },
    {
        id: 'faq-6',
        number: '06',
        question: 'What should I expect during my first consultation?',
        answer: 'During your first visit, our doctor will conduct a detailed consultation lasting 60–90 minutes. We\'ll discuss your medical history, current symptoms, lifestyle, emotional state, and any triggers. This comprehensive approach helps us select the most suitable remedy for your individual constitution.',
        tag: 'Consultation'
    }
];

function FaqItem({ faq, isOpen, onToggle }) {
    return (
        <div
            className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
            itemScope
            itemType="https://schema.org/Question"
        >
            <button
                className="faq-trigger"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`${faq.id}-answer`}
                id={`${faq.id}-trigger`}
            >
                <span className="faq-trigger__num" aria-hidden="true">{faq.number}</span>
                <span className="faq-trigger__text" itemProp="name">{faq.question}</span>
                <span className="faq-trigger__tag" aria-hidden="true">{faq.tag}</span>
                <span className="faq-trigger__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
            </button>

            <div
                id={`${faq.id}-answer`}
                role="region"
                aria-labelledby={`${faq.id}-trigger`}
                className="faq-body"
                style={{ '--faq-max-h': isOpen ? '400px' : '0px' }}
                itemScope
                itemType="https://schema.org/Answer"
            >
                <div className="faq-body__inner" itemProp="text">
                    <div className="faq-body__bar" aria-hidden="true" />
                    <p className="faq-body__text">{faq.answer}</p>
                </div>
            </div>
        </div>
    );
}

function Faq() {
    const [openId, setOpenId] = useState('faq-1');

    const toggle = (id) => setOpenId(prev => prev === id ? null : id);

    return (
        <section
            className="faq-section"
            aria-label="Frequently Asked Questions"
            itemScope
            itemType="https://schema.org/FAQPage"
        >
            {/* Background decoration */}
            <div className="faq-bg-grid" aria-hidden="true" />
            <div className="faq-bg-glow faq-bg-glow--a" aria-hidden="true" />
            <div className="faq-bg-glow faq-bg-glow--b" aria-hidden="true" />

            <div className="faq-inner">
                {/* Left column: heading + description */}
                <aside className="faq-aside">
                    <span className="faq-eyebrow">FAQ</span>
                    <h2 className="faq-title">
                        Common <em>Questions</em><br />Answered
                    </h2>
                    <p className="faq-desc">
                        Get answers to the most frequently asked questions about our homeopathic treatments and services.
                    </p>

                    <div className="faq-stat-row">
                        <div className="faq-stat">
                            <strong className="faq-stat__num">15+</strong>
                            <span className="faq-stat__label">Years Experience</span>
                        </div>
                        <div className="faq-stat">
                            <strong className="faq-stat__num">5000+</strong>
                            <span className="faq-stat__label">Patients Healed</span>
                        </div>
                        <div className="faq-stat">
                            <strong className="faq-stat__num">100%</strong>
                            <span className="faq-stat__label">Natural Treatment</span>
                        </div>
                    </div>

                    {/* <a href="#contact" className="faq-cta" aria-label="Contact our homeopathy experts">
                        Still have questions? Talk to us →
                    </a> */}
                </aside>

                {/* Right column: accordion */}
                <div className="faq-list">
                    {faqData.map((faq, i) => (
                        <div
                            key={faq.id}
                            className="faq-item-wrap"
                            style={{ animationDelay: `${i * 0.07}s` }}
                        >
                            <FaqItem
                                faq={faq}
                                isOpen={openId === faq.id}
                                onToggle={() => toggle(faq.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Faq;