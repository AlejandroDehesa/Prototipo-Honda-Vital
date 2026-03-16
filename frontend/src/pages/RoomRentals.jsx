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
        <p>
          Un entorno cuidado, sereno y profesional para talleres, sesiones, formaciones y
          encuentros. Selecciona una sala para ver su informacion completa, galeria y condiciones.
        </p>
      </header>

      <section className="rooms-grid">
        {roomsData.map((room) => (
          <article key={room.id} className="room-card">
            <div className="room-image" style={{ backgroundImage: `url(${room.coverImage || room.images[0]})` }} />
            <div className="room-info">
              <div className="room-badge">{room.shortName}</div>
              <h3>{room.name}</h3>
              <p className="specs">
                {room.specs} · {room.size}
              </p>
              <p className="description">{room.description}</p>
              <ul className="features">
                {room.features.slice(0, 3).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="room-card-footer">
                <div className="room-capacity">
                  <span>Capacidad</span>
                  <strong>{room.capacity}</strong>
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
