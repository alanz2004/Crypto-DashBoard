import React from 'react';
import './ContactUs.css';

const ContactUs: React.FC = () => {
  return (
    <section className="contact-section">
      <h2 className="contact-title">📬 Contact Us</h2>
      <p className="contact-subtext">
        Have a question, suggestion, or partnership idea? Let’s talk.
      </p>

      <form className="contact-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Your name" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Your email" />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea rows={5} placeholder="Write your message here..." />
        </div>

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default ContactUs;