// api/contact.js - Fonction serverless pour Vercel
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Configuration CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gérer la pré-requête OPTIONS (CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Accepter uniquement les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validation des données
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Configuration du transporteur Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,     // Votre email Gmail
        pass: process.env.EMAIL_PASS      // Mot de passe d'application
      }
    });

    // Options de l'email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: 'mamakonisami@gmail.com',       // Où vous voulez recevoir
      replyTo: email,                      // Pour répondre directement à l'expéditeur
      subject: `[Portfolio] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #4f46e5; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📬 Nouveau message de contact</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Nom :</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email :</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">📝 Sujet :</div>
                <div class="value">${subject}</div>
              </div>
              
              <div class="field">
                <div class="label">💬 Message :</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>Cet email a été envoyé depuis votre portfolio.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Nouveau message de ${name}
        Email: ${email}
        Sujet: ${subject}
        Message: ${message}
      ` // Version texte pour les clients email qui n'affichent pas le HTML
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    // Réponse de succès
    return res.status(200).json({ 
      success: true, 
      message: 'Email envoyé avec succès' 
    });

  } catch (error) {
    console.error('Erreur détaillée:', error);
    
    return res.status(500).json({ 
      error: 'Erreur lors de l\'envoi de l\'email',
      details: error.message 
    });
  }
};