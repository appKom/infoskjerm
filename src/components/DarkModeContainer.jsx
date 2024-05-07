import { useState, useEffect } from 'react';

export const DarkModeContainer = ({ children }) => {
  const [ isDarkMode, setIsDarkMode ] = useState(false);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 20 || hour < 6) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {children}
    </div>
  );
};
