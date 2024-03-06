const { GGUser } = require('../models/GGUserSchema');

const getUsers = async (req, res, next) => {
  try {
    const users = await GGUser.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    error.additionalInfo = 'Errore nell\'invio dell\'email di conferma.';
    next(error);
    //res.status(500).json({ error: error.message });
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    const user = await GGUser.findOne({ Email_utente: req.params.email });
    res.json(user);
  } catch (error) {
    console.error(error);
    next(error);
    //res.status(500).json({ error: error.message });
  }
};



module.exports = {
  getUsers,
  getUserByEmail,
};