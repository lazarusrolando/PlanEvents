import React from 'react';
import './LogisticsManagement.css';

const LogisticsManagement = () => {
  return (
    <section className="logistics-management-container">
      <div className="logistics-management-content">
        <h1>Logistics Management</h1>
        <p>Handle all your event logistics in one place. From inventory tracking to shipment coordination, our tools ensure smooth operations behind the scenes.</p>
        <div className="logistics-features">
          <h2>Features</h2>
          <ul>
            <li>Real-time inventory and stock monitoring.</li>
            <li>Shipment tracking with integrated carriers.</li>
            <li>Timeline and milestone management.</li>
            <li>Resource allocation and budgeting tools.</li>
            <li>Automated alerts for potential delays.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LogisticsManagement;
