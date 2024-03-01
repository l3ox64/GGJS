const mongoose = require('mongoose');

const errorSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  error: String,
  details: String,
  additionalInfo: String,
  stackTrace: String,
});

const exceptionSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  exception: String,
  details: String,
  stackTrace: String,
});

const ErrorTable = mongoose.model('ErrorTable', errorSchema);
const ExceptionTable = mongoose.model('ExceptionTable', exceptionSchema);

module.exports = {
  ErrorTable,
  ExceptionTable,
};