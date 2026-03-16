import React, { useState } from 'react';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'quiropractica',
    message: ''
  });

  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage({ text: data.message, type: 'success' });
        setFormData({ name: '', email: '', phone: '', service: 'quiropractica', message: '' });
      } else {
        setStatusMessage({ text: data.message || 'Ha ocurrido un error. Inténtalo de nuevo.', type: 'error' });
      }
    } catch (error) {
      console.error('Network error during contact submission:', error);
      setStatusMessage({ text: 'Error de conexión con el servidor. Por favor, intenta de nuevo.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="container contact-container">
        
        <div className="contact-info">
          <h2>Da el primer paso hacia tu bienestar.</h2>
          <p>Estoy aquí para escucharte, evaluar tu situación y trazar un plan de acción claro. Escríbeme o agenda tu primera visita. Las plazas son limitadas para garantizar la máxima calidad en cada sesión.</p>
          
          <div className="contact-details">
            <div className="detail-item">
              <h4>Ubicación</h4>
              <p>Centro Onda Vital<br/>Calle Premium 123, Madrid</p>
            </div>
            <div className="detail-item">
              <h4>Contacto</h4>
              <p>+34 900 000 000<br/>david@ondavital.com</p>
            </div>
            <div className="detail-item">
              <h4>Horarios</h4>
              <p>Lunes a Viernes<br/>9:00 - 14:00 | 16:00 - 20:00</p>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Agenda tu consulta</h3>
            
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="service">Motivo principal</label>
              <select id="service" name="service" value={formData.service} onChange={handleChange}>
                <option value="quiropractica">Primera Visita Quiropráctica</option>
                <option value="resosense">Sesión Resosense</option>
                <option value="salas">Información Alquiler de Salas</option>
                <option value="otros">Otras consultas</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Explícame brevemente tu caso</label>
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
            
            <p className="form-disclaimer">Al enviar, aceptas política de privacidad. Este formulario no sustituye el consejo médico profesional.</p>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
