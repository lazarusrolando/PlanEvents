import React from 'react';
import { FaCalendarCheck } from 'react-icons/fa';
import ProductDetailPage from './ProductDetailPage';

const PlanningSoftware = () => (
  <ProductDetailPage
    eyebrow="Planning Software"
    title="Plan every event detail from one command center"
    description="Turn the first brief into a clear production plan with timelines, owners, notes, files, budgets, and task status connected in one place."
    Icon={FaCalendarCheck}
    highlights={[
      { value: '1', label: 'shared event plan' },
      { value: 'Live', label: 'task progress' },
      { value: 'Reusable', label: 'event templates' }
    ]}
    features={[
      'Timeline planning for milestones, sessions, approvals, and launch dates',
      'Owner assignment for tasks, dependencies, documents, and planning decisions',
      'Reusable templates for conferences, workshops, social events, and internal programs',
      'Central notes and files so teams do not lose context across chats and spreadsheets',
      'Status views that show ready, blocked, overdue, and completed planning work'
    ]}
    bestFor={[
      'Event managers building multi-stage programs',
      'Teams that need shared planning visibility',
      'Organizations running repeatable event formats',
      'Admins coordinating speakers, vendors, and internal owners'
    ]}
    workflow={[
      'Create the event plan, choose a template, and add milestones for the full lifecycle.',
      'Assign owners, attach files, and track approvals as work moves forward.',
      'Use status views to resolve blockers before they affect the event date.'
    ]}
  />
);

export default PlanningSoftware;
