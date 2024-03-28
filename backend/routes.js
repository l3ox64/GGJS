const express = require('express');
const router = express.Router();
const help = express.Router();
const { sendVerificationEmail, getUsers, getUserByEmail, createUser, updateUser, deleteUser, registerUser, loginUser, test, getLogsForUser, testWithTiming, forgotPassword } = require('./userController');
const {handleHelpRequest } = require('./apiInfo');

router.post('/sendVerificationEmail', sendVerificationEmail);
router.get('/users', getUsers);
router.get('/users/:email', getUserByEmail);
router.post('/users', createUser);
router.put('/users/:email', updateUser);
router.delete('/users/:email', deleteUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/test', test);
router.get('/logs/user/:email', getLogsForUser);
router.get('/testTime', testWithTiming);

router.get('/', handleHelpRequest);
help.get('/', handleHelpRequest);

module.exports = {router, help};
