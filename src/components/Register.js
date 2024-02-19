import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState('');
  const [showVerification, setShowVerification] = useState(false); // Stato per mostrare/nascondere il componente di verifica
  const [verificationCode, setVerificationCode] = useState(''); // Stato per memorizzare il codice di verifica

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.endsWith("@giorgimi.edu.it");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(isValidEmail(newEmail));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordSecure(validatePassword(newPassword));
    setPasswordsMatch(confirmPassword === newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword);
  };

  const validatePassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(password);
  };

  const isFormValid = () => {
    return (
      isEmailValid &&
      isPasswordSecure &&
      passwordsMatch &&
      name !== '' &&
      surname !== '' &&
      email !== '' &&
      password !== '' &&
      confirmPassword !== ''
    );
  };
  const generateVerificationCode = () => {
    // Genera un codice di verifica casuale di 6 cifre
    return Math.floor(100000 + Math.random() * 900000);
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Verifica validità email
      if (!isValidEmail(email)) {
        throw new Error('L\'email deve avere il dominio "@giorgimi.edu.it".');
      }

      // Invio del codice di verifica via email
      const code = generateVerificationCode(); // Funzione da implementare per generare un codice casuale
      console.log('Codice di verifica:', code); // Qui si dovrebbe implementare l'invio reale via email
      setVerificationCode(code);
      setShowVerification(true); // Mostra il componente di verifica
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVerifyCode = (e) => {
    var enteredCode = e.target.value 
    if (verificationCode === enteredCode) { // enteredCode è il codice inserito dall'utente
      console.log('Email verificata con successo!');
      // Qui puoi eseguire altre azioni dopo aver verificato l'email
    } else {
      setError('Il codice di verifica non è valido.');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div style={{ maxWidth: '300px' }}>
        <h2>Registrati</h2>
        {!showVerification ? ( // Se non è attivo il processo di verifica
          <Form onSubmit={handleRegister}>
             <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Inserisci il tuo nome" value={name} onChange={handleNameChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSurname">
            <Form.Label>Cognome</Form.Label>
            <Form.Control type="text" placeholder="Inserisci il tuo cognome" value={surname} onChange={handleSurnameChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Inserisci la tua email" value={email} onChange={handleEmailChange} isInvalid={!isEmailValid} />
            <Form.Control.Feedback type="invalid">Inserisci un'email valida che termini con @giorgimi.edu.it.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Inserisci la tua password" value={password} onChange={handlePasswordChange} isInvalid={!isPasswordSecure} />
            <Form.Control.Feedback type="invalid">La password deve essere composta da almeno 8 caratteri, di cui almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Conferma Password</Form.Label>
            <Form.Control type="password" placeholder="Conferma Password" value={confirmPassword} onChange={handleConfirmPasswordChange} isInvalid={!passwordsMatch} />
            <Form.Control.Feedback type="invalid">Le password non coincidono.</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={!isFormValid()}>
            Registrati
          </Button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          </Form>
        ) : (
          // Se è attivo il processo di verifica
          <div>
            <Form.Group controlId="formVerificationCode">
              <Form.Label>Codice di Verifica</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il codice di verifica"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleVerifyCode}>
              Verifica
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;