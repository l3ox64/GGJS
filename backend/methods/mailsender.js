const nodemailer = require('nodemailer');
const { GGUser } = require('../models/GGUserSchema');
require('dotenv').config()
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_CODE,
  },
});

const sendVerificationEmail = async (req, res, next) => {
  try {
    const { to, verificationCode } = req.body;
    const existingUser = await GGUser.findOne({ Email_utente: to });

    if (existingUser) {
      return res.status(400).json({ error: 'L\'email è già registrata.' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Conferma Email',
      text: `Il tuo codice di verifica è: ${verificationCode}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error(error);
        error.additionalInfo = 'Errore nell\'invio dell\'email di conferma.';
        next(error);
        //res.status(500).send('Errore nell\'invio dell\'email di conferma.');
      } else {
        console.log('Email di conferma inviata: ' + info.response);
        res.status(200).send('Email di conferma inviata con successo.');
      }
    });
  } catch (error) {
    console.error(error);
    next(error);
    //res.status(500).json({ error: error.message });
  }
};

const sendPasswordResetEmail = async (to, token) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Recupero Password',
      text: `Hai richiesto il recupero della password. Utilizza il seguente link per reimpostare la tua password: http://tuo-sito.com/reset-password?token=${token}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email di recupero password inviata a: ' + to);
  } catch (error) {
    console.error('Errore nell\'invio dell\'email di recupero password:', error);
    throw new Error('Errore nell\'invio dell\'email di recupero password.');
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};