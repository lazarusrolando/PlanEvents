import React from 'react';
import { FaBuilding } from 'react-icons/fa';
import ProductDetailPage from './ProductDetailPage';

const VenueLogistics = () => (
  <ProductDetailPage
    eyebrow="Venue Logistics"
    title="Prepare every venue detail before event day"
    description="Document room layouts, capacity plans, access requirements, setup notes, equipment needs, and on-site responsibilities in a single operational view."
    Icon={FaBuilding}
    highlights={[
      { value: 'Room', label: 'setup plans' },
      { value: 'Capacity', label: 'tracking' },
      { value: 'On-site', label: 'readiness' }
    ]}
    features={[
      'Venue setup notes for seating, staging, signage, power, AV, and accessibility',
      'Capacity and room configuration tracking across spaces and sessions',
      'Access details for loading zones, staff entry, guest flow, and security requirements',
      'Operational checklists for setup, teardown, inspections, and venue handoff',
      'Linked logistics records for equipment, vendors, delivery windows, and staffing needs'
    ]}
    bestFor={[
      'Events with multiple rooms or venue zones',
      'Teams planning complex setup and teardown requirements',
      'Operations leads managing venue readiness',
      'Planners coordinating AV, staging, catering, and security details'
    ]}
    workflow={[
      'Capture venue requirements, room configurations, and access rules early.',
      'Link setup tasks to owners, vendors, delivery schedules, and event sessions.',
      'Use readiness checks to confirm the venue is prepared before attendees arrive.'
    ]}
  />
);

export default VenueLogistics;
