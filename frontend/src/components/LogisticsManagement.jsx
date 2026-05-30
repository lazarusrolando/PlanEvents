import React from 'react';
import { FaTruck } from 'react-icons/fa';
import ProductDetailPage from './ProductDetailPage';

const LogisticsManagement = () => (
  <ProductDetailPage
    eyebrow="Logistics Management"
    title="Run the behind-the-scenes work that makes events happen"
    description="Coordinate equipment, shipments, staffing, supplies, inventory, setup windows, and delivery checkpoints from one logistics workspace."
    Icon={FaTruck}
    highlights={[
      { value: 'Inventory', label: 'visibility' },
      { value: 'Delivery', label: 'checkpoints' },
      { value: 'Day-of', label: 'coordination' }
    ]}
    features={[
      'Inventory tracking for event supplies, equipment, signage, kits, and materials',
      'Delivery windows, pickup times, loading requirements, and shipment status notes',
      'Staffing and resource planning for setup, registration, support, and teardown',
      'Operational milestones that connect logistics work to the event timeline',
      'Alerts and ownership notes for delayed, blocked, or high-priority logistics tasks'
    ]}
    bestFor={[
      'Operations-heavy events with many moving parts',
      'Teams coordinating deliveries and setup timelines',
      'Planners managing equipment, inventory, and staffing',
      'Events where day-of logistics need clear accountability'
    ]}
    workflow={[
      'List the materials, equipment, staff, and deliveries needed for the event.',
      'Assign owners and track each logistics item against the event timeline.',
      'Monitor day-of readiness and resolve blocked items before they affect guests.'
    ]}
  />
);

export default LogisticsManagement;
