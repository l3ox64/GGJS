import React from 'react';
import NavBar from '../components/NavBar';
import { isAuthCookie } from '../components/Cookie'; // Assicurati di impostare il percorso corretto per il controllo dell'autenticazione




export default function MainPage() {
  if (!isAuthCookie()) {
    window.location.assign('/Login');
    return 0;
  };
  return (
    <div>
      <NavBar />
      <div className="main-content">
        <header>
          <h1>Benvenuti alla main page del sito ufficiale</h1>
          <p>Informazioni e risorse</p>
        </header>
        <header>
        <img src="../assets/cabby.gif" alt="cabby-on-sella" width="500" height="333" />
          <h1>Benvenuti alla main page del sito ufficiale </h1>
          <p>Informazioni e risorse </p>
        </header>
        <img src="../assets/cabby.gif" alt="cabby-on-sella" width="500" height="333"></img>
      </div>
    </div>
  );
}
