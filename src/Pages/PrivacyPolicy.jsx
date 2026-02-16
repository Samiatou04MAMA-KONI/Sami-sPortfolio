// src/Pages/PrivacyPolicy.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <div className="container">
        <Link to="/" className="back-link">← Retour au site</Link>
        <div className="privacy-content">
          <h1>POLITIQUE DE CONFIDENTIALITÉ</h1>
          <p className="last-updated">Dernière mise à jour : 13 février 2026</p>

          <section>
            <h2>1. Introduction</h2>
            <p>Bienvenue sur le site portfolio de Samiatou MAMA KONI. La protection de vos données personnelles est une priorité. Cette politique de confidentialité vous informe de la manière dont vos informations sont collectées, utilisées et protégées lorsque vous utilisez ce site.</p>
          </section>

          <section>
            <h2>2. Identité du responsable du traitement</h2>
            <p><strong>Responsable :</strong> Samiatou MAMA KONI<br/>
            <strong>Email :</strong> mamakonisami@gmail.com</p>
          </section>

          <section>
            <h2>3. Données collectées</h2>
            <h3>3.1. Formulaire de contact</h3>
            <p>Lorsque vous utilisez le formulaire de contact, les informations suivantes sont collectées :</p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Objet du message</li>
              <li>Contenu du message</li>
            </ul>

            <h3>3.2. Données de navigation</h3>
            <p>Nous collectons automatiquement certaines informations lorsque vous visitez le site :</p>
            <ul>
              <li>Adresse IP</li>
              <li>Type de navigateur</li>
              <li>Pages visitées</li>
              <li>Durée de la visite</li>
              <li>Source de la visite</li>
            </ul>
          </section>

          <section>
            <h2>4. Finalités de la collecte</h2>
            <p>Vos données sont collectées pour :</p>
            <ul>
              <li>Répondre à vos demandes de contact</li>
              <li>Améliorer l'expérience utilisateur du site</li>
              <li>Analyser le trafic et les performances du site</li>
              <li>Assurer la sécurité du site</li>
            </ul>
          </section>

          <section>
            <h2>5. Base légale du traitement</h2>
            <p>Le traitement de vos données repose sur :</p>
            <ul>
              <li><strong>Votre consentement</strong> (pour le formulaire de contact)</li>
              <li><strong>Notre intérêt légitime</strong> (pour les données de navigation et l'amélioration du site)</li>
            </ul>
          </section>

          <section>
            <h2>6. Destinataires des données</h2>
            <p>Vos données personnelles ne sont pas vendues, échangées ou transférées à des tiers sans votre consentement, sauf dans les cas suivants :</p>
            <ul>
              <li>Hébergeur du site</li>
              <li>Prestataires techniques</li>
              <li>Obligations légales</li>
            </ul>
          </section>

          <section>
            <h2>7. Durée de conservation</h2>
            <table>
              <thead>
                <tr>
                  <th>Type de données</th>
                  <th>Durée de conservation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Messages de contact</td>
                  <td>1 an</td>
                </tr>
                <tr>
                  <td>Données de navigation</td>
                  <td>13 mois</td>
                </tr>
                <tr>
                  <td>Logs techniques</td>
                  <td>6 mois</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2>8. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul>
              <li><strong>Droit d'accès</strong> : consulter vos données personnelles</li>
              <li><strong>Droit de rectification</strong> : modifier vos données</li>
              <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
              <li><strong>Droit à la limitation</strong> : restreindre le traitement</li>
              <li><strong>Droit d'opposition</strong> : vous opposer au traitement</li>
              <li><strong>Droit à la portabilité</strong> : récupérer vos données</li>
            </ul>
            <p>Pour exercer vos droits, contactez-nous à : <strong>mamakonisami@gmail.com</strong></p>
          </section>

          <section>
            <h2>9. Sécurité</h2>
            <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre tout accès, modification, divulgation ou destruction non autorisés.</p>
          </section>

          <section>
            <h2>10. Cookies</h2>
            <p>Ce site utilise des cookies techniques essentiels au fonctionnement du site. Aucun cookie publicitaire ou de traçage tiers n'est utilisé sans votre consentement explicite.</p>
            <h3>Types de cookies utilisés :</h3>
            <ul>
              <li>Cookies de session (nécessaires au fonctionnement)</li>
              <li>Cookies d'analyse (optionnels, pour améliorer le site)</li>
            </ul>
          </section>

          <section>
            <h2>11. Contact</h2>
            <p>Pour toute question concernant cette politique de confidentialité :</p>
            <p><strong>Email :</strong> mamakonisami@gmail.com<br/>
            <strong>Temps de réponse :</strong> sous 48h ouvrées</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;