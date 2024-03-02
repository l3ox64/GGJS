const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const GGUserLog = require('./GGLogSchema');




const GGUserSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  Email_utente: { type: String, unique: true, required: true },
  Nome_utente: { type: String, default: null },
  CF_utente: { type: String, default: null },
  Tp_sesso_utente: { type: String, enum: ['F', 'M'], default: null },
  Cognome_utente: { type: String, default: null },
  Id_area_utente: { type: Number, default: null },
  Id_classe_concorso_utente: { type: Number, default: null },
  Id_sede_servizio_utente: { type: Number, default: null },
  Id_servizio_utente: { type: Number, default: null },
  Dt_nascita_utente: { type: Date, default: null },
  Pin_utente: { type: Number, default: null },
  Pw_utente: { type: String, required: true },
  Flg_attivo_utente: { type: Boolean, default: null },
  Flg_part_time_congedi: { type: Boolean, default: null },
  N_gg_part_time_congedi: { type: Number, default: null },
  Flg_3anni_servizio: { type: Boolean, default: null },
  Id_utente_modifica_utente: { type: Number, default: null },
  Dt_utente_modifica_utente: { type: Date, default: null },
  Flg_segretario_utente: { type: Boolean, default: null },
  Flg_richiesta_pin: { type: Boolean, default: null },
  logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GGUserLog' }]

}, { collection: 'GG_Tab_anagrafe_utenti' });

GGUserSchema.pre('remove', async function (next) {
  try {
    const userEmail = this.Email_utente;
    await GGUserLog.create({ userEmail, operation: 'delete' });
    next();
  } catch (error) {
    next(error);
  }
});
const GGUser = mongoose.model('GGUser', GGUserSchema);

module.exports = {
  GGUser,
  GGUserLog,
};