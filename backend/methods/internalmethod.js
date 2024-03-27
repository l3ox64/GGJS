const { GGUser } = require('../models/GGUserSchema');
const {GGUserLog} = require('../models/GGLogSchema')
const { ErrorTable, ExceptionTable } = require('../models/ErrExpSchema');

const createLog = async (user, req, operation, httpStatus, logLevel, modifiedData, modifiedFields) => {
  const log = {
    date: new Date(),
    operation,
    httpStatus,
    logLevel,
    modifiedData,
    requestType: req.method,
    modifiedFields,
  };
  try {
    const createdLog = await GGUserLog.create(log);
    user.logs.push(createdLog);
    await user.save();
    } catch (error) {
    console.error("Error creating log object:", error); // Log any errors that occur during creation or saving
  }
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