import React, { useState } from 'react';
import { Form, Button, Container, Stack } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const isValidEmail = (email) => {
    return email.endsWith("@giorgimi.edu.it");
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(isValidEmail(newEmail));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!isValidEmail(email)) {
        throw new Error('L\'email deve avere il dominio "@giorgimi.edu.it".');
      }

      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email_utente: email, Pw_utente: password }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error || 'Errore durante l\'accesso. Riprova.');
      }

      setError(null); 
      window.location.href = '/main';

    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <Stack className='col-md-5 mx-auto'>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            isInvalid={!isEmailValid}
          />
          <Form.Control.Feedback type="invalid">
            L'email deve avere il dominio "@giorgimi.edu.it".
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Accedi
        </Button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Form>

      <p>
        Non hai un account? <a href="/register">Registrati qui</a>.
      </p>
      <p>
        Hai dimenticato la password? <a href="/forgot-password">Recuperala qui</a>.
      </p>
    </Stack>
  );
};

export default Login;
