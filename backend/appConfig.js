const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { testWithTiming } = require('./methods/testmethod');
const rateLimit = require('express-rate-limit');
const ErrorTable = require('./models/ErrExpSchema').ErrorTable;
const configureApp = (app) => {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        const additionalInfo = err.additionalInfo || 'Nessuna informazione aggiuntiva';
        console.log(additionalInfo)
        const errorLog = {
          timestamp: new Date(),
          error: err.message,
          details: err.stack,
          additionalInfo: additionalInfo,
        };
        ErrorTable.create(errorLog);
        if (err instanceof mongoose.Error.ValidationError) { //bad req validazione 400
          res.status(400).json({ error: 'errore di validazione', details: err.errors });
        } else if (err instanceof mongoose.Error.CastError) { //bad req conversione 400
          res.status(400).json({ error: 'errore di conversione', details: err.message });
        } else if (err.name === 'UnauthorizedError') { //401 non autorizzato
          res.status(401).json({ error: 'autenticazione fallita', details: err.message });
        } else if (err.name === 'ForbiddenError') { //403 forbidden
          res.status(403).json({ error: 'accesso vietato', details: err.message });
        } else if (err.name === 'MethodNotAllowedError') { //metodo non valido 405
          res.status(405).json({ error: 'metodo non consentito', details: err.message });
        } else if (err.name === 'NotAcceptableError') { //non accettabile 406
          res.status(406).json({ error: 'non accettabile', details: err.message });
        } else if (err.name === 'RequestTimeoutError') { //timeout 408
          res.status(408).json({ error: 'timeout della richiesta', details: err.message });
        } else if (err.name === 'ConflictError') { //conflitto 409
          res.status(409).json({ error: 'conflitto', details: err.message });
        } else if (err.name === 'InternalServerError') { //errore interno 500
          res.status(500).json({ error: 'errore interno del server', details: err.message });
        } else if (err.name === 'NotImplementedError') { //chiamaat a metodi non implementati 501
          res.status(501).json({ error: 'non implementato', details: err.message });
        } else {
          res.status(500).json({ error: 'qualcosa è andato storto', details: err.message }); //errore generico
        }
        console.error(err.stack);
      });

  app.use(express.json());
  app.use(bodyParser.json());
  app.use(helmet());

  const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10000,
  });
  app.use('/api/', limiter);

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });
  const routes = require('./routes');
  app.use('/api', routes);
};
const runTestWithTiming = () => {
  testWithTiming({}, {
    json: () => {}, 
    status: () => {}, 
  }, { auto: true });
};
module.exports = {configureApp, runTestWithTiming};