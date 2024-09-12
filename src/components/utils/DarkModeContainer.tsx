import { useState, useEffect, PropsWithChildren } from 'react';
import fetchSunTime from '../../api/suntimeApi';
import { useQuery } from '@tanstack/react-query';
import { Loading } from './Loading';

const REFETCH_INTERVAL_HOURS = 8; // how often to refetch sunrise/sunset times
const CHECK_INTERVAL_MINUTES = 5; // interval to check for dark mode toggle

export const DarkModeContainer = ({ children }: PropsWithChildren) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['sunTime'],
    queryFn: fetchSunTime,
    refetchInterval: 1000 * 60 * 60 * REFETCH_INTERVAL_HOURS
  });

  useEffect(() => {
    const checkDarkMode = () => {
      if (data && !isError) {
        const now = new Date();
        const sunrise = new Date(data.properties.sunrise.time);
        const sunset = new Date(data.properties.sunset.time);

        // Adjust for the timezone offset, if the API returns times in UTC
        sunrise.setMinutes(sunrise.getMinutes() + sunrise.getTimezoneOffset());
        sunset.setMinutes(sunset.getMinutes() + sunset.getTimezoneOffset());

        // Check if current time is after sunset or before sunrise
        setIsDarkMode(now < sunrise || now > sunset);
      } else {
        setIsDarkMode(false); // Default to light mode if there's an error or no data
      }
    };

    // Check dark mode status every CHECK_INTERVAL_MINUTES
    const intervalId = setInterval(checkDarkMode, 1000 * 60 * CHECK_INTERVAL_MINUTES);

    checkDarkMode(); // Check dark mode status immediately on mount

    return () => clearInterval(intervalId);
  }, [data, isError]);

  if (isLoading) return <Loading />;

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {children}
    </div>
  );
};
