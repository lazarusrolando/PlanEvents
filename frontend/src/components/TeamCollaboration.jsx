import React from 'react';
import { FaUsers } from 'react-icons/fa';
import ProductDetailPage from './ProductDetailPage';

const TeamCollaboration = () => (
  <ProductDetailPage
    eyebrow="Team Collaboration"
    title="Keep every event stakeholder working from the same page"
    description="Bring planners, admins, speakers, vendors, and operations teams together around tasks, decisions, files, and status updates."
    Icon={FaUsers}
    highlights={[
      { value: 'Shared', label: 'workspaces' },
      { value: 'Role', label: 'visibility' },
      { value: 'Fewer', label: 'status meetings' }
    ]}
    features={[
      'Task ownership, due dates, and progress tracking for every event workstream',
      'Shared notes and files for planning decisions, contracts, requirements, and runbooks',
      'Role-aware collaboration so each team sees the details that matter to them',
      'Activity history that makes changes and decisions easier to trace',
      'Central updates that reduce scattered email threads and repeated check-ins'
    ]}
    bestFor={[
      'Cross-functional event teams',
      'Agencies working with clients and external partners',
      'Speaker and vendor coordination workflows',
      'Teams that need clear ownership and accountability'
    ]}
    workflow={[
      'Invite team members and assign each workstream to a clear owner.',
      'Centralize decisions, files, requirements, and task updates in the event workspace.',
      'Review progress and blockers without chasing updates across separate tools.'
    ]}
  />
);

export default TeamCollaboration;
