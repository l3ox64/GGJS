const now = require('performance-now');
const { GGUser } = require('../models/GGUserSchema');
const PerformanceLog = require('../models/GGLogSchema');

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
    try {
      const startTime = new Date().getTime();
        const writeStartTime = new Date().getTime();
      const randomUserData = generateRandomUserData();
      const newUser = new GGUser(randomUserData);
      await newUser.save();
      const writeTime = new Date().getTime() - writeStartTime;
        const readStartTime = new Date().getTime();
      const readUser = await GGUser.findOne({ Email_utente: randomUserData.Email_utente });
      const readTime = new Date().getTime() - readStartTime;
    
      const updateStartTime = new Date().getTime();
      await GGUser.updateOne(
        { Email_utente: randomUserData.Email_utente },
        { $set: { Nome_utente: 'UpdatedName' } }
      );
      const updateTime = new Date().getTime() - updateStartTime;
      
      const deleteStartTime = new Date().getTime();
      await GGUser.findOneAndDelete({ Email_utente: randomUserData.Email_utente });
      const deleteTime = new Date().getTime() - deleteStartTime;
      const performanceLog = new PerformanceLog({
        operation: 'Time test - value in ms',
        writeTime,
        readTime,
        updateTime,
        deleteTime,
        totalTime: new Date().getTime() - startTime,
        autochk: auto,
      });
      await performanceLog.save();
      
      res.json({
        writeTime,
        readTime,
        updateTime,
        deleteTime,
        totalTime: new Date().getTime() - startTime,
      });  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
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
