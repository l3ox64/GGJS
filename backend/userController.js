const bcrypt = require('bcrypt');
const { GGUser } = require('./models/GGUserSchema');
const { createLog } = require('./methods/internalmethod');
const { getUsers, getUserByEmail } = require('./methods/getmethod');
const { createUser } = require('./methods/postmethod');
const { updateUser, deleteUser } = require('./methods/cutdelpatchmethod');
const { sendVerificationEmail } = require("./methods/mailsender"); 
const { testWithTiming, test } = require("./methods/testmethod");

const registerUser = async (req, res) => {
  try {
    const { Email_utente, Pw_utente, Nome_utente, Cognome_utente } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Pw_utente, saltRounds);
    const newUser = await GGUser.create({
      Email_utente,
      Pw_utente: hashedPassword,
      Nome_utente,
      Cognome_utente,
    });
    res.json(newUser);
    await createLog(newUser, req, 'registerUser', 200, 'info', newUser, null);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
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
    await createLog(user, req, 'loginUser', 200, 'info', null, null);
    res.json({ message: 'Accesso riuscito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getLogsForUser = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const user = await GGUser.findOne({ Email_utente: userEmail }).populate({
      path: 'logs',
      select: '-modifiedData',
    });
    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato.' });
    }
    const userLogs = user.logs;
    res.json(userLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const c = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const user = await GGUser.findOne({ Email_utente: userEmail });
    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    const user = await GGUser.findOne({ Email_utente: email });
    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato.' });
    }

    // Verifica che il token inviato corrisponda al token memorizzato nel database per l'utente
    if (user.resetPasswordToken !== token) {
      return res.status(400).json({ error: 'Token non valido.' });
    }

    // Aggiorna la password dell'utente nel database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.Pw_utente = hashedPassword;
    user.resetPasswordToken = null; // Rimuovi il token di reset
    await user.save();
    res.json({ message: 'Password aggiornata con successo.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Aggiungi la funzione per reimpostare la password
const resetPassword = async (req, res, next) => {
  try {
    const { email, token, newPassword } = req.body;
    // Verifica che il token sia valido e non scaduto
    const isValidToken = validateToken(email, token); // Funzione da implementare per validare il token
    if (!isValidToken) {
      return res.status(400).json({ error: 'Il token di reset della password non è valido o è scaduto.' });
    }

    // Aggiorna la password per l'utente con l'email specificata
    const updatedUser = await GGUser.findOneAndUpdate({ Email_utente: email }, { Pw_utente: newPassword }, { new: true });
    if (!updatedUser) {
      return res.status(400).json({ error: 'Impossibile reimpostare la password. Utente non trovato.' });
    }

    res.status(200).json({ message: 'Password reimpostata con successo.' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


module.exports = {
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  getUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  test,
  getLogsForUser,
  testWithTiming,
};
