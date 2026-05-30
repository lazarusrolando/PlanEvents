import React from 'react';
import './Products.css';
import { Link } from 'react-router-dom';
import {
  FaCalendarCheck,
  FaClock,
  FaDollarSign,
  FaUsers,
  FaBuilding,
  FaMapMarkedAlt,
  FaTruck,
  FaClipboardList,
  FaChartLine,
  FaShieldAlt,
  FaHeadset
} from 'react-icons/fa';

const Products = () => {
  const products = [
    {
      name: 'Planning Software',
      path: '/products/planning-software',
      description: 'Build event timelines, assign tasks, and keep every planning decision connected from kickoff to wrap-up.',
      icon: FaCalendarCheck,
      tag: 'Plan'
    },
    {
      name: 'Scheduling Tools',
      path: '/products/scheduling-tools',
      description: 'Coordinate sessions, speakers, staff, rooms, and attendee touchpoints with schedule views that stay current.',
      icon: FaClock,
      tag: 'Schedule'
    },
    {
      name: 'Budget Management',
      path: '/products/budget-management',
      description: 'Track estimates, approvals, invoices, and spend changes before they become expensive surprises.',
      icon: FaDollarSign,
      tag: 'Control'
    },
    {
      name: 'Team Collaboration',
      path: '/products/team-collaboration',
      description: 'Give planners, admins, speakers, and vendors a shared workspace for decisions, files, and updates.',
      icon: FaUsers,
      tag: 'Align'
    },
    {
      name: 'Venue Logistics',
      path: '/products/venue-logistics',
      description: 'Organize room layouts, capacity notes, setup needs, access details, and day-of venue requirements.',
      icon: FaBuilding,
      tag: 'Prepare'
    },
    {
      name: 'Venue Booking',
      path: '/products/venue-booking',
      description: 'Compare venue options, capture booking details, and move confirmed locations into your event plan.',
      icon: FaMapMarkedAlt,
      tag: 'Book'
    },
    {
      name: 'Logistics Management',
      path: '/products/logistics-management',
      description: 'Manage equipment, transport, staffing, supplies, and delivery checkpoints in one operational view.',
      icon: FaTruck,
      tag: 'Execute'
    },
    {
      name: 'Vendor Coordination',
      path: '/products/vendor-coordination',
      description: 'Centralize vendor responsibilities, contract notes, deadlines, and status updates across every partner.',
      icon: FaClipboardList,
      tag: 'Coordinate'
    },
  ];

  const outcomes = [
    {
      icon: FaChartLine,
      title: 'Live Operational Visibility',
      description: 'See what is ready, what is blocked, and where the team needs attention across active events.'
    },
    {
      icon: FaShieldAlt,
      title: 'Reliable Event Controls',
      description: 'Keep budgets, approvals, schedules, and logistics organized with fewer disconnected spreadsheets.'
    },
    {
      icon: FaHeadset,
      title: 'Better Attendee Delivery',
      description: 'Connect planning work to the details that shape the on-site and virtual event experience.'
    }
  ];

  const process = [
    'Design the event plan with timelines, owners, budgets, and venue requirements.',
    'Coordinate speakers, vendors, schedules, ticketing, and registration workflows.',
    'Run the event with shared status, logistics tracking, and post-event reporting.'
  ];

  return (
    <section className="products">
      <div className="products-container">
        <div className="products-content animate-on-scroll slide-up">
          <span className="products-eyebrow">Plan Events Platform</span>
          <h1 className="products-title">Products built for complete event operations</h1>
          <p className="products-subtitle">
            Plan, coordinate, budget, book, and deliver events from one connected workspace. Each product supports a different part of the event lifecycle while keeping teams aligned around the same source of truth.
          </p>
          <div className="products-actions">
            <Link to="/signup" className="products-primary-action">Get Started</Link>
            <Link to="/contact" className="products-secondary-action">Contact Sales</Link>
          </div>
        </div>

        <div className="products-outcomes animate-on-scroll slide-up">
          {outcomes.map((outcome, index) => {
            const OutcomeIcon = outcome.icon;
            return (
              <article key={index} className="outcome-card">
                <OutcomeIcon className="outcome-icon" />
                <h2>{outcome.title}</h2>
                <p>{outcome.description}</p>
              </article>
            );
          })}
        </div>

        <div className="products-grid animate-on-scroll slide-up">
          {products.map((product, index) => {
            const ProductIcon = product.icon;
            return (
              <Link key={index} to={product.path} className="product-card">
                <div className="product-card-header">
                  <span className="product-icon-wrap">
                    <ProductIcon className="product-icon" />
                  </span>
                  <span className="product-tag">{product.tag}</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className="product-link-label">Explore product</span>
              </Link>
            );
          })}
        </div>

        <div className="products-process animate-on-scroll slide-up">
          <div>
            <span className="products-eyebrow">How It Works</span>
            <h2>One workflow from first brief to final report</h2>
          </div>
          <ol>
            {process.map((step, index) => (
              <li key={index}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Products;
