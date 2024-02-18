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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
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

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.endsWith("@giorgimi.edu.it");
  };

  const validatePassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(password);
  };

  const isFormValid = () => {
    return isEmailValid && isPasswordSecure && passwordsMatch && name !== '' && surname !== '' && email !== '' && password !== '' && confirmPassword !== '';
  };

  return (
    <div className="d-flex justify-content-center">
      <div style={{ maxWidth: "300px" }}>
        <h2>Registrati</h2>
        <Form>
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
        </Form>
      </div>
    </div>
  );
};

export default Register;
