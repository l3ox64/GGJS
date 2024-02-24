const mongoose = require('mongoose');

const GGUserLogSchema = new mongoose.Schema({
  date: { type: Date, default: new Date() },
  ip: String,
  operation: String,
  httpStatus: Number,
  logLevel: String,
  modifiedData: Object,
  requestType: String,
  modifiedFields: [String],
});

module.exports = mongoose.model('GGUserLog', GGUserLogSchema);
