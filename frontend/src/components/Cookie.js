import Cookies from 'js-cookie';

export const setAuthCookie = (userData, rememberMe) => {
  Cookies.set('user', userData, { expires: rememberMe ? 30 : null });
};

export const getAuthDataFromCookie = () => {
  const userData = Cookies.get('user');
  return userData ? JSON.parse(userData) : null;
};

export const isAuthCookie = () => {
  return getAuthDataFromCookie() != null;
};

export const removeAuthCookie = () => {
  Cookies.remove('user');
};

export const redirectCookie = (redirectUrl) => {
  if (getAuthDataFromCookie() != null) {
    window.location.href = redirectUrl;
  } else {
    window.location.href = '/login';
  }
}