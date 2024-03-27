const mongoose = require('mongoose');

const GGUserLogSchema = new mongoose.Schema({
  date: { type: Date, default: new Date() },
  operation: String,
  httpStatus: Number,
  logLevel: String,
  modifiedData: Object,
  requestType: String,
  modifiedFields: [String],
});

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

module.exports = {
  PerformanceLog: mongoose.model('PerformanceLog', PerformanceLogSchema),
  GGUserLog: mongoose.model('GGUserLog', GGUserLogSchema)
};