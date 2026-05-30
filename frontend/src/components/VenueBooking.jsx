import React from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';
import ProductDetailPage from './ProductDetailPage';

const VenueBooking = () => (
  <ProductDetailPage
    eyebrow="Venue Booking"
    title="Compare, choose, and confirm the right event venue"
    description="Evaluate venue options, capture requirements, track booking decisions, and move confirmed spaces directly into the event plan."
    Icon={FaMapMarkedAlt}
    highlights={[
      { value: 'Venue', label: 'shortlists' },
      { value: 'Availability', label: 'notes' },
      { value: 'Booking', label: 'status' }
    ]}
    features={[
      'Venue comparison records for capacity, location, amenities, pricing, and constraints',
      'Availability notes and booking status for each shortlisted option',
      'Requirement tracking for room count, accessibility, catering, AV, parking, and access',
      'Decision notes that explain why a venue was selected or rejected',
      'Confirmed booking details that flow into logistics and planning workflows'
    ]}
    bestFor={[
      'Teams evaluating multiple venue options',
      'Events with strict capacity or location requirements',
      'Planners who need a documented booking decision trail',
      'Organizations that reuse venue research across events'
    ]}
    workflow={[
      'Create a shortlist and compare each venue against your event requirements.',
      'Track availability, pricing, constraints, and approval notes as options narrow.',
      'Confirm the booking and carry venue details into setup and logistics planning.'
    ]}
  />
);

export default VenueBooking;
