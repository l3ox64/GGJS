import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const EmailVerification = ({ email, onSuccess }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleSendVerificationCode = () => {
    const code = generateVerificationCode();
    console.log('Codice di verifica:', code); 
    setVerificationCode(code);
  };

  const handleVerifyCode = () => {
    if (verificationCode === '') {
      setError('Inserisci il codice di verifica.');
      return;
    }
    if (verificationCode === '123456') { 
      onSuccess();
    } else {
      setAttempts(attempts + 1);
      setError('Il codice di verifica non è valido.');
      setVerificationCode('');
    }
  };

  return (
    <div>
      <h4>Verifica Email</h4>
      <p>
        Ti è stata inviata una email con un codice di verifica. Inserisci il codice qui sotto.
      </p>
      <Form>
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
        {attempts >= 3 && (
          <p style={{ color: 'red' }}>
            Hai superato il numero massimo di tentativi. Per favore, ricompila il modulo di registrazione.
          </p>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Form>
      {verificationCode === '' && (
        <div>
          <p>Non hai ricevuto il codice?</p>
          <Button variant="secondary" onClick={handleSendVerificationCode}>
            Invia di Nuovo
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;