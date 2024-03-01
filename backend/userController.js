const bcrypt = require('bcrypt');
const { GGUser } = require('./models/GGUserSchema');
const { createLog } = require('./methods/internalmethod');
//const mailsender = require('./methods/mailsender');
const { getUsers, getUserByEmail } = require('./methods/getmethod');
const { createUser } = require('./methods/postmethod');
const { updateUser, deleteUser } = require('./methods/cutdelpatchmethod');
const {sendVerificationEmail} = require("./methods/mailsender")
const {testWithTiming, test} = require("./methods/testmethod")

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

module.exports = {
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