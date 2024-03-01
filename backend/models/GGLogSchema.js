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

const PerformanceLogSchema = new mongoose.Schema({
  date: { type: Date, default: new Date() },
  operation: String,
  writeTime: Number,
  readTime: Number,
  updateTime: Number,
  deleteTime: Number,
  totalTime: Number,
  dskUsage: Number,
  autochk: Boolean,
  APIDBMemory: Number,
  TotalMemory: Number,
  PercMemory: Number,
  cpu: Number,
  slowQueries: Number,
});

module.exports = mongoose.model('PerformanceLog', PerformanceLogSchema);