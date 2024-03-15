import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Stack } from 'react-bootstrap';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [tempVerificationCode, setTempVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      if (!isValidEmail(email)) {
        throw new Error('Please enter a valid email address.');
      }

      const code = generateVerificationCode();
      const response = await axios.post("http://localhost:3001/api/sendVerificationEmail", { to: email, verificationCode: code, isReset: true});
      setVerificationCode(code);
      setShowVerification(true);
    } catch (error) {
      setError("Failed to send verification email. Please check your email address.");
    }
  };

  const validatePassword = (password) => {
    setPasswordError('');
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return false;
    }
    if (!/\d/.test(password)) {
      setPasswordError('Password must contain at least one digit.');
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError('Password must contain at least one lowercase letter.');
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter.');
      return false;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      setPasswordError('Password must contain at least one special character.');
      return false;
    }
    return true;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      if (verificationCode !== tempVerificationCode) {
        throw new Error('Invalid verification code. Please try again.');
      }

      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      if (!validatePassword(newPassword)) {
        return;
      }

      const response = await axios.put(`http://localhost:3001/api/users/${email}`, { Pw_utente: newPassword });
      setError('');
      setEmail('');
      setShowVerification(false);
      setVerificationCode('');
      setTempVerificationCode('');
      setNewPassword('');
      setConfirmPassword('');
      window.location.href = '/login';
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Stack>
            <h2 className="text-center">Password Dimenticata</h2>
            {!showVerification ? (
              <Form onSubmit={handleForgotPassword}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Reset
                </Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p className="mt-3">Ricordato? Fai il login. <a href="/login">Fai il login</a></p>
              </Form>
            ) : (
              <div>
                <Form onSubmit={handleResetPassword}>
                  <Form.Group controlId="formVerificationCode">
                    <Form.Label>Verification Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter verification code" value={tempVerificationCode} onChange={(e) => setTempVerificationCode(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="formNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Reset Password
                  </Button>
                  {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </Form>
              </div>
            )}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
