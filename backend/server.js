const express = require('express');
const mongoose = require('mongoose');
const { testWithTiming } = require('./methods/testmethod');
const {configureApp, runTestWithTiming} = require('./appConfig');
const { sendNotificationEmail } = require('./runExceptionManager');
require('dotenv').config()
const app = express();
const { logError, logException } = require('./methods/internalmethod');

const DB_CHK_INTERVAL = 1000*60*10;
const TIMEOUT_TIME=10000 //tempo timeout in caso di errore 
const PORT = process.env.API_PORT;


try {
  mongoose.connect('mongodb://localhost:27017/GGJSDB', { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connesso al database MongoDB');
} catch (error) {
  console.error('Errore durante la connessione al database MongoDB:', error);
  process.exit(1);
}

setInterval(runTestWithTiming, DB_CHK_INTERVAL);
configureApp(app);
process.on('SIGINT', () => {
  try{
    mongoose.connection.close()
      console.log('Connessione al database chiusa correttamente');
      process.exit(0);
  }catch{console.log("errore dutante la chiusura della connessione")}
});
var server = app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
process.on('uncaughtException', handleUncaughtException); //blocco nel caso di uncaughtException
process.on('unhandledRejection', handleUnhandledRejection); // " unhandledRejection




function handleUncaughtException(err) {
  const stackTrace = err.stack || 'No stack trace available';
  logException('Uncaught Exception', err.message, stackTrace);
  console.error(`Errore non gestito: ${err.message}`);
  server.close(() => {
    setTimeout(() => {
      server.listen(PORT, () => {
        console.log(`Server riavviato dopo errore: ${err.message}`);
      });
    }, TIMEOUT_TIME);
  });
  
  sendNotificationEmail('Errore non gestito nel server', err.message);
}
function handleUnhandledRejection(reason) {
  const stackTrace = reason.stack || 'No stack trace available';
  logException('Unhandled Rejection', reason, stackTrace);
  console.error(`Unhandled Rejection: ${reason}`);
  server.close(() => {
    setTimeout(() => {
      server.listen(PORT, () => {
        console.log(`Server riavviato dopo errore: ${reason}`);
      });
    }, TIMEOUT_TIME);
  });
  sendNotificationEmail('Unhandled Rejection nel server', reason);
}