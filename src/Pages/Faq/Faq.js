import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

// Custom styled components for better design
const StyledAccordion = styled(Accordion)(({ theme }) => ({
    marginBottom: '20px',
    borderRadius: '15px !important',
    border: '2px solid rgba(45, 73, 144, 0.1)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
    overflow: 'hidden',
    
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.12)',
        border: '2px solid rgba(33, 205, 192, 0.3)',
    },
    
    '&.Mui-expanded': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.1)',
        border: '2px solid #21cdc0',
    },
    
    '&:before': {
        display: 'none',
    },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    background: 'linear-gradient(135deg, #2d4990 0%, #3851A2 100%)',
    color: '#ffffff',
    fontWeight: '600',
    minHeight: '70px',
    padding: '0 24px',
    borderRadius: '15px 15px 0 0',
    transition: 'all 0.3s ease',
    
    '&:hover': {
        background: 'linear-gradient(135deg, #21cdc0 0%, #1bb5a8 100%)',
    },
    
    '&.Mui-expanded': {
        background: 'linear-gradient(135deg, #21cdc0 0%, #1bb5a8 100%)',
        minHeight: '70px',
    },
    
    '& .MuiAccordionSummary-content': {
        margin: '16px 0',
        
        '&.Mui-expanded': {
            margin: '16px 0',
        },
    },
    
    '& .MuiAccordionSummary-expandIconWrapper': {
        color: '#ffffff',
        transition: 'transform 0.3s ease',
        
        '&.Mui-expanded': {
            transform: 'rotate(180deg)',
        },
    },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: '24px',
    background: '#ffffff',
    color: '#555',
    fontSize: '1rem',
    lineHeight: '1.7',
    borderRadius: '0 0 15px 15px',
    
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '24px',
        right: '24px',
        height: '2px',
        background: 'linear-gradient(90deg, #21cdc0, #2d4990)',
    },
}));

function Faq() {
    const [expandedPanel, setExpandedPanel] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpandedPanel(isExpanded ? panel : false);
    };

    const faqData = [
        {
            id: 'panel1',
            question: '1. What is homeopathy and how does it work?',
            answer: 'Homeopathy is a natural system of medicine based on the principle of "like cures like." It uses highly diluted natural substances to stimulate the body\'s own healing process. This gentle approach works by triggering the body\'s natural defense mechanisms to restore balance and promote healing from within.'
        },
        {
            id: 'panel2',
            question: '2. Is homeopathy safe for children and elderly people?',
            answer: 'Yes, homeopathic remedies are completely safe, gentle, and free from side effects—making them ideal for all age groups, including infants and senior citizens. The natural ingredients and ultra-diluted preparations ensure that there are no toxic effects or drug interactions, making it one of the safest medical systems available.'
        },
        {
            id: 'panel3',
            question: '3. Can homeopathy treat chronic diseases?',
            answer: 'Absolutely. Homeopathy has shown excellent results in managing and curing various chronic conditions such as asthma, arthritis, skin disorders, migraine, thyroid issues, diabetes, hypertension, and autoimmune disorders. Our holistic approach addresses the root cause rather than just suppressing symptoms.'
        },
        {
            id: 'panel4',
            question: '4. How long does it take for homeopathy to show results?',
            answer: 'The response time varies depending on the condition and individual constitution. Acute issues may improve within hours to days, while chronic problems may take several weeks to months for complete healing. Homeopathy works on the root cause, so lasting results take time but are more permanent.'
        },
        {
            id: 'panel5',
            question: '5. Can I take homeopathy along with other medications?',
            answer: 'Yes, homeopathy can safely be taken alongside conventional medicines without any interactions. However, it\'s always best to consult your homeopathic doctor for proper guidance and to plan a gradual transition if you wish to reduce dependency on conventional medications.'
        },
        {
            id: 'panel6',
            question: '6. What should I expect during my first consultation?',
            answer: 'During your first visit, our doctor will conduct a detailed consultation lasting 60-90 minutes. We\'ll discuss your medical history, current symptoms, lifestyle, emotional state, and any triggers. This comprehensive approach helps us select the most suitable remedy for your individual constitution.'
        }
    ];

    return (
        <div className='faq-component'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-8 col-md-10 col-12'>
                        <div className='faq-intro text-center mb-4'>
                            <p className='faq-description animate-fade-in'>
                                Get answers to the most commonly asked questions about our homeopathic treatments and services.
                            </p>
                        </div>
                        
                        <div className='faq-accordion-container'>
                            {faqData.map((faq, index) => (
                                <div 
                                    key={faq.id} 
                                    className='faq-item-wrapper animate-faq-item'
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <StyledAccordion 
                                        expanded={expandedPanel === faq.id} 
                                        onChange={handleChange(faq.id)}
                                        elevation={0}
                                    >
                                        <StyledAccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`${faq.id}-content`}
                                            id={`${faq.id}-header`}
                                        >
                                            <Typography 
                                                component="span" 
                                                sx={{ 
                                                    fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                                                    fontWeight: 600,
                                                    lineHeight: 1.4
                                                }}
                                            >
                                                {faq.question}
                                            </Typography>
                                        </StyledAccordionSummary>
                                        <StyledAccordionDetails>
                                            <Typography 
                                                sx={{ 
                                                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                                                    lineHeight: 1.7,
                                                    color: '#555'
                                                }}
                                            >
                                                {faq.answer}
                                            </Typography>
                                        </StyledAccordionDetails>
                                    </StyledAccordion>
                                </div>
                            ))}
                        </div>
                        
                        {/* <div className='faq-contact-section text-center mt-5'>
                            <div className='faq-contact-card animate-fade-in-up'>
                                <h4 className='contact-title'>Still have questions?</h4>
                                <p className='contact-description'>
                                    Our medical team is here to help you understand how homeopathy can benefit your health.
                                </p>
                                <button className='contact-btn'>
                                    Contact Our Experts
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Faq;