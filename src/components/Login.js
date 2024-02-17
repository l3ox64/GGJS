import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Effettua l\'accesso con:', email, password);
  };

  return (
    <div className="d-flex justify-content-center"> {}
      <div style={{ maxWidth: "300px" }}> {}
        <h2>Login</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="button" onClick={handleLogin}>
            Accedi
          </Button>
        </Form>

        <p>
          Hai dimenticato la password? <a href="/forgot-password">Recuperala qui</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;