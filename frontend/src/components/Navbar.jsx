import React from 'react';
import { Link } from 'react-router-dom';
import ScrollLink from './ScrollLink';
import './Navbar.css';

const Navbar = () => {
  const openAssistant = () => {
    window.dispatchEvent(new CustomEvent('ondavital:open-chat'));
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <Link to="/">
            David <span className="logo-accent">Quiropractico</span>
          </Link>
        </div>
        <div className="nav-assistant">
          <button type="button" className="nav-ia-btn" onClick={openAssistant}>
            <span className="nav-ia-eyebrow">Asistente</span>
            <span className="nav-ia-title">IA</span>
          </button>
        </div>
        <nav className="nav-links">
          <ScrollLink to="#filosofia">Filosofia</ScrollLink>
          <ScrollLink to="#quiropractica">Quiropractica</ScrollLink>
          <ScrollLink to="#resosense">Resosense</ScrollLink>
          <Link to="/alquiler-salas" className="btn-primary nav-btn">
            Alquiler
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
