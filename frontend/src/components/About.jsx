import React from 'react';
import './About.css';
import collageImage from '../images/plan_events_2.png';

const About = () => {
  return (
    <section className="about-container">
      <div className="about-content">
        <h1>Plan Events is the premier event management platform</h1>
        <p>
          With Plan Events, you can effortlessly plan, manage, and scale your events. Our platform provides a unified foundation for all your event needs, combining powerful tools with an intuitive interface.
        </p>
        <p>
          Founded with a vision to simplify event management, Plan Events empowers organizers to create unforgettable experiences with ease and efficiency.
        </p>
        <p>
          Established in 2025 by a person of seasoned event professionals and tech innovators, Plan Events was born from the need for a more streamlined approach to handling everything from small gatherings to large-scale conferences.
        </p>
        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>
            At Plan Events, our mission is to democratize event planning by providing accessible, powerful tools that enable anyone—from individuals to corporations—to host successful events without the hassle.
          </p>
        </div>
        <div className="values-section">
          <h2>Our Core Values</h2>
          <ul>
            <li><strong>Innovation:</strong> Continuously evolving our platform with cutting-edge features to stay ahead in the event industry.</li>
            <li><strong>Reliability:</strong> Ensuring seamless performance so you can focus on what matters—creating memorable experiences.</li>
            <li><strong>User-Centric Design:</strong> Building intuitive interfaces that make event management enjoyable and efficient for all users.</li>
          </ul>
        </div>
      </div>
      <div className="about-image">
        <img src={collageImage} alt="Plan Events collage" />
      </div>
    </section>
  );
};

export default About;
