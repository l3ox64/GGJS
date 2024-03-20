const bcrypt = require('bcrypt');
const { GGUser } = require('../models/GGUserSchema');
const { createLog } = require('./internalmethod');

const createUser = async (req, res, next) => {
  try {
    const { Email_utente, Pw_utente } = req.body;
    if (!Email_utente || !Pw_utente) {
      return res.status(400).json({ error: 'Email e password sono campi obbligatori.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Pw_utente, saltRounds);

    const newUser = await GGUser.create({ ...req.body, Pw_utente: hashedPassword });
    await createLog(newUser, req, 'createUser', 200, 'info', newUser, null);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    next(error);
    //res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
};