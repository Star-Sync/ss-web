import React from 'react';
import Image from 'next/image';
import satellite from '../../assets/web/app.png';

const UserGuide = () => {
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
      id="userguide"
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
          User Guide
        </h1>

        <p
          style={{
            color: '#b0d8f2', // subtle blue tint
            fontSize: '1.2rem',
            lineHeight: '1.6',
          }}
        >
          Learn how to effectively use the scheduling platform to coordinate satellite and ground station operations.
          Our tools let you visualize timelines, track mission status, and automate your workflow — helping you deliver
          with precision from orbit to ground.
        </p>

        <p
          style={{
            color: '#40c4ff', // vibrant sky blue
            fontSize: '1.3rem',
            lineHeight: '1.6',
            marginTop: '2rem',
            fontWeight: 600,
          }}
        >
          Getting Started:
        </p>

        <ol
          style={{
            color: '#fff',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            paddingLeft: '1.5rem',
          }}
        >
          {[
            "Upon opening the app, users land on the home screen. New users can access the FAQ and User Guide for complete onboarding support.",
            "Proceed to the login page to sign in using your username and password. First-time users can register with an email address for a smooth start.",
            "After logging in, the landing overview page gives a snapshot of your workflow, including scheduled tasks, active satellites, and pending requests.",
            "Visit the calendar view to explore all scheduled missions. Events are color-coded for clarity, and the zoom functionality allows precision viewing from minute-level to multi-year planning.",
            "To schedule a new mission, fill out the intuitive mission creation form. Even complex missions can be set up in minutes and will instantly appear on the calendar.",
            "Head to the ground station page to view, create, or manage ground stations. Each entry includes vital data like altitude and scientific capabilities.",
            "Manage satellites on the satellite management page. You can add, edit, or remove satellites as needed using user-friendly forms.",
          ].map((text, idx) => (
            <li key={idx} style={{ marginBottom: '1.2rem' }}>
              {text}
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

export default UserGuide;
