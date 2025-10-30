import React from 'react';
import './SecurityTrust.css';

const SecurityTrust = () => {
  const securityFeatures = [
    {
      title: 'Data Encryption',
      description: 'All user data is encrypted using industry-standard AES-256 encryption to ensure your information remains secure.',
      icon: '🔒'
    },
    {
      title: 'Secure Payments',
      description: 'We use PCI DSS compliant payment gateways to protect your financial information during transactions.',
      icon: '💳'
    },
    {
      title: 'Compliance Standards',
      description: 'Plan Events adheres to GDPR, CCPA, and other privacy regulations to protect user rights and data.',
      icon: '📋'
    },
    {
      title: 'Regular Security Audits',
      description: 'Our systems undergo regular third-party security audits to identify and address potential vulnerabilities.',
      icon: '🔍'
    }
  ];

  return (
    <section className="security-trust-container">
      <div className="security-trust-content">
        <h1>Security & Trust</h1>
        <p>At Plan Events, your security and trust are our top priorities. We implement robust measures to protect your data and ensure a safe platform.</p>
        <div className="security-grid">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="security-card">
              <div className="security-icon">{feature.icon}</div>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityTrust;
