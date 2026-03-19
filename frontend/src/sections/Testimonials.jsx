import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import './Testimonials.css';

const Testimonials = () => {
  const { sections } = useSiteContent();
  const testimonials = sections.testimonials || {};
  const reviews = testimonials.items || [];

  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials-header text-center">
          <h2>{testimonials.title}</h2>
          <p className="subtitle">{testimonials.subtitle}</p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((review) => (
            <div key={review.id || review.author} className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">{review.text}</p>
              <div className="testimonial-author">
                <h4>{review.author}</h4>
                <span>{review.service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
