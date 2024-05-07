import { useState, useEffect } from 'react';
import fetchSunTime from '../api/suntimeApi';
import { useQuery } from 'react-query';

const refetchIntervalHours = 8;

export const DarkModeContainer = ({ children }) => {
  const [ isDarkMode, setIsDarkMode ] = useState(false);

  const { isLoading, isError, data } = useQuery('sunTime', fetchSunTime, {
    refetchInterval: 1000 * 60 * 60 * refetchIntervalHours
  });

  useEffect(() => {
    if (data) {
      const now = new Date();
      const sunrise = new Date(data.properties.sunrise.time);
      const sunset = new Date(data.properties.sunset.time);

      // Adjust for the timezone offset, if the API returns times in UTC
      sunrise.setMinutes(sunrise.getMinutes() + sunrise.getTimezoneOffset());
      sunset.setMinutes(sunset.getMinutes() + sunset.getTimezoneOffset());

      // Check if current time is after sunset or before sunrise
      setIsDarkMode(now < sunrise || now > sunset);
    }
  }, [data]);

  if (isLoading) {
    return <p>Laster inn...</p>;
  }

  if (isError) {
    return <p>Feil ved innlasting av tider for soloppgang og solnedgang. Kontakt appkom.</p>;
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {children}
    </div>
  );
};
