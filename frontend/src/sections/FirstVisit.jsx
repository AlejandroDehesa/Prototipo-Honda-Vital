import React from 'react';
import ScrollLink from '../components/ScrollLink';
import './FirstVisit.css';

const FirstVisit = () => {
  return (
    <section className="first-visit">
      <div className="container first-visit-container">
        <div className="first-visit-content">
          <h2>Que esperar en tu Primera Visita</h2>
          <p className="subtitle">Claridad y profesionalidad desde el primer momento.</p>
          <div className="steps-wrapper">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-text">
                <h4>Evaluacion Exhaustiva</h4>
                <p>
                  Estudio de tu historial clinico, postura y biomecanica para encontrar el origen
                  de tus sintomas.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <div className="step-text">
                <h4>Diagnostico y Explicacion</h4>
                <p>Te explico de manera clara y directa que ocurre en tu cuerpo y como puedo ayudarte.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-text">
                <h4>Primer Ajuste</h4>
                <p>Si es seguro y adecuado, realizaremos tu primer ajuste quiropractico en la misma sesion.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">04</div>
              <div className="step-text">
                <h4>Plan Personalizado</h4>
                <p>Nos enfocamos en un cuidado pautado segun tus objetivos de salud y recuperacion.</p>
              </div>
            </div>
          </div>
          <ScrollLink to="#contacto" className="btn-primary mt-4">
            Agenda tu primera visita
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default FirstVisit;
