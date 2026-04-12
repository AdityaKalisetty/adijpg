import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/nav.css';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">adi_k.jpg</NavLink>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <li><NavLink to="/" end onClick={handleNavClick}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={handleNavClick}>About</NavLink></li>
          <li><NavLink to="/services" onClick={handleNavClick}>Services</NavLink></li>
          <li><NavLink to="/portfolio" onClick={handleNavClick}>Portfolio</NavLink></li>
          <li><NavLink to="/contact" onClick={handleNavClick}>Contact</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
