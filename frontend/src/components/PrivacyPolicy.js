import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <section className="privacy-policy-container">
      <div className="privacy-policy-content">
        <h1>Privacy Policy</h1>
        <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to Plan Events ("we," "us," or "our"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our event management platform.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details you provide when registering or creating events.</li>
          <li><strong>Event Data:</strong> Details about events you create or attend, including event names, dates, locations, and attendee lists.</li>
          <li><strong>Usage Data:</strong> Information about how you interact with our platform, such as pages visited, features used, and device information.</li>
          <li><strong>Cookies and Tracking Technologies:</strong> We use cookies to enhance your experience and analyze usage.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the collected information for the following purposes:</p>
        <ul>
          <li>To provide and maintain our services.</li>
          <li>To communicate with you about events and updates.</li>
          <li>To improve our platform and develop new features.</li>
          <li>To ensure security and prevent fraud.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2>4. Sharing Your Information</h2>
        <p>We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:</p>
        <ul>
          <li>With event organizers and attendees as necessary for event management.</li>
          <li>With service providers who assist us in operating our platform.</li>
          <li>When required by law or to protect our rights.</li>
        </ul>

        <h2>5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
        </p>

        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access and update your personal information.</li>
          <li>Request deletion of your data.</li>
          <li>Opt-out of marketing communications.</li>
          <li>Withdraw consent where applicable.</li>
        </ul>

        <h2>7. Children's Privacy</h2>
        <p>
          Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information promptly.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p>Email: privacy@planevents.com</p>
        <p>Address: 123 Event St, City, State 12345</p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
