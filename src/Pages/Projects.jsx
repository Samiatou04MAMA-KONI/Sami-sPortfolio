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
  faDatabase,
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
      title: "Plateforme E-commerce",
      description: "Application e-commerce complète avec système de panier, paiement en ligne et tableau de bord administrateur.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API", "Redux"],
      category: "fullstack",
      link: "https://github.com/samiatou/ecommerce-platform",
      icon: faShoppingCart,
      featured: true
    },
    {
      id: 2,
      title: "Application de Gestion de Projets",
      description: "Outil de collaboration en temps réel pour la gestion de projets avec tableaux Kanban, chat et notifications.",
      technologies: ["Vue.js", "Express", "Socket.io", "PostgreSQL", "JWT"],
      category: "fullstack",
      link: "https://github.com/samiatou/project-management",
      icon: faTasks,
      featured: true
    },
    {
      id: 3,
      title: "Dashboard Analytics",
      description: "Tableau de bord analytique avec visualisations de données en temps réel et rapports personnalisables.",
      technologies: ["React", "D3.js", "Python", "FastAPI", "MySQL"],
      category: "frontend",
      link: "https://github.com/samiatou/analytics-dashboard",
      icon: faChartLine,
      featured: false
    },
    {
      id: 4,
      title: "Application Mobile de Fitness",
      description: "Application mobile de suivi d'activités physiques avec planification d'entraînements et statistiques.",
      technologies: ["React Native", "Firebase", "Google Fit API", "Context API"],
      category: "mobile",
      link: "https://github.com/samiatou/fitness-app",
      icon: faMobileAlt,
      featured: false
    },
    {
      id: 5,
      title: "Système de Gestion de Contenu",
      description: "CMS personnalisé avec éditeur WYSIWYG, gestion des utilisateurs et système de templates.",
      technologies: ["Next.js", "Strapi", "GraphQL", "AWS S3", "Docker"],
      category: "fullstack",
      link: "https://github.com/samiatou/custom-cms",
      icon: faCode,
      featured: true
    },
    {
      id: 6,
      title: "API de Gestion de Données",
      description: "API RESTful sécurisée avec authentification JWT, validation de données et documentation Swagger.",
      technologies: ["Node.js", "Express", "JWT", "MongoDB", "Swagger"],
      category: "backend",
      link: "https://github.com/samiatou/data-api",
      icon: faDatabase,
      featured: false
    }
  ];

  const filters = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'mobile', label: 'Mobile' }
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
                  Voir le code source
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