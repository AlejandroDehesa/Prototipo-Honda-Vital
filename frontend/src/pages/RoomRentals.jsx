import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContentContext';
import './RoomRentals.css';

const RoomRentals = () => {
  const { sections, rooms } = useSiteContent();
  const rentals = sections.roomRentals || {};
  const highlights = rentals.highlights || [];

  return (
    <div className="room-rentals-container">
      <header className="rentals-header">
        <p className="rentals-eyebrow">{rentals.eyebrow}</p>
        <h1>{rentals.title}</h1>
        <p className="rentals-intro">{rentals.intro}</p>

        <div className="rentals-highlights">
          {highlights.map((item) => (
            <div key={`${item.label}-${item.value}`} className="rentals-highlight">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </header>

      <section className="rooms-grid">
        {rooms.map((room) => (
          <article key={room.id} className="room-card">
            <div className="room-image" style={{ backgroundImage: `url(${room.coverImage || room.images[0]})` }}>
              <div className="room-image-overlay"></div>
              <div className="room-image-top">
                <span className="room-badge">{room.shortName}</span>
                <span className="room-price-from">Desde {room.pricing?.punctual?.[0]?.value}</span>
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
                {(room.features || []).slice(0, 4).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="room-card-footer">
                <div className="room-pricing-summary">
                  <span>Tarifa orientativa</span>
                  <strong>
                    {room.pricing?.punctual?.[0]?.label}: {room.pricing?.punctual?.[0]?.value}
                  </strong>
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
