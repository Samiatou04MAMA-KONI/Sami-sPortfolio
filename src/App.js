import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Import des composants
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import Skills from './Pages/skills';
import Projects from './Pages/Projects';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import { CookieProvider } from './context/CookieContext'
import CookieBanner from './Components/CookieBanner';
import CookiePreferences from './Components/CookiePreferences';

// Composant pour gérer le scroll vers les ancres
const ScrollToAnchor = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    // Gérer le scroll vers les ancres
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    } else {
      // Si pas d'ancre, scroll vers le haut
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <CookieProvider>
      <Router>
        <div className="App">
          <ScrollToAnchor />
          <Navbar />
          <CookieBanner />
          <CookiePreferences />
          <Routes>
            {/* Route pour la HomePage avec ancres */}
            <Route path="/" element={<HomePage />} />
            <Route path="/#about" element={<HomePage />} />
            <Route path="/#contact" element={<HomePage />} />
            
            {/* Pages séparées */}
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            
            {/* Redirections pour compatibilité */}
            <Route path="/about" element={<HomePage />} />
            <Route path="/contact" element={<HomePage />} />
            <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CookieProvider>
  );
}

export default App;