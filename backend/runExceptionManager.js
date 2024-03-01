const nodemailer = require('nodemailer');
//const server  = require('./server');
require('dotenv').config()
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_CODE,
  },
});

function sendNotificationEmail(subject, message) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.OWNER_EMAIL,
    subject: subject,
    text: "data e ora: "+Date.now()+"\nerrore: "+message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Errore nell\'invio dell\'email di notifica:', error);
    } else {
      console.log('Email di notifica inviata al proprietario:', info.response);
    }
  });
}

module.exports = {
  //handleUncaughtException,
  //handleUnhandledRejection,
  sendNotificationEmail,
};
