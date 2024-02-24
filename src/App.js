//import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import ForgotPassword from './components/ForgotPassword';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import { ThemeProvider } from './components/ThemeProvider';
import FourOFourNotFound from './page/FourOFourNotFound';
import MainPage from './page/main';


const App = () => {
  return (
  <ThemeProvider>
    <Router>
      <Routes>
          <Route path="/" element= {<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/main" element={<MainPage/>} />
          <Route path="/" element= {<LoginPage/>} />
          {/*ROUTE 404*/}
          <Route path="*" element={<FourOFourNotFound/>} />
      </Routes>
    </Router>
  </ThemeProvider>
  );
}

export default App;