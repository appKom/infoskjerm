import './index.css';
import { Header } from './components/Header';
import { EventCarousel } from './components/EventCarousel';
import { useQuery } from 'react-query';
import { fetchEventsByStartDate } from './api/EventApi';
import { useState, useEffect } from 'react';

const refetchIntervalMinutes = 5;

function App() {
  const { isLoading, isError, data } = useQuery('events', () => fetchEventsByStartDate(), { refetchInterval: 1000 * 60 * refetchIntervalMinutes });

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

  if (isLoading){
    return <p>Loading</p>;
  }
  if (isError){
    return <p>{isError}. Kontakt appkom.</p>;
  }

  return (
    <div className={(isDarkMode ? 'dark' : '') + ' overflow-hidden dark:bg-[#111827] h-screen flex flex-col'}>
      <Header />
      <div className='flex flex-col h-full'>
        <EventCarousel title='Kommende arrangementer' events = {data.results.slice(0, 8)}/>
      </div>
    </div>
  );
}

export default App;
