import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import LoginPage from './page/LoginPage';
import { ThemeProvider } from './components/ThemeProvider';

const App = () => {
  return (
  <ThemeProvider>
    <Router>
      <Routes>
          <Route path="/" element= {<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
      </Routes>
    </Router>
  </ThemeProvider>
  );
}

export default App;