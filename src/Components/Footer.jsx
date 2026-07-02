import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// Import des icônes FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook,
  faGithub, 
  faLinkedin,  
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Fonction pour ouvrir WhatsApp avec le message prérempli
const handleWhatsAppClick = () => {
  const message = `Bonjour Samiatou,
Je vous contacte après avoir visité votre portfolio.
Je souhaiterais discuter avec vous d'un projet. J'attends votre retour.
Merci`;
  
  const url = `https://wa.me/2290158595425?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

  return (
    <footer className="footer">
      <div className="footer-container container">
        
        {/* Section supérieure du footer */}
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              Samiatou MAMA KONI
            </Link>
            <p className="footer-tagline">
              Développeuse Full-Stack passionnée par la création de solutions innovantes
            </p>
          </div>

          {/* Liens rapides */}
          <div className="footer-links">
            <h3 className="footer-title">Navigation</h3>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <Link to="/" className="footer-link">Accueil</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/projects" className="footer-link">Projets</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/skills" className="footer-link">Compétences</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/#about" className="footer-link">À propos</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/#contact" className="footer-link">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Réseaux sociaux */}
          <div className="footer-contact">
            <h3 className="footer-title">Contact</h3>
            <div className="footer-social">
              <a 
                href="https://wa.me/2290158595425?text=Bonjour Samiatou, je vous contacte suite à la visite de votre portfolio. Je souhaiterais discuter d'un projet avec vous. J'attends votre retour. Merci" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-link"
                aria-label="WhatsApp"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="footer-social-icon" />
              </a>
              <a 
                href="mailto:mamakonisami@gmail.com" 
                className="footer-social-link"
                aria-label="Email"
              >
                <FontAwesomeIcon icon={faEnvelope} className="footer-social-icon" />
              </a>
              <a 
                href="https://www.linkedin.com/in/samiatou-mama-koni/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-link"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} className="footer-social-icon" />
              </a>
              <a 
                href="https://web.facebook.com/samiatoumamakoni/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-link"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} className="footer-social-icon" />
              </a>
              <a 
                href="https://github.com/Samiatou04MAMA-KONI" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-link"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} className="footer-social-icon" />
              </a>
            </div>
            <div className="footer-email">
              <FontAwesomeIcon icon={faEnvelope} className="footer-email-icon" />
              <a href="mailto:mamakonisami@gmail.com" className="footer-email-link">
                mamakonisami@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Section inférieure du footer */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>
              &copy; {currentYear} Samiatou MAMA KONI. Tous droits réservés.
            </p>
          </div>
          
          <div className="footer-legal">
            <Link to="/politique-confidentialite" className="footer-legal-link">
              Politique de confidentialité
            </Link>
          </div>
        </div>

        {/* Bouton retour en haut */}
        <button 
          className="footer-back-to-top" 
          onClick={handleWhatsAppClick}
          aria-label="Contacter via WhatsApp"
          >
          <FontAwesomeIcon icon={faWhatsapp} className="footer-back-to-top-icon" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;