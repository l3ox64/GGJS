const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const GGUserSchema = require('./GGUserSchema');
const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/nomedeldb', { useNewUrlParser: true, useUnifiedTopology: true });

const GGUser = mongoose.model('GGUser', GGUserSchema);

app.use(bodyParser.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api/', limiter);

app.get('/api/users', async (req, res) => {
  try {
    const users = await GGUser.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:email', async (req, res) => {
  try {
    const user = await GGUser.findOne({ Email_utente: req.params.email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { Email_utente, Pw_utente } = req.body;
    if (!Email_utente || !Pw_utente) {
      return res.status(400).json({ error: 'Email e password sono campi obbligatori.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Pw_utente, saltRounds);

    const newUser = await GGUser.create({ ...req.body, Pw_utente: hashedPassword });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/:email', async (req, res) => {
  try {
    const updatedUser = await GGUser.findOneAndUpdate({ Email_utente: req.params.email }, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/users/:email', async (req, res) => {
  try {
    await GGUser.findOneAndDelete({ Email_utente: req.params.email });
    res.json({ message: 'Utente eliminato con successo.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { Email_utente, Pw_utente, Nome_utente, Cognome_utente } = req.body;

    const existingUser = await GGUser.findOne({ Email_utente });
    if (existingUser) {
      return res.status(400).json({ error: 'L\'email è già registrata.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Pw_utente, saltRounds);

    const newUser = await GGUser.create({
      Email_utente,
      Pw_utente: hashedPassword,
      Nome_utente,
      Cognome_utente,
    });

    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { Email_utente, Pw_utente } = req.body;

    const user = await GGUser.findOne({ Email_utente });
    if (!user) {
      return res.status(400).json({ error: 'Email non registrata.' });
    }

    const passwordMatch = await bcrypt.compare(Pw_utente, user.Pw_utente);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Password non valida.' });
    }

    res.json({ message: 'Accesso riuscito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






//___________________________________metodo di testing__________________________________________
app.get('/api/test', async (req, res) => {
  try {
    // Test di scrittura
    const testUser = new GGUser({
      Email_utente: 'test@example.com',
      Nome_utente: 'Test',
      Cognome_utente: 'User',
      Pw_utente: 'testpassword',
    });

    await testUser.save();

    // Test di lettura
    const readUser = await GGUser.findOne({ Email_utente: 'test@example.com' });
    if (!readUser) {
      return res.status(500).json({ error: 'Errore durante il test di lettura.' });
    }

    // Test di eliminazione
    await GGUser.findOneAndDelete({ Email_utente: 'test@example.com' });

    res.json({ message: 'API raggiungibile e test eseguito con successo.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});