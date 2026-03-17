import React, { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { bookingPolicies, getRoomById } from '../data/roomsData';
import './RoomDetail.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const RoomDetail = () => {
  const { roomId } = useParams();
  const room = useMemo(() => getRoomById(roomId), [roomId]);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: ''
  });
  const [message, setMessage] = useState('');
  const [activeImage, setActiveImage] = useState(room?.heroImageIndex ?? 0);

  if (!room) {
    return <Navigate to="/alquiler-salas" replace />;
  }

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          room_id: room.id,
          user_name: bookingData.name,
          user_email: bookingData.email,
          user_phone: bookingData.phone,
          booking_date: bookingData.date
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        setMessage('Solicitud enviada con exito. David revisara la disponibilidad y te contactara.');
        setBookingData({ name: '', email: '', phone: '', date: '' });
      } else {
        setMessage(`Error al enviar la solicitud: ${data.message}`);
      }
    } catch (error) {
      setMessage('Error de conexion con el servidor.');
    }
  };

  return (
    <div className="room-detail-page">
      <section className="room-detail-hero">
        <div className="room-detail-copy">
          <Link to="/alquiler-salas" className="room-back-link">
            Volver a salas
          </Link>
          <p className="room-detail-eyebrow">Espacio Onda Vital</p>
          <h1>{room.name}</h1>
          <p className="room-detail-intro">{room.longDescription}</p>

          <div className="room-detail-meta">
            <div>
              <span>Espacio</span>
              <strong>
                {room.specs} · {room.size}
              </strong>
            </div>
            <div>
              <span>Capacidad</span>
              <strong>{room.capacity}</strong>
            </div>
            <div>
              <span>Disponibilidad</span>
              <strong>{room.availability}</strong>
            </div>
          </div>
        </div>

        <div className="room-detail-gallery">
          <div
            className="room-detail-main-image"
            style={{ backgroundImage: `url(${room.images[activeImage]})` }}
          />
          <div className="room-detail-thumbs">
            {room.images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`room-thumb ${index === activeImage ? 'is-active' : ''}`}
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => setActiveImage(index)}
                aria-label={`Ver imagen ${index + 1} de ${room.name}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="room-detail-content">
        <div className="room-detail-main">
          <article className="room-panel">
            <h2>Sobre esta sala</h2>
            <p>{room.description}</p>
          </article>

          <article className="room-panel">
            <h2>Equipamiento</h2>
            <ul className="room-feature-list">
              {room.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <article className="room-panel">
            <h2>Tarifas</h2>

            <div className="pricing-section">
              <h3>Precio por hora o por dias</h3>
              <div className="room-pricing-grid">
                {room.pricing.punctual.map((item) => (
                  <div key={item.label} className="room-price-card">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="pricing-section">
              <h3>Plan prepago</h3>
              <div className="room-pricing-grid">
                {room.pricing.prepaid.map((item) => (
                  <div key={item.label} className="room-price-card">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="pricing-section">
              <h3>Horario fijo semanal</h3>
              <div className="room-pricing-grid">
                {room.pricing.regular.map((item) => (
                  <div key={item.label} className="room-price-card">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <p className="room-price-note">Todos los precios son sin IVA.</p>
          </article>

          <article className="room-panel">
            <h2>Condiciones de reserva</h2>
            <ul className="room-policy-list">
              {bookingPolicies.map((policy) => (
                <li key={policy}>{policy}</li>
              ))}
            </ul>
          </article>
        </div>

        <aside className="room-booking-sidebar">
          <div className="room-panel room-booking-panel">
            <h2>Solicitar esta sala</h2>
            <p>
              Cuentanos la fecha que te interesa y te responderemos con disponibilidad,
              propuesta economica y siguientes pasos.
            </p>

            <form className="room-booking-form" onSubmit={handleBookingSubmit}>
              <input
                type="text"
                placeholder="Nombre completo"
                value={bookingData.name}
                onChange={(event) => setBookingData({ ...bookingData, name: event.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={bookingData.email}
                onChange={(event) => setBookingData({ ...bookingData, email: event.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Telefono"
                value={bookingData.phone}
                onChange={(event) => setBookingData({ ...bookingData, phone: event.target.value })}
              />
              <div className="room-date-field">
                <label>Fecha deseada</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(event) => setBookingData({ ...bookingData, date: event.target.value })}
                  required
                />
              </div>
              <button type="submit" className="room-booking-submit">
                Consultar disponibilidad
              </button>
              {message && <p className="room-booking-message">{message}</p>}
            </form>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default RoomDetail;
