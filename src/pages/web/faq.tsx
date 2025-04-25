import React from 'react';
import Image from 'next/image';
import satellite from '../../assets/web/satellite.png';

const FAQ = () => {
  const faqItems = [
    {
      question: "How do I create a new mission?",
      answer:
        "You can create a new mission from the calendar or the mission planning section. Just click “Add Mission,” fill in the required details, and our scheduler will assign the best time slot.",
    },
    {
      question: "Can I edit or cancel a scheduled mission?",
      answer:
        "Yes. Go to the mission in your calendar, then click on it to access edit or cancel options. Note that canceling close to the execution time may have restrictions.",
    
      },

      {
        question: "What happens if two missions conflict?",
        answer:
          "Our system automatically detects and flags conflicts. The algorithm is designed as to not schedule in conflicting missions.",
      
        },
        {
          question: "How do I add a new satellite or ground station?",
          answer:
            "Navigate to either the Satellite Management or Ground Station page, then click “Add.” Enter your asset’s details and save.",
        
          },
          {
            question: "Why can't I log in?",
            answer:
              "Double-check your email and password. If you're still having trouble, try resetting your password from the login screen. If problems persist, contact support.",
          
            },
            {
              question: "How do I report a bug or request a new feature?",
              answer:
                "Please email support directly. We value your input and prioritize fixes and features based on user feedback.",
            
              },
    // Add more here as needed...
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4rem 6rem',
        color: '#fff',
        flexWrap: 'wrap',
      }}
      id="faq"
    >
      {/* Content Section */}
      <div style={{ flex: 1, paddingRight: '2rem', minWidth: '300px' }}>
        <h1
          style={{
            background: 'linear-gradient(to right, #30CFD0 0%, #330867 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '3rem',
            fontWeight: '800',
            marginBottom: '1rem',
          }}
        >
          FAQ
        </h1>

        <p
          style={{
            color: '#b0d8f2',
            fontSize: '1.2rem',
            lineHeight: '1.6',
          }}
        >
          Have questions? We have answers. Whether you are new to the platform or a returning user,
          this section helps clarify the most common topics — from login issues to scheduling tips.
          Explore our quick answers to get the most out of your mission management tools.
        </p>

        <p
          style={{
            color: '#40c4ff',
            fontSize: '1.3rem',
            lineHeight: '1.6',
            marginTop: '2rem',
            fontWeight: 600,
          }}
        >
          Questions and Answers:
        </p>

        <ol
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            paddingLeft: '1.5rem',
          }}
        >
          {faqItems.map((item, index) => (
            <li key={index} style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontWeight: 'bold', color: '#70e3ff' }}>{item.question}</span>
              <br />
              <span style={{ color: '#f1f1f1' }}>{item.answer}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Image Section */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: '300px' }}>
        <Image src={satellite as string} alt="satellite" width={400} height={400} />
      </div>
    </div>
  );
};

export default FAQ;
