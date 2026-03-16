import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      text: "Llevaba años con molestias crónicas. David no solo ajustó mi columna, me explicó con una calma increíble por qué me pasaba y cómo evitarlo. Su autoridad profesional se siente desde que entras.",
      author: "María G.",
      service: "Quiropráctica"
    },
    {
      id: 2,
      text: "He pasado por muchos profesionales, pero el enfoque de David es distinto. Analiza, comprende y ejecuta con una precisión que da muchísima confianza. El espacio además es de primer nivel.",
      author: "Carlos M.",
      service: "Quiropráctica & Resosense"
    },
    {
      id: 3,
      text: "Entender que la salud no es magia, sino lógica y biomecánica bien aplicada, me ha cambiado la vida. Gracias David por tu método y tu claridad.",
      author: "Elena R.",
      service: "Quiropráctica"
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials-header text-center">
          <h2>Experiencias</h2>
          <p className="subtitle">Resultados reales basados en método y confianza.</p>
        </div>

        <div className="testimonials-grid">
          {reviews.map(review => (
            <div key={review.id} className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">{review.text}</p>
              <div className="testimonial-author">
                <h4>{review.author}</h4>
                <span>{review.service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
