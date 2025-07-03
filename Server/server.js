// =============================
// Chargement des variables d'environnement
// =============================
require('dotenv').config();

// =============================
// Imports des modules
// =============================
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

// =============================
// Initialisation de l'application
// =============================
const app = express();
const PORT = process.env.PORT || 3000;


// =============================
// Middlewares
// =============================
app.use(cors());
app.use(express.json());
// Servir les fichiers statiques du dossier parent (site web)
app.use(express.static('../'));

// =============================
// Configuration du transporteur Nodemailer
// =============================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// =============================
// Fonction utilitaire : validation d'email
// =============================
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// =============================
// Route : formulaire de contact
// =============================
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.json({ success: false, message: "Tous les champs sont obligatoires." });
  }
  if (!isValidEmail(email)) {
    return res.json({ success: false, message: "Email invalide." });
  }
  try {
    await transporter.sendMail({
      from: `"Contact DIEF" <${email}>`,
      to: 'diefrdc036@gmail.com', // Adresse de réception des messages de contact
      subject: `Nouveau message de ${name}`,
      text: message,
      html: `<p><strong>Nom :</strong> ${name}</p>
             <p><strong>Email :</strong> ${email}</p>
             <p><strong>Message :</strong><br>${message}</p>`
    });
    res.json({ success: true, message: "Votre message a bien été envoyé !" });
  } catch (err) {
    console.error("Erreur Nodemailer :", err);
    res.json({ success: false, message: "Erreur lors de l'envoi du message." });
  }
});

// =============================
// Route : formulaire de don (simulation)
// =============================
app.post('/api/don', async (req, res) => {
  const { fullName, email, customAmount, paymentMethod } = req.body;
  if (!fullName || !email || !paymentMethod) {
    return res.json({ success: false, message: "Tous les champs sont obligatoires." });
  }
  if (!isValidEmail(email)) {
    return res.json({ success: false, message: "Email invalide." });
  }
  if (customAmount && (isNaN(customAmount) || Number(customAmount) <= 0)) {
    return res.json({ success: false, message: "Montant invalide." });
  }
  try {
    await transporter.sendMail({
      from: `"Donateur DIEF" <${email}>`,
      to: 'diefrdc036@gmail.com', // Adresse de réception des notifications de don
      subject: `Nouveau don de ${fullName}`,
      html: `<p><strong>Nom :</strong> ${fullName}</p>
             <p><strong>Email :</strong> ${email}</p>
             <p><strong>Montant :</strong> ${customAmount || 'Non précisé'}</p>
             <p><strong>Méthode de paiement :</strong> ${paymentMethod}</p>`
    });
    res.json({ success: true, message: "Merci pour votre don !" });
  } catch (err) {
    res.json({ success: false, message: "Erreur lors de l'enregistrement du don." });
  }
});

// =============================
// Démarrage du serveur
// =============================
app.listen(PORT, () => {
  console.log(`Serveur DIEF en ligne sur http://localhost:${PORT}`);
});