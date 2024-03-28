import React from 'react';
import NavBar from '../components/NavBar';
import { isAuthCookie, removeAuthCookie, getAuthDataFromCookie } from '../components/Cookie'; // Import getAuthDataFromCookie function


export default function MainPage() {
  const userData = getAuthDataFromCookie(); // Retrieve user data string from cookie
  if (!isAuthCookie()) {
    window.location.assign('/Login');
    return null;
  }

  const renderButtons = () => {
    {    
      console.log(userData.isAdmin)
      console.log(userData)
      console.log(userData.hasOwnProperty('isAdmin'))
    }
    if (userData && userData.isAdmin) {
      return (
        <>
        <button onClick={() => window.location.assign('/admin/log')}>Log</button>
          <button>Admin Button 2</button>
          <button>Regular User Button 1</button>
          <button>Regular User Button 2</button>
        </>
      );
    } else if (userData && userData.Flg_segretario_utente) {
      return (
        <>
          <button>Secretary Button 1</button>
          <button>Secretary Button 2</button>
          <button>Regular User Button 1</button>
          <button>Regular User Button 2</button>
        </>
      );
    } else {
      return (
        <>
          <button>Regular User Button 1</button>
          <button>Regular User Button 2</button>
        </>
      );
    }
  };

  return (
    <div>
      <NavBar />
      <div className="main-content">
        <header>
          <h1>Benvenuti alla main page del sito ufficiale</h1>
          <p>Informazioni e risorse</p>
          <button onClick={removeAuthCookie}>Logout</button>
          {renderButtons()}
        </header>
        <img src="../assets/cabby.gif" alt="cabby-on-sella" width="500" height="333" />
      </div>
    </div>
  );
}
