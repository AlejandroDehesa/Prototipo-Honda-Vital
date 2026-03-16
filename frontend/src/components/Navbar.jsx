import React from 'react';
import { Link } from 'react-router-dom';
import ScrollLink from './ScrollLink';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <Link to="/">
            David <span className="logo-accent">Quiropractico</span>
          </Link>
        </div>
        <nav className="nav-links">
          <ScrollLink to="#filosofia">Filosofia</ScrollLink>
          <ScrollLink to="#quiropractica">Quiropractica</ScrollLink>
          <ScrollLink to="#resosense">Resosense</ScrollLink>
          <Link to="/alquiler-salas">Salas</Link>
          <Link to="/alquiler-salas" className="btn-primary nav-btn">
            Reservar
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
