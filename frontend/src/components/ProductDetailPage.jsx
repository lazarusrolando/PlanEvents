import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const ProductDetailPage = ({
  eyebrow,
  title,
  description,
  Icon,
  highlights,
  features,
  workflow,
  bestFor
}) => {
  return (
    <section className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-hero animate-on-scroll slide-up">
          <div className="product-detail-icon-wrap">
            <Icon className="product-detail-icon" />
          </div>
          <span className="products-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="products-actions">
            <Link to="/products" className="products-secondary-action">Back to Products</Link>
            <Link to="/contact" className="products-primary-action">Talk to Sales</Link>
          </div>
        </div>

        <div className="product-detail-highlights animate-on-scroll slide-up">
          {highlights.map((highlight, index) => (
            <article key={index}>
              <strong>{highlight.value}</strong>
              <span>{highlight.label}</span>
            </article>
          ))}
        </div>

        <div className="product-detail-grid animate-on-scroll slide-up">
          <section className="product-detail-card">
            <h2>Key Capabilities</h2>
            <ul className="product-detail-list">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="product-detail-card">
            <h2>Built For</h2>
            <ul className="product-detail-list">
              {bestFor.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="product-detail-workflow animate-on-scroll slide-up">
          <div>
            <span className="products-eyebrow">Workflow</span>
            <h2>How teams use it</h2>
          </div>
          <ol>
            {workflow.map((step, index) => (
              <li key={index}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  );
};

export default ProductDetailPage;
