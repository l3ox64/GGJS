const bcrypt = require('bcrypt');
const { GGUser, GGUserLog } = require('../models/GGUserSchema');
const mailsender = require('./mailsender');

const createLog = async (user, req, operation, httpStatus, logLevel, modifiedData, modifiedFields) => {
  const log = {
    date: new Date(),
    ip: req.ip,
    operation,
    httpStatus,
    logLevel,
    modifiedData,
    requestType: req.method,
    modifiedFields,
  };

  const createdLog = await GGUserLog.create(log);
  user.logs.push(createdLog);
  await user.save();
};

module.exports = {
  createLog,
};