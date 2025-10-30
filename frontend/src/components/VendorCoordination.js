import React from 'react';
import './VendorCoordination.css';

const VendorCoordination = () => {
  return (
    <section className="vendor-coordination-container">
      <div className="vendor-coordination-content">
        <h1>Vendor Coordination</h1>
        <p>Coordinate with vendors seamlessly. Our platform facilitates communication, contract management, and performance tracking to ensure all parties are aligned.</p>
        <div className="vendor-features">
          <h2>Features</h2>
          <ul>
            <li>Centralized vendor database and contact management.</li>
            <li>Automated contract generation and e-signatures.</li>
            <li>Task assignment and progress tracking.</li>
            <li>Payment processing and invoice management.</li>
            <li>Feedback and rating system for vendors.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VendorCoordination;
