import {useState, useEffect, PropsWithChildren} from 'react';
import fetchSunTime from '../../api/suntimeApi';
import { useQuery } from '@tanstack/react-query';
import { Loading } from './Loading';
import { Error } from './Error';

const REFETCH_INTERVAL_HOURS = 8; // how often to refetch sunrise/sunset times
const CHECK_INTERVAL_MINUTES = 1; // interval to check for dark mode toggle

export const DarkModeContainer = ({ children }: PropsWithChildren) => {
  const [ isDarkMode, setIsDarkMode ] = useState(false);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['sunTime'],
    queryFn: fetchSunTime,
    refetchInterval: 1000 * 60 * 60 * REFETCH_INTERVAL_HOURS
  });

  useEffect(() => {
    const checkDarkMode = () => {
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
    }

    // Check dark mode status every minute
    const intervalId = setInterval(checkDarkMode, 1000 * 60 * CHECK_INTERVAL_MINUTES);

    return () => clearInterval(intervalId);
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {children}
    </div>
  );
};
