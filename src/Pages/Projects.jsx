import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { 
  faExternalLinkAlt, 
  faCode, 
  faShoppingCart,
  faTasks,
  faChartLine,
  faMobileAlt,
  faLaptopCode,
  faHeartbeat,
  faPalette,
  faLock
} from '@fortawesome/free-solid-svg-icons';
import './Projects.css';

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
        observer.unobserve(currentRef); // Utilise unobserve au lieu de disconnect
      }
    };
  }, []); // Plus de warning car on utilise currentRef

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

const Projects = () => {
  const [filter, setFilter] = useState('all');
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

  const projects = [
    {
      id: 1,
      title: "Site officiel MOSE RAI GC",
      description: "Conception et déploiement du site web institutionnel actuellement en production.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      category: "fullstack",
      link: "https://www.moseraigc.com",
      icon: faTasks,
      featured: true
    },
    {
      id: 2,
      title: "Plateforme E-commerce",
      description: "Application e-commerce complète avec système de panier, paiement en ligne et tableau de bord administrateur.",
      technologies: ["React", "Node.js", "MongoDB"],
      category: "fullstack",
      link: "https://sam-store-three.vercel.app/",
      icon: faShoppingCart,
      featured: true
    },
    {
      id: 3,
      title: "Portfolio avec Next",
      description: "Conception et déploiement du portfolio professionnel en utilisant Next.js pour une performance optimale et un SEO amélioré.",
      technologies: ["Next.js", "Node.js", "MongoDB", "Express"],
      category: "frontend",
      link: "https://my-portfolio-next-flax.vercel.app/",
      icon: faLaptopCode,
      featured: false
    },
    {
      id: 4,
      title: "Portfolio de Bryan",
      description: "Création d’un portfolio personnel pour un designer, mettant en avant ses compétences et projets.",
      technologies: ["React", "CSS", "Node.js"],
      category: "frontend",
      link: "https://portfolio-de-bryan-leo.vercel.app/",
      icon: faPalette,
      featured: false
    },
    {
      id: 5,
      title: "Applicatiion Healthy",
      description: "Une application dédiée à votre santé. suivi de vos analyses, factures et médicaments en toute simplicité",
      technologies: ["React", "CSS", "Node.js", "MongoDB"],
      category: "fullstack",
      link: "https://healthy-app-psi.vercel.app/",
      icon: faHeartbeat,
      featured: false
    },
    {
      id: 6,
      title: "Sites vitrines Vente de Véhicules",
      description: "Création d’interfaces responsives optimisées UX/UI.",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: "frontend",
      link: "https://site-voyage-tjzz.vercel.app/",
      icon: faChartLine,
      featured: false
    },
    {
      id: 7,
      title: "WhatsApp Clone",
      description: "Implémentation d’une application de messagerie avec gestion des utilisateurs et communication temps réel.",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: "frontend",
      link: "https://whatsapp-clone-dun-one.vercel.app/",
      icon: faMobileAlt,
      featured: true
    },
    {
      id: 8,
      title: "Prototype Pré-Diagnostic Médical",
      description: "Développement d’un système d’analyse logique basé sur les données utilisateurs.",
      technologies: ["React", "Node.js", "CSS"],
      category: "fullstack",
      link: "https://prototype-pre-diagnostic.vercel.app/",
      icon: faCode,
      featured: false
    },
  ];

  const filters = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'frontend', label: 'Frontend' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* En-tête */}
        <AnimatedBlock className="projects-header" delay={0.1}>
          <h2 className="section-title">
            Mes <span>projets</span>
          </h2>
          <p className="section-subtitle">
            Découvrez une sélection de mes réalisations techniques et professionnelles
          </p>
        </AnimatedBlock>

        {/* Filtres */}
        <AnimatedBlock className="projects-filters" delay={0.15}>
          <div className="filter-buttons">
            {filters.map(filterItem => (
              <button
                key={filterItem.id}
                className={`filter-btn ${filter === filterItem.id ? 'active' : ''}`}
                onClick={() => setFilter(filterItem.id)}
              >
                {filterItem.label}
              </button>
            ))}
          </div>
          <p className="filter-info">
            {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} trouvé{filteredProjects.length > 1 ? 's' : ''}
          </p>
        </AnimatedBlock>

        {/* Grille de projets - Chaque carte est un bloc animé */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <AnimatedBlock 
              key={project.id} 
              className={`project-card ${project.featured ? 'featured' : ''}`}
              delay={0.2 + (index * 0.05)} /* Délai progressif pour chaque carte */
            >
              {/* En-tête de la carte */}
              <div className="project-header">
                <div className="project-icon">
                  <FontAwesomeIcon icon={project.icon} />
                </div>
                {project.featured && (
                  <span className="featured-badge">
                    <FontAwesomeIcon icon={faLock} /> Projet phare
                  </span>
                )}
              </div>

              {/* Contenu de la carte */}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                {/* Technologies */}
                <div className="project-technologies">
                  <h4 className="tech-title">Technologies utilisées :</h4>
                  <div className="tech-tags">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Métadonnées */}
                <div className="project-meta">
                  <span className="meta-category">
                    Catégorie : <strong>{project.category}</strong>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="project-actions">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Voir le site
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        {/* CTA */}
        <div className="projects-cta">
          <p className="cta-text">
            Vous avez un projet similaire en tête ?
          </p>
          <a 
            href="#contact" 
            className="btn btn-primary"
            onClick={handleContactClick}
          >
            Discutons de votre projet
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;