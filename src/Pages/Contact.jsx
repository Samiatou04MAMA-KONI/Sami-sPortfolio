import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faPaperPlane,
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin as fabLinkedin, faInstagram, faFacebook, faTiktok, faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './Contact.css';

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
  }, []); // Plus de warning

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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });

    // Simuler l'envoi du formulaire (à remplacer par votre backend)
    try {
      // En production, vous utiliserez une vraie API
      // const response = await axios.post('/api/contact', formData);
      
      // Simulation d'un envoi réussi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus({
        submitting: false,
        submitted: true,
        error: null
      });
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Réinitialiser le statut après 5 secondes
      setTimeout(() => {
        setFormStatus({ submitting: false, submitted: false, error: null });
      }, 5000);

    } catch (error) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: 'Une erreur est survenue. Veuillez réessayer.'
      });
    }
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      title: 'Email',
      value: 'mamakonisami@gmail.com',
      link: 'mailto:mamakonisami@gmail.com',
      description: 'Réponse sous 24h'
    },
    {
      icon: faPhone,
      title: 'Téléphone',
      value: '+229 0158595425 / +229 0159233517',
      link: 'tel:+229 0158595425 / +229 0159233517',
      description: 'Du lundi au vendredi, 9h-18h'
    },
    {
      icon: faMapMarkerAlt,
      title: 'Localisation',
      value: 'Cotonou, Bénin',
      link: 'https://maps.app.goo.gl/uRN2cMvrG97inpv18',
      description: 'Disponible pour des projets internationaux'
    }
  ];

  const socialLinks = [
    {
      icon: faGithub,
      label: 'Github',
      url: 'https://linkedin.com/in/samiatou',
      color: '#1877f2'
    },
    {
      icon: fabLinkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/samiatou',
      color: '#1877f2'
    },
    {
      icon: faFacebook,
      label: 'Facebook',
      url: 'https://github.com/samiatou',
      color: '#1877f2'
    },
    {
      icon: faTiktok,
      label: 'TikTok',
      url: 'https://twitter.com/samiatou',
      color: '#1877f2'
    },
    {
      icon: faInstagram,
      label: 'Instagram',
      url: 'https://linkedin.com/in/samiatou',
      color: '#1877f2'
    },
    {
      icon: faWhatsapp,
      label: 'WhatsApp',
      url: '+229 0158595425',
      color: '#1877f2'
    }
  ];

  return (
    <section className="contact-section">
      <div className="container">
        {/* En-tête */}
        <AnimatedBlock className="contact-header" delay={0.1}>
          <h2 className="section-title">
            Me <span>contacter</span>
          </h2>
          <p className="section-subtitle">
            Discutons de votre projet et trouvons ensemble la meilleure solution
          </p>
        </AnimatedBlock>

        <div className="contact-content">
          {/* Informations de contact - Bloc principal */}
          <AnimatedBlock className="contact-info-section" delay={0.2}>
            <h3 className="info-section-title">
              <FontAwesomeIcon icon={faPaperPlane} /> Restons en contact
            </h3>
            <p className="info-section-description">
              N'hésitez pas à me contacter pour discuter de votre projet, 
              obtenir un devis ou simplement échanger sur les technologies.
            </p>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-detail-item">
                  <div className="detail-icon">
                    <FontAwesomeIcon icon={info.icon} />
                  </div>
                  <div className="detail-content">
                    <h4 className="detail-title">{info.title}</h4>
                    <a 
                      href={info.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="detail-value"
                    >
                      {info.value}
                    </a>
                    <p className="detail-description">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Réseaux sociaux - Bloc interne */}
            <AnimatedBlock className="social-links-section" delay={0.25}>
              <h4 className="social-title">Suivez-moi sur les réseaux</h4>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ '--social-color': social.color }}
                    aria-label={social.label}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                    <span className="social-label">{social.label}</span>
                  </a>
                ))}
              </div>
            </AnimatedBlock>
          </AnimatedBlock>

          {/* Formulaire de contact - Bloc principal */}
          <AnimatedBlock className="contact-form-section" delay={0.3}>
            <div className="form-header">
              <h3 className="form-title">Envoyez un message</h3>
              <p className="form-description">
                Remplissez le formulaire ci-dessous et je vous répondrai dans les plus brefs délais.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              {/* Messages d'état */}
              {formStatus.submitted && (
                <div className="form-message success">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span>Message envoyé avec succès ! Je vous répondrai très bientôt.</span>
                </div>
              )}

              {formStatus.error && (
                <div className="form-message error">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  <span>{formStatus.error}</span>
                </div>
              )}

              {/* Champ Nom */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Votre nom"
                  required
                  disabled={formStatus.submitting}
                />
              </div>

              {/* Champ Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Adresse email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="votre@email.com"
                  required
                  disabled={formStatus.submitting}
                />
              </div>

              {/* Champ Sujet */}
              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Sujet *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Objet de votre message"
                  required
                  disabled={formStatus.submitting}
                />
              </div>

              {/* Champ Message */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Décrivez votre projet ou votre demande..."
                  rows="6"
                  required
                  disabled={formStatus.submitting}
                />
              </div>

              {/* Bouton d'envoi */}
              <button
                type="submit"
                className={`btn btn-primary submit-btn ${formStatus.submitting ? 'submitting' : ''}`}
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? (
                  <>
                    <span className="spinner"></span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Envoyer le message
                  </>
                )}
              </button>

              <p className="form-note">
                * Champs obligatoires. Vos données seront traitées conformément à notre politique de confidentialité.
              </p>
            </form>
          </AnimatedBlock>
        </div>

        {/* CTA */}
        <AnimatedBlock className="contact-cta" delay={0.4}>
          <div className="cta-card">
            <h3 className="cta-title">Prêt à démarrer votre projet ?</h3>
            <p className="cta-text">
              Contactez-moi dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé.
            </p>
            <div className="cta-buttons">
              <a href="mailto:mamakonisami@gmail.com" className="btn btn-primary">
                <FontAwesomeIcon icon={faEnvelope} />
                Envoyer un email
              </a>
              <a href="tel:+229 0159233517" className="btn btn-secondary">
                <FontAwesomeIcon icon={faPhone} />
                Appeler maintenant
              </a>
            </div>
          </div>
        </AnimatedBlock>
      </div>
    </section>
  );
};

export default Contact;