const now = require('performance-now');
const { GGUser } = require('../models/GGUserSchema');
const PerformanceLog = require('../models/GGLogSchema');
const { MongoClient } = require('mongodb');
const os = require('os-utils');
//const { ExceptionTable } = require('../models/ErrExpSchema');
const { Error } = require('mongoose');
const diskusage = require('diskusage');

const generateRandomUserData = () => {
  const randomString = [...Array(1000)].map(() => Math.random().toString(36)[2]).join('');
  return {
    Email_utente: `random_${randomString}@test.com`,
    Nome_utente: `Random_${randomString}`,
    Cognome_utente: `User_${randomString}`,
    Pw_utente: 'testpassword',
  };
};

const testWithTiming = async (req, res, { auto = false }) => {
  const startTime = now();

  const writeStartTime = now();
  const randomUserData = generateRandomUserData();
  const newUser = new GGUser(randomUserData);
  await newUser.save();
  const writeTime = now() - writeStartTime;

  const readStartTime = now();
  const readUser = await GGUser.findOne({ Email_utente: randomUserData.Email_utente });
  const readTime = now() - readStartTime;

  const updateStartTime = now();
  await GGUser.updateOne(
    { Email_utente: randomUserData.Email_utente },
    { $set: { Nome_utente: 'UpdatedName' } }
  );
  const updateTime = now() - updateStartTime;

  const deleteStartTime = now();
  await GGUser.findOneAndDelete({ Email_utente: randomUserData.Email_utente });
  const deleteTime = now() - deleteStartTime;

  const totalTime = now() - startTime;

  const serverStatus = await getServerStatus();
  const slowQueries = serverStatus.opcounters.query;
  const residentMemory = serverStatus.mem.resident; // MegaBytes

  // Crea un documento PerformanceLog
  const diskUsage = getDiskUsage();
  const TotalMem = os.totalmem();
  const FreeMem = os.freemem();
  const formatValue = (value) => (typeof value === 'number' ? value.toFixed(2) : value);
  const usedMemoryPercentage = ((TotalMem - FreeMem) / TotalMem) * 100;
  const PerDsk = (diskUsage.total - diskUsage.free) / diskUsage.total * 100;

  const formattedData = {
    operation: 'Time test - value in ms',
    writeTime: formatValue(writeTime),
    readTime: formatValue(readTime),
    updateTime: formatValue(updateTime),
    deleteTime: formatValue(deleteTime),
    totalTime: formatValue(totalTime),
    autochk: auto,
    dskUsage: formatValue(PerDsk),
    APIDBMemory: formatValue(residentMemory),
    TotalMemory: formatValue(TotalMem - FreeMem),
    PercMemory: formatValue(usedMemoryPercentage),
    cpu: formatValue(getCPUUsage()),
    slowQueries,
  };

  const performanceLog = new PerformanceLog(formattedData);
  await performanceLog.save();

  
  res.json(formattedData);
  if (usedMemoryPercentage > 90) {
    throw new MemoryFullError('Memory is too full.');
  }
  
  if (PerDsk > 90) {
    throw new DiskFullError('Disk is too full.');
  }
};
function getCPUUsage () {
  const usage = os.cpuUsage((value) => {
    return value
  });
  return usage
}
const getServerStatus = async () => {
  const mongoClient = new MongoClient('mongodb://localhost:27017/GGJSDB', {});

  try {
    await mongoClient.connect();
    const adminDb = mongoClient.db().admin();
    const serverStatus = await adminDb.command({ serverStatus: 1 });
    return serverStatus;
  } finally {
    await mongoClient.close();
  }
};
const getDiskUsage = () => {
  try {
    const disk = diskusage.checkSync('/');
    return disk;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const test = async (req, res) => {
    try {
      const testUser = new GGUser({
        Email_utente: 'test@example.com',
        Nome_utente: 'Test',
        Cognome_utente: 'User',
        Pw_utente: 'testpassword',
      });
      await testUser.save();
      const readUser = await GGUser.findOne({ Email_utente: 'test@example.com' });
      if(!readUser){return res.status(500).json({ error: '[deprecato: usa testWithTiming (/api/testtime) al posto di test] Errore durante il test di lettura.' });}
      await GGUser.findOneAndDelete({ Email_utente: 'test@example.com' });
      res.json({ message: '[deprecato: usa testWithTiming (/api/testtime) al posto di test] -- API raggiungibile e test eseguito con successo.' });
    } catch (error) {
      try{await GGUser.findOneAndDelete({ Email_utente: 'test@example.com' });}finally{res.status(500).json({ error: error.message });}
    }
  };

module.exports = {
  testWithTiming,
  test,
};
class MemoryFullError extends Error {
  constructor(message = 'Memory is too full.') {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
class DiskFullError extends Error {
  constructor(message = 'Disk is too full.') {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}