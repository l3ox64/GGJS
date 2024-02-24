import React, { useState } from 'react';
import { Form, Button, Container, Row, Stack } from 'react-bootstrap';
import axios from 'axios';

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
  const [tempVerificationCode, setTempVerificationCode] = useState('');

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

  const createAccount = async (email, pw, name, surname) => {
    try{
      await axios.post("http://localhost:3001/api/register", {Email_utente: email, Pw_utente: pw, Nome_utente: name, Cognome_utente: surname})
      return {}
    }catch(e){
      return e
    }
    
  }

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
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (!isValidEmail(email)) {
        throw new Error('L\'email deve avere il dominio "@giorgimi.edu.it".');
      }

      const code = generateVerificationCode(); 
      var res = await axios.post("http://localhost:3001/api/sendVerificationEmail", {to: email, verificationCode: code}) 
      setError("");
      setVerificationCode(code);
      setShowVerification(true); 
    } catch (error) {
      setError("Mail già in uso");
    }
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleVerifyCode = async (e) => {
    if (verificationCode === tempVerificationCode) {
      createAccount(email, password, name, surname).then((res) => {
        if (res.message) {
          setError("C'è stato un errore");
        } else {
          setShowSuccessMessage(true);
          setTimeout(() => {
            window.location.href = '/main';
          }, 3000);
        }
      });
    } else {
      setError('Il codice di verifica non è valido.');
    }
  };

  return (
    <>
    
      <Stack>
    
        <h2>Registrati</h2>
        {!showVerification ? (
        <Container>
            <Row>
                <Form onSubmit={handleRegister}>
                    <Form.Group  controlId="formBasicName">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control type="text" placeholder="Inserisci il tuo nome" value={name} onChange={handleNameChange} />
                    </Form.Group>
                    <Form.Group  controlId="formBasicSurname">
                      <Form.Label>Cognome</Form.Label>
                      <Form.Control type="text" placeholder="Inserisci il tuo cognome" value={surname} onChange={handleSurnameChange} />
                    </Form.Group>

                    <Form.Group  controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Inserisci la tua email" value={email} onChange={handleEmailChange} isInvalid={!isEmailValid} />
                      <Form.Control.Feedback type="invalid">Inserisci un'email valida che termini con @giorgimi.edu.it.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group  controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Inserisci la tua password" value={password} onChange={handlePasswordChange} isInvalid={!isPasswordSecure} />
                      <Form.Control.Feedback type="invalid">La password deve essere composta da almeno 8 caratteri, di cui almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group  controlId="formBasicConfirmPassword">
                      <Form.Label>Conferma Password</Form.Label>
                      <Form.Control type="password" placeholder="Conferma Password" value={confirmPassword} onChange={handleConfirmPasswordChange} isInvalid={!passwordsMatch} />
                      <Form.Control.Feedback type="invalid">Le password non coincidono.</Form.Control.Feedback>
                    </Form.Group>

                  <Button variant="primary" type="submit" disabled={!isFormValid()}>
                    Registrati
                  </Button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                </Form>
            </Row>
      </Container>
      
      
        ) : (
          <div>
            <Form.Group controlId="formVerificationCode">
              <Form.Label>Codice di Verifica</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il codice di verifica"
                value={tempVerificationCode}
                onChange={(e) => setTempVerificationCode(e.target.value)}
              />
            </Form.Group>
            {showSuccessMessage && (
              <p style={{ color: 'green', fontSize: '1.7em' }}>Email registrata con successo</p>
            )}
            <Button variant="primary" onClick={handleVerifyCode}>
              Verifica
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        )}
      </Stack>
    </>
  );
};

export default Register;