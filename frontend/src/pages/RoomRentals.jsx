import React from 'react';
import { Link } from 'react-router-dom';
import { roomsData } from '../data/roomsData';
import './RoomRentals.css';

const RoomRentals = () => {
  return (
    <div className="room-rentals-container">
      <header className="rentals-header">
        <p className="rentals-eyebrow">Espacios profesionales</p>
        <h1>Alquiler de salas en Onda Vital</h1>
        <p className="rentals-intro">
          Un entorno cuidado, sereno y profesional para talleres, sesiones, formaciones y
          encuentros. Cada sala tiene una energia distinta y esta pensada para que el espacio sume
          valor real a tu propuesta.
        </p>

        <div className="rentals-highlights">
          <div className="rentals-highlight">
            <span>3 espacios</span>
            <strong>Con identidad propia</strong>
          </div>
          <div className="rentals-highlight">
            <span>Modalidades</span>
            <strong>Hora, bonos y horario fijo</strong>
          </div>
          <div className="rentals-highlight">
            <span>Entorno</span>
            <strong>Luz, calma y presencia</strong>
          </div>
        </div>
      </header>

      <section className="rooms-grid">
        {roomsData.map((room) => (
          <article key={room.id} className="room-card">
            <div className="room-image" style={{ backgroundImage: `url(${room.coverImage || room.images[0]})` }}>
              <div className="room-image-overlay"></div>
              <div className="room-image-top">
                <span className="room-badge">{room.shortName}</span>
                <span className="room-price-from">Desde {room.pricing.punctual[0]?.value}</span>
              </div>
            </div>

            <div className="room-info">
              <div className="room-heading">
                <div>
                  <h3>{room.name}</h3>
                  <p className="specs">
                    {room.specs} • {room.size}
                  </p>
                </div>
              </div>

              <p className="description">{room.description}</p>

              <div className="room-meta-grid">
                <div className="room-meta-card">
                  <span>Capacidad</span>
                  <strong>{room.capacity}</strong>
                </div>
                <div className="room-meta-card">
                  <span>Disponibilidad</span>
                  <strong>{room.availability}</strong>
                </div>
              </div>

              <ul className="features">
                {room.features.slice(0, 4).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="room-card-footer">
                <div className="room-pricing-summary">
                  <span>Tarifa orientativa</span>
                  <strong>{room.pricing.punctual[0]?.label}: {room.pricing.punctual[0]?.value}</strong>
                </div>
                <Link to={`/alquiler-salas/${room.id}`} className="book-btn">
                  Ver sala
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default RoomRentals;
