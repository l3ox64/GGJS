// ThemeContext.js
import { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children, style }) => {
  const [dark, setDark] = useState(false);
  const toggleTheme = () => {
      setDark(!dark);
      localStorage.setItem("theme", dark ? "dark" : "light")
      document.body.setAttribute("data-bs-theme", localStorage.getItem("theme"))
  };

  return (
    <ThemeContext.Provider value={{ dark , toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};