import React from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
  return (
    <section className="terms-of-service-container">
      <div className="terms-of-service-content">
        <h1>Terms of Service</h1>
        <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Plan Events ("we," "us," or "our"), you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          Plan Events is an event management platform that allows users to create, manage, and attend events. Our services include event planning tools, registration systems, and analytics.
        </p>

        <h2>3. User Accounts</h2>
        <p>
          To use certain features, you must register for an account. You are responsible for maintaining the confidentiality of your account and password.
        </p>

        <h2>4. User Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the service for any unlawful purpose</li>
          <li>Impersonate any person or entity</li>
          <li>Interfere with the service's operation</li>
          <li>Upload harmful or inappropriate content</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
          All content, trademarks, and data on Plan Events are owned by us or our licensors. You may not reproduce, distribute, or create derivative works without permission.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          We shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of the service.
        </p>

        <h2>7. Termination</h2>
        <p>
          We may terminate or suspend your account at any time for violations of these terms.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These terms are governed by the laws of [Insert Jurisdiction].
        </p>

        <h2>9. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use constitutes acceptance of the changes.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have questions about these Terms of Service, please contact us at legal@planevents.com.
        </p>
      </div>
    </section>
  );
};

export default TermsOfService;
