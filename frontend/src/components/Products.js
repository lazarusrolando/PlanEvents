import React from 'react';
import './Products.css';
import { Link } from 'react-router-dom';

const Products = () => {
  const products = [
    { name: 'Planning Software', path: '/products/planning-software', description: 'Comprehensive tools for event planning.', icon: '📅' },
    { name: 'Scheduling Tools', path: '/products/scheduling-tools', description: 'Efficient scheduling for your events.', icon: '⏰' },
    { name: 'Budget Management', path: '/products/budget-management', description: 'Manage budgets effectively.', icon: '💰' },
    { name: 'Team Collaboration', path: '/products/team-collaboration', description: 'Collaborate with your team seamlessly.', icon: '🤝' },
    { name: 'Venue Logistics', path: '/products/venue-logistics', description: 'Handle venue logistics with ease.', icon: '🏢' },
    { name: 'Venue Booking', path: '/products/venue-booking', description: 'Book venues effortlessly.', icon: '📍' },
    { name: 'Logistics Management', path: '/products/logistics-management', description: 'Manage all logistics in one place.', icon: '🚚' },
    { name: 'Vendor Coordination', path: '/products/vendor-coordination', description: 'Coordinate vendors efficiently.', icon: '📋' },
  ];

  return (
    <section className="products">
      <div className="products-container">
        <div className="products-content animate-on-scroll slide-up">
          <h1 className="products-title">Our Products</h1>
          <p className="products-subtitle">
            Discover our suite of tools designed to streamline every aspect of event management. From planning to execution, we have the solutions you need.
          </p>
        </div>
        <div className="products-grid animate-on-scroll slide-up">
          {products.map((product, index) => (
            <Link key={index} to={product.path} className="product-card">
              <h3>{product.icon} {product.name}</h3>
              <p>{product.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
