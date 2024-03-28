const express = require('express');
//const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { testWithTiming } = require('./methods/testmethod');
const rateLimit = require('express-rate-limit');
const ErrorTable = require('./models/ErrExpSchema').ErrorTable;
//const methodOverride = require('method-override')

const configureApp = (app) => {
  //app.use(methodOverride())
  app.use((err, req, res, next) => {
    console.error(err.stack);
    const additionalInfo = err.additionalInfo || 'Nessuna informazione aggiuntiva';
    console.log(additionalInfo);
  
    const errorLog = {
      timestamp: new Date(),
      error: err.message,
      details: err.stack,
      additionalInfo: additionalInfo,
    };
  
    ErrorTable.create(errorLog);
  
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ error: 'errore di validazione', details: err.errors });
    } else if (err instanceof mongoose.Error.CastError) {
      res.status(400).json({ error: 'errore di conversione', details: err.message });
    } else if (err.name === 'UnauthorizedError') {
      res.status(401).json({ error: 'autenticazione fallita', details: err.message });
    } else if (err.name === 'ForbiddenError') {
      res.status(403).json({ error: 'accesso vietato', details: err.message });
    } else if (err.name === 'MethodNotAllowedError') {
      res.status(405).json({ error: 'metodo non consentito', details: err.message });
    } else if (err.name === 'NotAcceptableError') {
      res.status(406).json({ error: 'non accettabile', details: err.message });
    } else if (err.name === 'RequestTimeoutError') {
      res.status(408).json({ error: 'timeout della richiesta', details: err.message });
    } else if (err.name === 'ConflictError') {
      res.status(409).json({ error: 'conflitto', details: err.message });
    } else if (err.name === 'InternalServerError') {
      res.status(500).json({ error: 'errore interno del server', details: err.message });
    } else if (err.name === 'NotImplementedError') {
      res.status(501).json({ error: 'non implementato', details: err.message });
    } else {
      res.status(500).json({ error: 'qualcosa è andato storto', details: err.message });
    }
  
    console.error(err.stack);
  });

  app.use(express.json());
  //app.use(bodyParser.json());
  app.use(helmet());

  const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));


  app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });
  const {router, help} = require('./routes');
  app.use('/api', router);
  app.use('/',help);

};
const runTestWithTiming = () => {
  testWithTiming({}, {
    json: () => {}, 
    status: () => {}, 
  }, { auto: true });
};
module.exports = {configureApp, runTestWithTiming};