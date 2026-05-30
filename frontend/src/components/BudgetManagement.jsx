import React from 'react';
import { FaDollarSign } from 'react-icons/fa';
import ProductDetailPage from './ProductDetailPage';

const BudgetManagement = () => (
  <ProductDetailPage
    eyebrow="Budget Management"
    title="Control event spend before it becomes a surprise"
    description="Plan budgets, track committed costs, monitor remaining funds, and keep financial decisions visible across the event team."
    Icon={FaDollarSign}
    highlights={[
      { value: 'Real-time', label: 'spend status' },
      { value: 'Clear', label: 'variance alerts' },
      { value: 'Central', label: 'invoice tracking' }
    ]}
    features={[
      'Budget categories for venue, catering, speakers, marketing, staffing, and operations',
      'Allocated, committed, spent, and remaining totals for every major cost area',
      'Variance tracking that flags when estimates and actual costs drift apart',
      'Invoice and payment status notes connected to vendor and logistics records',
      'Budget summaries that help teams make approval decisions faster'
    ]}
    bestFor={[
      'Teams managing event profitability',
      'Planners that need approval-ready cost visibility',
      'Organizations working with many vendors and invoices',
      'Events where budget changes need fast review'
    ]}
    workflow={[
      'Set budget categories and estimated spend before vendor commitments begin.',
      'Track actuals, invoice status, and remaining funds as planning progresses.',
      'Use variance summaries to approve changes or adjust scope early.'
    ]}
  />
);

export default BudgetManagement;
