// src/components/CookieBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from '../context/CookieContext';
import './CookieBanner.css';

const CookieBanner = () => {
  const { 
    showBanner, 
    acceptAllCookies, 
    refuseAllCookies, 
    setShowPreferences 
  } = useCookies();

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-content">
        <div className="cookie-banner-text">
          <h3>🍪 Nous utilisons des cookies</h3>
          <p>
            Nous utilisons des cookies pour améliorer votre expérience de navigation, 
            analyser le trafic et personnaliser le contenu. En cliquant sur "Accepter tout", 
            vous consentez à l'utilisation de tous les cookies. Vous pouvez gérer vos 
            préférences à tout moment.
          </p>
        </div>
        
        <div className="cookie-banner-buttons">
          <button 
            onClick={() => setShowPreferences(true)}
            className="cookie-btn cookie-btn-preferences"
          >
            Personnaliser
          </button>
          <button 
            onClick={refuseAllCookies}
            className="cookie-btn cookie-btn-refuse"
          >
            Refuser tout
          </button>
          <button 
            onClick={acceptAllCookies}
            className="cookie-btn cookie-btn-accept"
          >
            Accepter tout
          </button>
        </div>
        
        <div className="cookie-banner-links">
          <Link to="/politique-confidentialite">Politique de confidentialité</Link>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;