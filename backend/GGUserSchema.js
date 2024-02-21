const mongoose = require('mongoose');
const GGUserSchema = new mongoose.Schema({
    _id: { type: Number, auto: true, required: true },
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
    Flg_richiesta_pin: { type: Boolean, default: null }
  }, { collection: 'GG_Tab_anagrafe_utenti' });
  
  module.exports = GGUserSchema;
