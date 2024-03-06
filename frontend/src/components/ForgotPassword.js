import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/forgotpassword', { email });
      setSuccess(true);
    } catch (error) {
      setError(error.response.data.error || 'Errore durante il reset della password.');
    }
  };

  const handleResetPassword = async () => {
    try {
      const token = window.location.search.split('=')[1]; // Ottieni il token dalla query string
      await axios.post('http://localhost:3001/forgotpassword/reset', { email, token, newPassword });
      // Password reimpostata con successo, reindirizza l'utente a una pagina di conferma o login
    } catch (error) {
      setError(error.response.data.error || 'Errore durante la reimpostazione della password.');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div style={{ maxWidth: '300px' }}>
        <h2>Password Dimenticata</h2>
        {!success ? (
          <Form onSubmit={handleForgotPassword}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Invia recupero password
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </Form>
        ) : (
          <div>
            <Form.Group controlId="formNewPassword">
              <Form.Label>Nuova Password</Form.Label>
              <Form.Control type="password" placeholder="Nuova password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleResetPassword}>
              Conferma reimpostazione password
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        )}

        <p>
          Ricordato? <a href="/login">Accedi qui</a>.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
