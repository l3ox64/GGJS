import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import ForgotPassword from './components/ForgotPassword';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import MainPage from './page/main';
import Log from './page/log';

import { ThemeProvider } from './components/ThemeProvider';
import FourOFourNotFound from './page/FourOFourNotFound';


//al mio amore, la mia stella, il mio inizio e la mia fine: npm depcheck
const App = () => {
  return (
  <ThemeProvider>
    <Router>
      <Routes>
          <Route path="/" element= {<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/main" element= {<MainPage/>} />
          <Route path="/main" element={<MainPage/>} />
          <Route path="/admin/log" element={<Log/>} />
          <Route path="/" element= {<LoginPage/>} />
          {/*ROUTE 404*/}
          <Route path="*" element={<FourOFourNotFound/>} />
      </Routes>
    </Router>
  </ThemeProvider>
  );
}

export default App;