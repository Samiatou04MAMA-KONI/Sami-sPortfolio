// src/components/CookiePreferences.jsx
import React, { useState } from 'react';
import { useCookies } from '../context/CookieContext';
import './CookiePreferences.css';

const CookiePreferences = () => {
  const { 
    showPreferences, 
    setShowPreferences, 
    cookieConsent, 
    savePreferences,
  } = useCookies();

  const [localPreferences, setLocalPreferences] = useState({ ...cookieConsent });

  if (!showPreferences) return null;

  const handleToggle = (key) => {
    if (key === 'necessary') return; // Ne pas pouvoir désactiver les cookies nécessaires
    setLocalPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    savePreferences(localPreferences);
  };

  const handleClose = () => {
    setShowPreferences(false);
  };

  return (
    <div className="cookie-modal-overlay">
      <div className="cookie-modal">
        <div className="cookie-modal-header">
          <h2>🍪 Préférences des cookies</h2>
          <button className="cookie-modal-close" onClick={handleClose}>×</button>
        </div>

        <div className="cookie-modal-content">
          <p className="cookie-modal-description">
            Nous utilisons différents types de cookies pour améliorer votre expérience sur notre site. 
            Vous pouvez choisir lesquels vous souhaitez accepter.
          </p>

          {/* Cookies nécessaires */}
          <div className="cookie-option">
            <div className="cookie-option-header">
              <div className="cookie-option-info">
                <h3>Cookies nécessaires (toujours activés)</h3>
                <p className="cookie-option-description">
                  Ces cookies sont essentiels au fonctionnement du site. Ils permettent la navigation 
                  et l'accès aux fonctionnalités de base. Ils ne peuvent pas être désactivés.
                </p>
              </div>
              <div className="cookie-option-toggle">
                <span className="cookie-toggle always-active">Toujours actif</span>
              </div>
            </div>
          </div>

          {/* Cookies analytiques */}
          <div className="cookie-option">
            <div className="cookie-option-header">
              <div className="cookie-option-info">
                <h3>Cookies analytiques</h3>
                <p className="cookie-option-description">
                  Nous permettent de mesurer l'audience et d'analyser votre navigation pour améliorer 
                  nos services et votre expérience utilisateur.
                </p>
              </div>
              <div className="cookie-option-toggle">
                <label className="switch">
                  <input 
                    type="checkbox"
                    checked={localPreferences.analytics}
                    onChange={() => handleToggle('analytics')}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Cookies marketing */}
          <div className="cookie-option">
            <div className="cookie-option-header">
              <div className="cookie-option-info">
                <h3>Cookies marketing</h3>
                <p className="cookie-option-description">
                  Utilisés pour vous proposer des publicités personnalisées et mesurer leur efficacité.
                </p>
              </div>
              <div className="cookie-option-toggle">
                <label className="switch">
                  <input 
                    type="checkbox"
                    checked={localPreferences.marketing}
                    onChange={() => handleToggle('marketing')}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Cookies de préférences */}
          <div className="cookie-option">
            <div className="cookie-option-header">
              <div className="cookie-option-info">
                <h3>Cookies de préférences</h3>
                <p className="cookie-option-description">
                  Permettent de mémoriser vos choix et préférences pour personnaliser votre expérience.
                </p>
              </div>
              <div className="cookie-option-toggle">
                <label className="switch">
                  <input 
                    type="checkbox"
                    checked={localPreferences.preferences}
                    onChange={() => handleToggle('preferences')}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="cookie-modal-footer">
          <button className="cookie-btn cookie-btn-secondary" onClick={handleClose}>
            Annuler
          </button>
          <button className="cookie-btn cookie-btn-primary" onClick={handleSave}>
            Enregistrer mes préférences
          </button>
        </div>

        <div className="cookie-modal-reset">
          <button className="reset-link" onClick={() => {
            if (window.confirm('Voulez-vous vraiment réinitialiser tous vos choix ?')) {
              // Fonction à ajouter dans le contexte
              window.location.reload();
            }
          }}>
            Réinitialiser tous mes choix
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferences;