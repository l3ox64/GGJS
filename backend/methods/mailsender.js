const nodemailer = require('nodemailer');
const { GGUser } = require('../models/GGUserSchema');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ldaptestingldap@gmail.com',
    pass: "rtxv amgs sfvs seiw",
  },
});

const sendVerificationEmail = async (req, res) => {
  try {
    const { to, verificationCode } = req.body;
    const existingUser = await GGUser.findOne({ Email_utente: to });

    if (existingUser) {
      return res.status(400).json({ error: 'L\'email è già registrata.' });
    }

    const mailOptions = {
      from: 'ldaptestingldap@gmail.com',
      to: to,
      subject: 'Conferma Email',
      text: `Il tuo codice di verifica è: ${verificationCode}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Errore nell\'invio dell\'email di conferma.');
      } else {
        console.log('Email di conferma inviata: ' + info.response);
        res.status(200).send('Email di conferma inviata con successo.');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendVerificationEmail,
};