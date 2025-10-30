import React from "react";
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h2 className="contact-header-title">Got a question? Fire away!</h2>
        <p className="contact-header-description">Fill out the form and a Databricks team member will reach out</p>
      </div>
      <div className="contact-content">
        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">* First Name</label>
              <input type="text" id="firstName" name="firstName" required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">* Last Name</label>
              <input type="text" id="lastName" name="lastName" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="company">* Company</label>
              <input type="text" id="company" name="company" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">* Email</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="message">* Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
          </div>
          <button type="submit" className="submitbutton">Submit</button>
        </form>
        <aside className="contact-sidebar">
          <hr />
          <h3>Need help with something specific?</h3>
          <ul>
            <li><a href="https://www.databricks.com/support/help-center" target="_blank" rel="noopener noreferrer">Help Center for Customers</a></li>
            <li><a href="https://www.databricks.com/training" target="_blank" rel="noopener noreferrer">Training</a></li>
            <li><a href="https://docs.databricks.com" target="_blank" rel="noopener noreferrer">Documentation</a></li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Contact;
