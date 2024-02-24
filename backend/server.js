const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { GGUser, GGUserLog } = require('./models/GGUserSchema');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

try {
  mongoose.connect('mongodb://localhost:27017/GGJSDB', { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
  console.error('Errore durante la connessione al database MongoDB:', error);
  process.exit(1);
}

app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use('/api/', limiter);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});