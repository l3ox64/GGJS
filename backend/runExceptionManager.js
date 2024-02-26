const { now } = require('mongoose');
const { logError, logException } = require('./methods/internalmethod');
const nodemailer = require('nodemailer');
const server  = require('./server');
require('dotenv').config()
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_CODE,
  },
});


/*[0] D:\codici ma piu belli\GGJS\backend\runExceptionManager.js:19
[0]   server.close(() => {
[0]          ^
[0]
[0] TypeError: server.close is not a function
[0]     at process.handleUncaughtException (D:\codici ma piu belli\GGJS\backend\runExceptionManager.js:19:10)
[0]     at process.emit (node:events:519:28)
[0]     at process._fatalException (node:internal/process/execution:178:25) */



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
