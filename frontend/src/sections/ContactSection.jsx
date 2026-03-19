import React, { useEffect, useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import './ContactSection.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ContactSection = () => {
  const { sections } = useSiteContent();
  const contact = sections.contact || {};
  const serviceOptions = contact.serviceOptions || [];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: serviceOptions[0]?.value || 'quiropractica',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      service: current.service || serviceOptions[0]?.value || 'quiropractica'
    }));
  }, [serviceOptions]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ text: 'Procesando tu solicitud...', type: 'info' });

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage({ text: data.message, type: 'success' });
        setFormData({
          name: '',
          email: '',
          service: serviceOptions[0]?.value || 'quiropractica',
          message: ''
        });
      } else {
        setStatusMessage({
          text: data.message || 'Ha ocurrido un error. Intentalo de nuevo.',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Network error during contact submission:', error);
      setStatusMessage({
        text: 'Error de conexion con el servidor. Por favor, intenta de nuevo.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const locationLines = contact.locationLines || [];
  const contactLines = contact.contactLines || [];
  const scheduleLines = contact.scheduleLines || [];

  return (
    <section id="contacto" className="contact-section">
      <div className="container contact-container">
        <div className="contact-info">
          <h2>{contact.title}</h2>
          <p>{contact.description}</p>

          <div className="contact-details">
            <div className="detail-item">
              <h4>{contact.locationTitle || 'Ubicacion'}</h4>
              <p>
                {locationLines.map((line) => (
                  <React.Fragment key={line}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
            <div className="detail-item">
              <h4>{contact.contactTitle || 'Contacto'}</h4>
              <p>
                {contactLines.map((line) => (
                  <React.Fragment key={line}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
            <div className="detail-item">
              <h4>{contact.scheduleTitle || 'Horarios'}</h4>
              <p>
                {scheduleLines.map((line) => (
                  <React.Fragment key={line}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>{contact.formTitle || 'Agenda tu consulta'}</h3>

            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="service">Motivo principal</label>
              <select id="service" name="service" value={formData.service} onChange={handleChange}>
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Explicame brevemente tu caso</label>
              <textarea id="message" name="message" rows="4" required value={formData.message} onChange={handleChange}></textarea>
            </div>

            <button type="submit" className="btn-primary form-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Solicitar Cita'}
            </button>

            {statusMessage.text && (
              <div className={`form-status ${statusMessage.type}`}>
                <p>{statusMessage.text}</p>
              </div>
            )}

            <p className="form-disclaimer">
              {contact.formDisclaimer ||
                'Al enviar, aceptas politica de privacidad. Este formulario no sustituye el consejo medico profesional.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
