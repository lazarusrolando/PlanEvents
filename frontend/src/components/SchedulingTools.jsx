import React from 'react';
import { FaClock } from 'react-icons/fa';
import ProductDetailPage from './ProductDetailPage';

const SchedulingTools = () => (
  <ProductDetailPage
    eyebrow="Scheduling Tools"
    title="Build schedules that stay aligned as plans change"
    description="Coordinate sessions, speakers, rooms, staff, and attendee touchpoints with schedule tools designed for fast-moving event teams."
    Icon={FaClock}
    highlights={[
      { value: 'Conflict', label: 'checks' },
      { value: 'Multi-view', label: 'agendas' },
      { value: 'Instant', label: 'updates' }
    ]}
    features={[
      'Agenda views for sessions, rooms, speakers, teams, and attendee tracks',
      'Conflict detection for overlapping speakers, spaces, staff, and high-priority sessions',
      'Schedule changes that keep the team working from the latest version',
      'Session details for descriptions, timing, capacity, format, and owner notes',
      'Export-ready schedules for internal production teams and attendee communication'
    ]}
    bestFor={[
      'Conferences with multiple rooms or parallel tracks',
      'Speaker-led events with changing availability',
      'Programs that need staff and room coordination',
      'Teams replacing static agenda spreadsheets'
    ]}
    workflow={[
      'Add sessions, owners, locations, time blocks, and speaker details.',
      'Review conflicts and adjust timing before publishing the working schedule.',
      'Keep planners and stakeholders updated when sessions move or details change.'
    ]}
  />
);

export default SchedulingTools;
