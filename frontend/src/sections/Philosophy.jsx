import React from 'react';
import './Philosophy.css';

const Philosophy = () => {
  return (
    <section id="filosofia" className="philosophy">
      <div className="container philosophy-container">
        <div className="philosophy-header text-center">
          <h2>Mi Visión y Método</h2>
          <p className="subtitle">Más allá del síntoma, buscando la causa.</p>
        </div>
        
        <div className="philosophy-grid">
          <div className="card">
            <div className="card-icon">01</div>
            <h3>Conexión Integral</h3>
            <p>Entiendo tu cuerpo como un ecosistema donde todo está conectado. No trato partes aisladas, trato a la persona en su totalidad para restaurar su armonía natural.</p>
          </div>
          <div className="card">
            <div className="card-icon">02</div>
            <h3>Autoridad Tranquila</h3>
            <p>Con años de experiencia clínica, mi enfoque es directo, basado en ciencia pero profundamente humano. Sentirás que estás en manos seguras y expertas desde el primer instante.</p>
          </div>
          <div className="card">
            <div className="card-icon">03</div>
            <h3>Acompañamiento</h3>
            <p>Tu proceso de recuperación u optimización es un camino que recorremos juntos. Te guío, te explico el 'por qué' y te empodero para que mantengas tus resultados.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
