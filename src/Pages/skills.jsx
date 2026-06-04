import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom'; // AJOUTER CETTE LIGNE
import { 
  faCode, 
  faServer, 
  faDatabase,
  faCloud,
  faTools,
  faCogs,
  faRocket,
  faSync,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import './Skills.css';


const Skills = () => {
    const navigate = useNavigate(); // AJOUTER CE HOOK
  
  // Fonction pour gérer le clic sur le bouton Contact
  const handleContactClick = (e) => {
    e.preventDefault();
    // Si on est déjà sur la page d'accueil, on scroll vers contact
    if (window.location.pathname === '/') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Sinon, on navigue vers la page d'accueil avec l'ancre contact
      navigate('/#contact');
    }
  };
const skillCategories = [
  {
    id: 'frontend',
    title: 'Développement Frontend',
    icon: faCode,
    description: "Création d'interfaces utilisateur modernes, réactives et accessibles",
    skills: [
      { name: 'HTML5/CSS3', level: 95 },
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'React.js', level: 88 },
      { name: 'Next.js', level: 80 },
      { name: 'Responsive Design', level: 90 }
    ]
  },

  {
    id: 'backend',
    title: 'Développement Backend',
    icon: faServer,
    description: 'Architecture et développement de serveurs, API et logique métier',
    skills: [
      { name: 'Node.js/Express', level: 88 },
      { name: 'API REST/GraphQL', level: 87 }
    ]
  },
  
  {
    id: 'database',
    title: 'Bases de Données',
    icon: faDatabase,
    description: 'Conception, optimisation et gestion de bases de données',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'ORM (Prisma/Mongoose)', level: 83 }
    ]
  },
  
  {
    id: 'devops',
    title: 'DevOps & Déploiement',
    icon: faCloud,
    description: "Intégration, déploiement continu et gestion d'infrastructure",
    skills: [
      { name: 'CI/CD (GitHub Actions)', level: 82 },
      { name: 'Git', level: 90 }
    ]
  },
  
  {
    id: 'tools',
    title: 'Outils & Méthodologies',
    icon: faTools,
    description: 'Outils de développement et méthodologies de travail',
    skills: [
      { name: 'Figma', level: 80 },
      { name: 'Postman', level: 87 }
    ]
  },
  
  {
    id: 'soft',
    title: 'Compétences Transversales',
    icon: faRocket,
    description: 'Compétences complémentaires essentielles au succès des projets',
    skills: [
      { name: 'Communication Technique', level: 88 },
      { name: 'Résolution de Problèmes', level: 90 },
      { name: "Travail d'Équipe", level: 87 }, 
      { name: 'Veille Technologique', level: 83 }
    ]
  }
];

  const topSkills = [
  { name: 'React.js', icon: faCode, category: 'Frontend' },
  { name: 'Next.js', icon: faCogs, category: 'Full-Stack' },
  { name: 'Node.js', icon: faServer, category: 'Backend' },
  { name: 'MongoDB', icon: faDatabase, category: 'Base de données' },
  { name: 'Git', icon: faSync, category: 'Outils' }
];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        {/* En-tête */}
        <div className="skills-header">
          <h2 className="section-title">
            Mes <span>compétences</span>
          </h2>
          <p className="section-subtitle">
            Un éventail complet de technologies et méthodologies maîtrisées pour répondre à vos besoins techniques
          </p>
        </div>

        {/* Top Skills */}
        <div className="top-skills">
          <h3 className="top-skills-title">
            <FontAwesomeIcon icon={faRocket} /> Expertises principales
          </h3>
          <div className="top-skills-grid">
            {topSkills.map((skill, index) => (
              <div key={index} className="top-skill-item">
                <div className="top-skill-icon">
                  <FontAwesomeIcon icon={skill.icon} />
                </div>
                <div className="top-skill-content">
                  <h4 className="top-skill-name">{skill.name}</h4>
                  <p className="top-skill-category">{skill.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grille des catégories de compétences */}
        <div className="skills-categories">
          {skillCategories.map((category) => (
            <div key={category.id} className="skill-category-card">
              {/* En-tête de la catégorie */}
              <div className="category-header">
                <div className="category-icon">
                  <FontAwesomeIcon icon={category.icon} />
                </div>
                <h3 className="category-title">{category.title}</h3>
                <p className="category-description">{category.description}</p>
              </div>

              {/* Liste des compétences */}
              <div className="skills-list">
                {category.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.level}%` }}
                        data-level={skill.level}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        

        {/* CTA */}
        <div className="skills-cta">
          <p className="cta-text">
            Vous recherchez une expertise spécifique ?
          </p>
          <a 
            href="#contact" // CHANGER /contact par #contact
            className="btn btn-primary"
            onClick={handleContactClick} // AJOUTER onClick
          >
            Discutons de vos besoins techniques
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;