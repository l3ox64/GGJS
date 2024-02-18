import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Stack } from 'react-bootstrap';

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  
  const isValidEmail = (email) => {
    // Verifica se l'email ha il dominio corretto
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
      // Verifica il formato dell'email prima di procedere
      if (!isValidEmail(email)) {
        throw new Error('L\'email deve avere il dominio "@giorgimi.edu.it".');
      }

      // Esegui la logica di accesso qui
      console.log('Effettua l\'accesso con:', email, password);

      // Resetta gli errori in caso di successo
      setError('');
    } catch (error) {
      // Gestisci gli errori qui
      setError(error.message);
    }
  };

  return (
    <Stack className='col-md-5 mx-auto'>
      {
      //<div style={{ maxWidth: "300px" }}>
      }
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
      {
      //</div>
      }
    </Stack>
  );
};

export default Login;