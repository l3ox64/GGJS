const nodemailer = require('nodemailer');
const { GGUser } = require('../models/GGUserSchema');
require('dotenv').config()
const { createLog } = require('./internalmethod');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_CODE,
  },
});

const sendVerificationEmail = async (req, res, next) => {
  try {
    const { to, verificationCode, isReset=false } = req.body;
    const existingUser = await GGUser.findOne({ Email_utente: to });
    console.log(to)

    if (existingUser && !isReset) {
      return res.status(400).json({ error: 'L\'email è già registrata.' });
    }
    if (!existingUser && isReset) {
      return res.status(400).json({ error: 'L\'email non è registrata' });
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
  await createLog(to, req, 'sendCode', 200, 'info', to, null);
};
module.exports = {
  sendVerificationEmail,
};