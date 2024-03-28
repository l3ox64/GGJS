//Asaasa12!

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import sha512 from 'crypto-js/sha512';
import encHex from 'crypto-js/enc-hex';

const generateSessionToken = () => {
  return uuidv4();
};

const computeHash = (data, salt) => {
  return sha512(data + salt).toString(encHex);
};

const generateSalt = () => {
  return uuidv4();
};

export const setAuthCookie = async (email, rememberMe) => {
  try {
    const response = await fetch(`http://localhost:3001/api/users/${email}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();
    if (typeof userData === 'object') {
      const serializedUserData = JSON.stringify({
        Email_utente: userData.Email_utente,
        Nome_utente: userData.Nome_utente,
        Cognome_utente: userData.Cognome_utente,
        Flg_attivo_utente: userData.Flg_attivo_utente,
        Flg_part_time_congedi: userData.Flg_part_time_congedi,
        Flg_3anni_servizio: userData.Flg_3anni_servizio,
        Flg_segretario_utente: userData.Flg_segretario_utente,
        Flg_richiesta_pin: userData.Flg_richiesta_pin,
        isAdmin: userData.isAdmin
      });

      const sessionToken = generateSessionToken(); 
      const salt = generateSalt();
      const hash = computeHash(serializedUserData, salt); 

      Cookies.set('user', serializedUserData + '|' + sessionToken + '|' + salt + '|' + hash, { 
        expires: rememberMe ? 30 : null,
      });
    } else {
      throw new Error('User data is not in the expected format');
    }
  } catch (error) {
    console.error('Error setting auth cookie:', error);
  }
};

export const getAuthDataFromCookie = () => {
  const userData = Cookies.get('user');
  if (userData) {
    const [serializedUserData, sessionToken, salt, hash] = userData.split('|');
    // Verifica l'integrità del cookie calcolando l'hash e confrontandolo con quello memorizzato
    if (computeHash(serializedUserData, salt) === hash) {
      return JSON.parse(serializedUserData);
    }
  }
  return null;
};

export const isAuthCookie = () => {
  return getAuthDataFromCookie() != null;
};

export const removeAuthCookie = () => {
  Cookies.remove('user');
  window.location.assign('/Login');
};

export const redirectCookie = (redirectUrl) => {
  if (getAuthDataFromCookie() != null) {
    window.location.href = redirectUrl;
  } else {
    window.location.href = '/login';
  }
};
