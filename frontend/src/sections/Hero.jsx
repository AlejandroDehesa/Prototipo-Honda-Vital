import React from 'react';
import ScrollLink from '../components/ScrollLink';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content container">
        <div className="hero-text">
          <h1>Potenciando tu bienestar desde el origen.</h1>
          <p>
            Soy David, quiropractico. Mi objetivo es acompanarte a recuperar tu equilibrio natural
            y mejorar tu calidad de vida mediante un enfoque integral y personalizado.
          </p>
          <div className="hero-actions">
            <ScrollLink to="#contacto" className="btn-primary">
              Reserva tu primera visita
            </ScrollLink>
            <ScrollLink to="#filosofia" className="btn-secondary">
              Conoce mi metodo
            </ScrollLink>
          </div>
          <div className="hero-trust">
            <span>+15 anos de experiencia</span>
            <span className="dot">•</span>
            <span>Atencion personalizada</span>
            <span className="dot">•</span>
            <span>Entorno Premium</span>
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
