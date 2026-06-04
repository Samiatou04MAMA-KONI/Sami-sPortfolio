import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, 
  faCode, 
  faServer, 
  faRocket,
  faChevronLeft,
  faChevronRight,
  faChevronCircleLeft,
  faChevronCircleRight,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
// Import des icônes de réseaux sociaux
import { 
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [counters, setCounters] = useState({
    projects: 0,
    satisfaction: 0,
    support: 0
  });
  const [statsVisible, setStatsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false); // Nouvel état pour les réseaux sociaux
  const imageRefs = useRef([]);
  const statsRef = useRef(null);
  const socialSidebarRef = useRef(null); // Référence pour la barre sociale

  // Images du carrousel
  const carouselImages = [
    {
      id: 1,
      src: "/im1.jpeg",
      alt: "Développemeuse Full-Stack"
    },
    {
      id: 2,
      src: "/im5.jpeg",
      alt: "Au travail"
    },
    {
      id: 3,
      src: "/im4.jpeg",
      alt: "Samiatou MAMA KONI"
    },
    {
      id: 4,
      src: "/im5.jpeg",
      alt: "Développemeuse Full-Stack"
    }
  ];

  // Gestion du chargement d'image
  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => ({
      ...prev,
      [imageId]: true
    }));
  };

  // Fonction pour ouvrir/fermer les réseaux sociaux
  const toggleSocial = () => {
    setSocialOpen(!socialOpen);
  };

  // 1. LAZY LOADING pour les images du carrousel - CORRIGÉ
  useEffect(() => {
    // Capturer les images actuelles dans une variable locale
    const currentImageRefs = imageRefs.current;
    
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.01
      }
    );

    // Observer toutes les images
    currentImageRefs.forEach(img => {
      if (img) imageObserver.observe(img);
    });

    return () => {
      // Utiliser la variable locale dans le cleanup
      currentImageRefs.forEach(img => {
        if (img) imageObserver.unobserve(img);
      });
    };
  }, []); // Pas de dépendances nécessaires car on utilise une variable locale

  // 2. IntersectionObserver pour les STATISTIQUES - CORRIGÉ
  useEffect(() => {
    // Capturer la ref actuelle dans une variable locale
    const currentStatsRef = statsRef.current;
    if (!currentStatsRef) return;

    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          statsObserver.unobserve(entry.target);
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.3
      }
    );

    statsObserver.observe(currentStatsRef);

    return () => {
      // Utiliser la variable locale dans le cleanup
      if (currentStatsRef) {
        statsObserver.unobserve(currentStatsRef);
      }
    };
  }, []); // Pas de dépendances nécessaires

  // 3. Animation des compteurs SEULEMENT quand les stats sont VISIBLES
  useEffect(() => {
    if (statsVisible && !hasAnimated) {
      setHasAnimated(true);
      
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      // Fonction pour animer un compteur
      const animateCounter = (targetValue, key) => {
        return new Promise((resolve) => {
          let current = 0;
          const increment = targetValue / steps;
          const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
              current = targetValue;
              clearInterval(timer);
              resolve();
            }
            setCounters(prev => ({
              ...prev,
              [key]: Math.floor(current)
            }));
          }, interval);
        });
      };

      // Animer TOUS les compteurs en MÊME TEMPS
      Promise.all([
        animateCounter(20, 'projects'),
        animateCounter(100, 'satisfaction'),
        animateCounter(24, 'support')
      ]).then(() => {
        console.log('Tous les compteurs sont terminés');
      });
    }
  }, [statsVisible, hasAnimated]);

  // 4. Fermer les réseaux sociaux si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (socialSidebarRef.current && !socialSidebarRef.current.contains(event.target)) {
        setSocialOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  }, [carouselImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, [carouselImages.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="home" className="hero">
      {/* Boutons réseaux sociaux avec toggle */}
      <div 
        className={`social-sidebar ${socialOpen ? 'open' : 'closed'}`} 
        ref={socialSidebarRef}
      >
        <button 
          className="social-toggle-btn"
          onClick={toggleSocial}
          aria-label={socialOpen ? "Fermer les réseaux sociaux" : "Ouvrir les réseaux sociaux"}
        >
          <FontAwesomeIcon icon={socialOpen ? faChevronCircleLeft : faChevronCircleRight} />
        </button>
        
        <div className="social-buttons-container">
          <a 
            href="https://github.com/Samiatou04MAMA-KONI" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-btn github"
            aria-label="Github"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span className="social-tooltip">Github</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/samiatou-mama-koni-4101b12a4/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-btn linkedin"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} />
            <span className="social-tooltip">LinkedIn</span>
          </a>

          <a 
            href="https://web.facebook.com/samiatoumamakoni/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-btn facebook"
            aria-label="Facebook"
          >
            <FontAwesomeIcon icon={faFacebook} />
            <span className="social-tooltip">Facebook</span>
          </a>
          <a 
            href="https://www.instagram.com/samiatoumamakoni?igsh=MXRkand6bXI4ZHk0&utm_source=qr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-btn instagram"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
            <span className="social-tooltip">Instagram</span>
          </a>
          
          <a 
    href="/Samiatou_MAMA_KONI_Dev.pdf" 
    download="Samiatou_MAMA_KONI_Dev.pdf"
    className="social-btn cv-btn"
    aria-label="Télécharger mon CV"
  >
    <FontAwesomeIcon icon={faDownload} />
    <span className="social-tooltip">Télécharger CV</span>
  </a>
        </div>
      </div>

      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <FontAwesomeIcon icon={faCode} className="badge-icon" />
              <span>Développeuse Full-Stack</span>
            </div>

            <h1 className="hero-title">
              Samiatou <span className="hero-title-accent">MAMA KONI</span>
            </h1>

            <h2 className="hero-subtitle">
              Je transforme des idées en <span className="highlight">solutions digitales</span> performantes
            </h2>

            <p className="hero-description">
              Spécialisée dans le développement d'applications web modernes et évolutives, 
              j'allie technique et créativité pour offrir des expériences utilisateur de qualité.
            </p>

            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary hero-btn">
                Voir mes projets
                <FontAwesomeIcon icon={faArrowRight} className="btn-icon" />
              </Link>
              <Link to="#contact" className="btn btn-secondary hero-btn">
                Me contacter
              </Link>
            </div>
          </div>

          <div className="hero-carousel-container">
            <div className="hero-carousel">
              <div 
                className="carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {carouselImages.map((image, index) => (
                  <div key={image.id} className="carousel-slide">
                    <div className="image-frame">
                      <img 
                        ref={el => imageRefs.current[index] = el}
                        data-src={image.src}
                        alt={image.alt}
                        className={`carousel-image ${loadedImages[image.id] ? 'loaded' : ''}`}
                        onLoad={() => handleImageLoad(image.id)}
                        width="800"
                        height="500"
                        loading="lazy"
                      />
                      {!loadedImages[image.id] && (
                        <div className="image-loading">
                          <div className="loading-spinner"></div>
                          <span className="loading-text">Chargement...</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button 
                className="carousel-btn prev-btn"
                onClick={prevSlide}
                aria-label="Image précédente"
                type="button"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button 
                className="carousel-btn next-btn"
                onClick={nextSlide}
                aria-label="Image suivante"
                type="button"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>

              <div className="carousel-indicators">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Aller à l'image ${index + 1}`}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div 
          className={`hero-stats ${statsVisible ? 'visible' : ''}`}
          ref={statsRef}
        >
          <div className="stat-card">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faCode} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                <span className="counter">{counters.projects}</span>+
              </h3>
              <p className="stat-text">Projets réalisés</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faServer} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                <span className="counter">{counters.satisfaction}</span>%
              </h3>
              <p className="stat-text">Satisfaction client</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faRocket} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                <span className="counter">{counters.support}</span>/7
              </h3>
              <p className="stat-text">Support technique</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;