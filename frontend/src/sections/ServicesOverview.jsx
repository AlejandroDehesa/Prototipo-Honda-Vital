import React from 'react';
import { Link } from 'react-router-dom';
import ScrollLink from '../components/ScrollLink';
import './ServicesOverview.css';

const ServicesOverview = () => {
  return (
    <section className="services-overview">
      <div className="container">
        <div className="services-header text-center">
          <h2>Extensiones de mi trabajo</h2>
          <p className="subtitle">
            Espacios y metodos alineados con esta misma filosofia de bienestar.
          </p>
        </div>

        <div className="services-showcase">
          <div id="quiropractica" className="service-card primary-service">
            <div className="service-content">
              <h3>La Quiropractica</h3>
              <p>
                El pilar central de mi metodologia. A traves de ajustes precisos y experiencia
                consolidada, libero interferencias en tu sistema nervioso para que tu cuerpo
                exprese su maximo potencial de salud.
              </p>
              <ul className="service-features">
                <li>Evaluacion exhaustiva de tu caso</li>
                <li>Ajustes especificos y seguros</li>
                <li>Atencion en la causa, no solo en el sintoma</li>
              </ul>
              <ScrollLink to="#contacto" className="btn-primary">
                Inicia tu recuperacion
              </ScrollLink>
            </div>
          </div>

          <div className="secondary-services">
            <div id="resosense" className="service-card secondary-service">
              <div className="service-content">
                <h3>Resosense</h3>
                <p>
                  Una linea complementaria disenada para apoyar y potenciar los resultados del
                  cuidado principal. Tecnologia y vibracion a favor de la recuperacion celular,
                  guiada por mi criterio clinico.
                </p>
                <ScrollLink to="#contacto" className="btn-secondary">
                  Saber mas
                </ScrollLink>
              </div>
            </div>

            <div id="salas" className="service-card secondary-service">
              <div className="service-content">
                <h3>El Espacio (Salas)</h3>
                <p>
                  El entorno importa. He conceptualizado nuestras salas no solo para mi practica,
                  sino como un ecosistema premium que puedes integrar en tu propia dinamica
                  profesional.
                </p>
                <Link to="/alquiler-salas" className="btn-secondary">
                  Consultar disponibilidad
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
