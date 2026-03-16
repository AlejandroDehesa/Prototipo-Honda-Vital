import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h3>David <span>Quiropráctico</span></h3>
          <p>Potenciando tu bienestar desde el origen.</p>
        </div>
        
        <div className="footer-links">
          <h4>Navegación</h4>
          <ul>
            <li><a href="#filosofia">Filosofía</a></li>
            <li><a href="#quiropractica">Quiropráctica</a></li>
            <li><a href="#resosense">Resosense</a></li>
            <li><a href="#salas">Salas</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contacto</h4>
          <p>Centro Onda Vital</p>
          <p>Calle Ejemplo, 123</p>
          <p>Tel: +34 900 000 000</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} David Quiropráctico. Todos los derechos reservados.</p>
          <div className="legal-links">
            <Link to="/aviso-legal">Aviso Legal</Link>
            <Link to="/privacidad">Privacidad</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
