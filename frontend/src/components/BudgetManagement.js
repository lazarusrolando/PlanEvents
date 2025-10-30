import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css'; // Reuse styling

const BudgetManagement = () => {
  return (
    <div className="products-container">
      <section className="hero-section">
        <h1>Effortless Event Budgeting</h1>
        <p>Take control of your event finances with our intuitive budget management tools. Plan, track, and optimize your spending to maximize profitability and ensure a successful event.</p>
        <Link to="/products" className="btn-primary">Back to Products</Link>
      </section>

      <section className="budget-breakdown-section">
        <h2>Detailed Budget Overview</h2>
        <p>Understand where your money is going with a clear breakdown of your event budget. Each category provides insights into allocated, spent, and remaining funds.</p>
        <div className="budget-table">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Allocated</th>
                <th>Spent</th>
                <th>Remaining</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Venue Rental</td>
                <td>$5,000</td>
                <td>$4,800</td>
                <td>$200</td>
                <td>Cost for renting the event space.</td>
              </tr>
              <tr>
                <td>Catering</td>
                <td>$3,500</td>
                <td>$3,200</td>
                <td>$300</td>
                <td>Expenses related to food and beverage services.</td>
              </tr>
              <tr>
                <td>Marketing</td>
                <td>$1,200</td>
                <td>$1,150</td>
                <td>$50</td>
                <td>Budget for promoting the event.</td>
              </tr>
              <tr>
                <td>Speakers</td>
                <td>$2,000</td>
                <td>$1,900</td>
                <td>$100</td>
                <td>Fees and travel costs for guest speakers.</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>$11,700</td>
                <td>$11,050</td>
                <td>$650</td>
                <td>Total budget allocated, spent, and remaining.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <ul>
          <li>Real-time expense tracking with receipt uploads</li>
          <li>AI-powered budget forecasting and variance alerts</li>
          <li>Automated vendor payment scheduling and invoice management</li>
          <li>Customizable financial reporting dashboards</li>
          <li>Multi-currency support for global events</li>
        </ul>
      </section>

      <section className="pricing-section">
        <h2>Pricing</h2>
        <div className="pricing-info">
          <p>As a valued dashboard user, unlock premium budget management features for only $69/month. Enjoy advanced integrations and dedicated support to optimize your event planning.</p>
          <Link to="/pricing-calculator" className="btn-primary">Explore Plans</Link>
        </div>
      </section>

    </div>
  );
};

export default BudgetManagement;
