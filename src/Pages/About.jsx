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
      year: '2022 - Présent',
      title: 'Développeuse Full-Stack Senior',
      company: 'TechSolutions Inc.',
      description: 'Lead technique sur des projets web complexes, architecture microservices, mentoring junior developers.',
      icon: faBriefcase
    },
    {
      year: '2020 - 2022',
      title: 'Développeuse Full-Stack',
      company: 'Digital Innovations SARL',
      description: 'Développement d\'applications web sur mesure, optimisation des performances, intégration d\'APIs tierces.',
      icon: faBriefcase
    },
    {
      year: '2018 - 2020',
      title: 'Développeuse Frontend',
      company: 'WebCraft Studio',
      description: 'Création d\'interfaces utilisateur modernes avec React, collaboration avec les designers UX/UI.',
      icon: faBriefcase
    }
  ];

  const education = [
    {
      year: '2016 - 2018',
      title: 'Master en Informatique',
      institution: 'Université de Technologie',
      description: 'Spécialisation en génie logiciel et architecture des systèmes.',
      icon: faGraduationCap
    },
    {
      year: '2013 - 2016',
      title: 'Licence en Informatique',
      institution: 'Institut Supérieur de Technologie',
      description: 'Fondamentaux en développement web et bases de données.',
      icon: faGraduationCap
    }
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
              <p className="profile-subtitle">Développeuse Full-Stack Sénior</p>
            </div>
            
            <div className="profile-description">
              <p>
                Développeuse Full-Stack avec plus de 3 ans d'expérience dans la conception et 
                le développement d'applications web modernes et évolutives. Mon approche 
                combine expertise technique rigoureuse et orientation vers les résultats.
              </p>
              <p>
                Je me spécialise dans la création d'architectures robustes, l'optimisation des 
                performances et la mise en œuvre de bonnes pratiques de développement. 
                Mon objectif est toujours de fournir des solutions qui non seulement répondent 
                aux besoins fonctionnels, mais qui sont également maintenables, sécurisées et évolutives.
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
            Je crois que le développement logiciel n'est pas seulement une question de code, 
            mais une discipline qui nécessite une compréhension profonde des besoins métier, 
            une anticipation des évolutions futures et une attention constante à l'expérience utilisateur.
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