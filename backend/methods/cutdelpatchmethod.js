const { GGUser } = require('../models/GGUserSchema');
const { createLog } = require('./internalmethod');
const bcrypt = require('bcrypt');

const updateUser = async (req, res, next) => {
  try {
    const userEmail = req.params.email;
    const updateFields = req.body;
    
    if (updateFields.hasOwnProperty('Pw_utente')) {
      const hashedPassword = await bcrypt.hash(updateFields.Pw_utente, 10);
      updateFields.Pw_utente = hashedPassword;
    }
    const updatedUser = await GGUser.findOneAndUpdate({ Email_utente: userEmail }, updateFields, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    
    // Aggiorna i campi di log solo se ci sono modifiche effettuate
    if (Object.keys(updateFields).length > 0) {
      await createLog(updatedUser, req, 'updateUser', 200, 'info', updateFields, null);
    }
    
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
};


const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await GGUser.findOneAndDelete({ Email_utente: req.params.email });
    await createLog(deletedUser, req, 'deleteUser', 200, 'info', deletedUser, null);
    res.json({ message: 'Utente eliminato con successo.' });
  } catch (error) {
    console.error(error);
    next(error);
    //res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateUser,
  deleteUser,
};