import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Gestion du scroll pour changer le style de la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Détecter la section active
      const sections = ['home', 'about', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection && location.pathname === '/') {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Réinitialiser la section active quand on change de page
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
    } else if (location.hash) {
      setActiveSection(location.hash.substring(1));
    } else {
      setActiveSection('home');
    }
  }, [location]);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fonction pour gérer la navigation avec ancres
  const handleAnchorClick = (e, anchor) => {
    e.preventDefault();
    const sectionId = anchor.substring(1); // Enlever le #
    setActiveSection(sectionId);
    
    if (location.pathname === '/') {
      // Si on est déjà sur la page d'accueil, on scroll vers l'ancre
      const element = document.querySelector(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Sinon, on navigue vers la page d'accueil avec l'ancre
      navigate(`/${anchor}`);
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Projets', path: '/projects', anchor: null }, // Page séparée
    { name: 'Compétences', path: '/skills', anchor: null }, // Page séparée
    { name: 'À propos', path: '/', anchor: '#about' }, // Ancre sur HomePage
    { name: 'Contact', path: '/', anchor: '#contact' }, // Ancre sur HomePage
  ];

  // Vérifier si le lien est actif
  const isLinkActive = (path, anchor) => {
    if (anchor && location.pathname === '/' && activeSection === anchor.substring(1)) {
      return true;
    }
    if (location.pathname === path && !anchor) {
      return true;
    }
    return false;
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar">
          {/* Logo */}
          <Link 
            to="/" 
            className="navbar-logo"
            onClick={() => setActiveSection('home')}
          >
            <img src="logo.png" style={{width:'100px'}} alt="Logo" />
          </Link>
        

          {/* Menu Desktop */}
          <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.anchor ? (
                  <a
                    href={link.anchor}
                    onClick={(e) => handleAnchorClick(e, link.anchor)}
                    className={`nav-link ${isLinkActive(link.path, link.anchor) ? 'active' : ''}`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    to={link.path} 
                    className={`nav-link ${isLinkActive(link.path) ? 'active' : ''}`}
                    onClick={() => setActiveSection('')}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Bouton Contact Desktop */}
          <div className="navbar-cta-desktop">
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, '#contact')}
              className="btn btn-primary btn-small"
            >
              Me contacter
            </a>
          </div>

          {/* Bouton Menu Mobile */}
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </nav>

        {/* Menu Mobile */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.anchor ? (
                  <a
                    href={link.anchor}
                    onClick={(e) => handleAnchorClick(e, link.anchor)}
                    className={`mobile-nav-link ${isLinkActive(link.path, link.anchor) ? 'active' : ''}`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    to={link.path} 
                    className={`mobile-nav-link ${isLinkActive(link.path) ? 'active' : ''}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setActiveSection('');
                    }}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
            <li className="mobile-cta">
              <a
                href="#contact"
                onClick={(e) => handleAnchorClick(e, '#contact')}
                className="btn btn-primary"
              >
                Me contacter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;