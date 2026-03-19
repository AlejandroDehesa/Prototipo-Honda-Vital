import React from 'react';
import ScrollLink from '../components/ScrollLink';
import { useSiteContent } from '../context/SiteContentContext';
import './Hero.css';

const Hero = () => {
  const { sections } = useSiteContent();
  const hero = sections.hero || {};
  const trustItems = hero.trustItems || [];

  return (
    <section className="hero">
      <div className="hero-content container">
        <div className="hero-text">
          <h1>{hero.title}</h1>
          <p>{hero.description}</p>
          <div className="hero-actions">
            <ScrollLink to={hero.primaryCtaTarget || '#contacto'} className="btn-primary">
              {hero.primaryCtaLabel || 'Reserva tu primera visita'}
            </ScrollLink>
            <ScrollLink to={hero.secondaryCtaTarget || '#filosofia'} className="btn-secondary">
              {hero.secondaryCtaLabel || 'Conoce mi metodo'}
            </ScrollLink>
          </div>
          <div className="hero-trust">
            {trustItems.map((item, index) => (
              <React.Fragment key={item}>
                {index > 0 ? <span className="dot">•</span> : null}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="hero-image-wrapper">
          <div className="hero-image-bg"></div>
          <img src="/david-hero.jpg" alt="David, Quiropractico" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
