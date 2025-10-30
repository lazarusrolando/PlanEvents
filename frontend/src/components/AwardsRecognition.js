import React from 'react';
import './AwardsRecognition.css';

const AwardsRecognition = () => {
  const awards = [
    {
      title: 'Startup of the Year 2022',
      description: 'Honored by the National Event Planners Association for our rapid growth and impact on the industry.',
      year: 2025
    }
  ];

  return (
    <section className="awards-recognition-container">
      <div className="awards-recognition-content">
        <h1>Awards & Recognition</h1>
        <p>Plan Events has been honored with numerous awards for our commitment to excellence in event management technology.</p>
        <div className="awards-grid">
          {awards.map((award, index) => (
            <div key={index} className="award-card">
              <h2>{award.title}</h2>
              <p>{award.description}</p>
              <span className="award-year">{award.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsRecognition;
