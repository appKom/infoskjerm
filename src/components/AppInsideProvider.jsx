import { Header } from './Header';
import { EventCarousel } from './EventCarousel';
import {fetchEventsByStartDate} from '../api/EventApi';
import { useQuery } from 'react-query';

const refetchIntervalMinutes = 5;

export function AppInsideProvider(){
  const { isLoading, isError, data } = useQuery('events', () => fetchEventsByStartDate(), { refetchInterval: 1000 * 60 * refetchIntervalMinutes });

  if (isLoading){
    return <p>Loading</p>;
  }
  if (isError){
    return <p>{isError}</p>;
  }

  return(
    <div className='overflow-hidden dark:bg-[#111827] h-screen flex flex-col'>
      <Header />
      <div className='flex flex-col h-full'>
        <EventCarousel title='Kommende arrangementer' events = {data.results.slice(0, 8)}/>
      </div>
    </div>
  );
}

