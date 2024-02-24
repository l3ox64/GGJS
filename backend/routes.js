const express = require('express');
const router = express.Router();
const { sendVerificationEmail, getUsers, getUserByEmail, createUser, updateUser, deleteUser, registerUser, loginUser, test, getLogsForUser } = require('./userController');

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

module.exports = router;
