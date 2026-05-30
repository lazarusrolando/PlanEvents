import React from 'react';
import { FaClipboardList } from 'react-icons/fa';
import ProductDetailPage from './ProductDetailPage';

const VendorCoordination = () => (
  <ProductDetailPage
    eyebrow="Vendor Coordination"
    title="Keep every vendor commitment visible and accountable"
    description="Manage vendor responsibilities, contact details, contracts, deadlines, invoices, and performance notes alongside the event plan."
    Icon={FaClipboardList}
    highlights={[
      { value: 'Vendor', label: 'records' },
      { value: 'Contract', label: 'status' },
      { value: 'Deadline', label: 'tracking' }
    ]}
    features={[
      'Central vendor profiles for contacts, services, notes, files, and event assignments',
      'Responsibility tracking for catering, AV, decor, staffing, transport, security, and more',
      'Contract, invoice, approval, and payment status fields tied to the vendor record',
      'Deadline and deliverable tracking so commitments do not disappear into email',
      'Post-event notes that help teams evaluate vendor performance for future events'
    ]}
    bestFor={[
      'Events involving multiple external partners',
      'Teams coordinating contracts, deliverables, and invoices',
      'Agencies managing vendor communication for clients',
      'Organizations building a reusable vendor knowledge base'
    ]}
    workflow={[
      'Create vendor records and define each partner responsibility for the event.',
      'Track contracts, invoices, deadlines, and deliverables throughout planning.',
      'Review performance notes after the event to improve future vendor decisions.'
    ]}
  />
);

export default VendorCoordination;
