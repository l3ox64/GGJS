const express = require('express');
const router = express.Router();
const { sendVerificationEmail, getUsers, getUserByEmail,sendPasswordResetEmail,resetPassword, createUser, updateUser, deleteUser, registerUser, loginUser, test, getLogsForUser, testWithTiming, forgotPassword } = require('./userController');

router.post('/forgotpassword', forgotPassword); // Utilizza solo il controller forgotPassword per la richiesta di reset della password
router.post('/forgotpassword/reset', resetPassword); // Controller per reimpostare la password
router.post('/sendVerificationEmail', sendVerificationEmail);
router.post('/resetPassword', resetPassword); // Nuovo endpoint per reimpostare la password
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

module.exports = router;
