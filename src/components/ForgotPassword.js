import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    console.log('Recupera la password per:', email);
  };

  return (
    <div className="d-flex justify-content-center"> {}
      <div style={{ maxWidth: "300px" }}> {}
        <h2>Password Dimenticata</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label> {}
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="button" onClick={handleForgotPassword}>
            Invia recupero password
          </Button>
        </Form>

        <p>
          Ricordato? <a href="/login">Accedi qui</a>.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;