const { GGUser, GGUserLog } = require('../models/GGUserSchema');
const { ErrorTable, ExceptionTable } = require('../models/ErrExpSchema');

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

const logError = async (error, details, additionalInfo, stackTrace) => {
  await ErrorTable.create({ error, details, additionalInfo, stackTrace });
};

const logException = async (exception, details, stackTrace) => {
  await ExceptionTable.create({ exception, details, stackTrace });
};

module.exports = {
  createLog,
  logError,
  logException,
};