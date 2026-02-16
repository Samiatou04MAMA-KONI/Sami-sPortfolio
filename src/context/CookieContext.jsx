// src/context/CookieContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Création du contexte
const CookieContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useCookies = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookies doit être utilisé dans un CookieProvider');
  }
  return context;
};

// Provider du contexte
export const CookieProvider = ({ children }) => {
  const [cookieConsent, setCookieConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });
  
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Charger les préférences au démarrage
  useEffect(() => {
    const loadCookiePreferences = () => {
      try {
        const savedConsent = localStorage.getItem('cookieConsent');
        
        if (savedConsent) {
          setCookieConsent(JSON.parse(savedConsent));
          setShowBanner(false);
        } else {
          setShowBanner(true);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des cookies:', error);
        setShowBanner(true);
      } finally {
        setIsInitialized(true);
      }
    };

    loadCookiePreferences();
  }, []);

  // Accepter tous les cookies
  const acceptAllCookies = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setCookieConsent(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setShowBanner(false);
    setShowPreferences(false);
    
    // Activer les services
    handleServiceActivation(allAccepted);
  };

  // Refuser tous les cookies non nécessaires
  const refuseAllCookies = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    setCookieConsent(onlyNecessary);
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
    setShowBanner(false);
    setShowPreferences(false);
    
    // Désactiver les services
    handleServiceActivation(onlyNecessary);
  };

  // Sauvegarder les préférences personnalisées
  const savePreferences = (preferences) => {
    const newPreferences = {
      ...cookieConsent,
      ...preferences,
      necessary: true
    };
    setCookieConsent(newPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    setShowBanner(false);
    setShowPreferences(false);
    
    handleServiceActivation(newPreferences);
  };

  // Gérer l'activation/désactivation des services
  const handleServiceActivation = (preferences) => {
    // Analytics
    if (preferences.analytics) {
      console.log('✅ Analytics activés');
      document.cookie = "analytics_enabled=true; path=/; max-age=31536000";
    } else {
      console.log('❌ Analytics désactivés');
      document.cookie = "analytics_enabled=false; path=/; max-age=31536000";
      deleteCookiesStartingWith('_ga');
      deleteCookiesStartingWith('_gid');
    }
    
    // Marketing
    if (preferences.marketing) {
      console.log('✅ Marketing activés');
      document.cookie = "marketing_enabled=true; path=/; max-age=31536000";
    } else {
      console.log('❌ Marketing désactivés');
      document.cookie = "marketing_enabled=false; path=/; max-age=31536000";
      deleteCookiesStartingWith('_fbp');
    }
    
    // Préférences
    if (preferences.preferences) {
      console.log('✅ Préférences activées');
      document.cookie = "preferences_enabled=true; path=/; max-age=31536000";
    } else {
      console.log('❌ Préférences désactivées');
      document.cookie = "preferences_enabled=false; path=/; max-age=31536000";
    }
  };

  // Supprimer les cookies qui commencent par un préfixe
  const deleteCookiesStartingWith = (prefix) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name] = cookie.trim().split('=');
      if (name.startsWith(prefix)) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    }
  };

  const value = {
    cookieConsent,
    showBanner,
    showPreferences,
    setShowPreferences,
    acceptAllCookies,
    refuseAllCookies,
    savePreferences,
    isInitialized
  };

  return (
    <CookieContext.Provider value={value}>
      {children}
    </CookieContext.Provider>
  );
};