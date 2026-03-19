import React from 'react';
import ScrollLink from '../components/ScrollLink';
import { useSiteContent } from '../context/SiteContentContext';
import './FirstVisit.css';

const FirstVisit = () => {
  const { sections } = useSiteContent();
  const firstVisit = sections.firstVisit || {};
  const steps = firstVisit.steps || [];

  return (
    <section className="first-visit">
      <div className="container first-visit-container">
        <div className="first-visit-content">
          <h2>{firstVisit.title}</h2>
          <p className="subtitle">{firstVisit.subtitle}</p>
          <div className="steps-wrapper">
            {steps.map((step) => (
              <div key={`${step.number}-${step.title}`} className="step">
                <div className="step-number">{step.number}</div>
                <div className="step-text">
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
          <ScrollLink to={firstVisit.ctaTarget || '#contacto'} className="btn-primary mt-4">
            {firstVisit.ctaLabel || 'Agenda tu primera visita'}
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default FirstVisit;
