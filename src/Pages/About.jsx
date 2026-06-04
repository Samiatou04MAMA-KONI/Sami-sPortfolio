import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { 
  faUserTie,
  faLightbulb,
  faGraduationCap,
  faBriefcase,
  faAward,
} from '@fortawesome/free-solid-svg-icons';
import './About.css';

// Composant pour le lazy loading d'image
const LazyImage = ({ src, alt, placeholderIcon, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const currentRef = imgRef.current; // Copie dans une variable
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={imgRef} className={`lazy-image-container ${className || ''}`}>
      {!isLoaded && (
        <div className="image-loading">
          {placeholderIcon ? (
            <FontAwesomeIcon icon={placeholderIcon} className="placeholder-icon loading" />
          ) : (
            <div className="loading-spinner"></div>
          )}
          <span className="loading-text">Chargement...</span>
        </div>
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
};

// Composant pour l'animation des blocs uniquement
const AnimatedBlock = ({ children, className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const blockRef = useRef(null);

  useEffect(() => {
    const currentRef = blockRef.current; // Copie dans une variable
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div 
      ref={blockRef} 
      className={`animated-block ${className || ''} ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

const About = () => {
  const navigate = useNavigate();
    
    // Fonction pour gérer le clic sur le bouton Contact
    const handleContactClick = (e) => {
      e.preventDefault();
      if (window.location.pathname === '/') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/#contact');
      }
    };

  const experiences = [
    {
      year: '2026',
      title: 'Développeuse Stratégique Adjointe Full-Stack',
      company: 'EBIDDER SARL',
      description: 'Participation au développement d’applications web modernes.',
      icon: faBriefcase
    },
    {
      year: '2025 - 2026',
      title: 'Développeuse Full-Stack',
      company: 'MOSE RAI GC',
      description: 'Développement full-stack d\'une application web responsive avec API REST et base de données SQL.',
      icon: faBriefcase
    },
    {
      year: '2024',
      title: 'Développeuse Full-Stack',
      company: 'Taka Tech Innov (TTI)',
      description: 'Développement de site vitrine, portfolio et site e-commerce',
      icon: faBriefcase
    }
  ];

  const education = [
    {
      year: '2023-2025',
      title: 'Licence en Électronique',
      institution: 'Ecole Normale Supérieure de l\'Enseignement Technique ENSET UNSTIM',
      description: 'Conception d\'une Boutique Intelligente et Autonome | Solution complète combinant application web (React / Node.js), API REST et système embarqué (ESP32, Arduino). | Système de paiement en ligne et de génération de QR codes sécurisés.',
      icon: faGraduationCap
    },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* En-tête */}
        <AnimatedBlock className="about-header" delay={0.1}>
          <h2 className="section-title">
            À <span>propos</span>
          </h2>
          <p className="section-subtitle">
            Passionnée par la création de solutions digitales innovantes et performantes
          </p>
        </AnimatedBlock>

        {/* Profil principal */}
        <div className="profile-section">
          {/* Bloc texte */}
          <AnimatedBlock className="profile-content" delay={0.2}>
            <div className="profile-header">
              <div className="profile-icon">
                <FontAwesomeIcon icon={faUserTie} />
              </div>
              <h3 className="profile-title">Samiatou MAMA KONI</h3>
              <p className="profile-subtitle">Développeuse Full-Stack</p>
            </div>
            
            <div className="profile-description">
              <p>
                Développeuse Full-Stack spécialisée en applications web modernes et évolutives, 
                je conçois et déploie des solutions digitales performantes alliant robustesse technique 
                et expérience utilisateur optimisée. Mes réalisations incluent des sites web institutionnels, 
                des plateformes e-commerce, des portfolios professionnels et des projets de systèmes 
                embarqués, développés avec React, Next.js, CSS, Node.js et MongoDB.
              </p>
              <p>
                Mon approche combine rigueur technique, bonnes pratiques de 
                développement et orientation résultats. Je m’efforce de livrer des 
                applications fiables, maintenables, sécurisées et évolutives, qui 
                répondent aux besoins réels des utilisateurs tout en garantissant des 
                performances optimales et une architecture solide.
              </p>
            </div>
          </AnimatedBlock>

          {/* Bloc image */}
          <AnimatedBlock className="profile-image-container" delay={0.3}>
            <div className="profile-image">
              <LazyImage 
                src="/im1.jpeg"
                alt="Samiatou MAMA KONI - Développeuse Full-Stack"
                placeholderIcon={faUserTie}
                className="profile-photo"
              />
            </div>
            <div className="profile-badge">
              <FontAwesomeIcon icon={faAward} />
              <span>Développeuse certifiée</span>
            </div>
          </AnimatedBlock>
        </div>

        {/* Philosophie et valeurs */}
        <AnimatedBlock className="philosophy-section" delay={0.4}>
          <h3 className="philosophy-title">
            <FontAwesomeIcon icon={faLightbulb} /> Ma Philosophie
          </h3>
          <p className="philosophy-text">
          Le développement logiciel ne se limite pas à écrire du code : c’est une discipline 
          qui exige de comprendre les besoins métier, d’anticiper les évolutions futures et de 
          concevoir des solutions pérennes. Chaque projet doit allier performance technique, 
          maintenabilité et expérience utilisateur, afin de créer des applications fiables et 
          adaptées aux besoins réels.
          </p>
        </AnimatedBlock>

        {/* Parcours professionnel - chaque bloc est animé séparément */}
        <div className="journey-section">
          {/* Bloc expérience */}
          <AnimatedBlock className="experience-section" delay={0.5}>
            <h3 className="journey-title">
              <FontAwesomeIcon icon={faBriefcase} /> Expérience Professionnelle
            </h3>
            <div className="timeline">
              {experiences.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker">
                    <FontAwesomeIcon icon={exp.icon} />
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-year">{exp.year}</div>
                    <h4 className="timeline-title">{exp.title}</h4>
                    <div className="timeline-company">{exp.company}</div>
                    <p className="timeline-description">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedBlock>

          {/* Bloc formation */}
          <AnimatedBlock className="education-section" delay={0.6}>
            <h3 className="journey-title">
              <FontAwesomeIcon icon={faGraduationCap} /> Formation
            </h3>
            <div className="timeline">
              {education.map((edu, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker">
                    <FontAwesomeIcon icon={edu.icon} />
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-year">{edu.year}</div>
                    <h4 className="timeline-title">{edu.title}</h4>
                    <div className="timeline-company">{edu.institution}</div>
                    <p className="timeline-description">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedBlock>
        </div>

        {/* Approche technique - chaque carte est un bloc */}
        <AnimatedBlock className="approach-section" delay={0.7}>
          <h3 className="approach-title">Mon Approche Technique</h3>
          <div className="approach-grid">
            {/* Chaque carte est un bloc animé */}
            <AnimatedBlock className="approach-card" delay={0.75}>
              <h4 className="approach-card-title">Analyse & Conception</h4>
              <p className="approach-card-text">
                Compréhension approfondie des besoins, conception d'architecture scalable 
                et définition des spécifications techniques détaillées.
              </p>
            </AnimatedBlock>
            
            <AnimatedBlock className="approach-card" delay={0.8}>
              <h4 className="approach-card-title">Développement Agile</h4>
              <p className="approach-card-text">
                Méthodologies Agile/Scrum, cycles de développement itératifs, 
                revues de code et intégration continue.
              </p>
            </AnimatedBlock>
            
            <AnimatedBlock className="approach-card" delay={0.85}>
              <h4 className="approach-card-title">Tests & Qualité</h4>
              <p className="approach-card-text">
                Tests unitaires, d'intégration et end-to-end. Revue de sécurité 
                et optimisation des performances avant déploiement.
              </p>
            </AnimatedBlock>
          </div>
        </AnimatedBlock>

        {/* CTA */}
        <div className="about-cta">
          <p className="cta-text">
            Vous recherchez une développeuse full-stack pour votre prochain projet ?
          </p>
          <a 
            href="#contact" 
            className="btn btn-primary"
            onClick={handleContactClick}
          >
            Travaillons ensemble
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;