import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import './Philosophy.css';

const Philosophy = () => {
  const { sections } = useSiteContent();
  const philosophy = sections.philosophy || {};
  const cards = philosophy.cards || [];

  return (
    <section id="filosofia" className="philosophy">
      <div className="container philosophy-container">
        <div className="philosophy-header text-center">
          <h2>{philosophy.title}</h2>
          <p className="subtitle">{philosophy.subtitle}</p>
        </div>

        <div className="philosophy-grid">
          {cards.map((card) => (
            <div key={`${card.number}-${card.title}`} className="card">
              <div className="card-icon">{card.number}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
