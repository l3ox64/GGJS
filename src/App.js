import React from 'react';
import { BrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/login" element={(<><h1>Ciao Carmy! {"<3"}</h1></>)}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;