const { GGUser } = require('../models/GGUserSchema');
const { createLog } = require('./internalmethod');

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await GGUser.findOneAndUpdate({ Email_utente: req.params.email }, req.body, { new: true });
    await createLog(updatedUser, req, 'updateUser', 200, 'info', updatedUser, null);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    next(error);
    //res.status(500).json({ error: error.message });
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